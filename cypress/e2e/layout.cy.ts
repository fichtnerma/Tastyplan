import { getRandomEmail } from "../support/utils";
import "cypress-real-events";

describe("Layout", () => {
  it("MainHeader should render content for registered user correctly", () => {
    const randomMail = getRandomEmail();
    cy.createEmptyWeekplan(randomMail, "1234567");

    cy.dataCy("main-header-wrapper").should("be.visible");
    cy.dataCy("main-header-week-overview-link").should("be.visible");
    cy.dataCy("main-header-cookbook-link").should("be.visible");
    cy.dataCy("main-header-user-dropdown").realHover();
    cy.wait(1000);
    cy.dataCy("main-header-settings-link").should("be.visible");
    cy.dataCy("main-header-logout-link").should("be.visible");
    cy.dataCy("main-header-registration-link").should("not.exist");
  });
  it("MainHeader should render content for guest user correctly", () => {
    cy.loginGuest();
    cy.dataCy("main-header-wrapper").should("be.visible");
    cy.dataCy("main-header-week-overview-link").should("be.visible");
    cy.dataCy("main-header-cookbook-link").should("be.visible");
    cy.dataCy("main-header-user-dropdown").realHover();
    cy.wait(1000);
    cy.dataCy("main-header-registration-link").should("be.visible");
    cy.dataCy("main-header-settings-link").should("not.exist");
    cy.dataCy("main-header-logout-link").should("not.exist");
  });
});
