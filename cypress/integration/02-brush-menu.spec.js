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

  it('Use color picker', () => {
    cy.contains('Brush').click()
    cy.get('[data-cy=color]').click()
    cy.contains('palette').click()
    cy.get('input[id="mat-input-1"]').clear().type('255')
    cy.get('input[id="mat-input-2"]').clear().type('255')
    cy.get('input[id="mat-input-3"]').clear().type('0')
    cy.get('input[id="mat-input-5"]').clear().type('1')
    cy.get('input[id="mat-input-4"]').should('have.value', 'ffff00')
  })
})
