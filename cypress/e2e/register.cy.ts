import { getRandomEmail } from "../support/utils";

const randomEmail = getRandomEmail();

describe("Authentication", () => {
  it("Register a new user", () => {
    cy.visit("/authentication/registration");

    cy.intercept("POST", "service/auth/register").as("registerUser");
    cy.wait(500); //Wait for animation to take place
    cy.dataCy("e-mail-register").should("exist").type(randomEmail);
    cy.dataCy("password-register").should("exist").type("123456");
    cy.dataCy("repeat-password-register").should("exist").type("123456");
    cy.dataCy("submit-register")
      .should("exist")
      .should("not.be.disabled")
      .click();
    cy.wait("@registerUser");
  });
  it("Login registered user", () => {
    cy.visit("/authentication/login");

    cy.intercept("GET", "*/auth/*").as("loginUser");
    cy.dataCy("e-mail-login").should("exist").type(randomEmail);
    cy.dataCy("password-login").should("exist").type("123456");
    cy.dataCy("submit-login").should("exist").should("not.be.disabled").click();
    cy.wait("@loginUser");
  });
});
