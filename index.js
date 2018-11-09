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
  return document.querySelector(".add");
}

function getSubmit() {
  return document.querySelector('button[type="submit"');
}
