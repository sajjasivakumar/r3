import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("the user make a GET request to the API", () => {
  cy.request("/latest/USD").as("apiResponse");
});

When("the response status code should is {int}", (statusCode) => {
  cy.get("@apiResponse").its("status").should("eq", statusCode);
});

Then("the response should contain a valid USD price", () => {
  cy.get("@apiResponse").its("body.rates.AED").should("be.within", 3.6, 3.7);
});

Then("the response should contain a status", () => {
  cy.get("@apiResponse").log("body.result");
  cy.get("@apiResponse").its("body.result").should("exist");
});

Then("the status should be {string}", (expectedStatus) => {
  cy.get("@apiResponse").its("body.result").should("eq", expectedStatus);
});

Then(
  "the USD price against AED should be within range {float} - {float}",
  (minRange, maxRange) => {
    cy.get("@apiResponse")
      .its("body.rates.AED")
      .should("be.within", minRange, maxRange);
  },
);

Then(
  "the number of currency pairs returned should be {int}",
  (expectedCount) => {
    cy.get("@apiResponse")
      .its("body.rates")
      .then((rates) => {
        expect(Object.keys(rates).length).to.equal(expectedCount);
      });
  },
);

Then("the response should match the JSON schema", () => {
  cy.fixture("usdConversionSchema").then((schema) => {
    cy.get("@apiResponse").then((response) => {
      cy.validateSchema(schema, response.body);
    });
  });
});
