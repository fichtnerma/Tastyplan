declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute with timeout per ms
     * @example cy.dataCy('greeting', { timeout: 50000 })
     */
    dataCy(value: string, timeout?: number): Chainable<Element>;
    loginDynamicUser(email: string, pw: string): Chainable<Element>;
  }
}

Cypress.Commands.add('dataCy', (value, timeout) => {
  cy.get(`[data-cy="${value}"]`, { timeout });
});

Cypress.Commands.add('loginDynamicUser', (email: string, pw: string) => {

  const loginOptions = {
    username: email,
    password: pw,
    loginUrl: "http://localhost:8080/api/auth/signin",
    headles: true,
    logs: false,

  }
  cy.request({
    method: "POST",
    url: "service/auth/register",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: email,
      password: pw,
      role: "user",
    }),
  }).then(() => {
    cy.request("POST", "/api/auth/signin/credentials").then(({ cookies }) => {
      cy.clearCookies()

      const cookie = cookies.filter((cookie) => cookie.name === 'next-auth.session-token').pop()

      if (cookie) {
        cy.setCookie(cookie.name, cookie.value, {
          domain: cookie.domain,
          expiry: cookie.expires,
          httpOnly: cookie.httpOnly,
          path: cookie.path,
          secure: cookie.secure,
        })

        Cypress.Cookies.defaults({
          preserve: cookieName,
        })
      }

    })
  })
})
