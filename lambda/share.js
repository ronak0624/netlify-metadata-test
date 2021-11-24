const axios = require('axios')

const DESCRIPTION = 'Speakeasy: AI Powered Speech Coach'
const RECORDING_API_ROUTE = 'https://us-central1-yoodli-web.cloudfunctions.net/api/videoRecording/'
const INVALID_LINK_TITLE = 'Invalid Link - 404 Error'
const SPEAKEASY_VIDEO_PREFIX = 'https://projectspeakeasy.com/app/journal'

exports.handler = async function (event, context) {
    var { headers, path } = event;
    var agent = headers["user-agent"];
    var query = path.split("/.netlify/functions/share/")[1].split("/");

    // If there is a query attached to the function call
    if (query.length > 1) {
        let speakeasyURL = `${SPEAKEASY_VIDEO_PREFIX}/${query.join("/")}`

        // Check if user-agent is a bot, if so, request video information from server, else 
        if (agent.includes("+http")) {
            console.log(query)

            const speechUserId = query[1]
            const videoRecordingId = query[2]
            const customHeaders = {
                'Content-Type': 'application/json',
                'Recorded-By-Id': `${speechUserId}`,
            }

            axios.get(`${RECORDING_API_ROUTE}${videoRecordingId}`, {
                headers: customHeaders
            })
                .then((result) => {
                    var title = result.name

                    console.log(result)

                    let message =
                        `
                    <!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <!-- Primary Meta Tags -->
                            <title>${title}</title>
                            <meta name="title" content="${title}">
                            <meta name="description" content="${DESCRIPTION}">

                            <!-- Open Graph / Facebook -->
                            <meta property="og:type" content="website">
                            <meta property="og:url" content="${speakeasyURL}">
                            <meta property="og:title" content="${title}">
                            <meta property="og:description" content="${DESCRIPTION}">

                            <!-- Twitter -->
                            <meta property="twitter:url" content="${speakeasyURL}">
                            <meta property="twitter:title" content="${title}">
                            <meta property="twitter:description" content="${DESCRIPTION}">
                        </head>
                    </html>
                `
                    return {
                        statusCode: 200,
                        body: message
                    };
                }).catch(err => {
                    console.log(err)
                    return {
                        statusCode: 500,
                        body: err
                    }
                })
        } else {
            return {
                statusCode: 302,
                headers: {
                    Location: speakeasyURL
                }
            }
        }
    } else {
        return {
            statusCode: 404,
            body:  `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <!-- Primary Meta Tags -->
                        <title>${INVALID_LINK_TITLE}</title>
                        <meta name="title" content="${INVALID_LINK_TITLE}">
                        <meta name="description" content="Link is invalid">

                        <!-- Open Graph / Facebook -->
                        <meta property="og:type" content="website">
                        <meta property="og:url" content="https://projectspeakeasy.com/">
                        <meta property="og:title" content="${INVALID_LINK_TITLE}">
                        <meta property="og:description" content="Link is invalid">

                        <!-- Twitter -->
                        <meta property="twitter:url" content="https://projectspeakeasy.com/">
                        <meta property="twitter:title" content="${INVALID_LINK_TITLE}">
                        <meta property="twitter:description" content="Link is invalid">
                    </head>
                </html>
            `
        }
    }
}

