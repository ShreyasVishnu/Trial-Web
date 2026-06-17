# Results — 2026-06-16

## Performance

| Stage | Render FPS | Inference latency (ms) | Inferences/sec | Notes |
| --- | --- | --- | --- | --- |
| Baseline | 16.5 | 57 | 15.5 | Safari 26.5, MacBook Air M1, Tahoe 26.5.1 |
| After A (decouple, N=2) | 26 | 56 | 12 | Render FPS rose (counts animation frames, not just video frames). Inferences/sec dropped to ~half. Latency flat. Fingertip highlight is a little jittery — landmarks are 1–2 inference steps old. Game still playable. rAF is firing at ~26 Hz on this machine, not 60 — possibly low power mode; worth a journal note. |
| After D (scale 0.5) | 30 | 44 | 14 | Inference canvas is now half-size in each dim (1/4 the pixels). Latency dropped from 56→44 ms (model does less work). Inferences/sec roughly same. Render FPS ticked up to 30 (smaller image is faster to draw). Trade-offs: bottom-edge detection is less reliable on fast movement — small/far features get lost at half resolution. Lag from Track A is still present. |

## Measurement notes

- 10-second window with hand held in frame, palm toward camera
- Render FPS observed 16–17
- Inference latency observed 54–60 ms
- Inferences/sec observed 15–16
- Values recorded as midpoints of observed range; full range noted above
- Same browser, machine, and lighting used for any After measurements

## Why each change is cheaper

**Track A — decouple detection from drawing**

- The line that changed: `if (shouldRunInference) {` (line 1473), which gates the `handLandmarker.detectForVideo(...)` call (line 1476) to run only on every Nth video frame. Every frame, this condition is checked; the model only runs when the condition is true.
- Why it costs less: we are calling the model half as often (every 2nd video frame instead of every one). The model itself does the same work per call — we just call it less. That cuts inferences/sec from 15.5 to ~12, which frees CPU/GPU time for the render loop, letting render FPS rise from 16.5 to 26.

**Track D — shrink the model's input**

- The line that changed: `inferenceCanvas.width = inferenceWidth;` (line 1121) and the matching `inferenceCanvas.height = inferenceHeight;` (line 1122), where `inferenceWidth` and `inferenceHeight` are computed as `width * INFERENCE_SCALE` and `height * INFERENCE_SCALE` (0.5). Every time the viewport is resized, the inference canvas is set to half the visible canvas in each dimension (1/4 the pixels).
- Why it costs less: the model processes a smaller image per call. The number of calls doesn't change — but each call has 1/4 the pixels to look at, so the model returns faster. That drops inference latency from 56 ms to 44 ms. The render loop also benefits: drawing a smaller image to the visible canvas is cheaper, so render FPS rises from 26 to 30.

## Trade-offs

- **Track A** — fingertip data is up to one inference step old. The highlight can "lag" the actual finger on fast movement. The game is still playable, but a fast flick will be a few ms behind.
- **Track D** — the model sees a coarser image. Small or far-away hands, and hands at the edge of the frame, are harder to detect. On this machine, bottom-edge tracking is noticeably less reliable.
- Together: more responsive (higher FPS) at the cost of slightly older and slightly less detailed landmark data.

## If a classmate said "just make it faster"

Ask them which "faster" they mean: faster screen redraw (render FPS), faster model per call (inference latency), or fewer model calls (inferences/sec). Each one points to a different fix — and the fix for one can hurt another (decoupling raises render FPS but adds lag; shrinking input cuts latency but loses edge accuracy). Measure all three first.
