describe('Testes de Login - Sistema de Autenticação', () => {
    
    beforeEach(() => {
        cy.visit('/')
    })

    it('Deve rejeitar login com senha incorreta', () => {
        cy.get('#username').type('usuario1')
        cy.get('#password').type('senha_invalida')
        cy.get('#login-btn').click()
        cy.contains('Usuário ou senha inválidos').should('be.visible')
    })

    it('Deve rejeitar login com usuário inexistente', () => {
        cy.get('#username').type('usuario_inexistente')
        cy.get('#password').type('senha123')
        cy.get('#login-btn').click()
        cy.contains('Usuário ou senha inválidos').should('be.visible')
    })

    it('Deve fazer login com credenciais válida', () => {
        cy.get('#username').type('usuario1')
        cy.get('#password').type('senha123')
        cy.get('#login-btn').click()
        cy.contains('Login Realizado com Sucesso!').should('be.visible')
    })

    it('Deve rejeitar login com campos obrigatórios ausentes', () => {
        cy.get('#login-btn').click()
        cy.get('#username').focus().blur() // dispara validação nativa
        cy.get('#username').then(($input) => {
            expect($input[0].validationMessage).to.eq('Preencha este campo.')
        })
    })

    it('Deve rejeitar a solicitação de redefinição de senha com usuário inexistente', () => {
        cy.get('#show-forgot-password').click()
        cy.get('#reset-username').type('usuario_inexistente')
        cy.get('#reset-btn').click()
        cy.contains('Usuário não encontrado.').should('be.visible')
    })

    it('Deve fazer a solicitação de redefinição de senha com usuário válido', () => {
        cy.get('#show-forgot-password').click()
        cy.get('#reset-username').type('usuario1')
        cy.get('#reset-btn').click()
        cy.contains('Código de redefinição enviado para o e-mail cadastrado').should('be.visible')
    })

    it('Deve bloquear usuário após 3 tentativas de senha inválida', () => {
        for (let i = 0; i < 3; i++) {
            cy.get('#username').clear().type('usuario1')
            cy.get('#password').clear().type('senha_invalida')
            cy.get('#login-btn').click()
        }
        cy.contains('Usuário bloqueado por tentativas inválidas').should('be.visible')
    })

    after(() => {
        cy.request('POST', 'http://localhost:3000/solicitar-redefinicao', { username: 'usuario1' }).then((response) => {
            expect(response.status).to.eq(200)
            cy.wrap(response.body.codigo).as('codigoRedefinicao')
        })

        cy.get('@codigoRedefinicao').then((codigo) => {
            cy.request('POST', 'http://localhost:3000/validar-codigo', { username: 'usuario1', codigo: codigo }).then((response) => {
                expect(response.status).to.eq(200)
            })

            cy.request('POST', 'http://localhost:3000/redefinir-senha', { username: 'usuario1', codigo: codigo, novaSenha: 'senha123' }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.mensagem).to.eq('Senha redefinida com sucesso!')
            })
        })
    })

})
