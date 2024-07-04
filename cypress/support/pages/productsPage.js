
export class ProductsPage {

    constructor() {
        this.cerrarModalButton = '//button[@data-cy="closeModal"]';
        this.productSelectors = {
            'Buzo Negro': '//button[@name="Buzo Negro"]',
            'Zapatillas Azules': '//button[@name="Zapatillas Azules"]'
        };
    }

    // Cambiar el nombre del método a agregarProducto y aceptar un nombre de producto como argumento
    agregarProducto(nombreProducto) {
        const selector = this.productSelectors[nombreProducto];
        if (selector) {
            cy.xpath(selector).click();
        } else {
            throw new Error(`El producto "${nombreProducto}" no tiene un selector definido.`);
        }
    }

    cerrarModalProducto() {
        cy.xpath(this.cerrarModalButton).click();
    }
}