const { setupBrowser } = require('./puppeteer/browser')

const TEST_URL =
'http://www.msftconnecttest.com/connecttest.txt'

let loginRunning = false

async function checkInternet() {

try {

    const controller = new AbortController()

    const timeout = setTimeout(() => {
        controller.abort()
    }, 8000)


    const response = await fetch(
        TEST_URL,
        {
            method: 'GET',
            redirect: 'manual',
            signal: controller.signal
        }
    )


    clearTimeout(timeout)


    console.log(
        `=> Teste de Internet: HTTP ${response.status}`
    )


    /*
     * INTERNET LIBERADA
     */

    if (response.status === 200) {

        return {
            connected: true,
            captivePortal: false
        }

    }


    /*
     * CAPTIVE PORTAL
     */

    if (
        response.status >= 300 &&
        response.status < 400
    ) {

        const location =
            response.headers.get('location')


        console.log(
            `=> Redirecionamento detectado: ${location}`
        )


        return {
            connected: false,
            captivePortal: true,
            portalUrl: location
        }

    }


    return {
        connected: false,
        captivePortal: false
    }


} catch (error) {

    console.log(
        `=> Falha no teste de Internet: ${error.message}`
    )


    return {
        connected: false,
        captivePortal: false
    }

}

}

async function performLogin(portalUrl) {

if (loginRunning) {

    console.log(
        '=> Login já está em andamento.'
    )

    return

}


loginRunning = true


try {

    console.log('')

    console.log(
        '========================================'
    )

    console.log(
        '      INICIANDO AUTENTICACAO'
    )

    console.log(
        '========================================'
    )

    console.log('')


    await setupBrowser(portalUrl)


} catch (error) {

    console.error('')

    console.error(
        '=> Erro durante login:'
    )

    console.error(error)


} finally {

    loginRunning = false

}

}

async function monitor() {

/*
 * MODO DE TESTE
 */

if (
    String(process.env.FORCE_LOGIN).toLowerCase()
    === 'true'
) {

    console.log(
        '=> FORCE_LOGIN está ativado.'
    )

    console.log(
        '=> Detectando portal automaticamente...'
    )


    const result =
        await checkInternet()


    if (result.portalUrl) {

        await performLogin(
            result.portalUrl
        )

    } else {

        console.log(
            '=> Não foi possível obter a URL do portal.'
        )

    }


    return

}


/*
 * MODO NORMAL
 */

console.log(
    '=> Monitoramento iniciado.'
)

console.log(
    '=> Verificando conexão...'
)


const interval =
    Number(
        process.env.CHECK_INTERVAL || 30
    ) * 1000


async function check() {

    const result =
        await checkInternet()


    if (result.connected) {

        console.log(
            '=> INTERNET OK.'
        )

    }


    else if (
        result.captivePortal
    ) {

        console.log('')

        console.log(
            '=> CAPTIVE PORTAL DETECTADO!'
        )

        console.log(
            '=> Autenticação necessária.'
        )


        if (result.portalUrl) {

            await performLogin(
                result.portalUrl
            )

        } else {

            console.log(
                '=> Portal detectado, mas sem URL de redirecionamento.'
            )

        }

    }


    else {

        console.log(
            '=> Internet indisponível ou falha temporária.'
        )

    }

}


await check()


setInterval(
    check,
    interval
)

}

module.exports = {
monitor
}