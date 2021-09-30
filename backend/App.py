import time
import glob
import sys
import os
from flask import Flask
from flask_cors import CORS , cross_origin
import Config
from PIL import Image, ImageDraw
from azure.cognitiveservices.vision.face import FaceClient
from msrest.authentication import CognitiveServicesCredentials
from azure.cognitiveservices.vision.face.models import TrainingStatusType, Person

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, support_credentials=True)


KEY = Config.AZURE_FACE_API_KEY
ENDPOINT = Config.AZURE_FACE_API_ENDPOINT
face_client = FaceClient(ENDPOINT, CognitiveServicesCredentials(KEY))


@app.route('/time')
@cross_origin(support_credentials=True)
def get_current_time():
    return {'time': time.time()}

@app.route('/createFaceID')
@cross_origin(support_credentials=True)
def createPersonGroupForFaceID(PERSON_GROUP_ID, user):
    print('Person group:', PERSON_GROUP_ID)
    face_client.person_group.create(person_group_id=PERSON_GROUP_ID, name=PERSON_GROUP_ID)
    user_group = face_client.person_group_person.create(PERSON_GROUP_ID, user)

    # Find all jpeg images of users in the directory
    user_images = [file for file in glob.glob('*.jpg') if file.startswith(user)]

    for image in user_images:
        u = open(image, 'r+b')
        face_client.person_group_person.add_face_from_stream(PERSON_GROUP_ID, user_group.person_id, u)
    
    trainPersonGroup(PERSON_GROUP_ID)

def trainPersonGroup(PERSON_GROUP_ID):
    print('Training the person group...')
    # Train the person group
    face_client.person_group.train(PERSON_GROUP_ID)

    while (True):
        training_status = face_client.person_group.get_training_status(PERSON_GROUP_ID)
        print("Training status: {}.".format(training_status.status))
        print()
        if (training_status.status is TrainingStatusType.succeeded):
            break
        elif (training_status.status is TrainingStatusType.failed):
            face_client.person_group.delete(person_group_id=PERSON_GROUP_ID)
            sys.exit('Training the person group has failed.')
        time.sleep(5)

@app.route('/verify')
@cross_origin(support_credentials=True)
def verifyFaceID(img, PERSON_GROUP_ID):
    image = open(img, 'r+b')

    # Detect faces
    face_ids = []
    # We use detection model 3 to get better performance.
    faces = face_client.face.detect_with_stream(image, detection_model='detection_03')
    for face in faces:
        face_ids.append(face.face_id)

    # Identify faces
    results = face_client.face.identify(face_ids, PERSON_GROUP_ID)
    print('Identifying faces in {}'.format(os.path.basename(image.name)))
    if not results:
        print('No person identified in the person group for faces from {}.'.format(os.path.basename(image.name)))
    for person in results:
        if len(person.candidates) > 0:
            print('Person for face ID {} is identified in {} with a confidence of {}.'.format(person.face_id, os.path.basename(image.name), person.candidates[0].confidence)) # Get topmost confidence score
            return True
        else:
            print('No person identified for face ID {} in {}.'.format(person.face_id, os.path.basename(image.name)))
            return False

    
app.run(port=5000, debug=True)