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

function getHouseholdList() {
  return document.querySelector('ol[class="household"]');
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
  console.log("submit household called");
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

// APP

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

// ADD PEOPLE

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
  renderHousehold();
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

// REMOVE PEOPLE

function removePersonById(id) {
  store.household = store.household.filter(function(obj) {
    return obj.id != id;
  });
  renderHousehold();
  console.log(store.household);
}

// LOAD

addListeners();
