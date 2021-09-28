package com.example.bonvoyaide;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.drawable.BitmapDrawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import com.microsoft.projectoxford.face.FaceServiceClient;
import com.microsoft.projectoxford.face.FaceServiceRestClient;
import com.microsoft.projectoxford.face.contract.Face;
import com.microsoft.projectoxford.face.contract.FaceRectangle;
import com.microsoft.projectoxford.face.contract.IdentifyResult;
import com.microsoft.projectoxford.face.contract.Person;
import com.microsoft.projectoxford.face.contract.TrainingStatus;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.UUID;

public class FaceRecognition extends AppCompatActivity {

    private FaceServiceClient faceServiceClient = new FaceServiceRestClient("https://eastus.api.cognitive.microsoft.com/face/v1.0/", "22e08cab706144169dfc082cbdc21f54");
    private final String personGroupId = "users";

    ImageView imageView;
    Bitmap mBitmap;
    boolean takePicture = false;

    private ProgressDialog detectionProgressDialog;
    Face[] facesDetected;

    class detectTask extends AsyncTask<InputStream, String, Face[]> {
        private ProgressDialog mDialog = new ProgressDialog(FaceRecognition.this);

        @Override
        protected Face[] doInBackground(InputStream... params) {
            try {
                publishProgress("Detecting...");
                Face[] results = faceServiceClient.detect(params[0], true, false, null);

                if (results == null) {
                    publishProgress("Detection Finished. Nothing detected");
                    return null;
                } else {
                    publishProgress(String.format("Detection Finished. %d face(s) detected", results.length));
                    return results;
                }
            } catch (Exception ex) {
                return null;
            }
        }

        @Override
        protected void onPreExecute() {
            mDialog.show();
        }

        @Override
        protected void onPostExecute(Face[] faces) {
            mDialog.dismiss();
            facesDetected = faces;
        }

        @Override
        protected void onProgressUpdate(String... values) {
            mDialog.setMessage(values[0]);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 0 && resultCode == RESULT_OK) {
            Bitmap bitmap = (Bitmap) data.getExtras().get("data");
            imageView.setImageBitmap(bitmap);
            detectAndFrame(bitmap);
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_face_recognition);
        detectionProgressDialog = new ProgressDialog(this);

        mBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.face);
        imageView = findViewById(R.id.imageView);
        imageView.setImageBitmap(mBitmap);
        Button btnDetect = findViewById(R.id.btnDetectFace);
        Button btnIdentify = findViewById(R.id.btnIdentify);

