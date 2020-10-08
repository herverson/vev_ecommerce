// https://docs.cypress.io/api/introduction/api.html

describe('Thats test server OK', () => {
  it('Server OK', () => {
    cy.request('http://localhost:3000/products')
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response).to.have.property('headers');
        expect(response).to.have.property('duration');
      });
  });

  it('Server has data', () => {
    cy.request('http://localhost:3000/products')
      .should((response) => {
        expect(response.status).to.eq(200);
        // server to have a length at least 1
        expect(response.body).to.be.length.gte(1);
      });
  });

  it('Server have > 4 products', () => {
    cy.request('http://localhost:3000/products')
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.length.gte(4);
      });
  });

})
