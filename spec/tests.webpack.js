'use strict'

var context = require.context('.', true, /.client.spec\.js$/)
context.keys().forEach(context)
