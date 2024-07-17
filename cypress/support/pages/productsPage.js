
export class ProductsPage {

    constructor() {
        this.cerrarModalButton = '[id="closeModal"]';
        };
    

    // Cambiar el nombre del método a agregarProducto y aceptar un nombre de producto como argumento
    agregarProducto(producto) {
        cy.get(`[name="${producto}"]`).click();
        cy.get(this.cerrarModalButton).click()
        

    }

    }
