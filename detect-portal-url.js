const http = require('http')

const TEST_URL =
'http://www.msftconnecttest.com/connecttest.txt'

function detectPortalUrl() {

return new Promise((resolve, reject) => {

    console.log('=> Detectando portal Claro Wi-Fi...')
    console.log(`=> URL de teste: ${TEST_URL}`)
    console.log('')


    const request = http.get(
        TEST_URL,
        {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        },
        response => {

            console.log(
                `=> Status HTTP: ${response.statusCode}`
            )

            console.log(
                `=> Location: ${
                    response.headers.location ||
                    'não informado'
                }`
            )

            console.log('')


            if (
                response.statusCode >= 300 &&
                response.statusCode < 400 &&
                response.headers.location
            ) {

                const portalUrl =
                    response.headers.location


                console.log(
                    '=> REDIRECIONAMENTO DETECTADO!'
                )

                console.log('')

                console.log(
                    'URL do portal:'
                )

                console.log(
                    portalUrl
                )

                response.resume()

                resolve(portalUrl)

                return
            }


            response.resume()

            resolve(null)

        }
    )


    request.setTimeout(10000, () => {

        request.destroy()

        reject(
            new Error(
                'Timeout ao tentar detectar o portal.'
            )
        )

    })


    request.on('error', error => {

        reject(error)

    })

})

}

/*

* Exporta a função para o restante do projeto.
  */

module.exports = {
detectPortalUrl
}

/*

* Permite continuar executando este arquivo
* diretamente pelo terminal:
* 
* node detect-portal-url.js
  */

if (
require.main === module
) {

detectPortalUrl()
    .then(url => {

        console.log('')

        if (url) {

            console.log(
                '=> PORTAL DETECTADO COM SUCESSO!'
            )

        } else {

            console.log(
                '=> Nenhum portal detectado.'
            )

        }

    })
    .catch(error => {

        console.error(
            '=> Erro:',
            error.message
        )

        process.exitCode = 1

    })

}