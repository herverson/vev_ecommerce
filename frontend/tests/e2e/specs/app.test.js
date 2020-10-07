describe('Tests to App component', () => {

    it('Get cart', () => {
        cy.visit('/');
        cy.get('.v-badge > .v-icon').click();
    });

    it('Cart empty', () => {
        cy.get('.v-dialog > .v-card > .col > div > h5').contains('Escolha os items do pedido');
        cy.get('.v-dialog > .v-card > .v-card__actions > .v-btn--flat > .v-btn__content').click();
    });

    it('Add prodcut to cart', () => {
        cy.get(':nth-child(1) > .v-card > .v-card__actions > .white--text').click();
        cy.get('.v-badge__badge').contains('1');
    });

    it('Confirm order', () => {
        cy.get('.v-badge > .v-icon').click();
        cy.get('.v-dialog > .v-card > .v-card__actions > .v-btn--contained > .v-btn__content').click();
        cy.get('.v-dialog__content--active > .v-dialog > .v-card > .v-card__actions > .v-btn > .v-btn__content').click();
    });
    
    it('Verify confirm', () => {
        cy.contains('Escolha os items do pedido');
    });

})
