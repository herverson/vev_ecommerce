describe('Tests to Home component', () => {
    
    it('Exists products', () => {
        cy.visit('/');
        cy.get('.v-card__title').contains('Headset2');
        cy.get('button').contains('Confirmar');
    });

    it('Add prodcut to cart', () => {
        cy.get(':nth-child(1) > .v-card > .v-card__text > .white--text').click();
        cy.get('.v-badge__badge').contains('1');
    });

    it('Add two prodcuts to cart', () => {
        cy.get(':nth-child(1) > .v-card > .v-card__text > .white--text').dblclick();
        cy.get('.v-badge__badge').contains('3');
    });
    
    it('Confirm order', () => {
        cy.get('.md-12 > .v-btn--contained').click();
    });

    it('Close dialog', () => {
        cy.get('.v-dialog > .v-card > .v-card__actions > .v-btn > .v-btn__content').click();
    });

    it('Delete prodcut from cart', () => {
        cy.get('.row > .v-btn > .v-btn__content > .v-icon').click();
        cy.get('.md-12 > .row > .md-1').contains('2');
    });



    
  })