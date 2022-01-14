describe('Image menu', () => {
  beforeEach(() => {
    cy.visit('localhost:4200')
  })

  it('Resize image with original ratio', () => {
    cy.contains('Image').click()
    cy.contains('Resize').click()
    cy.get('[data-cy=image-resize-width]').click().clear().type('400')
    cy.get('[data-cy=image-resize-height]').should('have.value', '300')
    cy.get('[data-cy=resize-image]').click()
    cy.get('canvas').invoke('css', 'width')
      .then(str => parseInt(str)).should('be.eq', 400)
    cy.get('canvas').invoke('css', 'height')
      .then(str => parseInt(str)).should('be.eq', 300)
  })

  it('Resize image without original ratio', () => {
    cy.contains('Image').click()
    cy.contains('Resize').click()
    cy.get('.mat-slide-toggle-thumb').click()
    cy.get('[data-cy=image-resize-width]').click().clear().type('400')
    cy.get('[data-cy=image-resize-height]').should('not.have.value', '300')
    cy.get('[data-cy=image-resize-height]').click().clear().type('500')
    cy.get('[data-cy=resize-image]').click()
    cy.get('canvas').invoke('css', 'width')
      .then(str => parseInt(str)).should('be.eq', 400)
    cy.get('canvas').invoke('css', 'height')
      .then(str => parseInt(str)).should('be.eq', 500)
  })

  it('Negative image resize size', () => {
    cy.contains('Image').click()
    cy.contains('Resize').click()
    cy.get('[data-cy=image-resize-width]').click().clear().type('-400')
    cy.get('[data-cy=image-resize-height]').should('have.value', '-300')
    cy.get('[data-cy=resize-image]').should('be.disabled')
    cy.get('.mat-slide-toggle-thumb').click()
    cy.get('[data-cy=image-resize-width]').click().clear().type('-200')
    cy.get('[data-cy=image-resize-height]').click().clear().type('-100')
    cy.get('[data-cy=resize-image]').should('be.disabled')
  })

  it('Zero image resize size', () => {
    cy.contains('Image').click()
    cy.contains('Resize').click()
    cy.get('[data-cy=image-resize-width]').click().clear().type('0')
    cy.get('[data-cy=resize-image]').should('be.disabled')
  })

  it('Too large image resize size', () => {
    cy.contains('Image').click()
    cy.contains('Resize').click()
    cy.get('[data-cy=image-resize-width]').click().clear().type('800000')
    cy.get('[data-cy=image-resize-height]').should('have.value', '600000')
    cy.get('[data-cy=resize-image]').should('be.disabled')
    cy.get('.mat-slide-toggle-thumb').click()
    cy.get('[data-cy=image-resize-width]').click().clear().type('1231234')
    cy.get('[data-cy=image-resize-height]').click().clear().type('43214321')
    cy.get('[data-cy=resize-image]').should('be.disabled')
  })

  it('Rotate image', () => {
    cy.contains('Image').click()
    cy.contains('Rotate').click()
    cy.get('canvas').invoke('css', 'width')
      .then(str => parseInt(str)).should('be.eq', 600)
    cy.get('canvas').invoke('css', 'height')
      .then(str => parseInt(str)).should('be.eq', 800)
    cy.contains('Image').click()
    cy.contains('Rotate').click()
    cy.get('canvas').invoke('css', 'width')
      .then(str => parseInt(str)).should('be.eq', 800)
    cy.get('canvas').invoke('css', 'height')
      .then(str => parseInt(str)).should('be.eq', 600)
  })
})