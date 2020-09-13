// https://docs.cypress.io/api/introduction/api.html

describe('Thats test server OK', () => {
  it('displays products from API', () => {
    cy.request('http://localhost:3000/products')
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(4);
        expect(response).to.have.property('headers');
        expect(response).to.have.property('duration');
      })
  })
})
