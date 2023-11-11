import { getRandomEmail } from "../support/utils";

describe("Authentication", () => {
  it("Register a new user", () => {
    //Landing page
    cy.visit("/");
    cy.dataCy("start-planning-btn").click();

    //Register page
    const randomEmail = getRandomEmail();
    cy.wait(500); //Wait for animation to take place
    cy.dataCy("e-mail-text-input").type(randomEmail);
    cy.dataCy("password-text-input").type("123456");
    cy.dataCy("repeat password-text-input").type("123456");
    cy.dataCy("register").click();
    cy.intercept("POST", "/service/auth/register").as("registerUser");
    cy.wait("@registerUser");

    //Login page
    cy.dataCy("e-mail-text-input").type(randomEmail);
    cy.dataCy("password-text-input").type("123456");
  });
});
