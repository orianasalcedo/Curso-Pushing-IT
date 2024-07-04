
import { ProductsPage }  from '../../support/pages/productsPage.js';
import { ShoppingCart }  from '../../support/pages/shoppingCart.js';
import { CheckoutPage }  from '../../support/pages/checkoutPage.js';
import { Receipt }  from '../../support/pages/receipt.js';
import { Home }  from '../../support/pages/home.js';
import { expectedStatus2, randomUsername } from '../../support/constants.js';

describe('EntregaFinal', () => {
    let EntregaFinal;  
    const productsPage = new ProductsPage ();
    const shoppingCart = new ShoppingCart ();
    const checkoutPage = new CheckoutPage ();
    const receipt = new Receipt ();
    const home = new Home ()
    
    //Visitar la pagina de pushing IT.
    //Dirigirse al modulo "Online Shop".
before(() => {
    cy.fixture('EntregaFinal').then(datos => {
        EntregaFinal = datos;
    
        // Registrar el usuario después de cargar los datos del fixture
    return cy.registerAPI(
        randomUsername,
        EntregaFinal.DatosE2E.Auth.contraseña,
        EntregaFinal.DatosE2E.Auth.gender,
        EntregaFinal.DatosE2E.Auth.day,
        EntregaFinal.DatosE2E.Auth.month,
        EntregaFinal.DatosE2E.Auth.year
        
    )
    .then(() => {
    cy.log(`Usuario registrado: ${randomUsername}`);
    
        // Ingresar al sistema mediante requests después del registro
    return cy.loginAPI(
        randomUsername,
        EntregaFinal.DatosE2E.Auth.contraseña
                );
            });
    })
    .then(() => {
        // Visitar la página de pushing IT después del login
        home.visitarPagina();
        home.goOnlineShop();
        });
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
        
        productsPage.agregarProducto(EntregaFinal.DatosE2E.productos.primerProducto.nombre);
        productsPage.cerrarModalProducto();
        productsPage.agregarProducto(EntregaFinal.DatosE2E.productos.primerProducto.nombre);
        productsPage.cerrarModalProducto();
        productsPage.agregarProducto(EntregaFinal.DatosE2E.productos.segundoProducto.nombre);
        productsPage.cerrarModalProducto();

        // Verificar el nombre y precio de los dos productos.
        cy.get('#goShoppingCart').click()

            //Validar los datos del producto 01
        shoppingCart.devolverNameProducto01(EntregaFinal.DatosE2E.productos.primerProducto.nombre);
        shoppingCart.verificarQuantityProducto01(EntregaFinal.DatosE2E.productos.primerProducto.quantity).should('have.text', EntregaFinal.DatosE2E.productos.primerProducto.quantity);
        shoppingCart.verificarUnitPriceProducto01(EntregaFinal.DatosE2E.productos.primerProducto.precioUnitario).should('have.text', `$${EntregaFinal.DatosE2E.productos.primerProducto.precioUnitario}`);
        shoppingCart.verificarTotalPriceProducto01().should('have.text', `$${EntregaFinal.DatosE2E.productos.primerProducto.precioUnitario * EntregaFinal.DatosE2E.productos.primerProducto.quantity}`);

            //Validar los datos del producto 02
        shoppingCart.devolverNameProducto02(EntregaFinal.DatosE2E.productos.segundoProducto.nombre);
        shoppingCart.verificarQuantityProducto02(EntregaFinal.DatosE2E.productos.segundoProducto.quantity).should('have.text', EntregaFinal.DatosE2E.productos.segundoProducto.quantity);
        shoppingCart.verificarUnitPriceProducto02(EntregaFinal.DatosE2E.productos.segundoProducto.precioUnitario).should('have.text', `$${EntregaFinal.DatosE2E.productos.segundoProducto.precioUnitario}`);
        shoppingCart.verificarTotalPriceProducto02().should('have.text', `$${EntregaFinal.DatosE2E.productos.segundoProducto.precioUnitario * EntregaFinal.DatosE2E.productos.segundoProducto.quantity}`);

        //Hacer click en "Show total price" y verificar el precio acumulado de los 2 productos.
        cy.get('button').contains('Show total price').click()
        cy.get('#price').should('have.text', `${EntregaFinal.DatosE2E.productos.primerProducto.precioUnitario * EntregaFinal.DatosE2E.productos.primerProducto.quantity + EntregaFinal.DatosE2E.productos.segundoProducto.precioUnitario * EntregaFinal.DatosE2E.productos.segundoProducto.quantity}`)
        cy.get('#goBillingSummary').click();
        cy.get('#goCheckout').click();//Ver de anadir una validacion para los totales

        //Completar el checkout con nombre, apellido y una tarjeta de credito de 16 digitos
        
        checkoutPage.escibirFirstName(EntregaFinal.DatosE2E.Datos.Nombre);
        checkoutPage.escibirLastName(EntregaFinal.DatosE2E.Datos.Apellido);
        checkoutPage.escibircardNumber(EntregaFinal.DatosE2E.Datos.NumeroTarjeta);
        checkoutPage.clickPurchase()

        //Verificar los siguientes datos en el ticket de compra (Nombre y apellido, productos,tarjeta de crédito, costo total)

        receipt.verificarNombreApellido().should('have.text', `${EntregaFinal.DatosE2E.Datos.Nombre} ${EntregaFinal.DatosE2E.Datos.Apellido} has succesfully purchased the following items:`);
        receipt.verificarProducto().contains(`2 x ${EntregaFinal.DatosE2E.productos.primerProducto.nombre}`)
        receipt.verificarProducto().contains(`1 x ${EntregaFinal.DatosE2E.productos.segundoProducto.nombre}`)
        receipt.verificarTotalPrice().should('have.text',`Monney spent $${EntregaFinal.DatosE2E.productos.primerProducto.precioUnitario * EntregaFinal.DatosE2E.productos.primerProducto.quantity + EntregaFinal.DatosE2E.productos.segundoProducto.precioUnitario * EntregaFinal.DatosE2E.productos.segundoProducto.quantity}`)
        
        
    });

});
