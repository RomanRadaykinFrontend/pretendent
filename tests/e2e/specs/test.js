// https://docs.cypress.io/api/introduction/api.html

describe( 'Empty test', () => {
  it( 'Visits home', () => {
    cy.visit('/')
  })

  it( 'There is a link', () => {
    cy.get('a')
  })

  it( 'Link text is "Главная"', () => {
    cy.contains('a', 'Главная')
  })

})
