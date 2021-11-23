

exports.handler = async function (event, context) {
    var { headers, path } = event;
    var agent = headers["user-agent"];
    var title;
    var description = 'Speakeasy: AI Powered Speech Coach'
    var query = path.split("/.netlify/functions/share")[1].split("/");
    if (query) {
        let speakeasyURL = `https://projectspeakeasy.com/app/journal${query.join("/")}`

        if (agent.includes("+http")) {
            var title = `VIDEO ID: ${query[0]}`

            console.log(title)
            console.log(agent)

            let message =
                `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <!-- Primary Meta Tags -->
                        <title>${title}</title>
                        <meta name="title" content="${title}">
                        <meta name="description" content="${description}">

                        <!-- Open Graph / Facebook -->
                        <meta property="og:type" content="website">
                        <meta property="og:url" content="${speakeasyURL}">
                        <meta property="og:title" content="${title}">
                        <meta property="og:description" content="${description}">

                        <!-- Twitter -->
                        <meta property="twitter:url" content="${speakeasyURL}">
                        <meta property="twitter:title" content="${title}">
                        <meta property="twitter:description" content="${description}">
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
                    Location: speakeasyURL
                }
            }
        }
    }
}