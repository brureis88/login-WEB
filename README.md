# Sistema de Login

Uma aplicação web moderna para autenticação de usuários, construída com HTML, CSS, JavaScript, Express.js e MaterializeCSS. Consome APIs de autenticação através do Swagger.

## 🚀 Funcionalidades

- **Interface Moderna**: Design responsivo com MaterializeCSS
- **Sistema de Login**: Formulário de login com username e password
- **Sistema de Registro**: Formulário de registro de novos usuários
- **Validação de Formulários**: Validação em tempo real dos campos
- **Status da API**: Monitoramento em tempo real da conexão com a API
- **Mensagens de Feedback**: Respostas claras de sucesso ou erro
- **Persistência de Sessão**: Mantém o usuário logado usando localStorage
- **Integração Swagger**: Consome APIs de autenticação através do Swagger
- **Proxy de API**: Servidor proxy para evitar problemas de CORS

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- API rodando na porta 3000 com Swagger disponível em `/api-docs`

## 🛠️ Instalação

1. **Clone ou baixe o projeto**
   ```bash
   # Se estiver usando git
   git clone <url-do-repositorio>
   cd login_Web
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Certifique-se de que a API está rodando**
   - A API deve estar rodando na porta 3000
   - O Swagger deve estar disponível em `http://localhost:3000/api-docs`

## 🚀 Como Executar

### 1. Primeiro, inicie a API (porta 3000)
```bash
# Na pasta da sua API
npm start
# ou
node server.js
# ou qualquer comando que inicie sua API na porta 3000
```

### 2. Em seguida, inicie a aplicação web (porta 3001)

**Opção 1 - Usando npm:**
```bash
# Na pasta do projeto atual
npm start
```

**Opção 2 - Usando o script batch (Windows):**
```bash
# Clique duas vezes no arquivo start.bat
# ou execute no terminal:
start.bat
```

**Opção 3 - Modo desenvolvimento (com auto-reload):**
```bash
npm run dev
```

### 3. Acesse a aplicação
- **Aplicação Web**: http://localhost:3001
- **Swagger UI**: http://localhost:3000/api-docs

## 📁 Estrutura do Projeto

```
login_Web/
├── package.json          # Dependências e scripts
├── server.js             # Servidor Express.js
├── config.js             # Configurações da aplicação
├── start.bat             # Script de inicialização (Windows)
├── README.md             # Este arquivo
└── public/               # Arquivos estáticos
    ├── index.html        # Página principal
    ├── css/
    │   └── style.css     # Estilos personalizados
    └── js/
        └── app.js        # Lógica da aplicação
```

## 🎯 Como Usar

### 1. Verificar Status da API
- A aplicação automaticamente verifica se a API está conectada
- O status é exibido no topo da página

### 2. Fazer Login
1. Digite seu username e password
2. Clique no botão "Entrar"
3. Aguarde a resposta da API
4. Se bem-sucedido, você verá suas informações de usuário

### 3. Registrar Nova Conta
1. Clique em "Não tem conta? Registre-se"
2. Preencha todos os campos obrigatórios
3. Confirme sua senha
4. Clique em "Registrar"
5. Após o registro, faça login com suas credenciais

### 4. Logout
- Clique no botão "Sair" para fazer logout
- Sua sessão será encerrada e você voltará para a tela de login

## 🔧 Configuração

### Arquivo de Configuração
Todas as configurações estão centralizadas no arquivo `config.js`:

```javascript
module.exports = {
    PORT: 3001,                    // Porta da aplicação web
    API_BASE_URL: 'http://localhost:3000',  // URL da API
    SWAGGER_ENDPOINT: '/api-docs', // Endpoint do Swagger
    PROXY_TIMEOUT: 30000,          // Timeout das requisições (30s)
    MAX_HISTORY_ITEMS: 10,         // Máximo de itens no histórico
    CORS_OPTIONS: {                // Configurações de CORS
        origin: true,
        credentials: true
    }
};
```

### Alterar Porta da API
Se sua API não estiver na porta 3000, edite o arquivo `config.js`:

```javascript
API_BASE_URL: 'http://localhost:SUA_PORTA'
```

### Alterar Porta da Aplicação Web
Para mudar a porta da aplicação web, edite o arquivo `config.js`:

```javascript
PORT: SUA_PORTA
```

## 🛠️ Scripts Disponíveis

```bash
# Iniciar em modo produção
npm start

# Iniciar em modo desenvolvimento (com auto-reload)
npm run dev
```

## 🔍 Troubleshooting

### API não conecta
1. Verifique se a API está rodando na porta 3000
2. Confirme se o Swagger está disponível em `/api-docs`
3. Verifique se não há firewall bloqueando a conexão

### Erro de CORS
- A aplicação usa um proxy para evitar problemas de CORS
- Se ainda houver problemas, verifique as configurações da API

### Endpoints não carregam
- A aplicação tentará carregar do Swagger primeiro
- Se falhar, usará uma lista de endpoints padrão
- Verifique se o Swagger está acessível

## 📱 Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos**: Desktop, tablet e mobile (responsivo)
- **Sistemas**: Windows, macOS, Linux

## 🎨 Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework CSS**: MaterializeCSS
- **Backend**: Node.js, Express.js
- **HTTP Client**: Axios
- **Proxy**: Express.js proxy middleware

## 📄 Licença

Este projeto é para fins educacionais e de teste de software.

## 🤝 Contribuição

Para melhorias ou correções, sinta-se à vontade para contribuir!

---

**Desenvolvido para estudos de teste de software** 🧪 