# NETCLAROWIFI

Automação de autenticação no **Claro Wi-Fi** utilizando Node.js e Puppeteer.

O NETCLAROWIFI automatiza o processo de identificação e autenticação no portal cativo do Claro Wi-Fi, permitindo que o usuário mantenha sua conexão autenticada sem precisar realizar manualmente todo o processo pelo navegador.

## 🚀 Sobre o projeto

O projeto foi desenvolvido para automatizar a conexão a redes públicas **Claro Wi-Fi** que utilizam um portal cativo para autenticação.

A aplicação utiliza o **Puppeteer** para controlar um navegador Chromium e executar o fluxo de autenticação automaticamente.

O fluxo envolve:

1. Acesso ao portal do Claro Wi-Fi;
2. Identificação da página de autenticação;
3. Preenchimento do CPF;
4. Seleção da opção de cliente Claro Residencial;
5. Preenchimento das credenciais;
6. Envio do formulário de autenticação;
7. Confirmação da conexão;
8. Monitoramento periódico da sessão.

## 🧩 Tecnologias

* [Node.js](https://nodejs.org/)
* [Puppeteer](https://pptr.dev/)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [Nodemon](https://www.npmjs.com/package/nodemon)

## 📋 Requisitos

Antes de executar o projeto, certifique-se de possuir:

* Node.js instalado v.22 ou superior
* npm v. 10.9 ou supeior
* Conexão com a rede `#Claro-WiFi`
* Credenciais válidas para autenticação no Claro Wi-Fi

Recomenda-se utilizar uma versão recente do Node.js.

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/kacioraiol/netclarowifi.git
```

Entre no diretório:

```bash
cd netclarowifi
```

Instale as dependências:

```bash
npm install
```

## 🔐 Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
CLARO_CPF=SEU_CPF
CLARO_EMAIL=SEU_EMAIL
CLARO_PASSWORD=SUA_SENHA

CLARO_PORTAL=https://www2.clarowifi.com.br/

FORCE_LOGIN=true
CHECK_INTERVAL=30
```

### Variáveis de ambiente

| Variável         | Descrição                                             |
| ---------------- | ----------------------------------------------------- |
| `CLARO_CPF`      | CPF utilizado na autenticação                         |
| `CLARO_EMAIL`    | E-mail/login utilizado no portal                      |
| `CLARO_PASSWORD` | Senha da conta                                        |
| `CLARO_PORTAL`   | URL inicial do portal Claro Wi-Fi                     |
| `FORCE_LOGIN`    | Define se a aplicação deve forçar o processo de login |
| `CHECK_INTERVAL` | Intervalo, em segundos, para verificação da conexão   |

> ⚠️ **Nunca publique seu arquivo `.env` no GitHub.**

Adicione `.env` ao `.gitignore`:

```gitignore
.env
node_modules/
```

Você pode disponibilizar um arquivo `.env.example` para facilitar a configuração:

```env
CLARO_CPF=
CLARO_EMAIL=
CLARO_PASSWORD=

CLARO_PORTAL=https://www2.clarowifi.com.br/

FORCE_LOGIN=true
CHECK_INTERVAL=30
```

## ▶️ Executando

Para iniciar a aplicação:

```bash
npm start
```

Durante o desenvolvimento, é possível utilizar o Nodemon:

```bash
npm run dev
```

O Puppeteer iniciará o navegador e realizará automaticamente o fluxo de autenticação configurado.

## 🔄 Funcionamento

O funcionamento básico da aplicação pode ser representado da seguinte forma:

```text
┌──────────────────┐
│    #Claro-WiFi   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Portal Cativo   │
│  Claro Wi-Fi     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    Puppeteer     │
│                  │
│  CPF             │
│  ↓               │
│  Cliente Claro   │
│  ↓               │
│  Login           │
│  ↓               │
│  Autenticação    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Internet liberada│
└──────────────────┘
```

Após a autenticação, a aplicação realiza verificações periódicas para acompanhar o estado da sessão.

## ⚙️ Scripts disponíveis

### Produção

```bash
npm start
```

Executa:

```bash
node index.js
```

### Desenvolvimento

```bash
npm run dev
```

Executa a aplicação através do Nodemon:

```bash
nodemon index.js
```

O Nodemon reinicia automaticamente a aplicação quando arquivos do projeto são modificados.

## 📁 Estrutura

A estrutura básica do projeto é:

```text
netclarowifi/
├── index.js
├── package.json
├── package-lock.json
├── .env
├── .env.example
├── .gitignore
└── README.md
```

> A estrutura pode variar conforme a versão do projeto.

## 🔒 Segurança

O projeto utiliza informações sensíveis para realizar a autenticação.

**Não envie para o GitHub:**

* CPF;
* E-mail;
* Senha;
* Tokens;
* Cookies de sessão;
* Arquivos de configuração contendo credenciais.

Utilize variáveis de ambiente através do arquivo `.env`.

O repositório deve conter somente o `.env.example`, sem dados reais.

## ⚠️ Aviso

Este projeto foi desenvolvido para fins de **automação e aprendizado**.

O funcionamento depende da estrutura e dos mecanismos de autenticação utilizados pelo portal Claro Wi-Fi. Alterações realizadas pela operadora no portal, endpoints, formulários ou fluxo de autenticação podem fazer com que a automação deixe de funcionar.

Utilize o projeto somente com uma conta e uma conexão para as quais você tenha autorização de acesso.

## 🛠️ Desenvolvimento

O projeto utiliza:

```text
Node.js
   │
   ├── Puppeteer
   │      └── Automação do navegador
   │
   ├── dotenv
   │      └── Configuração através de variáveis de ambiente
   │
   └── Nodemon
          └── Desenvolvimento
```

## 📌 Status

**Versão atual:** `2.1.0`

O projeto encontra-se em desenvolvimento e pode receber alterações conforme mudanças no portal de autenticação do Claro Wi-Fi.


### Autor

**Kacio Raiol**

Projeto desenvolvido para automação de autenticação no Claro Wi-Fi utilizando Node.js e Puppeteer.
