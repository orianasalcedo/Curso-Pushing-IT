import { expectedStatus1 } from '../../cypress/support/constants.js'


Cypress.Commands.add('registerAPI', (usuario, contraseña, gender, day, month, year) => {
    cy.request({
        method: 'POST',
        url: 'https://pushing-it.onrender.com/api/register',
        body: {
            "username": usuario,
            "password": contraseña,
            "gender": gender,
            "day": day,
            "month": month,
            "year": year
        }
    })
    .then(response => {
        cy.log(response);
        expect(response.status).to.be.equal(expectedStatus1);
        expect(response.body.newUser.username).to.include(usuario);
    });

})


Cypress.Commands.add('loginAPI', (usuario, contraseña) => {
    cy.request({
        method: "POST",
        url: "https://pushing-it.onrender.com/api/login",
        body: {
            "username": usuario,
            "password": contraseña
        }

    })

    .then(response => {
        window.localStorage.setItem('token', response.body.token)
        window.localStorage.setItem('user', response.body.user.username)
        window.localStorage.setItem('userID', response.body.user._id)
        expect(response.status).to.be.equal(expectedStatus1);
    })

})


