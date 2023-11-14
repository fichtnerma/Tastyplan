import { getRandomEmail } from "../support/utils";

const randomEmail = getRandomEmail();

describe("Authentication", () => {
  it("Register a new user", () => {
    //Visit registration page
    cy.visit("/authentication/registration");

    //Register a new user
    cy.intercept("POST", "service/auth/register").as("registerUser");
    cy.wait(500); //Wait for animation to take place
    cy.dataCy("e-mail-register").type(randomEmail);
    cy.dataCy("password-register").type("123456");
    cy.dataCy("repeat-password-register").type("123456");
    const registerBtn = cy.dataCy("submit-register");
    registerBtn.should("not.be.disabled");
    registerBtn.click();
    cy.wait("@registerUser");
  });

  it("Login registered user", () => {
    //Visit login page
    cy.visit("/authentication/login");

    //Login newly created user
    cy.intercept("GET", "*/auth/*").as("loginUser");
    cy.dataCy("e-mail-login").type(randomEmail);
    cy.dataCy("password-login").type("123456");
    const loginBtn = cy.dataCy("submit-login");
    loginBtn.should("not.be.disabled");
    loginBtn.click();
    cy.wait("@loginUser");
  });
});
