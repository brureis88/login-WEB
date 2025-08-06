# Testes End-to-End com Cypress

Este diretório contém a estrutura de testes automatizados para a aplicação Login-WEB utilizando Cypress.

## Estrutura de Pastas

- **e2e/**: Cenários de testes end-to-end (E2E), por exemplo, `login.cy.js`.
- **support/**: Arquivos de suporte e comandos customizados para Cypress.
  - **commands/**: Comandos customizados, como login e redefinição de senha.
  - **e2e.js**: Arquivo para configuração global dos testes E2E.
- **fixtures/** (se existir): Dados estáticos para uso nos testes.
- **README.md**: Documentação dos testes Cypress.

## Configuração

- O arquivo `cypress.config.js` está na raiz do projeto e define a baseUrl: `http://localhost:3001/`.
- Cypress versão utilizada: **14.5.1**.

## Como executar os testes

1. Instale as dependências do projeto:
   ```bash
   npm install
   ```
2. Execute a aplicação Login-WEB localmente (porta 3001).
3. Execute o Cypress:
   ```bash
   npx cypress open
   ```
   ou
   ```bash
   npx cypress run
   ```

## Comandos customizados

Veja exemplos em `support/commands/login.js` para facilitar a escrita dos cenários.

## Observações
- Os testes validam mensagens exibidas na tela, tentativas de login, bloqueio de usuário e redefinição de senha.
- Adapte os comandos e cenários conforme regras de negócio e mensagens exibidas pela aplicação.
