
// Var that references the Name input element
const nameElement = document.querySelector("#name");
// Added a focus state to the Name var above
nameElement.focus();

// var that references the "Job Role" <select> element.
const jobRoleElement = document.querySelector('#title');

// var that references the "other-job-role" input element.
const otherRoleElement = document.querySelector('.other-job-role');
// the otherRoleElement var is hide by default 
otherRoleElement.style.display = 'none';

/**
 * Event listener for select element
 */
jobRoleElement.addEventListener('change', (e) => {
    // var that stores the target value
    let value = e.target.value;
    //conditional that makes visible/hidden the otherRoleElement field
    if(value === 'other') {
        otherRoleElement.style.display = '';
    } else {
        otherRoleElement.style.display = 'none';
    }
    
});

// var that references the Design drop down menu
const designElement = document.querySelector("#design");
// var that references the Color drop down menu
const colorElement = document.querySelector("#color");

// 'Color' drop down menu is disabled until the user choose a design
colorElement.disabled = true;


/**
 * Event listener for theme design select element
 */
designElement.addEventListener('change', e => {
    let value = e.target.value;
 
 
    for(let i=0; i < colorElement.length; i +=1) {
        let colorValue = colorElement[i].getAttribute('data-theme');

        if(value === colorValue) {
            colorElement.disabled = false;
            colorElement[i].hidden = false;

            
        } else if (value != colorValue) {
            colorElement.disabled = false;
            colorElement[i].hidden = true;
        
        } 
        
    }
   
}); 


const activitiesElement = document.querySelector('#activities');
const activitiesTotalCost = document.querySelector('#activities-cost');
let activitiesTotal = 0;

/**
 * Event listener for Activities select element
 */
activitiesElement.addEventListener('change', e =>{
    const checked = e.target.checked;
    const costString = e.target.getAttribute('data-cost');
    const cost = parseInt(costString, 10);

    (checked) ? activitiesTotal += cost : activitiesTotal-=cost;
    activitiesTotalCost.innerHTML = `Total: $${activitiesTotal}`
});



const paymentsMethodsElement = document.querySelector('.payment-methods');
const creditCardOption = document.querySelector('#payment')[1];
const paypalElement = document.querySelector('.paypal');
const bitcoinElement = document.querySelector('.bitcoin');
const creditCardElement = document.querySelector('.credit-card');

creditCardOption.setAttribute('selected','selected');
creditCardElement.selected = true;
paypalElement.style.display = 'none';
bitcoinElement.style.display = 'none';

/**
 * Event listener for Payments select element
 */
paymentsMethodsElement.addEventListener('change', e =>{
    let inputValue = e.target.value;

    if (inputValue === 'paypal') {
        paypalElement.style.display = '';
        creditCardElement.style.display = 'none';
        bitcoinElement.style.display = 'none';
    } else if (inputValue === 'bitcoin') {
        bitcoinElement.style.display = '';
        paypalElement.style.display = 'none';
        creditCardElement.style.display = 'none';
    } else if (inputValue === 'credit-card') {
        creditCardElement.style.display = '';
        paypalElement.style.display = 'none';
        bitcoinElement.style.display = 'none';
    }
})


