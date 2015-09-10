var mongoose = require("mongoose")

var schema = mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    number: Number,
    tags: [{ tagname: String}],
})

module.exports = mongoose.model("Widget", schema)
