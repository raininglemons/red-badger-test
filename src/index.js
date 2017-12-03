const Grid = require('./Grid');

/**
 * Using exit code 0 because if we use anything else npm suppresses errors
 * when script is run via npm run...
 *
 * I'm also making assumptions that the data source is in a valid format.
 *  ¯\_(ツ)_/¯
 */

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' SOURCE_FILENAME');
  process.exit(0);
}

const fs = require('fs');
const filename = process.argv[2];

fs.access(filename, fs.constants.R_OK, (err) => {
  if (err) {
    console.log(`File '${filename}' either doesn't exist or is unreadable.`);
    process.exit(0);
  }

  /**
   * Lets now read this file and plug it into our Grid instance.
   */
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const [ gridDimensions, ...robots ] = data.split('\n');
    const [ x, y ] = gridDimensions.split(' ');
    const robotInformation = robots.filter(line => !!line)
      .reduce((robotArray, line, i) => {
        const robotNumber = Math.floor(i / 2);
        if (i % 2 === 0) {
          /**
           * First line, so robot position and direction
           */
          const [ x, y, direction ] = line.split(' ');
          robotArray.push({
            start: [parseInt(x, 10), parseInt(y, 10)],
            direction,
            commands: [],
          })
        } else {
          robotArray[robotNumber].commands = line.split('');
        }

        return robotArray;
      }, []);


    const grid = new Grid(parseInt(x, 10), parseInt(y, 10));

    robotInformation.forEach(({
        start,
        direction,
        commands
      }) => grid.addRobot(start, direction, commands));

    console.log(grid.toString());
  });
});