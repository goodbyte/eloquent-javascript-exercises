/*

Deep comparison

The == operator compares objects by identity, but sometimes you’d
prefer to compare the values of their actual properties.
Write a function deepEqual that takes two values and returns true
only if they are the same value or are objects with the same properties,
where the values of the properties are equal when compared with a
recursive call to deepEqual.
To find out whether values should be compared directly (using the
=== operator for that) or have their properties compared, you can use
the typeof operator. If it produces "object" for both values, you should
do a deep comparison. But you have to take one silly exception into
account: because of a historical accident, typeof null also produces
"object".
The Object.keys function will be useful when you need to go over the
properties of objects to compare them.

*/

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  
  const isByReference = (elem) => {
    const isObject = (e) => e && typeof e === 'object';
    const isArray = (e) => Array.isArray(e);
    
    return isObject(elem) || isArray(elem);
  };
  
  if (!isByReference(a) || !isByReference(b)) return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  for (let key of aKeys) {
    if (!bKeys.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
}

const obj = {here: {is: 'an'}, object: 2, arr: [1, 2, 3]};
console.log(deepEqual(obj, obj));
// -> true
console.log(deepEqual(obj, {here: 1, object: 2}));
// -> false
console.log(deepEqual(obj, {here: {is: 'an'}, object: 2, arr: [1, 2, 3]}));
// -> true