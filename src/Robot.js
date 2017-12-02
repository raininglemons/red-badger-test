/**
 *
 * Robot
 *
 */

class Robot {
  /**
   * @constructor
   * @param initialPosition {[x, y]}
   * @param initialDirection {String}
   */
  constructor(initialPosition=[0, 0], initialDirection='N') {
    this.position = initialPosition;
    this.orientation = Robot.directionNames.indexOf(initialDirection);
    this.lost = false;
  }

  rotateLeft() {
    if (this.orientation > 0) {
      this.orientation--;
    } else {
      this.orientation = 3;
    }
  }

  rotateRight() {
    if (this.orientation < 3) {
      this.orientation++;
    } else {
      this.orientation = 0;
    }
  }

  nextPosition() {
    const [x, y] = this.position;
    const [dx, dy] = Robot.directions[this.orientation];

    return [x + dx, y + dy];
  }

  moveForward() {
    this.position = this.nextPosition();
  }

  getPosition() {
    return this.position;
  }

  setLost(lost) {
    this.lost = lost;
  }

  isLost() {
    return this.lost;
  }

  getDirection() {
    return Robot.directionNames[this.orientation];
  }
}


/**
 * Tuples of dx, dy for each orientation the robot can be in.
 * @static
 * @type {Array<[number, number]>}
 */
Robot.directions = [
  /* North */
  [0, 1],
  /* East */
  [1, 0],
  /* South */
  [0, -1],
  /* West */
  [-1, 0]
];

/**
 * Direction title represented as a string
 * @static
 * @type {Array<String>}
 */
Robot.directionNames = [
  'N',
  'E',
  'S',
  'W'
];

module.exports = Robot;
