const searchTermTomato = "tomato";
const searchTermOnion = "onion";

describe("Weekplan", () => {
  it("User should be able to setup his first weekplan", () => {
    //Landingpage
    cy.visit("/");
    cy.dataCy("start-planning-btn").click();

    //Login
    cy.dataCy("continue-as-guest-btn").click();
    cy.dataCy("decline-cookies-btn").click();
    cy.intercept("GET", "/setup").as("login");
    cy.wait("@login");

    //Select food lifestyle
    cy.dataCy("vegan-radio-btn").click({ force: true });

    //Select intolerances
    cy.dataCy("peanut-checkbox").check();
    cy.dataCy("walnut-checkbox").check();
    cy.dataCy("mustard-checkbox").check();
    cy.dataCy("next-btn").click();

    //Select dislikes
    cy.dataCy("search-ingredients")
    .type(searchTermTomato, { delay: 200 });
    cy.wait(200);
    cy.dataCy("item-number-1").click();

    cy.dataCy("clear-search-input").click();

    cy.dataCy("search-ingredients")
    .type(searchTermOnion, { delay: 200 });
    cy.wait(200);
    cy.dataCy("item-number-1").click();
    cy.dataCy("selected-dislike-text-onion").click();

    //Remove one item from chiplist
    cy.dataCy("remove-onion").click();

    cy.dataCy("next-btn").click();

    //Adjust weekplan

    //Select cooking days
    cy.dataCy("days-Monday-checkbox").click();
    cy.dataCy("days-Thursday-checkbox").click();
    cy.dataCy("days-Sunday-checkbox").click();

    //Select meals
    cy.dataCy("meals-Dinner-checkbox").click();

    //Increase Servings
    for (let i = 0; i < 3; i++) {
      cy.dataCy("increase-serving-btn").click();
    }
    cy.dataCy("decrease-serving-btn").click();
    cy.dataCy("portion-amount").should("have.text", "3");

    //Create Weekplan
    cy.intercept("POST", "/service/weekplan/create").as("createWeekplan");
    cy.dataCy("create-weekplan-btn").click();
    cy.wait("@createWeekplan");

    //Check if deselected days have an empty recipe card
    cy.dataCy("0-add-recipe-text").should("exist");
    cy.dataCy("1-add-recipe-text").should("exist");
    cy.dataCy("4-add-recipe-text").should("exist");
  });

  it("User should be able to add a recipe to an empty card", () => {
    //Landingpage
    cy.visit("/");
    cy.dataCy("start-planning-btn").click();

    //Login
    cy.dataCy("continue-as-guest-btn").click();
    cy.dataCy("decline-cookies-btn").click();
    cy.intercept("GET", "/setup").as("login");
    cy.wait("@login");

    cy.visit("/weekOverview");
    cy.dataCy("0-add-recipe-btn").click();
  });
});
