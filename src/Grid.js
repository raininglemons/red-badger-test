const Robot = require('./Robot');

class Grid {
  /**
   * @constructor
   * @param {number} x Grid width
   * @param {number} y Grid height
   * @param {boolean} [false] debug
   */
  constructor(x, y, debug = false) {
    this.grid = [x, y];
    this.robots = [];
    this.debug = debug;
  }

  /**
   *
   * @param {[number, number]} initalPosition X,Y co-ordinates of robots start position as array/tuple
   * @param {'N' | 'E' | 'S' | 'W'} initialDirection Initial direction the robot is facing. Provide a string representation of direction in uppercase as a single letter.
   * @param {Array<String>} instructions Instructions robot should take
   */
  addRobot(initalPosition, initialDirection='N', instructions) {
    const robot = new Robot(initalPosition, initialDirection);

    this.log('Instructions', instructions);
    this.executeInstructions(robot, instructions);

    this.robots.push(robot);
  }

  /**
   * Checks whether given position is off grid.
   * @private
   * @param {Number} x
   * @param {Number} y
   * @returns {boolean}
   */
  isPositionOffGrid(x, y) {
    if (x < 0 || y < 0) {
      return true;
    }

    if (x > this.grid[0] || y > this.grid[1]) {
      return true;
    }

    return false;
  }

  /**
   * Checks whether a lost robot was last seen on this position.
   * @param {Number} x
   * @param {Number} y
   * @returns {boolean}
   */
  wasRobotLostOnPosition(x, y) {
    return this.robots
      .filter(robot => robot.isLost())
      .some(robot => {
        const [x2, y2] = robot.getPosition();

        this.log('Robot on lost position?', robot, x2, y2, x, y);

        return x2 === x && y2 === y;
      })
  }

  /**
   * Executes given instructions on a robot.
   * @param robot {Robot}
   * @param instructions {Array<String>}
   */
  executeInstructions(robot, instructions) {
    instructions.some(instruction => {
      this.log(robot.getPosition());
      switch(instruction) {
        case 'R':
          this.log('Rotating RIGHT');
          robot.rotateRight();
          break;

        case 'L':
          this.log('Rotating LEFT');
          robot.rotateLeft();
          break;

        case 'F':
          this.log('Moving FORWARD');
          const [xNext, yNext] = robot.nextPosition();
          if (this.isPositionOffGrid(xNext, yNext)) {
            /**
             * Robot is about to go off grid. Let's first check if there is a 'scent'
             * that can save our robot from the abyss...
             */
            this.log(' - about to move off grid...');
            const [xCurrent, yCurrent] = robot.getPosition();
            if (this.wasRobotLostOnPosition(xCurrent, yCurrent)) {
              /**
               * Robot SAVED!!! Do nothing and continue...
               */
              this.log(' - saved by a scent');
              break;
            }

            this.log(' - robot lost');
            robot.setLost(true);
            return true;
          }

          /**
           * Movement looks good, let it happen
           */
          this.log(' - moved');
          robot.moveForward();
          break;

        default:
          throw new Error(`Unrecognised instruction '${instruction}`);
      }
    })
  }

  /**
   * Returns pretty summary of robot positions, directions and whether they were lost or not.
   * @returns {string}
   */
  toString() {
    return this.robots.map(robot => {
        const [x, y] = robot.getPosition();
        return `${x} ${y} ${robot.getDirection()}` + ( robot.isLost() ? ' LOST' : '' );
      })
      .join('\n');
  }

  /**
   * Will log given arguments if instance is constructed with debug = true. Else suppresses anything passed to it.
   * @param {...mixed} arguments to apply to console.log
   */
  log() {
    if (!this.debug) {
      return;
    }

    console.log.apply(console.log, arguments);
  }
}

module.exports = Grid;