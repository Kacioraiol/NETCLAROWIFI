const puppeteer = require('puppeteer')
const { login } = require('./services/login')

const CHROME_PATH =
'/usr/bin/google-chrome'

async function setupBrowser(portalUrl) {

console.log('=> Iniciando Chrome...')


const browser =
    await puppeteer.launch({

        headless: false,

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


} catch (error) {

    console.error('')

    console.error(
        '=> Erro no Puppeteer:'
    )

    console.error(error)


    await page.screenshot({

        path: 'login-error.png',

        fullPage: true

    })


    throw error

}


return browser

}

module.exports = {
setupBrowser
}