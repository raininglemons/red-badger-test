# Coding Challenge 2017

## Blurb

I think this test probably took me around 2 hours. Getting through the main logic
took me perhaps 45 minutes, and I spent the result cleaning bits up (i.e. allowing
for logging when in 'debug' mode, adding comments, tests etc.).

I've deliberately assumed that the input will always be of the correct syntax. So it
will fail without useful errors when the input file is incorrect.

Also as I didn't want to go beyond the time specified in the test, there are a few
places for improvement given more time;

* The [Grid](src/Grid.js) class could store the "scents" much more efficiently. Whilst on a small
scale is absolutely fine to iterate through past [Robot](src/Robot.js) instances and see where they've
fallen off the grid. If we happened to scale it up, it would probably be more efficient to
register "scents" in an array that **only** contains enough spaces for the grid rim.
* More useful errors with respect to an input of an invalid format
* More tests. Most have focused around basic functions within the Robot and within the grid 
using mostly sample data provided in challenge.
* Node version test, or at least some kind of transpiled alternative. Current test assumes the
latest version of Node.


## How to run

### Run tests

To run basic Jest tests use the following command:

```bash
    npm test
```

### Run on an input file

Run with sample file input:

```bash
    npm run source.txt
```

