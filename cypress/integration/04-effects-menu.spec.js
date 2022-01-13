describe('Effects menu', () => {
  beforeEach(() => {
    cy.visit('localhost:4200')
  })

  it('Open brightness modal', () => {
    cy.contains('Effects').click()
    cy.contains('Brightness').click()
    cy.contains("Set brightness").should('exist')
    cy.contains("Ok").click()
    cy.contains("Set brightness").should('not.exist')
  })

  it('Open contrast modal', () => {
    cy.contains('Effects').click()
    cy.contains('Contrast').click()
    cy.contains("Set contrast").should('exist')
    cy.contains("Ok").click()
    cy.contains("Set contrast").should('not.exist')
  })

  it('Open contrast modal', () => {
    cy.contains('Effects').click()
    cy.contains('Contrast').click()
    cy.contains("Set contrast").should('exist')
    cy.contains("Ok").click()
    cy.contains("Set contrast").should('not.exist')
  })

  it('Open hue and saturation modal', () => {
    cy.contains('Effects').click()
    cy.contains('Hue and saturation').click()
    cy.contains("Hue and saturation").should('exist')
    cy.contains("Ok").click()
    cy.contains("Hue and saturation").should('not.exist')
  })

  it('Open color levels modal', () => {
    cy.contains('Effects').click()
    cy.contains('Color levels').click()
    cy.contains("Color levels").should('exist')
    cy.contains("Ok").click()
    cy.contains("Color levels").should('not.exist')
  })

  it('Open thresholding modal', () => {
    cy.contains('Effects').click()
    cy.contains('Thresholding').click()
    cy.contains("Thresholding").should('exist')
    cy.contains("Ok").click()
    cy.contains("Thresholding").should('not.exist')
  })
})
