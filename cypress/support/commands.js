// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import Ajv from "ajv";
const ajv = new Ajv();

Cypress.Commands.add("validateSchema", (schema, data) => {
  const validate = ajv.compile(schema);
  const isValid = validate(data);
  if (!isValid) {
    const errorMessages = validate.errors.map((error) => {
      return `${error.instancePath} ${error.message}`;
    });
    throw new Error(
      `JSON schema validation failed:\n${errorMessages.join("\n")}`,
    );
  }
  expect(isValid).to.be.true;
});
