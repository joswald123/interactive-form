// Var that references the Name input element
const form = document.querySelector("form");
const nameElement = document.querySelector("#name");
const emailElement = document.querySelector("#email");
// var that references the "Job Role" <select> element.
const jobRoleElement = document.querySelector("#title");
// var that references the "other-job-role" input element.
const otherRoleElement = document.querySelector(".other-job-role");
// var that references the Design drop down menu
const designElement = document.querySelector("#design");
// var that references the Color drop down menu
const colorElement = document.querySelector("#color");
const activitiesElement = document.querySelector("#activities");
console.log(activitiesElement)
const activitiesTotalCost = document.querySelector("#activities-cost");
const paymentsMethodsElement = document.querySelector(".payment-methods");
const cardNumberElement = document.querySelector("#cc-num");
const creditCardOption = document.querySelector("#payment")[1];
const paypalElement = document.querySelector(".paypal");
const bitcoinElement = document.querySelector(".bitcoin");
const creditCardElement = document.querySelector(".credit-card");
const zipCodeElement = document.querySelector("#zip");
const cvvElement = document.querySelector("#cvv");

// var activitiesTotal initialized with zero value
let activitiesTotal = 0;

/**
 * The "Name" field set up as a focus
 * 1. Added a focus state to the Name var above
 */
nameElement.focus();

/**
 * "Job Role" section:
 * 1. the otherRoleElement var is hide by default
 * 2. Event listener for select element
 */

otherRoleElement.style.display = "none";

jobRoleElement.addEventListener("change", (e) => {
  // var that stores the target value
  let value = e.target.value;
  //conditional that makes visible/hidden the otherRoleElement field
  if (value === "other") {
    otherRoleElement.style.display = "";
  } else {
    otherRoleElement.style.display = "none";
  }
});

/**
 * "T-Shirt Info" section:
 * 1. 'Color' drop down menu is disabled until the user choose a design
 * 2. Event listener for theme design select element
 */

colorElement.disabled = true;

designElement.addEventListener("change", (e) => {
  let value = e.target.value;

  for (let i = 0; i < colorElement.length; i += 1) {
    let colorValue = colorElement[i].getAttribute("data-theme");

    if (value === colorValue) {
      colorElement.disabled = false;
      colorElement[i].hidden = false;
    } else if (value != colorValue) {
      colorElement.disabled = false;
      colorElement[i].hidden = true;
    }
  }
});

/**
 * "Register for Activities" section:
 * 1. 'Event listener for Activities select element
 * 2. var activitiesTotal (above) initialized with zero value
 */

activitiesElement.addEventListener("change", (e) => {
  const checked = e.target.checked;
  const costString = e.target.getAttribute("data-cost");
  const cost = parseInt(costString, 10);

  checked ? (activitiesTotal += cost) : (activitiesTotal -= cost);
  activitiesTotalCost.innerHTML = `Total: $${activitiesTotal}`;
});

/**
 * "Payment Info" section:
 * 1.
 * 2.
 */

creditCardOption.setAttribute("selected", "selected");
creditCardElement.selected = true;
paypalElement.style.display = "none";
bitcoinElement.style.display = "none";

/**
 * Event listener for Payments select element
 */
paymentsMethodsElement.addEventListener("change", (e) => {
  let inputValue = e.target.value;

  if (inputValue === "paypal") {
    paypalElement.style.display = "";
    creditCardElement.style.display = "none";
    bitcoinElement.style.display = "none";
  } else if (inputValue === "bitcoin") {
    bitcoinElement.style.display = "";
    paypalElement.style.display = "none";
    creditCardElement.style.display = "none";
  } else if (inputValue === "credit-card") {
    creditCardElement.style.display = "";
    paypalElement.style.display = "none";
    bitcoinElement.style.display = "none";
  }
});

/**
 * Form validation
 * 1.
 * 2.
 */

function validationPass(element) {
  element.parentElement.className = "valid";
  //element.parentElement.lastElementChild.className = 'valid';
  element.parentElement.lastElementChild.classList.remove("not-valid");
  element.parentNode.lastElementChild.hidden = true;
}

function validationFail(element) {
  element.parentNode.className = "not-valid";
  element.parentNode.lastElementChild.className = "error";
  element.parentElement.lastElementChild.classList.remove("valid");
  element.parentNode.lastElementChild.style.display = "";
}

/* Helper function to validate name input */

function nameValidator() {
  // Tests that there is at least a first name containing only letters, and allows for a middle and last name.
  const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(
    nameElement.value
  );

  // if/else statement.
  if (nameIsValid) {
    validationPass(nameElement);
    console.log("Validation passed!");
  } else {
    validationFail(nameElement);
  }
  // If `nameIsValid` equals true, call the `validationPass` function and pass it the `nameElement` variable from above as an argument
  // Else call the `validationFail` function and pass it the `nameElement` variable from above as an argument

  return nameIsValid;
}

/* Helper function to validate email input */
function emailValidator() {
  // Tests that email is validly formatted.
  const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);

  // if/else statement.
  if (emailIsValid) {
    validationPass(emailElement);
    console.log("Validation passed!");
  } else {
    validationFail(emailElement);
  }
  return emailIsValid;
};

/* Helper function to validate Activities section */
function activitiesValidator () {

    // Tests that the `languageTotal` variable provided for you above equals an integer greater than zero.
    const activitiesSectionIsValid = activitiesTotal > 0;
  
    // YOUR CODE GOES HERE!!!
  
    // 3c. Create an if/else statement.
      // If `languageSectionIsValid` equals true, call the `validationPass` function and pass it the `languagesBox` variable from above as an argument
      // Else call the `validationFail` function and pass it the `languagesBox` variable from above as an argument

      if (activitiesSectionIsValid) {
        validationPass(activitiesElement);
        console.log("Validation passed!");
      } else {
        validationFail(activitiesElement);
      }
  
    // Tests that the `languageTotal` variable provided you above equals an integer greater than zero.
    return activitiesSectionIsValid;
  }

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!nameValidator()) {
    console.log("Invalid name prevented submission");
    e.preventDefault();
  }
  if (!emailValidator()) {
    console.log("Invalid name prevented submission");
    e.preventDefault();
  }
  if (!activitiesValidator()) {
    console.log("Invalid name prevented submission");
    e.preventDefault();
  }
});
