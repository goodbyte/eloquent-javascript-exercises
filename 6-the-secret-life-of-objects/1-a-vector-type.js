/*

A vector type

Write a class Vec that represents a vector in two-dimensional space. It
takes x and y parameters (numbers), that it saves to properties of the
same name.
Give the Vec prototype two methods, plus and minus, that take an-
other vector as a parameter and return a new vector that has the sum or
difference of the two vectors’ (this and the parameter) x and y values.
Add a getter property length to the prototype that computes the
length of the vector—that is, the distance of the point (x, y) from the
origin (0, 0).

*/

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get length() {
    return Math.sqrt(this.x **2 + this.y ** 2);
  }

  plus(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  minus(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }
}

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// -> Vector { x: 3, y: 5 }
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// -> Vector { x: -1, y: -1 }
console.log(new Vector(3, 4).length);
// -> 5



