# 🚀 Como Rodar o Backend

Este backend foi desenvolvido em **Node.js** e utiliza **MongoDB** para persistência dos dados.  

## 📌 **Pré-requisitos**
Antes de rodar a aplicação, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (versão 16+ recomendada)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (caso opte por um banco local)
- [Docker](https://www.docker.com/) (opcional, para rodar um container do banco)

## ⚙️ **Instalação**
1️⃣ **Clone o repositório** e navegue até a pasta do projeto:
- git clone (https://github.com/Popotomimi/GrupoMacroBackEnd)
- cd grupomacrobackend

2️⃣ Instale as dependências

- npm install ou yarn install

3️⃣ Configure as variáveis de ambiente: Crie um arquivo .env na raiz do projeto e adicione suas credenciais:

- DB_USER=seu_usuario
- DB_PASSWORD=sua_senha
- PORT=8000

(Enviei os acessos pelo e-mail por questão de segurança).

▶️ Rodando a aplicação
Modo desenvolvimento
Para iniciar o servidor, execute:

- npm run nodemon

Rodando testes
A aplicação possui testes unitários. Para executá-los:

- npm test
