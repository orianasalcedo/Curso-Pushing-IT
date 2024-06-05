export class ProductsPage {

    constructor() {
        this.producto01Button = '//button[@name="Buzo Negro"]';
        this.cerrarModalButton = '//button[@data-cy="closeModal"]';
        this.producto02Button = '//button[@name="Zapatillas Azules"]';
    }

    agregarproducto01() {
        cy.xpath(this.producto01Button).click()
    };
   
    agregarproducto02() {
        cy.xpath(this.producto02Button).click();
    };

    cerrarModalProducto() {
        cy.xpath(this.cerrarModalButton).click();
    };
    


};

