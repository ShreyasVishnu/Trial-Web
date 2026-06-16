# Lessons: Optimize the Pipeline (Computer Vision + Performance)

Date: June 16, 2026

On June 12 you built the **index-finger target game** in
`mediapipe-lab/sims/gesture-recognition/index.html`, and your benchmark put
Gesture Recognition at the bottom — 8–9 FPS in Safari. Today you make it faster
and smoother, and you prove the difference with numbers.

This is a measure → change → measure day. Same demo, same machine, honest
before-and-after.

Work through these in order:

1. [Measure the baseline](01-measure-the-baseline.md)
2. [Pick your optimizations](02-optimization-menu.md)
3. [Prove it and explain](03-prove-and-explain.md)

## Recommended for the finger game

- **Track C — smooth the fingertip.** Your aim point (hand landmark `8`) jitters;
  an EMA or One-Euro filter steadies it and the game feels fairer. Measure the
  wobble while holding your hand still.
- **Track B — switch to the GPU delegate.** The gesture demo sets no `delegate`,
  so it runs on **CPU**. Adding `delegate: "GPU"` to `baseOptions` is likely your
  single biggest latency win — measure CPU vs GPU and write down both.
- **Track A — decouple detection from drawing.** The game overlay (target, score,
  timer) can stay at 60 FPS even if `recognizeForVideo` only runs ~15× a second.
- **Track E — drop a hand you don't use.** The demo runs `numHands: 2`, but the
  game only needs one. Set `numHands: 1` and measure — half the hand-tracking work
  for free.

Rules of engagement:

- Start a local server from the repo root; do not open the HTML directly.
- Create `lessons/2026-06-16/plan.md` before asking an agent to code.
- Create `lessons/2026-06-16/results.md` after testing. Real numbers only — do not
  let an agent invent performance numbers.
- One commit per optimization, with the measurement in the message.
- For each change you must be able to say which line it touched and why it costs
  less.

## Local server

From the repo root:

```bash
python3 -m http.server 5174
```

Then open:

```text
http://localhost:5174/mediapipe-lab/
```

## End of day deliverables

- `lessons/2026-06-16/plan.md` with predictions written before measuring.
- `lessons/2026-06-16/results.md` with Baseline and After rows.
- At least two optimizations applied and measured separately.
- The finger game still playable.
- A 90-second demo: before number, the change, after number, the trade.