        btnDetect.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Bitmap icon = BitmapFactory.decodeResource(getApplicationContext().getResources(),
                        R.drawable.billgates);
                if (ContextCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(FaceRecognition.this, new String[]{Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE}, 110);
                } else {
                    Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                    startActivityForResult(cameraIntent, 0);
                }

            }
        });

        btnIdentify.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (takePicture) {
                    final UUID[] faceIds = new UUID[facesDetected.length];
                    for (int i = 0; i < facesDetected.length; i++) {
                        faceIds[i] = facesDetected[i].faceId;
                    }

                    Log.d("FaceId",String.valueOf(faceIds.length));
                    new IdentificationTask(personGroupId).execute(faceIds);
                } else {
                    Toast.makeText(getApplicationContext(), "Please detect the face first.", Toast.LENGTH_SHORT).show();
                }
                //  faceServiceClient.m
                /*   CreatePersonResult createPersonResult;
                try {
                    createPersonResult = faceServiceClient.createPerson(personGroupId, "Bob", "My Friends");
                    Toast.makeText(getApplicationContext(), "Created Person called Bob", Toast.LENGTH_LONG).show();
                }catch(Exception e) {
                    Toast.makeText(getApplicationContext(), "Creation failed: " + e.getMessage() + " " + e.getCause(), Toast.LENGTH_LONG).show();
                }*/
            }
        });


    }

    private void detectAndFrame(final Bitmap imageBitmap) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        imageBitmap.compress(Bitmap.CompressFormat.JPEG, 100, outputStream);
        ByteArrayInputStream inputStream =
                new ByteArrayInputStream(outputStream.toByteArray());

        AsyncTask<InputStream, String, Face[]> detectTask =
                new AsyncTask<InputStream, String, Face[]>() {
                    String exceptionMessage = "";

                    @Override
                    protected Face[] doInBackground(InputStream... params) {
                        try {

//                            Log.e("errerere", params.toString());
                            publishProgress("Detecting...");
                            Face[] result = faceServiceClient.detect(
                                    params[0],
                                    true,         // returnFaceId
                                    false,        // returnFaceLandmarks
                                    null          // returnFaceAttributes:
                                /* new FaceServiceClient.FaceAttributeType[] {
                                    FaceServiceClient.FaceAttributeType.Age,
                                    FaceServiceClient.FaceAttributeType.Gender }
                                */
                            );



                            if (result == null) {
                                publishProgress(
                                        "Detection Finished. Nothing detected");
                                return null;
                            }
                            publishProgress(String.format(
                                    "Detection Finished. %d face(s) detected",
                                    result.length));
                            return result;
                        } catch (Exception e) {

                               e.printStackTrace();
                            Log.e("errerere", e.toString());
                            exceptionMessage = String.format(
                                    "Detection failed: %s", e.getMessage());
                            return null;
                        }
                    }

                    @Override
                    protected void onPreExecute() {
                        //TODO: show progress dialog
                        detectionProgressDialog.show();
                    }

                    @Override
                    protected void onProgressUpdate(String... progress) {
                        //TODO: update progress
                        detectionProgressDialog.setMessage(progress[0]);
                    }

                    @Override
                    protected void onPostExecute(Face[] result) {
                        //TODO: update face frames
                        detectionProgressDialog.dismiss();

                        facesDetected = result;

                        if (!exceptionMessage.equals("")) {
                            if (facesDetected == null) {
                                showError(exceptionMessage + "\nNo faces detected.");
                            } else {
                                showError(exceptionMessage);
                            }
                        }
                        if (result == null) {
                            if (facesDetected == null) {
                                showError("No faces detected");
                            }
                        }

                        Log.e("face",facesDetected.toString());
                        ImageView imageView = findViewById(R.id.imageView);
                        imageView.setImageBitmap(
                                drawFaceRectanglesOnBitmap(imageBitmap, facesDetected));
                        imageBitmap.recycle();

                        Toast.makeText(getApplicationContext(), "Now you can identify the person by pressing the \"Identify\" Button", Toast.LENGTH_LONG).show();
                        takePicture = true;
                    }
                };

        detectTask.execute(inputStream);
    }

    private static Bitmap drawFaceRectanglesOnBitmap(
            Bitmap originalBitmap, Face[] faces) {
        Bitmap bitmap = originalBitmap.copy(Bitmap.Config.ARGB_8888, true);
        Canvas canvas = new Canvas(bitmap);
        Paint paint = new Paint();
        paint.setAntiAlias(true);
        paint.setStyle(Paint.Style.STROKE);
        paint.setColor(Color.GREEN);
        paint.setStrokeWidth(2);



        if (faces != null) {
            Log.e("Face Detected:", String.valueOf(faces.length));

            for (int i =0; i< faces.length;i++) {

                FaceRectangle faceRectangle = faces[i].faceRectangle;

                Log.d("Detetct: Top Rogu",String.valueOf(faceRectangle.top));

                canvas.drawRect(
                        faceRectangle.left,
                        faceRectangle.top,
                        faceRectangle.left + faceRectangle.width,
                        faceRectangle.top + faceRectangle.height,
                        paint);
            }
        }
        return bitmap;
    }

    private void showError(String message) {
        new AlertDialog.Builder(this)
                .setTitle("Error")
                .setMessage(message)
                .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                    }
                })
                .create().show();
    }

    private class IdentificationTask extends AsyncTask<UUID, String, IdentifyResult[]> {
        String personGroupId;

        private ProgressDialog mDialog = new ProgressDialog(FaceRecognition.this);

        public IdentificationTask(String personGroupId) {
            this.personGroupId = personGroupId;
        }

        @Override
        protected IdentifyResult[] doInBackground(UUID... params) {

            try {
                publishProgress("Getting person group status...");
                TrainingStatus trainingStatus = faceServiceClient.getPersonGroupTrainingStatus(this.personGroupId);
                if (trainingStatus.status != TrainingStatus.Status.Succeeded) {
                    publishProgress("Person group training status is " + trainingStatus.status);
                    return null;
                }
                publishProgress("Identifying...");

                IdentifyResult[] results = faceServiceClient.identity(personGroupId, // person group id
                        params // face ids
                        , 1); // max number of candidates returned

                Log.d("Identified Res", String.valueOf(results.length));
                return results;

            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }

        @Override
        protected void onPreExecute() {
            mDialog.show();
        }

        @Override
        protected void onPostExecute(IdentifyResult[] identifyResults) {
            mDialog.dismiss();
            for (IdentifyResult identifyResult : identifyResults) {
                Log.e("Identified Res", String.valueOf(identifyResult.candidates.size()));
                new PersonDetectionTask(personGroupId).execute(identifyResult.candidates.get(0).personId);
            }
        }

        @Override
        protected void onProgressUpdate(String... values) {
            mDialog.setMessage(values[0]);
        }
    }

    private class PersonDetectionTask extends AsyncTask<UUID, String, Person> {
        private ProgressDialog mDialog = new ProgressDialog(FaceRecognition.this);
        private String personGroupId;

        public PersonDetectionTask(String personGroupId) {
            this.personGroupId = personGroupId;
        }

        @Override
        protected Person doInBackground(UUID... params) {
            try {
                publishProgress("Getting person group status...");

                return faceServiceClient.getPerson(personGroupId, params[0]);
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }

        @Override
        protected void onPreExecute() {
            mDialog.show();
        }

        @Override
        protected void onPostExecute(Person person) {
            mDialog.dismiss();
            imageView.buildDrawingCache();
            imageView.invalidate();
            BitmapDrawable drawable = (BitmapDrawable) imageView.getDrawable();
            Bitmap bitmap = drawable.getBitmap();
            imageView.setImageBitmap(drawFaceRectangleOnBitmap(bitmap, facesDetected, person.name));
        }

        @Override
        protected void onProgressUpdate(String... values) {
            mDialog.setMessage(values[0]);
        }
    }

    private Bitmap drawFaceRectangleOnBitmap(Bitmap mBitmap, Face[] facesDetected, String name) {

        Bitmap bitmap = mBitmap.copy(Bitmap.Config.ARGB_8888, true);
        Canvas canvas = new Canvas(bitmap);
        //Rectangle
        Paint paint = new Paint();
        paint.setAntiAlias(true);
        paint.setStyle(Paint.Style.STROKE);
        paint.setColor(Color.GREEN);
        paint.setStrokeWidth(2);

        if (facesDetected != null) {
            for (Face face : facesDetected) {
                FaceRectangle faceRectangle = face.faceRectangle;
                Log.d("Identify: Top Rogu",String.valueOf(faceRectangle.top));
                canvas.drawRect(faceRectangle.left,
                        faceRectangle.top,
                        faceRectangle.left + faceRectangle.width,
                        faceRectangle.top + faceRectangle.height,
                        paint);
                drawTextOnCanvas(canvas, 15, ((faceRectangle.left + faceRectangle.width) / 2) , faceRectangle.top  , Color.GREEN, name);

            }
        }
        return bitmap;
    }

    private void drawTextOnCanvas(Canvas canvas, int textSize, int x, int y, int color, String name) {
        Paint paint = new Paint();
        paint.setAntiAlias(true);
        paint.setStyle(Paint.Style.FILL);
        paint.setColor(color);
        paint.setTextSize(textSize);

        float textWidth = paint.measureText(name);

        canvas.drawText(name, x - (textWidth / 2), y - (textSize / 2), paint);
    }
}
