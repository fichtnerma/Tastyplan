import { getRandomEmail } from "../support/utils";

describe("Add Recipe", () => {
  beforeEach(() => {
    const randomMail = getRandomEmail();
    cy.createEmptyWeekplan(randomMail, "1234567");
  });
  it("User should be able to add a custom Recipe", () => {
    //Navigate to addRecipe-route
    cy.dataCy("navigate-cookbock-link").click();
    cy.dataCy("add-own-recipe-link").click();

    //Test error state of name
    cy.dataCy("input-recipe-name").focus();
    cy.dataCy("input-recipe-name").blur();
    cy.dataCy("error-message-Name").should("have.text", "Required");
    cy.dataCy("recipe-next-btn").should("be.disabled");
    cy.dataCy("input-recipe-name").type("New Recipe");
    cy.dataCy("input-recipe-name").blur();
    cy.dataCy("error-message-Name").should("not.have.text", "Required");

    //Test image upload
    cy.fixture("sample.jpg", null).as("imgFixture");
    cy.dataCy("add-img-label").selectFile("@imgFixture");
    cy.dataCy("uploaded-img").should("be.visible");
    cy.dataCy("remove-img-btn").click();
    cy.dataCy("add-img-label").selectFile("@imgFixture");
    cy.dataCy("recipe-back-btn").should("be.disabled");
    cy.dataCy("recipe-next-btn").should("not.be.disabled");
    cy.dataCy("recipe-next-btn").click();

    //Test key facts
    cy.dataCy("cooking-time-input").type("20");
    for (let n = 0; n < 5; n++) {
      cy.dataCy("increase-serv-btn").click();
    }
    cy.dataCy("portion-amount").should("have.text", "6");
  });
});
