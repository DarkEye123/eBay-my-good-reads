context('book test suite', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('can search for books', () => {
    cy.get('#search').click().type('douglas', { force: true });
    cy.get('.spinner');
    const books = cy
      .get('div[data-testid="booklist"]')
      .children('div[data-testid="book"]');
    books.should('have.length', 10);
  });

  it('can view detailed information', () => {
    cy.get('#search').click().type('The Douglas Register');
    const books = cy
      .get('div[data-testid="booklist"]')
      .children('div[data-testid="book"]');
    books.should('have.length.above', 0);
    let button = books
      .first()
      .find('button[data-testid="book-description-detailed-info"]');
    button.should('have.text', 'see more...');
    button.click().should('have.text', 'see less...');
  });

  it('can wishlist book', () => {
    cy.get('#search').click().type('douglas');
    const books = cy
      .get('div[data-testid="booklist"]')
      .children('div[data-testid="book"]');
    books.first().find('i[data-testid="book-wishlist"]').click();
    const list = cy.get('aside[data-testid="wishlist"]').find('ul').children();
    list.should('have.length', 1);
  });

  it('can wishlist multiple books', () => {
    cy.get('#search').click().type('douglas');
    const books = cy
      .get('div[data-testid="booklist"]')
      .children('div[data-testid="book"]');
    books.each(child => child.find('i[data-testid="book-wishlist"]').click());
    const list = cy.get('aside[data-testid="wishlist"]').find('ul').children();
    list.should('have.length', 10);
  });

  it('can delete a book from wishlist', () => {
    cy.get('#search').click().type('douglas');
    const books = cy
      .get('div[data-testid="booklist"]')
      .children('div[data-testid="book"]');
    books.first().find('i[data-testid="book-wishlist"]').click();
    const list = cy.get('aside[data-testid="wishlist"]').find('ul').children();
    list.should('have.length', 1);
    list.first().click();
    list.should('have.length', 0);
    cy.get('aside[data-testid="wishlist"]')
      .find('span[data-testid="wishlist-empty-text"]')
      .should('contain.text', 'Empty (╯°□°)╯︵ ┻━┻');
  });

  it('can delete multiple books from wishlist', () => {
    cy.get('#search').click().type('douglas');
    const books = cy
      .get('div[data-testid="booklist"]')
      .children('div[data-testid="book"]');
    books.each(child => child.find('i[data-testid="book-wishlist"]').click());
    let list = cy.get('aside[data-testid="wishlist"]').find('ul').children();
    list.should('have.length', 10);
    list.first().click();
    list = cy
      .get('aside[data-testid="wishlist"]')
      .find('ul')
      .children()
      .should('have.length', 9);
    list.last().click();
    cy.get('aside[data-testid="wishlist"]')
      .find('ul')
      .children()
      .should('have.length', 8);
  });

  it('can reflect wishlisted book', () => {
    cy.get('#search').click().type('douglas');
    const books = cy
      .get('div[data-testid="booklist"]')
      .children('div[data-testid="book"]');
    const icon = books.first().find('i[data-testid="book-wishlist"]');
    icon.should('not.have.css', 'color', '#8BBB60');
    icon.click();
    const list = cy.get('aside[data-testid="wishlist"]').find('ul').children();
    list.should('have.length', 1);
    list.first().click();
    list.should('have.length', 0);
    icon.should('not.have.css', 'color', '#8BBB60');
  });
});
