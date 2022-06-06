const nameElement = document.querySelector("#name");
nameElement.focus();

const jobRoleElement = document.querySelector('#title');
//console.log(jobRole);
const otherRoleElement = document.querySelector('.other-job-role');
//console.log(otherRoleElement);
otherRoleElement.style.display = 'none';

jobRoleElement.addEventListener('change', (e) => {
    
    let value = e.target.value;
    //console.log(value);
    if(value === 'other') {
        otherRoleElement.style.display = '';
    } else {
        otherRoleElement.style.display = 'none';
    }
    
});