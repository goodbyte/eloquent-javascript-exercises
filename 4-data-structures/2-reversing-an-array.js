/*

Reversing an array

Arrays have a reverse method that changes the array by inverting the
order in which its elements appear. For this exercise, write two func-
tions, reverseArray and reverseArrayInPlace. The first, reverseArray,
should take an array as its argument and produce a new array that has
the same elements in the inverse order. The second, reverseArrayInPlace
, should do what the reverse method does: modify the array given as
its argument by reversing its elements. Neither may use the standard
reverse method.
Thinking back to the notes about side effects and pure functions in
the previous chapter, which variant do you expect to be useful in more
situations? Which one runs faster?

*/

function reverseArray(arr) {
  return arr.reduce((acc, val) => [val, ...acc], []);
}

function reverseArrayInPlace(arr) {
  for (
    let left = 0, right = arr.length - 1, steps = Math.floor(arr.length / 2);
    left <= steps;
    left++, right--
  ) {
    const tmp = arr[left];
    arr[left] = arr[right];
    arr[right] = tmp;
  }
  
  return arr;
}

console.log(reverseArray(['A', 'B', 'C']));
// -> ['C', 'B', 'A']
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// -> [5, 4, 3, 2, 1]

