import { recipes, recipesHomeDesc } from "../testData/showRecipes";

describe("Homepage", () => {
  it("should render ShowRecipes correctly", () => {
    cy.visit("/");
    cy.dataCy("homepage-down-arrow-btn").click();
    cy.scrollTo(0, 6200, { duration: 1000 });
    cy.dataCy("recipes-home-heading").should(
      "have.text",
      "Simple and Tasty Recipes",
    );
    cy.dataCy("homepage-recipe-wrapper").children().should("have.length", 5);
    cy.dataCy("recipes-home-desc").should("have.text", recipesHomeDesc);
    const recipeNames = cy.dataCy("card-content-name").should("have.length", 5);
    recipeNames.each(($el, index) => {
      cy.wrap($el).should("have.text", recipes[index].name);
    });
    const recipeDietForms = cy
      .dataCy("card-content-dietForm")
      .should("have.length", 5);
    recipeDietForms.each(($el, index) => {
      cy.wrap($el).should("have.text", recipes[index].formOfDiet);
    });
    const recipeTotalTimes = cy
      .dataCy("card-content-total-time")
      .should("have.length", 5);
    recipeTotalTimes.each(($el) => {
      cy.wrap($el).should("contain.text", "min");
    });
  });
});
