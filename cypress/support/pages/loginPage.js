export class LoginPage {

    constructor() {
        this.userInput = '//input[@name="user"]';
        this.passInput = '//input[@type="password"]';
        this.iniciaSesionButton = '//button[@id="submitForm"]';
    }
    
    escibirUsuario(usuario) {
        cy.xpath(this.userInput).type(usuario);
    };

    escibirContraseña(contraseña) {
        cy.xpath(this.passInput).type(contraseña);
    };

    clickIniciaSesion() {
        cy.xpath(this.iniciaSesionButton).click();
    };


    login(usuario, contraseña) {
        this.escibirUsuario(usuario);
        this.escibirContraseña(contraseña);
        this.clickIniciaSesion();
    };

};