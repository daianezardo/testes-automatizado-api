/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {
     let token 

     before(() => {
          cy.token('daiane@qa.com', 'teste').then(tkn => { token = tkn})
     });

    it('Deve validar contrato de usuários', () => {
     cy.request('usuarios').then(response => {
          return contrato.validateAsync(response.body)
      })
    });

    it('Deve listar usuários cadastrados', () => {
     cy.request({
          method: 'GET',
          url: 'usuarios'

      }).then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('usuarios')
          expect(response.duration).to.be.lessThan(20)
      })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
     let usuario = `Usuario ${Math.floor(Math.random() * 100000)}`
     let email = `fulano${Math.floor(Math.random() * 100000)}@qa.com`
     cy.request({
         method: 'POST',
         url: 'usuarios',
         body: {
             "nome": usuario,
             "email": email,
             "password": "teste",
             "administrador": "true"
               },
               headers: {authorization: token}
     }).then((response) => {
         expect(response.status).to.equal(201)
         expect(response.body.message).to.equal('Cadastro realizado com sucesso')
     })
    });

    it('Deve validar um usuário com email inválido', () => {
     cy.cadastrarUsuario(token, "Daiane", "testeteste@qa.com.br", "teste", "true")
        
     .then((response) => {
         expect(response.status).to.equal(400)
         expect(response.body.message).to.equal('Este email já está sendo usado')
     })
    });

    it('Deve editar um usuário previamente cadastrado', () => {
     cy.request('usuarios').then(response => {
          let id = response.body.usuarios[0]._id
          cy.request({
              method: 'PUT',
              url: `usuarios/${id}`,
              headers: {authorization: token},
              body: {
               "nome": "Daiane Teste",
               "email": "daiane@qa.com",
               "password": "teste",
               "administrador": "true"
                    }

          }).then(response => {
              expect(response.body.message).to.equal('Registro alterado com sucesso')
          })
      })
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
     let usuario = `Usuario ${Math.floor(Math.random() * 100000)}`
     let email = `fulano${Math.floor(Math.random() * 100000)}@qa.com`
     cy.cadastrarUsuario(token, usuario, email, "teste", "true")
     .then(response => {
         let id = response.body._id
         cy.request({
             method: 'DELETE',
             url: `usuarios/${id}`,
             headers: {authorization: token}
 
         }).then(response => {
             expect(response.body.message).to.equal('Registro excluído com sucesso')
             expect(response.status).to.equal(200)
         })
     })
    });


});
