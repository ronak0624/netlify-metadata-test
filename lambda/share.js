const fs = require('fs')
const path = require('path')

exports.handler = async function (event, context) {
    console.log(event)
    console.log(context)
    console.log(path.join(__dirname))
    
    return {
        statusCode: 200,
        body: JSON.stringify({ status: "AYO"})
    };
}