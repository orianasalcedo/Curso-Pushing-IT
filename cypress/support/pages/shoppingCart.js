export class ShoppingCart{

    constructor() {
        this.productoNameText = '#productName';
        this.productoQuantityText = '#productAmount';
        this.productoUnitPriceText = '#unitPrice';
        this.productoTotalPriceText = '#totalPrice';
        
    }

// Producto 01    

    validarDatosProducto(producto) {
        cy.get(`[name="${producto}"]`)
        
    };

    verificarQuantityProducto(producto) {
        return cy.get(`[name="${producto}"]`)
        .siblings(this.productoQuantityText)
        
    };

    verificarUnitPriceProducto(producto) {
        return cy.get(`[name="${producto}"]`)
        .siblings(this.productoUnitPriceText)

    }

    verificarTotalPriceProducto(producto) {
        return cy.get(`[name="${producto}"]`)
        .siblings(this.productoTotalPriceText)

    }
   
}
