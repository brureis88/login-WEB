# Exemplos de Uso - Sistema de Login

Este arquivo contém exemplos práticos de como usar o sistema de login e os endpoints de autenticação.

## 🚀 Endpoints de Autenticação

### 1. Login de Usuário

#### POST - /api/auth/login
**Descrição**: Realizar login de usuário

**Corpo da Requisição**:
```json
{
  "username": "usuario123",
  "password": "senha123"
}
```

**Resposta de Sucesso (200)**:
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "username": "usuario123"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Resposta de Erro (401)**:
```json
{
  "success": false,
  "message": "Credenciais inválidas",
  "error": "Invalid credentials"
}
```

### 2. Registro de Usuário

#### POST - /api/auth/register
**Descrição**: Registrar novo usuário

**Corpo da Requisição**:
```json
{
  "name": "Maria Santos",
  "email": "maria@email.com",
  "username": "maria123",
  "password": "senha123"
}
```

**Resposta de Sucesso (201)**:
```json
{
  "success": true,
  "message": "Usuário registrado com sucesso",
  "user": {
    "id": 2,
    "name": "Maria Santos",
    "email": "maria@email.com",
    "username": "maria123"
  }
}
```

**Resposta de Erro (400)**:
```json
{
  "success": false,
  "message": "Username já existe",
  "error": "Username already exists"
}
```

### 3. Logout de Usuário

#### POST - /api/auth/logout
**Descrição**: Realizar logout do usuário

**Corpo da Requisição**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Resposta de Sucesso (200)**:
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

## 🔍 Cenários de Teste

### 1. Login com Credenciais Válidas
1. Acesse a aplicação em http://localhost:3001
2. Digite um username válido
3. Digite a password correta
4. Clique em "Entrar"
5. **Resultado Esperado**: Login bem-sucedido, exibição das informações do usuário

### 2. Login com Credenciais Inválidas
1. Digite um username que não existe
2. Digite uma password incorreta
3. Clique em "Entrar"
4. **Resultado Esperado**: Mensagem de erro "Credenciais inválidas"

### 3. Registro de Novo Usuário
1. Clique em "Não tem conta? Registre-se"
2. Preencha todos os campos:
   - Nome: "Teste Usuário"
   - Email: "teste@email.com"
   - Username: "teste123"
   - Password: "senha123"
   - Confirmar Password: "senha123"
3. Clique em "Registrar"
4. **Resultado Esperado**: Registro bem-sucedido, redirecionamento para login

### 4. Validação de Senhas
1. No formulário de registro, digite senhas diferentes
2. **Resultado Esperado**: Campo de confirmação fica vermelho, mensagem de erro

### 5. Logout
1. Após fazer login, clique em "Sair"
2. **Resultado Esperado**: Logout realizado, retorno para tela de login

## 🛠️ Exemplos de Configuração da API

### Estrutura Esperada da API

A API deve ter os seguintes endpoints configurados:

```javascript
// Exemplo de estrutura esperada
{
  "paths": {
    "/auth/login": {
      "post": {
        "summary": "Realizar login",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "password": { "type": "string" }
                }
              }
            }
          }
        }
      }
    },
    "/auth/register": {
      "post": {
        "summary": "Registrar usuário",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "email": { "type": "string" },
                  "username": { "type": "string" },
                  "password": { "type": "string" }
                }
              }
            }
          }
        }
      }
    },
    "/auth/logout": {
      "post": {
        "summary": "Realizar logout"
      }
    }
  }
}
```

### Respostas Esperadas

#### Formato de Sucesso
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "user": {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "email@exemplo.com",
    "username": "username"
  }
}
```

#### Formato de Erro
```json
{
  "success": false,
  "message": "Descrição do erro",
  "error": "Código do erro"
}
```

## 📊 Testes no Console

Você pode testar os endpoints diretamente no console do navegador:

```javascript
// Teste de login
testLogin('usuario123', 'senha123');

// Teste de registro
fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Teste',
    email: 'teste@email.com',
    username: 'teste123',
    password: 'senha123'
  })
}).then(r => r.json()).then(console.log);
```

## 🎯 Fluxo de Teste Recomendado

1. **Verificar Status da API**: Confirme que a API está conectada
2. **Teste de Registro**: Registre um novo usuário
3. **Teste de Login**: Faça login com as credenciais criadas
4. **Verificar Informações**: Confirme que as informações do usuário são exibidas
5. **Teste de Logout**: Faça logout e confirme o retorno para a tela de login
6. **Teste de Credenciais Inválidas**: Tente fazer login com dados incorretos
7. **Teste de Validação**: Teste a validação de senhas no registro

## 🔧 Troubleshooting

### Problemas Comuns

1. **API não conecta**
   - Verifique se a API está rodando na porta 3000
   - Confirme se o Swagger está disponível em `/api-docs`

2. **Login não funciona**
   - Verifique se o endpoint `/api/auth/login` existe na API
   - Confirme se o formato dos dados está correto

3. **Registro não funciona**
   - Verifique se o endpoint `/api/auth/register` existe na API
   - Confirme se todos os campos obrigatórios estão sendo enviados

4. **Mensagens de erro não aparecem**
   - Verifique se a API está retornando o formato esperado
   - Confirme se o proxy está funcionando corretamente

### Logs Úteis

No console do navegador, você pode ver:
- Requisições sendo feitas
- Respostas da API
- Erros de conexão
- Validações de formulário

---

**Dica**: Use o Swagger UI em http://localhost:3000/api-docs para testar os endpoints diretamente na API! 🚀 