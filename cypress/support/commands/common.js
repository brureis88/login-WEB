Cypress.Commands.add('validarMensagem', (mensagem) => {
    cy.contains(mensagem).should('be.visible')
})

Cypress.Commands.add('redifinirSenhaUsuarioBloqueado', () => {
    cy.request('POST', 'http://localhost:3000/solicitar-redefinicao', { username: 'usuario1' }).then((response) => {
        expect(response.status).to.eq(200)
        cy.wrap(response.body.codigo).as('codigoRedefinicao')
        expect(response.body.mensagem).to.eq('Código de redefinição enviado para o e-mail cadastrado.')
    })

    cy.get('@codigoRedefinicao').then((codigo) => {
        cy.request('POST', 'http://localhost:3000/validar-codigo', { username: 'usuario1', codigo: codigo }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.mensagem).to.eq('Código válido. Você pode redefinir sua senha.')
        })

        cy.request('POST', 'http://localhost:3000/redefinir-senha', { username: 'usuario1', codigo: codigo, novaSenha: 'senha123' }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.mensagem).to.eq('Senha redefinida com sucesso!')
        })
    })
})