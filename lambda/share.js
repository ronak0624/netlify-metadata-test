const fs = require('fs')
const path = require('path')

exports.handler = async function (event, context) {
    var { headers, path } = event;
    let agent = headers["user-agent"];
    var title;
    if(path) {
        title = path.split("/.netlify/functions/share")[1].split("/").join(" ").trim()
    }

    console.log(title)
    console.log(agent)

    let message =
        `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <title><${title}</title>
                    <meta name="title" content="${title}">
                    <meta name="description" content="Dynamically created">

                    <meta property="og:type" content="website">
                    <meta property="og:url" content='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Logo.KrispyKreme.svg/1024px-Logo.KrispyKreme.svg.png'>
                    <meta property="og:title" content="${title}">
                    <meta property="og:description" content="Dynamically created">
                    <meta property="og:image" content="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Logo.KrispyKreme.svg/1024px-Logo.KrispyKreme.svg.png">
                </head>
            </html>
        `
    return {
        statusCode: 200,
        body: message
    };
}