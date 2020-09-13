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

    
    it('Confirm order', () => {
        cy.get('.md-12 > .v-btn--contained').click();
    });

    it('Delete prodcut from cart', () => {
        cy.get('.row > .v-btn > .v-btn__content > .v-icon').click();
        cy.get('.md-12 > .v-btn--contained').contains('0,00');
    });



    
  })