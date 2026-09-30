async function verifyConnection(page) {

    console.log(
        '=> Verificando resultado da autenticação...'
    )


    const currentUrl = page.url()


    console.log(
        `=> URL atual: ${currentUrl}`
    )


    if (
        currentUrl.includes('claro.com.br')
    ) {

        console.log(
            '=> Redirecionamento para claro.com.br confirmado.'
        )

        return true
    }


    /*
     * Mesmo que o navegador não tenha terminado
     * exatamente em claro.com.br, fazemos um teste
     * real de Internet através do endpoint da Microsoft.
     */

    try {

        const response = await fetch(
            'http://www.msftconnecttest.com/connecttest.txt',
            {
                method: 'GET',
                signal: AbortSignal.timeout(8000)
            }
        )


        if (response.status === 200) {

            console.log(
                '=> Teste externo confirmou Internet.'
            )

            return true
        }

    } catch (error) {

        console.log(
            '=> Teste externo falhou.'
        )
    }


    return false
}


module.exports = {
    verifyConnection
}