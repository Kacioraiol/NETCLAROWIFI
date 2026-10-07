const puppeteer = require('puppeteer')
const { login } = require('./services/login')

const CHROME_PATH =
'/usr/bin/google-chrome'

async function setupBrowser(portalUrl) {

console.log('=> Iniciando Chrome...')

const headless =
    String(process.env.DEBUG_BROWSER).toLowerCase() !== 'true'
    // DEBUG_BROWSER=true no .env para ver as abas durante testes.
    // Por padrão (produção), roda headless e fecha sozinho.

const browser =
    await puppeteer.launch({

        headless,

        executablePath: CHROME_PATH,

        defaultViewport: null,

        args: [
            '--start-maximized'
        ]

    })


console.log('=> Criando nova aba...')


const page =
    await browser.newPage()


await page.setDefaultTimeout(
    20000
)


try {

    await login(
        page,
        portalUrl
    )

    console.log('=> Login concluído, fechando o navegador...')

    await browser.close()

    console.log('=> Navegador fechado.')


} catch (error) {

    console.error('')

    console.error(
        '=> Erro no Puppeteer:'
    )

    console.error(error)


    try {

        await page.screenshot({
            path: 'login-error.png',
            fullPage: true
        })

    } catch (screenshotError) {

        console.error('=> Falha ao salvar screenshot:', screenshotError.message)

    }


    console.log('=> Fechando o navegador após erro...')

    await browser.close()


    throw error

}

}

module.exports = {
setupBrowser
}