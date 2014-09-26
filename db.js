var mongojs = require('mongojs')

var db = mongojs('userify')

exports.db = function() {
    return db
}
