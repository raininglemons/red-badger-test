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
**latest version of Node**.
* Better handling of errors in the main script instead of always failing on a success code.
* Oooh also, since moving my code at work to react, I've done all new code with flow.js typing. I'd
have liked to have added this, as particularly it's great with Intellij/Webstorm and it's great for
preventing bugs in the build process. Deliberately left it out as this is a pure node application so
wanted to avoid any kind of transpiling as it wasn't necessary on this small an app.
* Test mentions that there should be scope to add more commands. Currently there is a switch statement
which should be simple enough to add new commands to. Thought about adding a dictionary of commands to
the functions for executing them but thought in this size of a script going that far would be a bit
of over-engineering.
* `The maximum value for any coordinate is 50.` Wasn't sure whether this was a restriction and the world
should be capped at 50 x 50. Or this was more to help in developing to suggest that we wouldn't need to
account for a grid greater than this size. Allowed for an infinite size of grid. In practice would have
gone to requestor to clarify.


## How to run

You know the drill...

```bash
    yarn install
```

or -

```bash
    npm install
```

### Run tests

To run basic Jest tests use the following command:

```bash
    yarn test
```

or -

```bash
    npm test
```

### Run on an input file

Run with sample file input:

```bash
    yarn start source.txt
```

or -

```bash
    npm start source.txt
```

