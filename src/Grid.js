const Robot = require('./Robot');

class Grid {
  /**
   *
   * @param x
   * @param y
   */
  constructor(x, y) {
    this.grid = [x, y];
    this.robots = [];
  }

  /**
   *
   * @param initalPosition
   * @param initialDirection
   * @param instructions
   */
  addRobot(initalPosition, initialDirection='N', instructions) {
    const robot = new Robot(initalPosition, initialDirection);

    //console.log('Instructions', instructions);
    this.executeInstructions(robot, instructions);

    this.robots.push(robot);
  }

  /**
   *
   * @param x
   * @param y
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
   * @param x
   * @param y
   * @returns {boolean}
   */
  wasRobotLostOnPosition(x, y) {
    return this.robots
      .filter(robot => robot.isLost())
      .some(robot => {
        const [x2, y2] = robot.getPosition();

        //console.log('Robot on lost position?', robot, x2, y2, x, y);

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
      // console.log(robot.getPosition());
      switch(instruction) {
        case 'R':
          // console.log('Rotating RIGHT');
          robot.rotateRight();
          break;

        case 'L':
          // console.log('Rotating LEFT');
          robot.rotateLeft();
          break;

        case 'F':
          // console.log('Moving FORWARD');
          const [xNext, yNext] = robot.nextPosition();
          if (this.isPositionOffGrid(xNext, yNext)) {
            /**
             * Robot is about to go off grid. Let's first check if there is a 'scent'
             * that can save our robot from the abyss...
             */
            // console.log(' - about to move off grid...');
            const [xCurrent, yCurrent] = robot.getPosition();
            if (this.wasRobotLostOnPosition(xCurrent, yCurrent)) {
              /**
               * Robot SAVED!!! Do nothing and continue...
               */
              // console.log(' - saved by a scent');
              break;
            }

            // console.log(' - robot lost');
            robot.setLost(true);
            return true;
          }

          /**
           * Movement looks good, let it happen
           */
          // console.log(' - moved');
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
}

module.exports = Grid;