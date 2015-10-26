var EventEmitter = require('events').EventEmitter

var Code = require('code')
var Lab = require('lab')

var cloneClass = require('../index.js')

var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it
var expect = Code.expect

describe('clone-class', function () {
  it('it should clone a class, and the clone should work like the original', function (done) {
    var EventEmitterClone = cloneClass(EventEmitter)
    var ee = new EventEmitterClone()
    expect(ee).to.be.instanceOf(EventEmitter)
    ee.on('event', function () {
      done()
    })
    ee.emit('event')
  })
})
