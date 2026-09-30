require('dotenv').config()

const { monitor } = require('./monitor')

async function boot() {

try {

    console.log('====================================')
    console.log('   CLARO WIFI - AUTO LOGIN')
    console.log('====================================')
    console.log('')

    await monitor()

} catch (error) {

    console.error('Erro fatal:', error)

}

}

boot()