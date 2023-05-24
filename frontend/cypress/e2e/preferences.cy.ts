describe('Select Preferences as guest', () => {
    it('clicks throught the initialization of user preferences regarding food', () => {
        //Landingpage
        cy.visit('/');
        cy.dataCy('primary-btn').click();

        //Login
        cy.dataCy('continue-as-guest').should('be.visible').click();

        //Select food lifestyle
        cy.dataCy('vegan').click();
        cy.dataCy('next').click();

        //Select intolerances
        cy.dataCy('peanut').click();
        cy.dataCy('walnut').click();
        cy.dataCy('mustard').click();
        cy.dataCy('next').click();

        //Select dislikes
        cy.dataCy('dislikes-search-field').type('tomatoe');
    });
});
