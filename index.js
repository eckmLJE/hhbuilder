// Initialize IDs for household members
var idCounter = 0;

// Household member array stored in this object as single source of truth
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
  return document.querySelector('button[class="add"]');
}

function getHouseholdList() {
  return document.querySelector('ol[class="household"]');
}

function getDebug() {
  return document.querySelector('pre[class="debug"]');
}

function getBuilderDiv() {
  return document.querySelector('div[class="builder"]');
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

// Each time a household member is added or removed,
// the entire list re-renders from the household store.

// It's an easy way to keep the rendered list in sync with our store.

// The performance hit of re-rendering is minimal,
// as we are dealing with a small dataset
// and the content being rendered is simple text.

function renderHousehold() {
  var householdList = getHouseholdList();
  householdList.innerHTML = "";
  store.household.forEach(function(person) {
    return (householdList.innerHTML += renderPersonLi(person));
  });
}

function renderPersonLi(person) {
  return `<li>Relationship: ${person.relationship} | Age: ${
    person.age
  } | Smoker: ${person.smoker} <button name="remove-person-button" data-id=${
    person.id
  }>Remove Person</button></li>`;
}

// Add unordered list element after form for listing errors later
// Styling helps user understand and see these errors
function addErrorList() {
  var errorList = document.createElement("ul");
  errorList.className = "errors";
  errorList.style.color = "red";
  errorList.style.fontSize = "1.2em";
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

// Change age input type to number to make validation easier and UX more obvious.
function setAgeInputType() {
  getAge().type = "number";
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

// Once person is validated, they are assigned an id and added to store.
// The household list is then re-rendered from the store.
function addPersonToHousehold(person) {
  person.id = ++idCounter;
  emptyForm();
  clearErrors();
  store.household.push(person);
  renderHousehold();
}

function clearErrors() {
  getErrorList().innerHTML = "";
}

function emptyForm() {
  getAge().value = "";
  getRelationship().value = "";
  getSmoker().checked = false;
}

// Simple validations here for age and relationship.
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

// REMOVE PEOPLE

function removePersonById(id) {
  store.household = store.household.filter(function(obj) {
    return obj.id != id;
  });
  renderHousehold();
}

// SUBMIT

function submitHouseholdAsJSON() {
  var householdJSON = JSON.stringify(store);
  var debug = getDebug();
  debug.innerText = householdJSON;
  debug.style.display = "block";
}

// LOAD

// Would place this in DOMContentLoaded
// if index.js was called at beginning of HTML document.

addListeners();
setAgeInputType();
addErrorList();
