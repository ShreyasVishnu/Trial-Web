# Machine Benchmark — Safari

Tested on Safari, all three demos. Numbers below are real measurements from my
machine.

## Results

| Demo | Browser | Model loaded? | Camera opened? | FPS after 10 sec | Notes |
| --- | --- | --- | --- | --- | --- |
| Pose Estimation | Safari | yes | yes (after clicking Enable Camera) | 10-20 varying | loads two model files |
| Face Mesh | Safari | yes | yes | 10-11 | runs well, everything works |
| Gesture Recognition | Safari | yes | yes | 8-9 | slowest |

## Slowest demo

Gesture Recognition.

## Why Gesture Recognition is slower than the others

i think it is slower there are more moving points on my hand that the ai has
to detect and understand what each pose means based on behavior and what the
user is indicating which takes a lot of analyzing compared to the other ones
where all it did was just place points on my face or hand instead of having
to anaylize what it meant.
