const { verifyConnection } = require('./verify')
const { detectPortalUrl } = require('../../detect-portal-url')

async function login(page) {

console.log('=> Abrindo portal Claro Wi-Fi...')


/*
 * Detecta a URL dinâmica atual da Claro.
 *
 * Essa URL contém os dados da sessão atual,
 * incluindo user_id e AP.
 */

const portalUrl = await detectPortalUrl()


if (!portalUrl) {

    throw new Error(
        'Não foi possível detectar o portal Claro Wi-Fi.'
    )

}


console.log('')
console.log('=> Portal detectado!')
console.log(`=> URL do portal: ${portalUrl}`)
console.log('=> Abrindo URL dinâmica do portal...')
console.log('')


/*
 * Não usamos networkidle0/networkidle2 aqui.
 *
 * O portal da Claro pode manter conexões abertas
 * e isso fazia o Puppeteer esperar até atingir timeout.
 *
 * domcontentloaded é suficiente para começarmos
 * a procurar os elementos do formulário.
 */

try {

    await page.goto(
        portalUrl,
        {
            waitUntil: 'domcontentloaded',
            timeout: 15000
        }
    )

} catch (error) {

    /*
     * Se o timeout acontecer, verificamos se a página
     * chegou a carregar mesmo assim.
     *
     * Em captive portals isso pode acontecer porque
     * existem requisições que continuam abertas.
     */

    if (
        error.name === 'TimeoutError'
    ) {

        console.log(
            '=> Aviso: carregamento demorou mais que o esperado.'
        )

        console.log(
            '=> Verificando se o portal já está disponível...'
        )

    } else {

        throw error

    }

}


console.log(
    `=> URL atual: ${page.url()}`
)


/*
 * PARTE 1
 * CPF
 */

console.log(
    '=> Aguardando campo CPF...'
)


await page.waitForSelector(
    '#cp-cpf',
    {
        visible: true,
        timeout: 30000
    }
)


console.log(
    '=> Campo CPF encontrado.'
)


console.log(
    '=> Preenchendo CPF...'
)


await page.click(
    '#cp-cpf'
)


await page.type(
    '#cp-cpf',
    process.env.CLARO_CPF,
    {
        delay: 60
    }
)


console.log(
    '=> Clicando em CONTINUAR...'
)


await page.click(
    '#cp-document-submit'
)


/*
 * PARTE 2
 * CLIENTE RESIDENCIAL
 */

console.log(
    '=> Aguardando opção Claro Residencial...'
)


await page.waitForSelector(
    '#cp-ad-residential-btn',
    {
        visible: true,
        timeout: 30000
    }
)


console.log(
    '=> Selecionando Claro Residencial...'
)


await page.click(
    '#cp-ad-residential-btn'
)


/*
 * PARTE 3
 * LOGIN
 */

console.log(
    '=> Aguardando formulário de autenticação...'
)


await page.waitForSelector(
    '#cp-username',
    {
        visible: true,
        timeout: 30000
    }
)


await page.waitForSelector(
    '#cp-password',
    {
        visible: true,
        timeout: 30000
    }
)


console.log(
    '=> Formulário de autenticação encontrado.'
)


console.log(
    '=> Preenchendo e-mail...'
)


await page.click(
    '#cp-username'
)


await page.type(
    '#cp-username',
    process.env.CLARO_EMAIL,
    {
        delay: 60
    }
)


console.log(
    '=> Preenchendo senha...'
)


await page.click(
    '#cp-password'
)


await page.type(
    '#cp-password',
    process.env.CLARO_PASSWORD,
    {
        delay: 60
    }
)


console.log(
    '=> Clicando em ENTRAR...'
)


await page.click(
    '#cp-auth-submit'
)


/*
 * PARTE 4
 * NAVEGAR
 */

console.log(
    '=> Aguardando botão NAVEGAR...'
)


await page.waitForSelector(
    'button.cp-btn.cp-btn-primary.cp-connected__btn',
    {
        visible: true,
        timeout: 30000
    }
)


console.log(
    '=> Botão NAVEGAR encontrado.'
)


console.log(
    '=> Liberando conexão...'
)


await page.click(
    'button.cp-btn.cp-btn-primary.cp-connected__btn'
)


/*
 * Aguarda a Claro concluir a liberação.
 */

await new Promise(
    resolve => setTimeout(resolve, 5000)
)


console.log(
    `=> URL após NAVEGAR: ${page.url()}`
)


/*
 * VERIFICAÇÃO
 */

const connected =
    await verifyConnection(page)


if (!connected) {

    throw new Error(
        'Não foi possível confirmar a liberação da Internet.'
    )

}


console.log('')
console.log(
    '========================================'
)
console.log(
    '       LOGIN REALIZADO COM SUCESSO!'
)
console.log(
    '========================================'
)
console.log('')

}

module.exports = {
login
}