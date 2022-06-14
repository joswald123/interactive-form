// Var that references the form element
const form = document.querySelector("form");
// Var that references the Name input element
const nameElement = document.querySelector("#name");
// Var that references the email input element
const emailElement = document.querySelector("#email");
// var that references the "Job Role" <select> element.
const jobRoleElement = document.querySelector("#title");
// var that references the "other-job-role" input element.
const otherRoleElement = document.querySelector(".other-job-role");
// var that references the Design drop down menu
const designElement = document.querySelector("#design");
// var that references the Color drop down menu
const colorElement = document.querySelector("#color");
// Var that references the Activity element
const activitiesElement = document.querySelector("#activities");
// Var that references the Activity checkboxes element
const activitiesBoxElm = document.querySelector(".activities-box");
// Var that references the Activity cost value
const activitiesTotalCost = document.querySelector("#activities-cost");
// Var that references all input elements from Activity div 
const activitiesInput = document.querySelectorAll('#activities input')
// Var that references payment methods div
const paymentsMethodsElement = document.querySelector(".payment-methods");
// Var that references the credit card number element
const cardNumberElement = document.querySelector("#cc-num");
 // Variables that references Payment options (Credit Card, paypal & Bitcoin)
const creditCardOption = document.querySelector("#payment")[1];
 // Variables that references Payment options (Credit Card, paypal & Bitcoin) ****
const paypalElement = document.querySelector(".paypal");
const bitcoinElement = document.querySelector(".bitcoin");
const creditCardElement = document.querySelector(".credit-card");
const cardNumElement = document.querySelector("#cc-num");
const zipCodeElement = document.querySelector("#zip");
const cvvElement = document.querySelector("#cvv");
const checkbox = document.querySelectorAll("#activities-box input")
//********

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
 * 2. Event listener change that show/hide the otherRole field according to the request.
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
 * 2. Event listener change that hide/show the color elements according to the option design-theme
 */

colorElement.disabled = true;

designElement.addEventListener("change", (e) => {
  colorElement.disabled = false;
  let value = e.target.value;

  for (let i = 0; i < colorElement.length; i += 1) {
    let colorValue = colorElement[i].getAttribute("data-theme");

    if (value === colorValue) {
      colorElement[i].hidden = false;
      colorElement[i].selected = true;
    } else if (value != colorValue) {
      colorElement[i].hidden = true;
      colorElement[i].selected = false;
    }
  }
});

/**
 * "Register for Activities" section:
 * 1. 'Event listener for Activities select element
 * 2. var activitiesTotal (above) initialized with zero value & count each time a checkbox is selected 
 * according to the data-cost
 */

activitiesElement.addEventListener("change", (e) => {
  const checked = e.target.checked;
  const costString = e.target.getAttribute("data-cost");
  const cost = parseInt(costString, 10);
  const timeValue = e.target.getAttribute("data-day-and-time");
  //console.log(time)
  
  checked ? (activitiesTotal += cost) : (activitiesTotal -= cost);
  activitiesTotalCost.innerHTML = `Total: $${activitiesTotal}`;

// Logic to prevent users from selecting activities that occur at the same time.

//   for(let i=0; i < checkbox.length; i ++) {
//       let time = checkbox[i].getAttribute("data-day-and-time")
//       if (time === timeValue){
//           console.log("matched")
//       }

//   }

});

/**
 * Activities focus state indicator
 * 1. When tabbing through the form's inputs the state of fucus change and blur event fires when an element has lost focus.
 */

activitiesInput.forEach(input => {
    input.addEventListener('focus', e => input.parentElement.classList.add('focus'));
  
    input.addEventListener('blur', e => {
      const active = document.querySelector('.focus');
      if (active) active.classList.remove('focus');
    })
  });

/**
 * "Payment Info section:
 * 1. Selected Credit Card option as a default
 */

creditCardOption.setAttribute("selected", "selected");
creditCardElement.selected = true;
paypalElement.style.display = "none";
bitcoinElement.style.display = "none";

/**
 * Event listener for Payments select element
 * When a change is detected, all payment are hide in the form’s UI except the selected one.
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
 * 1. Users are not able to submit a form without the required information, or with invalid information. 
 * 2. Created 4 helper validation functions (Regex) to prevent the instruction above. (name, email, activity & Credit Card)
 * 3. Created two 
 */

function validationPass(element) {
  element.parentElement.classList.add("valid");
  //element.parentNode.classList.remove = "valid";
  //element.parentElement.lastElementChild.className = 'valid';
  element.parentElement.lastElementChild.className = "error";   
  element.parentElement.lastElementChild.classList.remove("not-valid");
  element.parentNode.lastElementChild.hidden = true;
}

function validationFail(element) {
  element.parentElement.classList.add("not-valid");
  element.parentElement.classList.remove("valid");
  element.parentElement.lastElementChild.className = "error";
  element.parentElement.lastElementChild.classList.remove("valid");
  element.parentElement.lastElementChild.style.display = "";

}

/* Helper function to validate name input with Regex */

function nameValidator() {
  // Tests that there is at least a first name containing only letters, and allows for a middle and last name.
  const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(
  nameElement.value);

  // if/else statement.
  if (nameIsValid) {
    validationPass(nameElement);
    //console.log("Validation passed!");
  } else {
    validationFail(nameElement);
  }

  return nameIsValid;
}

/* Helper function to validate email input with Regex*/
function emailValidator() {
  const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailElement.value);

  if (emailIsValid) {
    validationPass(emailElement);
    //console.log("Validation passed!");
  } else {
    validationFail(emailElement);
  }
  return emailIsValid;
}

/* Helper function to validate Activities section if activitiesTotal has a value or not*/
function activitiesValidator() {
  const activitiesSectionIsValid = activitiesTotal > 0;
 
  if (activitiesSectionIsValid) {
    validationPass(activitiesBoxElm);
    //console.log("Validation passed!"); 
  } else {
    validationFail(activitiesBoxElm);
  }
  return activitiesSectionIsValid;
}

/* Helper function to validate creditCard input fields with Regex */
function creditCardValidator() {
  const cardNumIsValid = /^[0-9]{13,16}$/.test(cardNumElement.value);
  const zipCodeIsValid = /^[0-9]{5}$/.test(zipCodeElement.value);
  const cvvIsValid = /^[0-9]{3}$/.test(cvvElement.value);

  if (cardNumIsValid && zipCodeIsValid && cvvIsValid) {
    validationPass(cardNumElement);
    validationPass(zipCodeElement);
    validationPass(cvvElement);
    //console.log("Validation passed!");
  } else {
    validationFail(cardNumElement);
    validationFail(zipCodeElement);
    validationFail(cvvElement);
  }
  return cardNumIsValid;
}

/**
 * Event Listener 'submit'
 * When the values have been submitted the if statement check if the info is validated or not.
 */
form.addEventListener("submit", (e) => {
  //e.preventDefault();
  if (!nameValidator()) {
    //console.log("Invalid name prevented submission");
    e.preventDefault();
  }
  if (!emailValidator()) {
    //console.log("Invalid name prevented submission");
    e.preventDefault();
  }
  if (!activitiesValidator()) {
    //console.log("Invalid name prevented submission");
    e.preventDefault();
  }
  if (!creditCardValidator()) {
    //console.log("Invalid name prevented submission");
    e.preventDefault();
    
  } else {
     console.log("Validation Passed!");
    window.location.reload();
  
  }
});
