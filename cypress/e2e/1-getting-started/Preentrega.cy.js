import { LoginPage }  from '../../support/pages/loginPage.js';
import { ProductsPage }  from '../../support/pages/productsPage.js';
import { ShoppingCart }  from '../../support/pages/shoppingCart.js';


describe('Preentrega', () => {
    let Preentrega;
    const loginPage = new LoginPage (); 
    const productsPage = new ProductsPage ();
    const shoppingCart = new ShoppingCart ();
    
    before('Acceder a Preentrega fixture', () => {
        cy.fixture('Preentrega')
        .then(productos => {
            Preentrega = productos
            ;
        }) 
        
    });

    beforeEach('Visitar pagina y loguearse', () => {
        cy.visit('')
        cy.get ('#registertoggle').dblclick()
        loginPage.login(Cypress.env().usuario, Cypress.env().contraseña);
        cy.get('#onlineshoplink').click();

    });

    it('Ingresar al online shop, elegir productos y verificar precios', () => {
       
        // Agregar los productos al carrito 
        
        productsPage.agregarproducto01(Preentrega.productos.primerProducto);
        productsPage.cerrarModalProducto();
        productsPage.agregarproducto01(Preentrega.productos.primerProducto);
        productsPage.cerrarModalProducto();
        productsPage.agregarproducto02(Preentrega.productos.segundoProducto);
        productsPage.cerrarModalProducto();

        // Ir al Shopping Cart y validar Cantidad, Nombre del producto, Precio Unitario y Precio Total
        cy.get('#goShoppingCart').click()

        //Validar los datos del producto 01
        shoppingCart.devolverNameProducto01(Preentrega.productos.primerProducto.nombre);
        shoppingCart.verificarQuantityProducto01(Preentrega.productos.primerProducto.quantity).should('have.text', Preentrega.productos.primerProducto.quantity);
        shoppingCart.verificarUnitPriceProducto01(Preentrega.productos.primerProducto.precioUnitario).should('have.text', `$${Preentrega.productos.primerProducto.precioUnitario}`);
        shoppingCart.verificarTotalPriceProducto01().should('have.text', `$${Preentrega.productos.primerProducto.precioUnitario * Preentrega.productos.primerProducto.quantity}`);

        //Validar los datos del producto 02
        shoppingCart.devolverNameProducto02(Preentrega.productos.segundoProducto.nombre);
        shoppingCart.verificarQuantityProducto02(Preentrega.productos.segundoProducto.quantity).should('have.text', Preentrega.productos.segundoProducto.quantity);
        shoppingCart.verificarUnitPriceProducto02(Preentrega.productos.segundoProducto.precioUnitario).should('have.text', `$${Preentrega.productos.segundoProducto.precioUnitario}`);
        shoppingCart.verificarTotalPriceProducto02().should('have.text', `$${Preentrega.productos.segundoProducto.precioUnitario * Preentrega.productos.segundoProducto.quantity}`);

        //Show Total Price y Validar la sumatoria de los productos agregados al carrito
        cy.get('button').contains('Show total price').click()
        cy.get('#price').should('have.text', `${Preentrega.productos.primerProducto.precioUnitario * Preentrega.productos.primerProducto.quantity + Preentrega.productos.segundoProducto.precioUnitario * Preentrega.productos.segundoProducto.quantity}`)


    });

});
