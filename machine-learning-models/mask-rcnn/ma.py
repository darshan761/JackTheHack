import numpy as np
import cv2

img = cv2.imread('rain_check.jpg',cv2.IMREAD_COLOR)
#Next, we can start drawing, like:

cv2.rectangle(img, (965,253), (999, 365), (0, 255, 0), 5)
cv2.rectangle(img, (451,149), (519, 219), (0, 255, 0), 5)
cv2.rectangle(img, (390,149), (519, 230), (0, 255, 0), 5)
cv2.rectangle(img, (980,200),(978,340), (0, 255, 0), 5)

cv2.imshow('image',img)
cv2.waitKey(0)
cv2.destroyAllWindows()

# import the necessary packages
from collections import namedtuple
import numpy as np
import cv2

def bb_intersection_over_union(boxA, boxB):
	# determine the (x, y)-coordinates of the intersection rectangle
	xA = max(boxA[0], boxB[0])
	yA = max(boxA[1], boxB[1])
	xB = min(boxA[2], boxB[2])
	yB = min(boxA[3], boxB[3])

	# compute the area of intersection rectangle
	interArea = max(0, xB - xA + 1) * max(0, yB - yA + 1)

	# compute the area of both the prediction and ground-truth
	# rectangles
	boxAArea = (boxA[2] - boxA[0] + 1) * (boxA[3] - boxA[1] + 1)
	boxBArea = (boxB[2] - boxB[0] + 1) * (boxB[3] - boxB[1] + 1)

	# compute the intersection over union by taking the intersection
	# area and dividing it by the sum of prediction + ground-truth
	# areas - the interesection area
	iou = interArea / float(boxAArea + boxBArea - interArea)

	# return the intersection over union value
	return iou
A=[451,149, 519, 219]
B=[980,200,978,340]
print(bb_intersection_over_union(A,B))

data =[]
import csv
for i in range(len(A)):
	data.append(A[i])
	data.append(B[i])
	#data.append(sY[i])
	#data.append(eY[i])

	with open(r'ac.csv', 'a') as f:
		writer = csv.writer(f)
		writer.writerow(data)

	data.clear()