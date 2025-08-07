Cypress.Commands.add('fazerLoginComDadosValidos', () => {
    cy.fixture('credenciais').then(credenciais => {
        cy.get('#username').type(credenciais.valida.usuario)
        cy.get('#password').type(credenciais.valida.senha)
        cy.get('#login-btn').click()
    })
})

Cypress.Commands.add('fazerLogout', () => {
    cy.fazerLoginComDadosValidos()
    cy.get('#logout-btn').click()
})

Cypress.Commands.add('fazerLoginComSenhaInvalida', (qtdDeTentativas) => {
    for (let i = 0; i < qtdDeTentativas; i++) {
        cy.fixture('credenciais').then(credenciais => {
            cy.get('#username').clear().type(credenciais.senhaInvalida.usuario)
            cy.get('#password').clear().type(credenciais.senhaInvalida.senha)
            cy.get('#login-btn').click()
        })
    }
})

Cypress.Commands.add('fazerLoginComUsuarioInexistente', () => {
    cy.fixture('credenciais').then(credenciais => {
        cy.get('#username').type(credenciais.usuarioInexistente.usuario)
        cy.get('#password').type(credenciais.usuarioInexistente.senha)
        cy.get('#login-btn').click()
    })
})

Cypress.Commands.add('fazerLoginComCamposObrigatoriosAusentes', () => {
    cy.get('#login-btn').click()
    cy.get('#username').focus().blur()
    cy.get('#username').then(($input) => {
        expect($input[0].validationMessage).to.eq('Preencha este campo.')
    })
})

Cypress.Commands.add('SolicitarRedefinicaoDeSenha', (username) => {
    cy.get('#show-forgot-password').click()
    cy.get('#reset-username').type(username === 'Usuario válido' ? 'usuario1' : 'usuario_inexistente')
    cy.get('#reset-btn').click()
})