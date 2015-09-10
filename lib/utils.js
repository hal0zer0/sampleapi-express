//var iso8601 = require('node-iso8601')

module.exports = {
    sendResource: sendResource,
    sendCollection: sendCollection,
    sendError: sendError,
    validateBodyParams: validateBodyParams
}

function sendResource(req, res, data) {
    data = formatResource(req, data)
    //data.timestamp = iso8601(Date().toString())

    res.send(data)
}

function formatResource(req, resource) {
    // bad hack to check if ID is already in URL.  It's ugly.  fix it.
    var url = req.originalUrl
    if (url.length < 25) {
        url = url + "/" + resource._id
    }
    resource.set( "href", url, { strict: false });

    var d = new Date()
    resource.set("timestamp", d.toISOString(), { strict: false })
    resource.__v = undefined
    return resource
}

function sendCollection(req, res, data) {
    for (item of data) {
        item = formatResource(req, item)
    }

    var obj = {
            href: req.originalUrl,
            items: data
        }
    res.send(obj)
}

function sendError(res, err) {
    res.send({status: "ERROR", message: err.message})
}

function validateBodyParams(req, res, expectedParams) {

    // First check that all expected parameters are present
    for (param of expectedParams) {
        var name = param[0]
        if (!req.body[name]) {
            res.send({status: "error",
                      message: "Missing required argument: " + name})
        }
    }

    // Now check types.  This is done in a different loop than above because
    // it's got different error conditions/responses
    for (param of expectedParams)
       var name = param[0]
       var ptype = param[1]
       if (typeof(req.body[name] != ptype)) {
           // Numbers come in as strings, so need a special check to make
           // sure they cast correctly
           if (ptype != "number" || isNaN(Number(req.body[name]))) {
               res.send({status: "error", message: "Invalid argument type for parameter: " + name})
           }
       }
    // The FOR loop has completed without sending an error
    return true
}
