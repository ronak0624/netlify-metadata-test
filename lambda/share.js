const fs = require('fs')
const path = require('path')

exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: fs, status: "AYO"})
    };
}