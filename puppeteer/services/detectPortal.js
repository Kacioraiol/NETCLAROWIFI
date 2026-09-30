const http = require('http')

const TEST_URL =
    'http://www.msftconnecttest.com/connecttest.txt'


async function detectPortal() {

    console.log('=> Detectando portal Claro Wi-Fi...')

    return new Promise((resolve, reject) => {

        const request = http.get(
            TEST_URL,
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0'
                }
            },
            response => {

                const location =
                    response.headers.location

                console.log(
                    `=> Status HTTP: ${response.statusCode}`
                )

                if (
                    response.statusCode >= 300 &&
                    response.statusCode < 400 &&
                    location
                ) {

                    console.log(
                        '=> Portal detectado!'
                    )

                    console.log(
                        `=> URL do portal: ${location}`
                    )

                    response.resume()

                    resolve(location)

                    return
                }

                response.resume()

                resolve(null)
            }
        )


        request.setTimeout(10000, () => {

            request.destroy(
                new Error(
                    'Timeout ao detectar portal.'
                )
            )

        })


        request.on('error', error => {

            reject(error)

        })

    })
}


module.exports = {
    detectPortal
}
