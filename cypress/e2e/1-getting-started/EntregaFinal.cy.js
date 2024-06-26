
import { ProductsPage }  from '../../support/pages/productsPage.js';
import { ShoppingCart }  from '../../support/pages/shoppingCart.js';
import { CheckoutPage }  from '../../support/pages/checkoutPage.js';
import { Receipt }  from '../../support/pages/receipt.js';
import { Home }  from '../../support/pages/home.js';
import { expectedStatus2, randomUsername } from '../../support/constants.js';

describe('EntregaFinal', () => {
    let EntregaFinal;
    let DatosCheckout;
    const productsPage = new ProductsPage ();
    const shoppingCart = new ShoppingCart ();
    const checkoutPage = new CheckoutPage ();
    const receipt = new Receipt ();
    const home = new Home ()
    
    //Visitar la pagina de pushing IT.
    //Dirigirse al modulo "Online Shop".
    before(() => {

    //Crear el usuario 
        cy.registerAPI(
            randomUsername,
            Cypress.env('contraseña'),
            Cypress.env('gender'),
            Cypress.env('day'),
            Cypress.env('month'),
            Cypress.env('year')
        );
    //Ingresar al sistema mediante requests
        cy.loginAPI(
            randomUsername,
            Cypress.env('contraseña'));

    //Visitar la pagina de pushing IT.
        home.visitarPagina();
        home.goOnlineShop()

        
        cy.fixture('EntregaFinal')
        .then(productos => {
            EntregaFinal = productos;
        })
        cy.fixture('DatosCheckout')
        .then(datos => {
            DatosCheckout = datos;
        })
        
    });

    //Eliminar el usuario creado una vez finalizado el test
        after(() => {  
            cy.request({
                method: 'DELETE',
                url: `https://pushing-it.onrender.com/api/deleteuser/${randomUsername}`,
        
        
            }).then(response => {
                cy.log(response)
                expect(response.status).to.eq(expectedStatus2);
                expect(response.body.user).to.have.property('username', randomUsername)
              
            });
        
    });

    it('Ingresar al online shop, elegir productos y verificar precios', () => {
       
        //Elegir 2 productos a elección y añadirlos al carrito.
        
        productsPage.agregarproducto01(EntregaFinal.productos.primerProducto);
        productsPage.cerrarModalProducto();
        productsPage.agregarproducto01(EntregaFinal.productos.primerProducto);
        productsPage.cerrarModalProducto();
        productsPage.agregarproducto02(EntregaFinal.productos.segundoProducto);
        productsPage.cerrarModalProducto();

        // Verificar el nombre y precio de los dos productos.
        cy.get('#goShoppingCart').click()

            //Validar los datos del producto 01
        shoppingCart.devolverNameProducto01(EntregaFinal.productos.primerProducto.nombre);
        shoppingCart.verificarQuantityProducto01(EntregaFinal.productos.primerProducto.quantity).should('have.text', EntregaFinal.productos.primerProducto.quantity);
        shoppingCart.verificarUnitPriceProducto01(EntregaFinal.productos.primerProducto.precioUnitario).should('have.text', `$${EntregaFinal.productos.primerProducto.precioUnitario}`);
        shoppingCart.verificarTotalPriceProducto01().should('have.text', `$${EntregaFinal.productos.primerProducto.precioUnitario * EntregaFinal.productos.primerProducto.quantity}`);

            //Validar los datos del producto 02
        shoppingCart.devolverNameProducto02(EntregaFinal.productos.segundoProducto.nombre);
        shoppingCart.verificarQuantityProducto02(EntregaFinal.productos.segundoProducto.quantity).should('have.text', EntregaFinal.productos.segundoProducto.quantity);
        shoppingCart.verificarUnitPriceProducto02(EntregaFinal.productos.segundoProducto.precioUnitario).should('have.text', `$${EntregaFinal.productos.segundoProducto.precioUnitario}`);
        shoppingCart.verificarTotalPriceProducto02().should('have.text', `$${EntregaFinal.productos.segundoProducto.precioUnitario * EntregaFinal.productos.segundoProducto.quantity}`);

        //Hacer click en "Show total price" y verificar el precio acumulado de los 2 productos.
        cy.get('button').contains('Show total price').click()
        cy.get('#price').should('have.text', `${EntregaFinal.productos.primerProducto.precioUnitario * EntregaFinal.productos.primerProducto.quantity + EntregaFinal.productos.segundoProducto.precioUnitario * EntregaFinal.productos.segundoProducto.quantity}`)
        cy.get('#goBillingSummary').click();
        cy.get('#goCheckout').click();//Ver de anadir una validacion para los totales

        //Completar el checkout con nombre, apellido y una tarjeta de credito de 16 digitos
        
        checkoutPage.escibirFirstName(DatosCheckout.Datos.Nombre);
        checkoutPage.escibirLastName(DatosCheckout.Datos.Apellido);
        checkoutPage.escibircardNumber(DatosCheckout.Datos.NumeroTarjeta);
        checkoutPage.clickPurchase()

        //Verificar los siguientes datos en el ticket de compra (Nombre y apellido, productos,tarjeta de crédito, costo total)

        receipt.verificarNombreApellido().should('have.text', `${DatosCheckout.Datos.Nombre} ${DatosCheckout.Datos.Apellido} has succesfully purchased the following items:`);
        receipt.verificarPrimerProducto().contains(`2 x ${EntregaFinal.productos.primerProducto.nombre}`)
        receipt.verificarSegundoProducto().contains(`1 x ${EntregaFinal.productos.segundoProducto.nombre}`)
        receipt.verificarTotalPrice().should('have.text',`Monney spent $${EntregaFinal.productos.primerProducto.precioUnitario * EntregaFinal.productos.primerProducto.quantity + EntregaFinal.productos.segundoProducto.precioUnitario * EntregaFinal.productos.segundoProducto.quantity}`)
        
        
    });

});
