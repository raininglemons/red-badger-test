const Grid = require('./Grid');

describe('Grid', () => {
  test('give correct result with robot that doesn\'t fall off grid', () => {
    const grid = new Grid(5, 3);

    grid.addRobot([0, 0], 'E', 'FFLF'.split(''));

    expect(grid.toString()).toBe('2 1 N');
  });

  test('give correct result with robot that does fall off grid', () => {
    const grid = new Grid(1, 1);

    grid.addRobot([0, 0], 'N', 'FF'.split(''));

    expect(grid.toString()).toBe('0 1 N LOST');
  });

  test('give correct result with robot that does fall off grid and ignores remaining instructions', () => {
    const grid = new Grid(1, 1);

    grid.addRobot([0, 0], 'N', 'FFR'.split(''));

    expect(grid.toString()).toBe('0 1 N LOST');
  });

  test('give correct result with robot that detects scent of fallen comrade', () => {
    const grid = new Grid(1, 1, true);

    grid.addRobot([0, 0], 'N', 'FF'.split(''));
    grid.addRobot([0, 0], 'N', 'FF'.split(''));

    expect(grid.toString()).toBe(
      '0 1 N LOST\n' +
      '0 1 N'
    );
  });

  test('ensure only lost robots leave a scent', () => {
    const grid = new Grid(1, 1, true);

    grid.addRobot([0, 0], 'N', 'F'.split(''));
    grid.addRobot([0, 0], 'N', 'FF'.split(''));

    expect(grid.toString()).toBe(
      '0 1 N\n' +
      '0 1 N LOST'
    );
  });

  /**
   * Run sample data
   */
  test('give correct result with sample instructions', () => {
    const grid = new Grid(5, 3, true);

    grid.addRobot([1, 1], 'E', 'RFRFRFRF'.split(''));
    grid.addRobot([3, 2], 'N', 'FRRFLLFFRRFLL'.split(''));
    grid.addRobot([0, 3], 'W', 'LLFFFLFLFL'.split(''));

    expect(grid.toString()).toBe(
      '1 1 E\n' +
      '3 3 N LOST\n' +
      '2 3 S');
  }) /* */
});