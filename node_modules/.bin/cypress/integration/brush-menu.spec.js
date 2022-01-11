describe('Brush menu', () => {
  beforeEach(() => {
    cy.visit('localhost:4200')
  })

  it('Negative brush size selected', () => {
    cy.contains('Brush').click()
    cy.contains('Size').click()
    cy.get('[data-cy=size-input]').should('exist')
    cy.get('[data-cy=size-input]').clear().type('-10')
    cy.get('[data-cy=ok-button]').should('be.disabled')
  })

  it('Zero brush size selected', () => {
    cy.contains('Brush').click()
    cy.contains('Size').click()
    cy.get('[data-cy=size-input]').should('exist')
    cy.get('[data-cy=size-input]').clear().type('0')
    cy.get('[data-cy=ok-button]').should('be.disabled')
  })

  it('Too large brush size selected', () => {
    cy.contains('Brush').click()
    cy.contains('Size').click()
    cy.get('[data-cy=size-input]').should('exist')
    cy.get('[data-cy=size-input]').clear().type('999999')
    cy.get('[data-cy=ok-button]').should('be.disabled')
  })

  it('Valid brush size selected', () => {
    cy.contains('Brush').click()
    cy.contains('Size').click()
    cy.get('[data-cy=size-input]').should('exist')
    cy.get('[data-cy=size-input]').clear().type('10')
    cy.get('[data-cy=ok-button]').should('not.be.disabled')
  })
})
