import { normalizeText } from "../../support/utils";

const subtotalSelector = '[data-cy=cart-subtotal]';

describe('Checkout Flow', () => {
    beforeEach(() => {
        cy.intercept('POST','https://www.google-analytics.com/**',{
            statusCode: 200,
            body: {}
        })
        cy.intercept('POST','https://region1.google-analytics.com/**',{
            statusCode: 204,
        })
    });
    it('should complete checkout flow with one product', () => {
        cy.visit('/');
        // at least one product should be present
        cy.get('[data-cy=product]').its('length').should('be.gte', 1);
        // click on the first product
        cy.get('[data-cy=product-buy-button]').first().click();

        // check if the cart is open and contains the product with correct subtotal
        cy.get('[data-cy=cart-content]').should('be.visible');
        cy.get('[data-cy=cart-title]').should('be.visible');
        cy.get('[data-cy=cart-product]').should('have.length', 1);
        cy.get('[data-cy=cart-product-description]').should('contain.text', 'Quantity: 1');
        cy.compareNormalizedText('[data-cy=cart-product-price]', subtotalSelector);

        // check if checkout works and alert is shown with the correct subtotal
        cy.get(subtotalSelector).invoke('text').then((priceText) => {
            const alertStub = cy.stub();
            cy.on('window:alert', alertStub);
            cy.get('[data-cy=cart-checkout-button]').click().then(() => {
                expect(alertStub).to.be.calledWith(normalizeText(`Checkout - Subtotal: ${priceText}`));

            });
        });

    });
});