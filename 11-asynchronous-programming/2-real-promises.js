/*

Real Promises

Rewrite the function from the previous exercise without async/await,
using plain Promise methods.
In this style, using Promise.all will be more convenient than trying
to model a loop over the logfiles. In the async function, just using await
in a loop is simpler. If reading a file takes some time, which of these
two approaches will take the least time to run?
If one of the files listed in the file list has a typo, and reading it fails,
how does that failure end up in the Promise object that your function
returns?

*/

function activityTable(day) {
  const table = [];

  for (let i = 0; i < 24; i++) table[i] = 0;

  return textFile('camera_logs.txt').then((files) => {
    return Promise.all(files.split('\n').map((name) => {
      return textFile(name).then((log) => {
        for (const timestamp of log.split('\n')) {
          const date = new Date(Number(timestamp));
          if (date.getDay() === day) {
            table[date.getHours()]++;
          }
        }
      });
    }));
  }).then(() => table);
}

activityTable(6)
  .then((table) => console.log(activityGraph(table)));