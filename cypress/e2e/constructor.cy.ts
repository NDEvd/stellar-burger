describe('тестирование приложения', () => {
  it('сервис должен быть доступен по адресу localhost:4000', () => {
    cy.visit('http://localhost:4000');
  });

  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'mockRefreshToken');

    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.setCookie('accessToken', '');
    localStorage.setItem('refreshToken', '');
  });

  describe('работа модальных окон', () => {
    beforeEach(() => {
      cy.get('[data-cy="ingredients"]').find('li').first().click();
      cy.get('[data-cy="content"]').should('be.visible');
    });

    it('модальное окно закрывается при нажатии на крестик', () => {
      cy.get('[data-cy="closeButton"]').click();
      cy.get('[data-cy="content"]').should('not.exist');
    });
  });

  describe('создание заказа', () => {
    it('создание бургера через конструктор', () => {
      cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click();
      cy.get('div').contains('Выберите начинку').should('not.exist');
    });

    it('оформление заказа', () => {
      cy.intercept('POST', 'api/orders', {
        fixture: 'order.json'
      }).as('postOrder');

      cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
      cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click();

      cy.contains('Оформить заказ').click();
      cy.contains('38182');
      cy.get('[data-cy="closeButton"]').click();
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});
