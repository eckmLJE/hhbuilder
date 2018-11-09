// Validate data entry (age is required and > 0, relationship is required)
// Add people to a growing household list
// Remove a previously added person from the list
// Display the household list in the HTML as it is modified
// Serialize the household as JSON upon form submission as a fake trip to the server

// console.log("index loaded");

var store = {
  household: []
};

// SELECTORS

function getForm() {
  return document.querySelector("form");
}

function getAge() {
  return document.querySelector('input[name="age"]');
}

function getRelationship() {
  return document.querySelector('select[name="rel"]');
}

function getSmoker() {
  return document.querySelector('input[name="smoker"]');
}

function getAdd() {
  return (addButton = document.querySelector(".add"));
}

// EVENT HANDLERS

function handleAddPerson(e) {
  e.preventDefault();
  addPersonToHousehold();
}

function handleSubmitHousehold(e) {
  e.preventDefault();
  console.log("submit household called");
}

// LISTENERS

function addPersonListenerClick() {
  return getAdd().addEventListener("click", handleAddPerson);
}

function addPersonListenerKeyup() {
  return getAdd().addEventListener("keyup", handleAddPerson);
}

function addSubmitListener() {
  return getForm().addEventListener("submit", handleSubmitHousehold);
}

function addListeners() {
  addPersonListenerClick();
  addPersonListenerKeyup();
  addSubmitListener();
}

// APP

function addPersonToHousehold() {
  var validation = validatePerson();
  return validation.constructor === Array
    ? console.log("errors", validation)
    : console.log("person", validation);
}

function buildPerson() {
  var age = getAge().value;
  var relationship = getRelationship().value;
  var smoker = getSmoker().value;
  return {
    age: parseInt(age, 10),
    relationship: relationship,
    smoker: smokerBool(smoker)
  };
}

function validatePerson() {
  var errors = [];
  var person = buildPerson();
  if (person.age <= 0 || person.age === NaN) {
    errors.push("Age must be a number greater than 0");
  }
  if (person.relationship === "") {
    errors.push("Please select relationship");
  }
  console.log(errors);
  return errors.length ? errors : person;
}

function smokerBool(value) {
  return value === "on" ? true : false;
}

// LOAD

addListeners();
