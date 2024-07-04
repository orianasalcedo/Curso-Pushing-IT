export class Receipt{

    constructor() {
        this.nombreApellidoText = '#name';
        this.primerProductoText = 'p';
        this.totalPriceText = '#totalPrice';
        
    }  

    verificarNombreApellido() {
        return cy.get(this.nombreApellidoText)
}
    verificarProducto() {
    return cy.get(this.primerProductoText)
}
    verificarTotalPrice() {
    return cy.get(this.totalPriceText)
}
}


// cy.get('#name').should('have.text', `${DatosCheckout.Datos.Nombre} ${DatosCheckout.Datos.Apellido} has succesfully purchased the following items:`)
// cy.get('p').contains(`2 x ${Preentrega.productos.primerProducto.nombre}`)
// cy.get('p').contains(`1 x ${Preentrega.productos.segundoProducto.nombre}`)
// cy.get('p').contains(`The credit card used was: ${DatosCheckout.Datos.NumeroTarjeta}`)
// cy.get('#totalPrice').should('have.text',`Monney spent $${Preentrega.productos.primerProducto.precioUnitario * Preentrega.productos.primerProducto.quantity + Preentrega.productos.segundoProducto.precioUnitario * Preentrega.productos.segundoProducto.quantity}`)