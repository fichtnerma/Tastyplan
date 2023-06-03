declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to select DOM element by data-cy attribute with timeout per ms
         * @example cy.dataCy('greeting', { timeout: 50000 })
         */
        dataCy(value: string, timeout?: number): Chainable<Element>;
    }
}

Cypress.Commands.add('dataCy', (value, timeout) => {
    cy.get(`[data-cy="${value}"]`, { timeout });
});
