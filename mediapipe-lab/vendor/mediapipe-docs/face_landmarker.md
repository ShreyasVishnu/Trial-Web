# MediaPipe Tasks Vision — Face Landmarker

<!--
Vendored from: https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker
Fetched:      2026-06-12
Source:       Google AI Edge / MediaPipe
              (https://developers.google.com/edge/mediapipe)
License:      CC BY 4.0 (page text) / Apache 2.0 (code samples)
              https://creativecommons.org/licenses/by/4.0/

This file is third-party documentation vendored into the repo so the
mediapipe-lab module is self-contained for offline class use. Do not
edit the body. Refresh from the source URL when the upstream changes.
-->

Products
Google AI Edge
MediaPipe
# Face landmark detection guide Stay organized with collections Save and categorize content based on your preferences.
The MediaPipe Face Landmarker task lets you detect face landmarks and facial expressions in
images and videos. You can use this task to identify human facial expressions,
apply facial filters and effects, and create virtual avatars. This task uses
machine learning (ML) models that can work with single images or a continuous
stream of images. The task outputs 3-dimensional face landmarks, blendshape
scores (coefficients representing facial expression) to infer detailed facial
surfaces in real-time, and transformation matrices to perform the
transformations required for effects rendering.
Try it! arrow_forward
## Get Started
Start using this task by following one of the implementation guides for your
target platform. These platform-specific guides walk you through a basic
implementation of this task, including a recommended model, and code example
with recommended configuration options:
Android - Code example - Guide
Python - Code example - Guide
Web - Code example - Guide
## Task details
This section describes the capabilities, inputs, outputs, and configuration
options of this task.
### Features
Input image processing - Processing includes image rotation, resizing,
normalization, and color space conversion.
Score threshold - Filter results based on prediction scores.
Task inputs Task outputs
The Face Landmarker accepts an input of one of the following data types:
Still images
Decoded video frames
Live video feed
The Face Landmarker outputs the following results:
A complete face mesh for each detected face, with blendshape scores denoting facial expressions and coordinates for facial landmarks.
Face Blendshape and Facial transformation matrixes
### Configurations options
This task has the following configuration options:
Option Name Description Value Range Default Value
running_mode Sets the running mode for the task. There are three
modes:
IMAGE: The mode for single image inputs.
VIDEO: The mode for decoded frames of a video.
LIVE_STREAM: The mode for a livestream of input
data, such as from a camera. In this mode, resultListener must be
called to set up a listener to receive results
asynchronously. { IMAGE, VIDEO, LIVE_STREAM } IMAGE
num_faces The maximum number of faces that can be detected by the
the FaceLandmarker . Smoothing is only applied when num_faces is set to 1. Integer > 0 1
min_face_detection_confidence The minimum confidence score for the face detection to be
considered successful. Float [0.0,1.0] 0.5
min_face_presence_confidence The minimum confidence score of face presence
score in the face landmark detection. Float [0.0,1.0] 0.5
min_tracking_confidence The minimum confidence score for the face tracking
to be considered successful. Float [0.0,1.0] 0.5
output_face_blendshapes Whether Face Landmarker outputs face blendshapes.
Face blendshapes are used for rendering the 3D face model. Boolean False
output_facial_transformation_matrixes Whether FaceLandmarker outputs the facial
transformation matrix. FaceLandmarker uses the
matrix to transform the face landmarks from a canonical face model to the
detected face, so users can apply effects on the detected landmarks. Boolean False
result_callback Sets the result listener to receive the landmarker results
asynchronously when FaceLandmarker is in the live stream mode.
Can only be used when running mode is set to LIVE_STREAM ResultListener N/A
## Models
The Face Landmarker uses a series of models to predict face landmarks.
The first model detects faces, a second model locates landmarks on the detected
faces, and a third model uses those landmarks to identify facial features and
expressions.
The following models are packaged together into a downloadable model bundle:
Face detection model : detects the presence of faces with a few key facial
landmarks.
Face mesh model : adds a complete mapping of the face. The model
outputs an estimate of 478 3-dimensional face landmarks.
Blendshape prediction model : receives output from the face mesh model
predicts 52 blendshape scores, which are coefficients representing facial
different expressions.
The face detection model is the BlazeFace short-range model, a lightweight and accurate face detector optimized for mobile GPU
inference. For more information, see the Face Detector task.
The image below shows a complete mapping of facial landmarks from the model
bundle output.
For a more detailed view of the face landmarks, see the full-size image .
Model bundle Input shape Data type Model Cards Versions
FaceLandmarker FaceDetector: 192 x 192
FaceMesh-V2: 256 x 256
Blendshape: 1 x 146 x 2 float 16 FaceDetector
FaceMesh-V2
Blendshape
Latest
