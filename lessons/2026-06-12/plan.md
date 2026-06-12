# Plan — Index Finger Target Game

## Q1. Which project am I choosing?

Track 4: **Index Finger Target Game**. Build a simple game in the gesture
demo — the app generates a point on screen, and the player touches it with
their index finger.

## Q2. Which file or files in `mediapipe-lab/` will change?

`mediapipe-lab/sims/gesture-recognition/index.html` only. Everything lives
in the existing gesture-recognition demo; I am adding a game layer on top
of the existing landmarker output. No new files, no changes to
`face-mesh/`, `pose-estimation/`, `vendor/`, the launch page, or the
camera-preferences helper.

## Q3. What is the smallest version that would count as working?

All six required features from the lesson shipped together:

1. Draw one target point at a random position inside the video area.
2. Draw or highlight the detected index fingertip.
3. Count a hit when the fingertip is inside the target radius.
4. Move the target after each hit.
5. Show score and time remaining.
6. Do not use mouse clicks as the main input.

If the floor ends up too high and I cannot get all six working today, the
strip-down order is: drop the timer first, then drop the visual highlight
on the fingertip, then drop the target move-on-respawn. Target + hit
detection + score is the absolute minimum below which the feature is
broken, not just incomplete.

## Q4. How will I test it?

Open `http://localhost:5174/mediapipe-lab/sims/gesture-recognition/index.html`
in Safari, enable the camera, and play it. Test passes when:

- A target appears somewhere inside the video area.
- The index fingertip is visible as an overlay.
- Moving my finger into the target's radius increments the score.
- The target moves to a new random position after each hit.
- Score and remaining time are visible and update.

## Q5. What should I avoid adding?

- No sound effects.
- No animations beyond the existing landmark overlay.
- No login, account, or leaderboard.
- No mouse or keyboard fallback for the main input.
- No second project today — finish this one first.

Stretch goals (only if the required six are done):

- Shrink the target after each hit.
- Require the finger to stay on the target for 0.25 seconds.
- Add a countdown and high score.
- Add different target colors worth different points.
- Add a "privacy mode" that hides the camera image but keeps the game
  overlay.

## MediaPipe data the feature uses

- `results.landmarks[i]` — the array of 21 hand landmarks per detected
  hand. Landmark `8` is the index fingertip.
- `results.handedness[i][0].categoryName` — to know whether it is the
  left or right hand.
- `landmark.x` and `landmark.y` are normalized (0-1) in image space and
  need to be converted to canvas pixel coordinates, accounting for the
  video being mirrored on the screen.
