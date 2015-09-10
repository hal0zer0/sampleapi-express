var mongoose = require("mongoose")

var schema = mongoose.Schema({
    name: {
        type: String,
        required: '{PATH} is required'},
    description: {
        type: String,
        required: '{PATH} is required'},
    number: Number
})

module.exports = mongoose.model("Widget", schema)
