# clone-class
clone a class including prototype chain (except for native types)

# Installation

`npm install clone-class`

# Usage

```js
var EventEmitter = require('events').EventEmitter
var cloneClass = require('clone-class')

var EventEmitterClone = cloneClass(EventEmitter)

var eeClone = new EventEmitterClone()
var ee = new EventEmitter()

// clone works just like EventEmitter\
var sum = 0;
eeClone.on('add', function (num) {
  sum += num
})
eeClone.emit('add', 2)
eeClone.emit('add', 3)
console.log(sum) // 5

console.log(eeClone instanceof EventEmitter) // true
console.log(eeClone instanceof EventEmitterClone) // true
console.log(ee instanceof EventEmitter) // true
console.log(ee instanceof EventEmitterClone) // false

```

# Warning

Remember changing the prototype chain affects all instances of/inheriting-from the classes affected.

# License
MIT