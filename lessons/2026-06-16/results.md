# Results — 2026-06-16

## Performance

| Stage | Render FPS | Inference latency (ms) | Inferences/sec | Notes |
| --- | --- | --- | --- | --- |
| Baseline | 16.5 | 57 | 15.5 | Safari 26.5, MacBook Air M1, Tahoe 26.5.1 |
| After A (decouple, N=2) | 26 | 56 | 12 | Render FPS rose (counts animation frames, not just video frames). Inferences/sec dropped to ~half. Latency flat. Fingertip highlight is a little jittery — landmarks are 1–2 inference steps old. Game still playable. rAF is firing at ~26 Hz on this machine, not 60 — possibly low power mode; worth a journal note. |

## Measurement notes

- 10-second window with hand held in frame, palm toward camera
- Render FPS observed 16–17
- Inference latency observed 54–60 ms
- Inferences/sec observed 15–16
- Values recorded as midpoints of observed range; full range noted above
- Same browser, machine, and lighting used for any After measurements
