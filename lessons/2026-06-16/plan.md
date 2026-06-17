# Plan — 2026-06-16

Two tracks, applied one at a time. Predictions written **before** measuring, per the lesson.

## Track A — Decouple detection from drawing (do this first)

**Change:** Run `detectForVideo` only on every Nth video frame. Keep drawing the last result on every video frame. Move the `frameCount` tick so it counts all render frames, not just the ones where inference runs.

**Lines that will change:**
- The body of `renderFrame()` — the area around the `detectForVideo` call (currently around line 1444)
- The `frameCount += 1` line (currently inside the `if (video.currentTime !== lastVideoTime)` block, around line 1498) — needs to move out

**Predictions (Baseline → Track A):**
- Render FPS: **UP** — from ~16 toward ~60, because the render counter will tick on every video frame (or every animation frame), not only when inference runs
- Inference latency (ms): **DOWN** — system has less work to do per second
- Inferences/sec: **DOWN** — from ~16 to ~8 (every other video frame)

**Trade-off to watch:** the overlay will look "older" — landmarks are 1–2 inference steps behind the hand. If the game feels laggy, revert. Check by playing the finger game for 30 seconds after the change.

## Track D — Shrink the model's input (do this after A)

**Change:** Set `inferenceCanvas.width` and `inferenceCanvas.height` to a fraction (e.g. 0.5) of the visible canvas size. The visible video does not change size.

**Lines that will change:**
- `resizeCanvasToViewport()` (currently around lines 1115–1116)

**Predictions (After A → After D):**
- Render FPS: **SAME** — drawing logic does not change
- Inference latency (ms): **DOWN** — model sees a quarter of the pixels
- Inferences/sec: **SAME** — call frequency does not change

**Trade-off to watch:** model accuracy on small or far-away hands. If detection drops out at the edges or with the hand further from the camera, revert. Check by moving the hand toward the back of the desk and toward the edges of the frame.

## Order

1. Apply Track A → measure → write After row → commit
2. Confirm finger game still works (play 30s)
3. Apply Track D → measure → write After row → commit
4. Confirm finger game still works (play 30s)
