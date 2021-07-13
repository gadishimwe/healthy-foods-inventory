describe('Testing the home page', () => {
    it('Should visit the home page and find it\'s content', () => {
        cy.visit('http://localhost:3000')
        cy.get('.Home_title__38XO6').contains('Healthy Foods')
    });
});