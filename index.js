var clone = require('clone')
var exists = require('101/exists')
var findIndex = require('101/find-index')
var isNative = require('native-types').isNative
var protochain = require('protochain')

module.exports = cloneClass

/**
 * clone a class including it's prototype chain
 * it excludes native types in the protochain like Object
 * @param  {Class } Class      [description]
 * @param  {Number} protoDepth [description]
 * @return {Class } ClassCopy  deep copy of the class
 */
function cloneClass (Class, protoDepth) {
  if (!exists(Class)) {
    throw new Error('`Class` is required')
  }
  console.log('CLASS', Class.name)
  var protos = protochain(Class.prototype)
  protos.unshift(Class.prototype)
  // protoDepth limit
  if (protoDepth) {
    protos = protos.slice(0, protoDepth)
  }
  console.log(11, protos.map(require('101/pluck')('constructor.name')))
  var nativeIndex = findIndex(protos, isNative)
  var nativeProto
  console.log('nativeIndex', nativeIndex)
  if (~nativeIndex) {
    // don't clone native types in the proto chain
    nativeProto = protos[nativeIndex]
    protos = protos.slice(0, nativeIndex)
  }

  var ClassClone = function LOL () {}

  console.log(1, protos.map(require('101/pluck')('constructor.name')))

  var lastProto = protos.reduce(function (parent, child) {
    var childClone = clone(child)
    childClone.constructor = child.constructor
    console.log(parent, child, childClone)
    Object.setPrototypeOf(parent, childClone)
    return child
  }, ClassClone.prototype)

  console.log(protochain(ClassClone).map(require('101/pluck')('constructor.name')))

  // place the original class at the bottom of the prototype chain
  // so that the clone is actually still inheriting from the original
  // and passes instanceof checks
  Object.setPrototypeOf(lastProto, Class.prototype)

  return ClassClone
}
