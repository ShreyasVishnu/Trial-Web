# MediaPipe Tasks Vision — Gesture Recognizer

<!--
Vendored from: https://developers.google.com/edge/mediapipe/solutions/vision/gesture_recognizer
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
# Gesture recognition task guide Stay organized with collections Save and categorize content based on your preferences.
The MediaPipe Gesture Recognizer task lets you recognize hand gestures in real time, and
provides the recognized hand gesture results along with the landmarks of the
detected hands. You can use this task to recognize specific hand gestures from a
user, and invoke application features that correspond to those gestures.
This task operates on image data with a machine learning (ML) model, and accepts
either static data or a continuous stream. The task outputs hand landmarks in
image coordinates, hand landmarks in world coordinates, handedness (left/right
hand), and the hand gesture categories of multiple hands.
Try it! arrow_forward
## Get Started
Start using this task by following one of these implementation guides for your
target platform. These platform-specific guides walk you through a basic
implementation of this task, using a recommended model, and provide code
examples with the recommended configuration options:
Android - Code
example
Guide
Python - Code
example
Guide
Web - [Code example](https://github.com/google-ai-edge/mediapipe-samples-web/blob/main/src/tasks/gesture-recognizer.ts - Guide
## Task details
This section describes the capabilities, inputs, outputs, and configuration
options of this task.
### Features
Input image processing - Processing includes image rotation, resizing,
normalization, and color space conversion.
Score threshold - Filter results based on prediction scores.
Label allowlist and denylist - Specify the gesture categories recognized
by the model.
Task inputs Task outputs
The Gesture Recognizer accepts an input of one of the following data types:
Still images
Decoded video frames
Live video feed
The Gesture Recognizer outputs the following results:
Categories of hand gestures
Handedness of detected hands
Landmarks of detected hands in image coordinates
Landmarks of detected hands in world coordinates
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
num_hands The maximum number of hands can be detected by
the GestureRecognizer . Any integer > 0 1
min_hand_detection_confidence The minimum confidence score for the hand detection to be
considered successful in palm detection model. 0.0 - 1.0 0.5
min_hand_presence_confidence The minimum confidence score of hand presence score in the hand
landmark detection model. In Video mode and Live stream mode of Gesture Recognizer,
if the hand presence confident score from the hand landmark model is below
this threshold, it triggers the palm detection model. Otherwise, a
lightweight hand tracking algorithm is used to determine the location of
the hand(s) for subsequent landmark detection. 0.0 - 1.0 0.5
min_tracking_confidence The minimum confidence score for the hand tracking to be considered
successful. This is the bounding box IoU threshold between hands in the
current frame and the last frame. In Video mode and Stream mode of
Gesture Recognizer, if the tracking fails, Gesture Recognizer triggers hand
detection. Otherwise, the hand detection is skipped. 0.0 - 1.0 0.5
canned_gestures_classifier_options Options for configuring the canned gestures classifier behavior. The canned gestures are ["None", "Closed_Fist", "Open_Palm", "Pointing_Up", "Thumb_Down", "Thumb_Up", "Victory", "ILoveYou"]
Display names locale: the locale to use for display names specified through the TFLite Model Metadata, if any.
Max results: the maximum number of top-scored classification results to return. If < 0, all available results will be returned.
Score threshold: the score below which results are rejected. If set to 0, all available results will be returned.
Category allowlist: the allowlist of category names. If non-empty, classification results whose category is not in this set will be filtered out. Mutually exclusive with denylist.
Category denylist: the denylist of category names. If non-empty, classification results whose category is in this set will be filtered out. Mutually exclusive with allowlist.
Display names locale: any string
Max results: any integer
Score threshold: 0.0-1.0
Category allowlist: vector of strings
Category denylist: vector of strings
Display names locale: "en"
Max results: -1
Score threshold: 0
Category allowlist: empty
Category denylist: empty
custom_gestures_classifier_options Options for configuring the custom gestures classifier behavior.
Display names locale: the locale to use for display names specified through the TFLite Model Metadata, if any.
Max results: the maximum number of top-scored classification results to return. If < 0, all available results will be returned.
Score threshold: the score below which results are rejected. If set to 0, all available results will be returned.
Category allowlist: the allowlist of category names. If non-empty, classification results whose category is not in this set will be filtered out. Mutually exclusive with denylist.
Category denylist: the denylist of category names. If non-empty, classification results whose category is in this set will be filtered out. Mutually exclusive with allowlist.
Display names locale: any string
Max results: any integer
Score threshold: 0.0-1.0
Category allowlist: vector of strings
Category denylist: vector of strings
Display names locale: "en"
Max results: -1
Score threshold: 0
Category allowlist: empty
Category denylist: empty
result_callback Sets the result listener to receive the classification results
asynchronously when the gesture recognizer is in the live stream mode.
Can only be used when running mode is set to LIVE_STREAM ResultListener N/A N/A
## Models
The Gesture Recognizer uses a model bundle with two pre-packaged model bundles: a
hand landmark model bundle and a gesture classification model bundle. The
landmark model detects the presence of hands and hand geometry, and the gesture
recognition model recognizes gestures based on hand geometry.
Model name Input shape Quantization type Model Card Versions
HandGestureClassifier 192 x 192, 224 x 224 float 16 info Latest
This task also supports the modification of the model bundle using Model Maker.
For more information on using Model Maker to customize models for this task, see
the Customize models for Gesture Recognizer page.
### Hand landmark model bundle
The hand landmark model bundle detects the keypoint localization of 21
hand-knuckle coordinates within the detected hand regions. The model was trained
on approximately 30K real-world images, as well as several rendered synthetic
hand models imposed over various backgrounds. See the definition of the 21
landmarks below:
The hand landmarker model bundle contains palm detection model and hand
landmarks detection model. Palm detection model localizes the region of hands
from the whole input image, and the hand landmarks detection model finds the
landmarks on the cropped hand image defined by the palm detection model.
Since palm detection model is much more time consuming, in Video mode or Live
stream mode, Gesture Recognizer uses bounding box defined by the detected hand
landmarks in the current frame to localize the region of hands in the next
frame. This reduces the times Gesture Recognizer triggering palm detection model.
Only when the hand landmarks model could no longer identify enough required
number of hands presence, or the hand tracking fails, palm detection model is
invoked to relocalize the hands.
### Gesture classification model bundle
The Gesture classification model bundle can recognize these common hand
gestures:
0 - Unrecognized gesture, label: Unknown
1 - Closed fist, label: Closed_Fist
2 - Open palm, label: Open_Palm
3 - Pointing up, label: Pointing_Up
4 - Thumbs down, label: Thumb_Down
5 - Thumbs up, label: Thumb_Up
6 - Victory, label: Victory
7 - Love, label: ILoveYou
If the model detects hands but does not recognize a gesture, the gesture
recognizer returns a result of "None". If the model does not detect hands, the
gesture recognizer returns empty.
The gesture classification model bundle contains two step neural network
pipeline with a gesture embedding model followed by a gesture classification
model. See more details in Gesture classification model
card .
The gesture embedding model encodes the image features into a feature vector,
and the classification model is a lightweight gesture classifier taking the
feature vector as input. The provided gesture classification model bundle
contains the canned gestures classifier, which detects the 7 common hand
gestures introduced above. You can extend the model bundle to recognize more
gestures by training your own custom gesture classifier. See more details in the
following Custom models section.
Gesture Recognizer with both canned gesture classifier and custom gesture classifier
prefers the custom gesture if both classifiers recognize the same gesture in
their categories. If only one gesture classifier recognizes the gesture,
Gesture Recognizer outputs the recognized gesture directly.
### Task benchmarks
Here's the task benchmarks for the whole pipeline based on the above pre-trained
models. The latency result is the average latency on Pixel 6 using CPU / GPU.
Model Name CPU Latency GPU Latency
GestureRecognizer 16.76ms 20.87ms
### Custom models
If you want to improve or alter the capabilities of the models provided in this
task, you can use Model Maker to modify the existing models. Custom models used
with MediaPipe must be in the .task format, which is a model bundle file. You
should consider using Model Maker to modify the provided models for this task
before building your own.
For more information about customizing a model for this task, see Customize
models for Gesture Recognizer .
