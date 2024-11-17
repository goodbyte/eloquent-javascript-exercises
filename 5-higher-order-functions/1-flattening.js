/*

Flattening

Use the reduce method in combination with the concat method to “flat-
ten” an array of arrays into a single array that has all the elements of
the original arrays.

*/

const arr = [[1, 2, 3], [4, 5], [6, [7, 8]]];

function flat(arr) {
  return arr.reduce((acc, val) => acc.concat(
    Array.isArray(val) ? flat(val) : val
  ), []);
}

console.log(flat(arr));
// -> [1, 2, 3, 4, 5, 6, 7, 8]
