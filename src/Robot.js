/**
 *
 * Robot
 *
 */

class Robot {
  /**
   * @constructor
   * @param {[x, y]} initialPosition
   * @param {'N' | 'E' | 'S' | 'W' } initialDirection ['N']
   */
  constructor(initialPosition=[0, 0], initialDirection='N') {
    this.position = initialPosition;
    this.orientation = Robot.directionNames.indexOf(initialDirection);
    this.lost = false;
  }

  /**
   * Rotates robot left.
   */
  rotateLeft() {
    if (this.orientation > 0) {
      this.orientation--;
    } else {
      this.orientation = 3;
    }
  }

  /**
   * Rotates robot right.
   */
  rotateRight() {
    if (this.orientation < 3) {
      this.orientation++;
    } else {
      this.orientation = 0;
    }
  }

  /**
   * Returns tuple of [x, y] co-ordinates the robot will be at if it moves forward.
   * @returns {[number, number]} [x, y] tuple of robots next position
   */
  nextPosition() {
    const [x, y] = this.position;
    const [dx, dy] = Robot.directions[this.orientation];

    return [x + dx, y + dy];
  }

  /**
   * Moves robot forward.
   */
  moveForward() {
    this.position = this.nextPosition();
  }

  /**
   * Returns current position of robot as tuple
   * @returns {[number, number]}
   */
  getPosition() {
    return this.position;
  }

  /**
   * @param {boolean} lost Sets the robot to lost or unlost
   */
  setLost(lost) {
    this.lost = lost;
  }

  /**
   * Returns boolean representing whether robot has been lost of grid or not.
   * @returns {boolean}
   */
  isLost() {
    return this.lost;
  }

  /**
   * Returns current direction of robot as a string representation of direction. Value is uppercase value of first letter
   * of direction.
   * @returns {string}
   */
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
 * @type {Array<string>}
 */
Robot.directionNames = [
  'N',
  'E',
  'S',
  'W'
];

module.exports = Robot;
