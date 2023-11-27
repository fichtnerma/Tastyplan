import { getRandomEmail } from "../support/utils";

const searchTermTomato = "tomato";
const searchTermOnion = "onion";
const pw = "1234567";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

describe("Weekplan", () => {
  beforeEach(() => {
    const randomMail = getRandomEmail();
    cy.loginDynamicUser(randomMail, pw);
  });
  it("User should be able to setup his first weekplan", () => {
    cy.intercept("/service/*", (req) => {
      req.headers["authorization"] = `Bearer ${Cypress.env("token")}`;
    }).as("createWeekplan");
    cy.dataCy("decline-cookies-btn").click();

    //Select food lifestyle
    cy.dataCy("vegan-radio-btn").click({ force: true });

    //Select intolerances
    cy.dataCy("peanut-checkbox").check();
    cy.dataCy("walnut-checkbox").check();
    cy.dataCy("mustard-checkbox").check();
    cy.dataCy("next-btn").click();

    //Select dislikes
    cy.dataCy("search-ingredients").type(searchTermTomato, { delay: 200 });
    cy.wait(200);
    cy.dataCy("item-number-1").click();

    cy.dataCy("clear-search-input").click();

    cy.dataCy("search-ingredients").type(searchTermOnion, { delay: 200 });
    cy.wait(200);
    cy.dataCy("item-number-1").click();
    cy.dataCy("selected-dislike-text-onion").click();

    //Remove one item from chiplist
    cy.dataCy("remove-onion").click();

    cy.dataCy("next-btn").click();

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
  });

  it("User should be able to add a recipe to an empty card", () => {
    cy.intercept("/service/*", (req) => {
      req.headers["authorization"] = `Bearer ${Cypress.env("token")}`;
    }).as("createWeekplan");

    //Select food lifestyle
    cy.dataCy("vegan-radio-btn").click({ force: true });
    cy.dataCy("decline-cookies-btn").click();
    cy.dataCy("next-btn").click();
    cy.dataCy("next-btn").click();

    //Deselect cooking days
    days.forEach((day) => {
      cy.dataCy(`days-${day}-checkbox`).click();
    });

    //Deselect meals
    cy.dataCy("meals-Dinner-checkbox").click();

    //Create Weekplan
    cy.intercept("POST", "/service/weekplan/create").as("createWeekplan");
    cy.dataCy("create-weekplan-btn").click();
    cy.wait("@createWeekplan");

    //Add recipe to empty card
    cy.intercept("*/recipes/recommend/*").as("recommendations");
    cy.intercept("*/weekplan//*").as("createWeekplan");
    cy.dataCy("add-recipe-btn-lunch").first().click({ force: true });
    cy.wait("@recommendations");
    cy.intercept("*/weekplan/changeRecipe").as("changeRecipe");
    cy.wait(500);
    cy.dataCy("choose-recipe-btn")
      .first()
      .trigger("mouseover", { force: true })
      .click({ force: true });
    cy.wait("@changeRecipe");
    cy.visit("/weekOverview");
    cy.wait("@createWeekplan");

    //Get new recommendations
    cy.intercept("*/recipes/recommend/*").as("recommendations");
    cy.dataCy("get-new-recommendations-btn")
      .first()
      .trigger("mouseover", { force: true })
      .click({ force: true });
    cy.wait("@recommendations");
  });
});
