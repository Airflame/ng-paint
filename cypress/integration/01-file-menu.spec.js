describe('File menu', () => {
  beforeEach(() => {
    cy.visit('localhost:4200')
  })

  it('Create a new image', () => {
    cy.contains('File').click()
    cy.contains('New').click()
    cy.get('[data-cy=image-name]').should('exist')
    cy.get('[data-cy=image-name]').clear().type('Test')
    cy.get('[data-cy=width-input]').clear().type('600')
    cy.get('[data-cy=height-input]').clear().type('500')
    cy.get('[data-cy=create-image]').click()
    cy.get('canvas').invoke('css', 'width')
      .then(str => parseInt(str)).should('be.eq', 600);
    cy.get('canvas').invoke('css', 'height')
      .then(str => parseInt(str)).should('be.eq', 500);
    cy.get('.mat-tab-label-content').contains("Test").should('exist')
    cy.get('.mat-tab-label-content').should('have.length', 3)
  })

  it('Create a new image in a new tab', () => {
    cy.contains('File').click()
    cy.contains('New').click()
    cy.get('[data-cy=image-name]').should('exist')
    cy.get('[data-cy=image-name]').clear().type('Test2')
    cy.get('[data-cy=width-input]').clear().type('444')
    cy.get('[data-cy=height-input]').clear().type('555')
    cy.contains("tab").click()
    cy.get('[data-cy=create-image]').click()
    cy.get('canvas').invoke('css', 'width')
      .then(str => parseInt(str)).should('be.eq', 444)
    cy.get('canvas').invoke('css', 'height')
      .then(str => parseInt(str)).should('be.eq', 555)
    cy.get('.mat-tab-label-content').contains("Test2").should('exist')
    cy.get('.mat-tab-label-content').should('have.length', 4)
  })

  it('Negative new image size', () => {
    cy.contains('File').click()
    cy.contains('New').click()
    cy.get('[data-cy=image-name]').should('exist')
    cy.get('[data-cy=image-name]').clear().type('Test')
    cy.get('[data-cy=width-input]').clear().type('-600')
    cy.get('[data-cy=height-input]').clear().type('-500')
    cy.get('[data-cy=create-image]').should('be.disabled')
  })

  it('Too large new image size', () => {
    cy.contains('File').click()
    cy.contains('New').click()
    cy.get('[data-cy=image-name]').should('exist')
    cy.get('[data-cy=image-name]').clear().type('Test')
    cy.get('[data-cy=width-input]').clear().type('999999')
    cy.get('[data-cy=height-input]').clear().type('999999')
    cy.get('[data-cy=create-image]').should('be.disabled')
  })

  it('Too long image name', () => {
    cy.contains('File').click()
    cy.contains('New').click()
    cy.get('[data-cy=image-name]').should('exist')
    cy.get('[data-cy=image-name]').clear().type('TestTestTestTestTestTestTestTestTestTestTest')
    cy.get('[data-cy=create-image]').should('be.disabled')
  })

  it('Close a tab', () => {
    cy.contains('File').click()
    cy.contains('Close').click()
    cy.get('.mat-tab-label-content').contains("Image 1").should('not.exist')
    cy.get('.mat-tab-label-content').contains("Image 2").should('exist')
    cy.get('.mat-tab-label-content').contains("Image 3").should('exist')
    cy.get('.mat-tab-label-content').should('have.length', 2)
  })

  it('Switch a tab', () => {
    cy.contains('File').click()
    cy.contains('New').click()
    cy.get('[data-cy=image-name]').should('exist')
    cy.get('[data-cy=image-name]').clear().type('Test')
    cy.get('[data-cy=width-input]').clear().type('600')
    cy.get('[data-cy=height-input]').clear().type('500')
    cy.get('[data-cy=create-image]').click()
    cy.get('canvas').invoke('css', 'width')
      .then(str => parseInt(str)).should('be.eq', 600)
    cy.get('canvas').invoke('css', 'height')
      .then(str => parseInt(str)).should('be.eq', 500)
    cy.get('.mat-tab-label-content').should('have.length', 3)
    cy.contains("Image 2").click()
    cy.get('canvas').invoke('css', 'width')
      .then(str => parseInt(str)).should('be.eq', 800)
    cy.get('canvas').invoke('css', 'height')
      .then(str => parseInt(str)).should('be.eq', 600)
    cy.get('.mat-focus-indicator').find('.mat-tab-label-content').contains('Image 2').should('exist')
    cy.get('.mat-tab-label-content').should('have.length', 3)
    cy.contains("Test").click()
    cy.get('canvas').invoke('css', 'width')
      .then(str => parseInt(str)).should('be.eq', 600)
    cy.get('canvas').invoke('css', 'height')
      .then(str => parseInt(str)).should('be.eq', 500)
  })
})
