import { normalizeText } from "../../support/utils";

const subtotalSelector = '[data-cy=cart-subtotal]';

const cartEmptyElement = () => cy.get('[data-cy=cart-empty]');
const subtotalElement = () => cy.get(subtotalSelector);

const expectCheckoutAlert = (checkoutText: string) => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    cy.get('[data-cy=cart-checkout-button]').click().then(() => {
        expect(alertStub).to.be.calledWith(normalizeText(checkoutText));
    });
}

describe('Checkout Flow', () => {
    beforeEach(() => {
        cy.intercept('POST', 'https://www.google-analytics.com/**', {
            statusCode: 200,
            body: {}
        })
        cy.intercept('POST', 'https://region1.google-analytics.com/**', {
            statusCode: 204,
        })
    });

    it('should complete checkout flow with one product', () => {
        cy.visit('/');

        // at least one product should be present
        cy.get('[data-cy=product]').its('length').should('be.gte', 1);
        cy.get('[data-cy=product-buy-button]').first().click();

        // check if the cart is open and contains the product with correct subtotal
        cy.get('[data-cy=cart-content]').should('be.visible');
        cy.get('[data-cy=cart-title]').should('be.visible');
        cy.get('[data-cy=cart-product]').should('have.length', 1);
        cy.get('[data-cy=cart-product-description]').should('contain.text', 'Quantity: 1');
        cy.compareNormalizedText('[data-cy=cart-product-price]', subtotalSelector);

        // check if checkout works and alert is shown with the correct subtotal
        subtotalElement().invoke('text').then((priceText) => {
            expectCheckoutAlert(`Checkout - Subtotal: ${priceText}`);
        });
    });

    it('should show an alert and prevent checkout when the cart is empty', () => {
        cy.visit('/');

        // open the cart without any products
        cy.get('[data-cy=cart-button]').click();
        cy.get('[data-cy=cart-content]').should('be.visible');
        cy.get('[data-cy=cart-title]').should('be.visible');
        cy.get('[data-cy=cart-product]').should('not.exist');

        // check if the cart is empty
        cartEmptyElement().should('be.visible');
        cartEmptyElement().should('contain.text', 'Add some products in the cart');
        cartEmptyElement().should('contain.text', ':)');
        subtotalElement().should('contain.text', '0.00');

        // check if checkout is blocked and alert is shown
        expectCheckoutAlert('Add some product in the cart!');
    });
});
