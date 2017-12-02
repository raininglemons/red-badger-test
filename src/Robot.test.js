const Robot = require('./Robot');

describe('Robot', () => {
  test('to move forward', () => {
    const robot = new Robot;
    robot.moveForward();
    expect(robot.getPosition()).toEqual([0, 1]);
  });

  test('to move east', () => {
    const robot = new Robot;
    robot.rotateRight();
    robot.moveForward();
    expect(robot.getPosition()).toEqual([1, 0]);
  });

  test('to move west', () => {
    const robot = new Robot;
    robot.rotateLeft();
    robot.moveForward();
    expect(robot.getPosition()).toEqual([-1, 0]);
  });

  test('to move south', () => {
    const robot = new Robot;
    robot.rotateLeft();
    robot.rotateLeft();
    robot.moveForward();
    expect(robot.getPosition()).toEqual([0, -1]);
  });
});
