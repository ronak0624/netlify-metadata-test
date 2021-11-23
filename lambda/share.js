const fs = require('fs')
const path = require('path')

exports.handler = async function (event, context) {
    var { headers, path } = event;
    var agent = headers["user-agent"];
    var title;
    var query = path.split("/.netlify/functions/share")[1].split("/");

    if(agent.includes("+http")) {
        var title;
        if(path) {
            title = query.join(" ").trim()
        }
    
        console.log(title)
        console.log(agent)
    
        let message =
            `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <title>${title}</title>
                        <meta name="title" content="${title}">
                        <meta name="description" content="Dynamically created">
    
                        <meta property="og:type" content="website">
                        <meta property="og:title" content="${title}">
                        <meta property="og:description" content="Dynamically created">
                    </head>
                </html>
            `
        return {
            statusCode: 200,
            body: message
        };
    } else {
        return {
            statusCode: 302,
            headers: {
                Location: `https://projectspeakeasy.com/app/journal${query.join("/")}`
            }
        }
    }
}