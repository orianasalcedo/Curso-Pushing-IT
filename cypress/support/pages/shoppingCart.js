export class ShoppingCart{

    constructor() {
        this.producto01NameText = '[name="Buzo Negro"]';
        this.producto02NameText = '[name="Zapatillas Azules"]';
        this.productoQuantityText = '#productAmount';
        this.productoUnitPriceText = '#unitPrice';
        this.productoTotalPriceText = '#totalPrice';
        
    }

// Producto 01    

    devolverNameProducto01() {
        cy.get(this.producto01NameText);
        
    };

    verificarQuantityProducto01() {
        return cy.get(this.producto01NameText)
        .siblings(this.productoQuantityText)
        
    };

    verificarUnitPriceProducto01() {
        return cy.get(this.producto01NameText)
        .siblings(this.productoUnitPriceText)

    }
    verificarTotalPriceProducto01() {
        return cy.get(this.producto01NameText)
        .siblings(this.productoTotalPriceText)

    }

// Producto 02

    devolverNameProducto02() {
        cy.get(this.producto02NameText);
        
    };

    verificarQuantityProducto02() {
        return cy.get(this.producto02NameText)
        .siblings(this.productoQuantityText)
        
    };

    verificarUnitPriceProducto02() {
        return cy.get(this.producto02NameText)
        .siblings(this.productoUnitPriceText)

    }
    verificarTotalPriceProducto02() {
        return cy.get(this.producto02NameText)
        .siblings(this.productoTotalPriceText)

    }
   
}
