declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute with timeout per ms
     * @example cy.dataCy('greeting', { timeout: 50000 })
     */
    dataCy(value: string, timeout?: number): Chainable<Element>;
    loginDynamicUser(
      email: string,
      pw: string,
      timeout?: number,
    ): Chainable<Element>;
    loginGuest();
    createEmptyWeekplan(email: string, pw: string): Chainable<Element>;
  }
}

Cypress.Commands.add("dataCy", (value, timeout) => {
  cy.get(`[data-cy="${value}"]`, { timeout });
});

Cypress.Commands.add("loginDynamicUser", (email: string, pw: string) => {
  const registerUser = () => {
    return cy.request({
      method: "POST",
      url: "service/auth/register",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: email,
        password: pw,
        role: "user",
      }),
    });
  };
  registerUser().then(() => {
    cy.visit("/authentication/login");

    //Login newly created user
    cy.dataCy("e-mail-login").type(email);
    cy.dataCy("password-login").type(pw);
    const loginBtn = cy.dataCy("submit-login");
    loginBtn.should("not.be.disabled");
    cy.intercept("GET", "*/auth/session").as("loginUser");
    loginBtn.click();
    cy.wait("@loginUser").then((interception) => {
      console.log(interception.response.body.user.token.Authorization);
      const bearerValue = interception.response.body.user.token.Authorization;
      cy.setCookie("token", bearerValue);
      Cypress.env("token", bearerValue);
    });
  });
});

Cypress.Commands.add("loginGuest", () => {
  cy.intercept("GET", "*/auth/session").as("guestUser");
  cy.visit("/authentication/registration");
  cy.dataCy("decline-cookies-btn").click();
  cy.dataCy("continue-as-guest-btn").click();
  cy.wait("@guestUser");
  cy.dataCy("vegan-radio-btn").click({ force: true });
  cy.dataCy("next-btn").click();
  cy.dataCy("next-btn").click();
  cy.intercept("POST", "/service/weekplan/create").as("createWeekplan");
  cy.dataCy("create-weekplan-btn").click();
  cy.wait("@createWeekplan");
});

Cypress.Commands.add("createEmptyWeekplan", (email: string, pw: string) => {
  cy.loginDynamicUser(email, pw);
  cy.intercept("/service/*", (req) => {
    req.headers["authorization"] = `Bearer ${Cypress.env("token")}`;
  }).as("createWeekplan");
  cy.dataCy("decline-cookies-btn").click();

  //Set everything to have a empty weekplan
  cy.dataCy("vegan-radio-btn").click({ force: true });
  cy.dataCy("next-btn").click();
  cy.dataCy("next-btn").click();
  cy.dataCy("days-Monday-checkbox").click();
  cy.dataCy("days-Tuesday-checkbox").click();
  cy.dataCy("days-Wednesday-checkbox").click();
  cy.dataCy("days-Thursday-checkbox").click();
  cy.dataCy("days-Friday-checkbox").click();
  cy.dataCy("days-Saturday-checkbox").click();
  cy.dataCy("days-Sunday-checkbox").click();
  cy.intercept("POST", "/service/weekplan/create").as("createWeekplan");
  cy.dataCy("create-weekplan-btn").click();
  cy.wait("@createWeekplan");
});
