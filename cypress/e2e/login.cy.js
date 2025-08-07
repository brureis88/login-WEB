describe('Testes de Login - Sistema de Autenticação', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('Deve rejeitar login com senha incorreta', () => {
        cy.fazerLoginComSenhaInvalida(1)
        cy.validarMensagem('Usuário ou senha inválidos.')
    })

    it('Deve rejeitar login com usuário inexistente', () => {
        cy.fazerLoginComUsuarioInexistente()
        cy.validarMensagem('Usuário ou senha inválidos.')
    })

    it('Deve fazer login com credenciais válida', () => {
        cy.fazerLoginComDadosValidos()
        cy.validarMensagem('Login Realizado com Sucesso!')
    })
    
    it('Deve fazer logout', () => {
        cy.fazerLogout()
        cy.validarMensagem('Logout realizado com sucesso!')
    })

    it('Deve rejeitar login com campos obrigatórios ausentes', () => {
        cy.fazerLoginComCamposObrigatoriosAusentes()
    })

    it('Deve rejeitar a solicitação de redefinição de senha com usuário inexistente', () => {
        cy.SolicitarRedefinicaoDeSenha('Usuario inexistente')
        cy.validarMensagem('Usuário não encontrado.')
    })

    it('Deve fazer a solicitação de redefinição de senha com usuário válido', () => {
        cy.SolicitarRedefinicaoDeSenha('Usuario válido')
        cy.validarMensagem('Código de redefinição enviado para o e-mail cadastrado.')
    })

    it('Deve bloquear usuário após 3 tentativas de senha inválida', () => {
        cy.fazerLoginComSenhaInvalida(3)
        cy.validarMensagem('Usuário bloqueado por tentativas inválidas.')
    })

    it('Deve rejeitar login com usuário bloqueado', () => {
        cy.fazerLoginComDadosValidos()
        cy.validarMensagem('Usuário bloqueado por tentativas inválidas.')
    })

    after(() => {
        cy.redifinirSenhaUsuarioBloqueado()
    })

})
