import { getRandomEmail } from "../support/utils";

const randomEmail = getRandomEmail();

describe("Authentication", () => {
  it("Register a new user", () => {
    //Visit registration page
    cy.visit("/authentication/registration");

    //Register a new user
    cy.intercept("POST", "service/auth/register").as("registerUser");
    cy.wait(500); //Wait for animation to take place
    let registerBtn = cy.dataCy("submit-register");
    registerBtn.should("be.disabled");

    //Check invalid email inputs
    cy.dataCy("e-mail-register").focus();
    cy.dataCy("password-register").focus();
    cy.dataCy("error-message-E-Mail").should("have.text", "Required");
    registerBtn = cy.dataCy("submit-register");
    registerBtn.should("be.disabled");
    cy.dataCy("e-mail-register").type("asdf");
    cy.dataCy("password-register").focus();
    cy.dataCy("error-message-E-Mail").should(
      "have.text",
      "Invalid email address",
    );
    registerBtn = cy.dataCy("submit-register");
    registerBtn.should("be.disabled");
    cy.dataCy("e-mail-register").clear();
    cy.dataCy("e-mail-register").type(randomEmail);

    //Check invalid password inputs
    cy.dataCy("error-message-Password").should("have.text", "Required");
    registerBtn = cy.dataCy("submit-register");
    registerBtn.should("be.disabled");
    cy.dataCy("password-register").type("1234");
    cy.dataCy("e-mail-register").focus();
    cy.dataCy("error-message-Password").should(
      "have.text",
      "Password must be at least 6 characters",
    );
    registerBtn = cy.dataCy("submit-register");
    registerBtn.should("be.disabled");
    registerBtn = cy.dataCy("submit-register");
    registerBtn.should("be.disabled");
    cy.dataCy("password-register").clear();
    cy.dataCy("password-register").type("1234567");

    //Check invalid password reapeats
    cy.dataCy("repeat-password-register").focus();
    cy.dataCy("password-register").focus();
    cy.dataCy("error-message-Repeat Password").should("have.text", "Required");
    cy.dataCy("repeat-password-register").type("1234");
    cy.dataCy("password-register").focus();
    cy.dataCy("error-message-Repeat Password").should(
      "have.text",
      "Password must be at least 6 characters",
    );
    cy.dataCy("repeat-password-register").clear();
    cy.dataCy("repeat-password-register").type("1234567");
    registerBtn = cy.dataCy("submit-register");
    registerBtn.should("be.not.disabled");
    cy.dataCy("password-register").focus();

    registerBtn.click();
    cy.wait("@registerUser");
  });

  it("Login registered user", () => {
    //Visit login page
    cy.visit("/authentication/login");

    //Login wrong user
    cy.intercept("POST", "*/auth/callback/*").as("loginUser");
    cy.dataCy("e-mail-login").type(randomEmail);
    cy.dataCy("password-login").type("123456");
    const loginBtn = cy.dataCy("submit-login");
    loginBtn.should("not.be.disabled");
    loginBtn.click();
    cy.wait("@loginUser").its("response.statusCode").should("eq", 401);
    cy.dataCy("text-input-error-msg").should("be.visible");
    cy.dataCy("text-input-error-msg").should(
      "contain",
      "Wrong email or password.",
    );

    //Login correct user
    cy.dataCy("e-mail-login").clear();
    cy.dataCy("e-mail-login").type(randomEmail);
    cy.dataCy("password-login").clear();
    cy.dataCy("password-login").type("1234567");
    loginBtn.click();
  });
});
