/*

Looping a triangle

Write a loop that makes seven calls to console.log to output the fol-
lowing triangle:

#
##
###
####
#####
######
#######

It may be useful to know that you can find the length of a string by
writing .length after it.
let abc = "abc";
console.log(abc.length);
// → 3

*/

for (let line = '#'; line.length < 8; line += '#') console.log(line);