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
      timeout?: number
    ): Chainable<Element>;
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
      console.log(interception.response.body.user.token.Authorization)
      cy.setCookie('token', interception.response.body.user.token.Authorization)
    });
  })
});
