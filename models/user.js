var mongoose = require('mongoose');

module.exports = mongoose.model('User', mongoose.Schema({
    username: {type:String, unique:true}, // TODO. make these required
    password: String, // todo hash
    created: {type:Date, default:Date.now},
    updated: {type:Date, default:Date.now}
}))
