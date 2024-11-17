/*

Dominant writing direction

Write a function that computes the dominant writing direction in a
string of text. Remember that each script object has a direction prop-
erty that can be "ltr" (left to right), "rtl" (right to left), or "ttb" (top
to bottom).
The dominant direction is the direction of a majority of the char-
acters that have a script associated with them. The characterScript
and countBy functions defined earlier in the chapter are probably useful
here.

*/

const SCRIPTS = require('./scripts');

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => code >= from && code < to)) {
      return script;
    }
  }
  return null;
}

function countBy(items, groupName) {
  let counts = [];

  for (let item of items) {
    let name = groupName(item);
    let known = counts.find((c) => c.name === name);

    if (!known) counts.push({ name, count: 1 });
    else known.count++;
  }

  return counts;
}

function dominantDirection(text) {
  let counted = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : 'none';
  }).filter(({name}) => name !== 'none');

  return counted.reduce((a, b) => a.count > b.count ? a : b).name;
}

console.log(dominantDirection('Hello!'));
// -> ltr
console.log(dominantDirection("Hey, مساء الخير"));
// -> rtl  