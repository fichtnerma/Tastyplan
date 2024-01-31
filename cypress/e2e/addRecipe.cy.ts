import { getRandomEmail } from "../support/utils";

const ingredients = [
  {
    name: "agave",
    amount: "2",
    unit: "g",
  },
  {
    name: "applesauce",
    amount: "5",
    unit: "ml",
  },
  {
    name: "borage",
    amount: "6",
    unit: "kg",
  },
  {
    name: "marjoram",
    amount: "8",
    unit: "l",
  },
];

const steps = [
  "This is the first step",
  "This is the second step",
  "This is the third step",
];

describe("Add Recipe", () => {
  beforeEach(() => {
    const randomMail = getRandomEmail();
    cy.createEmptyWeekplan(randomMail, "1234567");
  });
  it("User should be able to add a custom Recipe", () => {
    //Navigate to addRecipe-route
    cy.dataCy("navigate-cookbock-link").click();
    cy.dataCy("add-own-recipe-link").click();

    //Test error state of name
    cy.dataCy("input-recipe-name").focus();
    cy.dataCy("input-recipe-name").blur();
    cy.dataCy("error-message-Name").should("have.text", "Required");
    cy.dataCy("recipe-next-btn").should("be.disabled");
    cy.dataCy("input-recipe-name").type("New Recipe");
    cy.dataCy("input-recipe-name").blur();
    cy.dataCy("error-message-Name").should("not.have.text", "Required");

    //Test image upload
    cy.fixture("sample.jpg", null).as("imgFixture");
    cy.dataCy("add-img-label").selectFile("@imgFixture");
    cy.dataCy("uploaded-img").should("be.visible");
    cy.dataCy("remove-img-btn").click();
    cy.dataCy("add-img-label").selectFile("@imgFixture");
    cy.dataCy("recipe-back-btn").should("be.disabled");
    cy.dataCy("recipe-next-btn").should("not.be.disabled");
    cy.dataCy("recipe-next-btn").click();

    //Test key facts
    cy.dataCy("recipe-back-btn").should("not.be.disabled");
    cy.dataCy("recipe-next-btn").should("not.be.disabled");
    cy.dataCy("recipe-back-btn").click();
    cy.dataCy("recipe-next-btn").click();
    cy.dataCy("cooking-time-input").type("20");
    for (let n = 0; n < 5; n++) {
      cy.dataCy("increase-serv-btn").click();
    }
    cy.dataCy("portion-amount").should("have.text", "6");
    for (let n = 0; n < 2; n++) {
      cy.dataCy("decrease-serv-btn").click();
    }
    cy.dataCy("portion-amount").should("have.text", "4");

    //Test form of diet
    cy.get("input[aria-label=foodLifeStyle]").type("vegan").type("{enter}");

    //Add some tags
    cy.get("input[aria-label=recipeTags]").type("cuisine").type("{enter}");
    cy.get("input[aria-label=recipeTags]").type("european").type("{enter}");
    cy.get("input[aria-label=recipeTags]").type("side dish").type("{enter}");
    cy.get("input[aria-label=recipeTags]").type("main dish").type("{enter}");
    cy.dataCy("recipe-next-btn").click();

    //Add and remove some ingredients
    cy.dataCy("recipe-next-btn").should("be.disabled");
    for (const ingredient of ingredients) {
      cy.get("#selectIngredient")
        .type(ingredient.name, { delay: 200 })
        .type("{enter}");
      cy.dataCy("ingredient-amount-input").type(ingredient.amount);
      cy.get("input[aria-label=unit]").type(ingredient.unit).type("{enter}");
      cy.dataCy("add-ingredient-btn").click();
      cy.dataCy("recipe-next-btn").should("not.be.disabled");
    }
    cy.dataCy("ingredients-wrapper").children().should("have.length", 4);
    cy.dataCy("remove-ingredient-agave syrup-btn").click();
    cy.dataCy("remove-ingredient-marjoram-btn").click();
    cy.dataCy("ingredients-wrapper").children().should("have.length", 2);
    cy.dataCy("recipe-next-btn").click();

    //Add and remove some steps
    cy.dataCy("recipe-create-btn").should("be.disabled");
    for (const step of steps) {
      cy.dataCy("step-desc-input").type(step);
      cy.dataCy("add-new-step-btn").click();
      cy.dataCy("recipe-create-btn").should("not.be.disabled");
    }
    cy.dataCy("delete-step-1-btn").click();
    cy.dataCy("delete-step-2-btn").click();
    cy.intercept("POST", "/service/recipes/create").as("createNewRecipe");
    cy.dataCy("recipe-create-btn").click();
    cy.wait("@createNewRecipe");
  });
});
