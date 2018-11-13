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

function getHouseholdList() {
  return document.querySelector('ol[class="household"]');
}

function getDebug() {
  return document.querySelector('pre[class="debug"]');
}

function getErrorList() {
  return document.querySelector('ul[class="errors"]');
}

// LISTENERS

function addPersonListener() {
  return getAdd().addEventListener("click", handleAddPerson);
}

function addSubmitListener() {
  return getForm().addEventListener("submit", handleSubmitHousehold);
}

function addHouseholdListListener() {
  return getHouseholdList().addEventListener("click", handleRemovePerson);
}

function addListeners() {
  addPersonListener();
  addSubmitListener();
  addHouseholdListListener();
}

// EVENT HANDLERS

function handleAddPerson(e) {
  e.preventDefault();
  processPerson();
}

function handleRemovePerson(e) {
  e.preventDefault();
  if (e.target.name === "remove-person-button") {
    var personId = e.target.dataset.id;
    removePersonById(personId);
  }
}

function handleSubmitHousehold(e) {
  e.preventDefault();
  submitHouseholdAsJSON();
}

// APP

// Initialize id counter for household members
var idCounter = 0;

// Household member array stored in this object as single source of truth,
// and to be used later for serializing household as JSON
var store = {
  submissionNumber: 0,
  household: []
};

// Change age input type to number to make validation easier and UX more obvious.
function setAgeInputType() {
  getAge().type = "number";
}

// Each time a household member is added or removed,
// the household list re-renders from the household store.

// It's an easy way to guarantee the rendered list
// remains in sync with our store.

// The performance cost of re-rendering is minimal,
// as we are dealing with a small dataset
// and the content being rendered is simple text.

function renderHousehold() {
  var householdList = getHouseholdList();
  householdList.innerHTML = "";
  store.household.forEach(function(person) {
    return (householdList.innerHTML += renderPersonLi(person));
  });
}

// Basic styling to:
//  Display household member data in columns for readability
//  Capitalize relationship term
//  Show Smoker/Non-Smoker instead of true/false

// Set data-id attribute of button to the hhId value of the person,
// which is used later to remove the person from the household

function renderPersonLi(person) {
  return (
    "<li style='width: 440px;'><span style='float:left;width:120px'><strong>" +
    capitalizeFirstLetter(person.relationship) +
    "</strong></span><span style='float:left;width:100px'> Age: " +
    person.age +
    "</span><span style='float:left;width:120px'>" +
    smokerBool(person.smoker) +
    '</span><span style="width:100px"><button name="remove-person-button" data-id=' +
    person.hhId +
    ">Remove</button></span></li>"
  );
}

function smokerBool(smoker) {
  return smoker ? "Smoker" : "Non-Smoker";
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Add unordered list element after form for listing errors later
function addErrorList() {
  var errorList = document.createElement("ul");
  errorList.className = "errors";
  errorList.style.color = "red";
  var form = getForm();
  form.parentNode.insertBefore(errorList, form.nextSibling);
}

function renderErrors(errors) {
  var errorList = getErrorList();
  errorList.innerHTML = "";
  errors.forEach(function(error) {
    return (errorList.innerHTML += `<li>${error}</li>`);
  });
}

// ADD PEOPLE

// The validatePerson function returns either an array of errors
// or a person object. Depending on this outcome, processPerson will
// call error rendering or add the person to the household and display them.

function processPerson() {
  var validation = validatePerson();
  return validation.constructor === Array
    ? renderErrors(validation)
    : addPersonToHousehold(validation);
}

// Simple validations here for age > 0 and existence of relationship only.
// Age validation allows for decimal, e.g. children less than 1 year old

// Per instructions, there is no validation for anything else,
// e.g. more than one self, unrealistic age, quantity of parents, etc.

// If there are any errors, the array of errors is returned.
// If there are no errors in validation, the person object is returned

function validatePerson() {
  var errors = [];
  var person = buildPerson();
  if (person.age <= 0) {
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
  var smoker = getSmoker().checked;
  return {
    age: age,
    relationship: relationship,
    smoker: smoker
  };
}

// Once person is validated, they are assigned an id and added to store.
// The household list is then re-rendered from the store.
// focus() Sets focus to first input (age) for ease of entering additional people.
function addPersonToHousehold(person) {
  person.hhId = ++idCounter;
  emptyForm();
  clearErrors();
  store.household.push(person);
  renderHousehold();
  getAge().focus();
}

function clearErrors() {
  getErrorList().innerHTML = "";
}

function emptyForm() {
  getAge().value = "";
  getRelationship().value = "";
  getSmoker().checked = false;
}

// REMOVE PEOPLE

function removePersonById(id) {
  store.household = store.household.filter(function(person) {
    return person.hhId != id;
  });
  renderHousehold();
}

// SUBMIT

// Per instructions, Have not provided validation for an empty household
// or for a household without 'self' relationship in it.
function submitHouseholdAsJSON() {
  store.submissionNumber++;
  var householdJSON = JSON.stringify(store);
  var debug = getDebug();
  debug.innerText = householdJSON;
  debug.style.display = "block";
}

// LOAD

addListeners();
setAgeInputType();
addErrorList();
getAge().focus();
