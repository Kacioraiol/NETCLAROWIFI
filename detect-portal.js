const http = require('http');

const options = {
    hostname: 'www.msftconnecttest.com',
    path: '/connecttest.txt',
    method: 'GET',
    timeout: 10000
};

console.log('=> Testando conexão...');

const req = http.request(options, (res) => {
    console.log('=> Status:', res.statusCode);
    console.log('=> Location:', res.headers.location || 'Nenhum redirecionamento');

    if (res.headers.location) {
        console.log('\n=> PORTAL DETECTADO!');
        console.log(res.headers.location);
    } else {
        console.log('\n=> Não houve redirecionamento.');
        console.log('=> A conexão provavelmente está liberada.');
    }

    res.resume();
});

req.on('timeout', () => {
    console.log('=> Timeout na conexão.');
    req.destroy();
});

req.on('error', (err) => {
    console.error('=> Erro:', err.message);
});

req.end();
