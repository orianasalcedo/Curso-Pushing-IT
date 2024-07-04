export class CheckoutPage {

    constructor() {
        this.firstNameInput = '#FirstName';
        this.lastNameInput = '#lastName';
        this.cardNumberInput = '#cardNumber';
        this.purchaseButton = '[data-cy="purchase"]'
    }
    
    escibirFirstName(firstName) {
        cy.get(this.firstNameInput).type(firstName);
    };

    escibirLastName(lastName) {
        cy.get(this.lastNameInput).type(lastName);
    };

    escibircardNumber(cardNumber) {
        cy.get(this.cardNumberInput).type(cardNumber);
    };

    clickPurchase() {
        cy.get(this.purchaseButton).click();
    };

    

};

