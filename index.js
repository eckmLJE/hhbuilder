// Validate data entry (age is required and > 0, relationship is required)
// Add people to a growing household list
// Remove a previously added person from the list
// Display the household list in the HTML as it is modified
// Serialize the household as JSON upon form submission as a fake trip to the server

var store = {
  idCounter: 0,
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
  return document.querySelector('button[class="add"]');
}

// EVENT HANDLERS

function handleAddPerson(e) {
  e.preventDefault();
  processPerson();
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

function processPerson() {
  var validation = validatePerson();
  return validation.constructor === Array
    ? console.log("errors", validation)
    : addPersonToHousehold(validation);
}

function addPersonToHousehold(person) {
  person.id = ++store.idCounter;
  emptyForm();
  store.household.push(person);
  console.log(store.household);
}

function emptyForm() {
  getAge().value = "";
  getRelationship().value = "";
  getSmoker().checked = false;
}

function validatePerson() {
  var errors = [];
  var person = buildPerson();
  if (person.age <= 0 || isNaN(person.age)) {
    errors.push("Age must be a number greater than 0");
  }
  if (person.relationship === "") {
    errors.push("Please select relationship");
  }
  return errors.length ? errors : person;
}

function buildPerson() {
  var age = getAge().value;
  var relationship = getRelationship().value;
  var smoker = getSmoker().value;
  return {
    age: parseFloat(age),
    relationship: relationship,
    smoker: smokerBool(smoker)
  };
}

function smokerBool(value) {
  return value === "on" ? true : false;
}

// LOAD

addListeners();
