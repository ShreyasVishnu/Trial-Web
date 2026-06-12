# What did I change, and how do I know it works?

I added a 30-second index-finger target game on top of the existing
gesture-recognition demo. A yellow ring appears somewhere on the video,
you touch it with your index finger, the score goes up, the target moves
to a new random position, and a green flash confirms the hit. The
round ends at 30 seconds and the status banner shows the final score.

I know it works because:

- The new dedicated `hand_landmarker.task` model loads ("Model ready"
  appears in the status banner) and runs on the GPU delegate.
- The mirrored video shows my hand on the side I expect.
- The red highlight dot sits on my fingertip and the score chip
  increments when I touch the target.
- The hit ring flashes green for ~220ms on a registered hit, which
  is feedback I can see even when the score is changing fast.
- The benchmark numbers from Lesson 1 are still valid for the
  surrounding demo; the game itself is just drawing on top.

The trade-off I made: I swapped the bundled GestureRecognizer for the
lighter HandLandmarker so the game runs smoother, which means the
"Open_Palm / Closed_Fist" label that used to show in the chips is gone.
The plan.md said to keep the demo usable on a laptop screen and not
to fake MediaPipe output, and that still holds — every overlay on
the screen is real landmark data from the running model.
