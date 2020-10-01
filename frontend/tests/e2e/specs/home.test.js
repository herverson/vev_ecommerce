describe('Tests to Home component', () => {
    
    it('Exists products', () => {
        cy.visit('/');
        cy.contains('Headset2');
        cy.get('button').contains('Confirmar');
    });

    it('Add prodcut to cart', () => {
        cy.get(':nth-child(1) > .v-card > .v-card__actions > .white--text').click();
        cy.get('.v-badge__badge').contains('1');
    });

    it('Add two prodcuts to cart', () => {
        cy.get(':nth-child(1) > .v-card > .v-card__actions > .white--text').dblclick();
        cy.get('.v-badge__badge').contains('3');
    });
    
    it('Delete product from cart', () => {
        cy.get('.row > .v-btn > .v-btn__content > .v-icon').click();
        cy.get('.v-badge__badge').contains('2');
        cy.get('.col-md-4.col-12 > .v-card > .col-12 > .row > .md-1').contains('2');
    });

    it('Confirm order', () => {
        cy.contains('Confirmar').click();
    });

    it('Close dialog', () => {
        cy.get('.v-dialog > .v-card > .v-card__actions > .v-btn > .v-btn__content').click();
    });




    
  })