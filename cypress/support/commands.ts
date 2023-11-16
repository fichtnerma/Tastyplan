declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute with timeout per ms
     * @example cy.dataCy('greeting', { timeout: 50000 })
     */
    dataCy(value: string, timeout?: number): Chainable<Element>;
    loginDynamicUser(email: string, pw: string, timeout?: number): Chainable<Element>;
  }
}

Cypress.Commands.add('dataCy', (value, timeout) => {
  cy.get(`[data-cy="${value}"]`, { timeout });
});

Cypress.Commands.add('loginDynamicUser', (email: string, pw: string) => {
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

  const signInAndGetToken = () => {
    return cy.request({
      method: "POST",
      url: "http://localhost:8080/api/auth/signin/credentials",
      form: true,
      body: {
        userId: email,
        password: pw,
      },
      followRedirect: false,
    }).then((response) => {
      const redirectUrl = response.headers.location;
      if (redirectUrl) {
        const urlPort8080 = redirectUrl.toString().replace('3000', '8080');
        console.log(urlPort8080)
        return cy.request("GET", urlPort8080);
      } else {
        throw new Error("Redirect URL not found");
      }
    });
  };

  registerUser().then(() => {
    signInAndGetToken().then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});


