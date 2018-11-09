// Validate data entry (age is required and > 0, relationship is required)
// Add people to a growing household list
// Remove a previously added person from the list
// Display the household list in the HTML as it is modified
// Serialize the household as JSON upon form submission as a fake trip to the server

// console.log("index loaded");

var store = {
  personBuilder: {
    relationship: "",
    age: null,
    smoker: false
  },
  household: []
};

// SELECTORS

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

function getSubmit() {
  return (submitButton = document.querySelector('button[type="submit"'));
}

function getForm() {
  return document.querySelector("form");
}

// EVENT HANDLERS

function handleAddPerson(e) {
  e.preventDefault();
  console.log("add person called");
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

addListeners();
