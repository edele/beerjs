const address = "http://localhost:3000/";

describe("Видно сколько товаров в корзине не открывая её", function() {
  it("Добавляем один товар", function() {
    cy.visit(address);

    cy.contains("Ле Кис-Кис")
      .siblings("button")
      .click();

    cy.contains("Ле Корзинуа").should("contain", "(1)");
  });

  it("Добавляем товар дважды", function() {
    cy.visit(address);

    cy.contains("Ле Кис-Кис")
      .siblings("button")
      .click()
      .click();

    cy.contains("Ле Корзинуа").should("contain", "(2)");
  });

  it("Добавляем товар трижды", function() {
    cy.visit(address);

    cy.contains("Ле Кис-Кис")
      .siblings("button")
      .click()
      .click()
      .click();

    cy.contains("Ле Корзинуа").should("contain", "(3)");
  });
});

it("Пустая корзина", function() {
  cy.visit(address);

  cy.contains("Ле Корзинуа").click();

  cy.contains("Ваш заказ пуст").should("be.visible");

  cy.contains("Ле Корзинуа").click();

  cy.contains("Ваш заказ").should("not.be.visible");
});

function cartContainsText(text) {
  return cy
    .contains("Ваш заказ")
    .parent()
    .contains(text)
    .should("be.visible");
}

describe("Товары в корзине", function() {
  it("Один товар", function() {
    cy.visit(address);

    cy.contains("Ле Кис-Кис")
      .siblings("button")
      .click();

    cy.contains("Ле Корзинуа").click();

    cartContainsText("1 шт");
    cartContainsText("Ле Кис-Кис");
    cartContainsText("200₽");
  });

  it("Две единицы одного товара", function() {
    cy.visit(address);

    cy.contains("Ле Кис-Кис")
      .siblings("button")
      .click()
      .click();

    cy.contains("Ле Корзинуа").click();

    cartContainsText("2 шт");
    cartContainsText("Ле Кис-Кис");
    cartContainsText("200₽");
  });

  it("Два разных товара", function() {
    cy.visit(address);

    cy.contains("Ле Кис-Кис")
      .siblings("button")
      .click();

    cy.contains("Ле Хохлома")
      .siblings("button")
      .click();

    cy.contains("Ле Корзинуа").click();

    cartContainsText("1 шт");
    cartContainsText("Ле Кис-Кис");
    cartContainsText("200₽");

    cartContainsText("1 шт");
    cartContainsText("Ле Хохлома");
    cartContainsText("300₽");
  });

  it("Три товара, два одинаковых", function() {
    cy.visit(address);

    cy.contains("Ле Кис-Кис")
      .siblings("button")
      .click();

    cy.contains("Ле Хохлома")
      .siblings("button")
      .click()
      .click();

    cy.contains("Ле Корзинуа").click();

    cartContainsText("1 шт");
    cartContainsText("Ле Кис-Кис");
    cartContainsText("200₽");

    cartContainsText("2 шт");
    cartContainsText("Ле Хохлома");
    cartContainsText("300₽");
  });
});

describe("Рассчёт стоимости", function() {
  it("Один товар", function() {
    cy.visit(address);

    cy.contains("Ле Кис-Кис")
      .siblings("button")
      .click();

    cy.contains("Ле Корзинуа").click();

    cartContainsText("Полная стоимость: 200₽");
  });

  it("Два одинаковых товара", function() {
    cy.visit(address);

    cy.contains("Ле Кис-Кис")
      .siblings("button")
      .click()
      .click();

    cy.contains("Ле Корзинуа").click();

    cartContainsText("Полная стоимость: 400₽");
  });

  it("Три разных товара", function() {
    cy.visit(address);

    cy.contains("Ле Кис-Кис")
      .siblings("button")
      .click();

    cy.contains("Ле Братец лис")
      .siblings("button")
      .click();

    cy.contains("Ле Хохлома")
      .siblings("button")
      .click();

    cy.contains("Ле Корзинуа").click();

    cartContainsText("Полная стоимость: 600₽");
  });

  it("Три товара и доставка", function() {
    cy.visit(address);

    cy.contains("Ле Кис-Кис")
      .siblings("button")
      .click();

    cy.contains("Ле Братец лис")
      .siblings("button")
      .click();

    cy.contains("Ле Хохлома")
      .siblings("button")
      .click();

    cy.contains("Ле Корзинуа").click();

    cy.contains("Нужна доставка").click();

    cartContainsText("Полная стоимость: 1100₽");
  });
});

describe("Промо-акции", function() {
  it("От 5000 рублей доставка бесплатная", function() {
    cy.visit(address);

    cy.contains("Ле Жгучий перец")
      .siblings("button")
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click();

    cy.contains("Ле Корзинуа").click();

    cy.contains("Нужна доставка").click();

    cartContainsText("Полная стоимость: 5500₽");
  });
});
