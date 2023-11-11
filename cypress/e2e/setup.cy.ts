describe("Setup", () => {
  it("Guest user should be able to set his food lifestyle, intolerances, dislikes and meal behaviour", () => {
    //Landingpage
    cy.visit("/");
    cy.dataCy("start-planning-btn").click();

    //Login
    cy.dataCy("continue-as-guest-btn").should("exist").click();
    cy.intercept("GET", "/setup").as("login");
    cy.wait("@login");

    //Select food lifestyle
    cy.dataCy("vegan-radio-btn").should("exist").check();
    cy.dataCy("next-btn").should("exist").click();

    //Select intolerances
    cy.dataCy("peanut-checkbox").should("exist").check();
    cy.dataCy("walnut-checkbox").should("exist").check();
    cy.dataCy("mustard-checkbox").should("exist").check();
    cy.dataCy("next-btn").should("exist").click();

    //Select dislikes
    const searchTerm = "tomato";

    cy.dataCy("dislikes-search-field")
      .should("exist")
      .type(searchTerm, { delay: 200 });
    cy.wait(200);
    cy.dataCy("item-number-0").should("exist").click();
    cy.dataCy("item-number-1").should("exist").click();
    cy.dataCy("next-btn").should("exist").click();

    //Adjust weekplan

    //Select cooking days
    cy.dataCy("0-checkbox").should("exist").click();
    cy.dataCy("2-checkbox").should("exist").click();
    cy.dataCy("4-checkbox").should("exist").click();

    //Select meals
    cy.dataCy("8-checkbox").should("exist").click();
    cy.dataCy("9-checkbox").should("exist").click();

    //Increase Servings
    for (let i = 0; i < 3; i++) {
      cy.dataCy("increase-serving-btn").should("exist").click();
    }
    cy.dataCy("decrease-serving-btn").should("exist").click();
    cy.dataCy("portion-amount").should("exist").should("have.text", "3");

    //Create Weekplan
    cy.dataCy("create-weekplan-btn").should("exist").click();
    cy.intercept("POST", "/service/weekplan/create").as("createWeekplan");
    cy.wait("@createWeekplan");
  });
});
