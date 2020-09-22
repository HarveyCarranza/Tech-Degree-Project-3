/**
 * Selections for use throughout the program. Declared these globally as I 
 * expected to use them multiple times. Some I may not have though.
 * Curious, is there such a thing as too many selections?
 */
const form = document.querySelector('form');
const otherTitle = document.querySelector('#other-title');
const nameField = document.querySelector('input#name');
const emailField = document.querySelector('input#mail');
const jobRole = document.querySelector('select#title');
const colorSelect = document.querySelector('select#color');
const designSelect = document.querySelector('select#design');
const jsPun = colorSelect.querySelectorAll('#js-puns');
const heartShirt = colorSelect.querySelectorAll('#heart-js');
const activitiesBox = document.querySelector('.activities');
const activityOptions = document.querySelectorAll('.activities input');
let selectionError = document.querySelector('.activities legend');
const paymentSelector = document.querySelector('select#payment');
const creditCardDiv = document.querySelector('div#credit-card');
const ccNum = document.querySelector('input#cc-num');
const zipCode = document.querySelector('input#zip');
const cvv = document.querySelector('input#cvv');
const colorLabel = colorSelect.previousElementSibling;

/** Function that fires off all of the initial set up */
function initialSetUp() {
    /** setting focus on the element with the ID Name as soon as the page loads. */
    document.getElementById('name').focus();
    /** Setting the display to none for the otherTitle text area on page load
     * Same for colorSelect and colorLabel
     */
    otherTitle.style.display = 'none';
    colorSelect.style.display = 'none';
    colorLabel.style.display = 'none';
    /** Declaring a new letiable and creating a paragraph element within it */
    let pleaseSelect = document.createElement('p');
    /** Setting the text of the newly created p element */
    pleaseSelect.innerHTML = 'Please select a t-shirt theme';
    /** attaching the new p element to the colorSelect  */
    colorSelect.parentNode.appendChild(pleaseSelect);

    /**Aded an event listener to the jobRole drop down selecter
     * Set the trigger to change. Any time the selection is changed the handler
     * is listening to see if the other value is selected
     * if it is, the display for otherTitle is set to empty which will
     * then display the text area.
     */
    jobRole.addEventListener('change', () => {
        if (jobRole.value == 'other') {
            otherTitle.style.display = '';
            } else {
                otherTitle.style.display = 'none';
            }
    });

    /** Pretty much the same as the jobRole
     *  When the value of the selected option is equal to anything specified
     * They'll enter the correct if conditional and then have items hidden and disabled as needed.
     */
    designSelect.addEventListener('change', () => {
        if (designSelect.value == 'js puns') {
            colorSelect.style.display = '';
            pleaseSelect.style.display = 'none';
            colorLabel.style.display = '';

            /** For loop that loops through items with the  */
            for(let i = 0; i < jsPun.length; i++){
                jsPun[i].disabled = false;
                jsPun[i].style.display = '';
            }
            for(let i = 0; i < heartShirt.length; i++){
                heartShirt[i].disabled = true;
                heartShirt[i].style.display = 'none';
            } 
                colorSelect.value = jsPun[0].value;

            } else if (designSelect.value == 'heart js') {
                colorSelect.style.display = '';
                pleaseSelect.style.display = 'none';
                colorLabel.style.display = '';
                for(let i = 0; i < heartShirt.length; i++){
                    jsPun[i].disabled = true;
                    jsPun[i].style.display = 'none';
                }
                for(let i = 0; i < jsPun.length; i++){
                    heartShirt[i].disabled = false;
                    heartShirt[i].style.display = '';
                } colorSelect.value = heartShirt[0].value;
                    } else {
                        pleaseSelect.style.display = '';
                        colorSelect.style.display = 'none';
                        colorLabel.style.display = 'none';

        }
    });
    activitiesRegistration();
    payment();
    liveValidators();
};

let selectionMessage = document.createElement('p');

function activitiesRegistration(){
    let priceDiv = document.createElement('div');
    let priceText = document.createElement('p');
    selectionMessage.textContent = 'Please make a selection';
    selectionMessage.style.color = 'red';
    selectionMessage.style.fontSize = 'small';
    selectionError.appendChild(selectionMessage);
    selectionMessage.style.display = 'none';
    priceDiv.appendChild(priceText);
    activitiesBox.appendChild(priceDiv);
    let runningTotal = 0;
    document.querySelector('.activities').addEventListener('change', (e) => {
        let clicked = e.target;
        let clickedTime = e.target.getAttribute('data-day-and-time');
        let price = parseInt(e.target.getAttribute('data-cost'));
        runningTotal += price;
        priceText.innerHTML = 'Total Cost: $' + runningTotal;
        selectionMessage.style.display = 'none';
        for(let i = 0; i < activityOptions.length; i++){
            let activityTimes = activityOptions[i].getAttribute('data-day-and-time');
            if(clickedTime === activityTimes && clicked !== activityOptions[i]){
                activityOptions[i].disabled = true;
                if(clicked.checked){
                    activityOptions[i].disabled = true;
                } else {
                    activityOptions[i].disabled = false;  
                }
            }
       } if(!clicked.checked){
            runningTotal -= (price * 2);
            priceText.innerHTML = 'Total Cost: $' + runningTotal;
         }

         if (runningTotal === 0){
            priceDiv.style.display = 'none';
         } else {
            priceDiv.style.display = '';
         }
    });

}

function payment(){
    const paymentOptions = document.querySelectorAll('#payment option');
    const paypalDiv = document.querySelector('div#paypal');
    const bitcoinDiv = document.querySelector('div#bitcoin');
    paymentOptions[0].disabled = true;

    paymentSelector.value = paymentOptions[1].value;
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';

    paymentSelector.addEventListener('change', (e) => {
        if(paymentSelector.value === paymentOptions[1].value){
            paypalDiv.style.display = 'none';
            bitcoinDiv.style.display = 'none';
            creditCardDiv.style.display = '';
        } else if(paymentSelector.value === paymentOptions[2].value){
            creditCardDiv.style.display = 'none';
            paypalDiv.style.display = '';
            bitcoinDiv.style.display = 'none';
        } else if(paymentSelector.value === paymentOptions[3].value){
            creditCardDiv.style.display = 'none';
            paypalDiv.style.display = 'none';
            bitcoinDiv.style.display = '';
        } 
    });
}

const nameValidator = (e) => {
    let name = nameField.value;
    if(name.length > 0){
        nameField.style.borderColor = 'green';
        return true;
    } else {
        nameField.style.borderColor = 'red';
        return false;
    }
}

const emailValidator = (e) => {
    let emailValue = emailField.value;
    let atIndexOf = emailValue.indexOf('@');
    let dotIndexOf = emailValue.lastIndexOf('.');
    if(atIndexOf > 1 && dotIndexOf > (atIndexOf + 1)){
        emailField.style.borderColor = 'green';
        return true;
    } else {
        emailField.style.borderColor = 'red';
        return false;
    }
}

const activityValidator = (e) => {
    for (let i = 0; i < activityOptions.length; i++){
    if(activityOptions[i].checked){
        return true;
        }   
    }   selectionMessage.style.display = '';
        return false;

}

let cardReg = /^\d{13,16}$/;
let zipReg = /^\d{5}$/;
let cvvReg = /^\d{3}$/;

form.addEventListener('submit', (e) => {
    let name = nameValidator();
    let email = emailValidator();
    let activity = activityValidator();
    let creditCard = creditCardChecker(cardReg, ccNum);
    let zip = creditCardChecker(zipReg, zipCode);
    let cardcvv = creditCardChecker(cvvReg, cvv);

    if(!name){
        e.preventDefault();
    }

    if(!email){
        e.preventDefault();
    }

    if (!activity){
        e.preventDefault;
    }

    if(!creditCard){
        e.preventDefault();
    }

    if(!zip){
        e.preventDefault();
    }

    if(!cardcvv){
        e.preventDefault();
    }

});

const creditCardValidator = (e) => {
    creditCardDiv.addEventListener('focusout', (e) => {
        let activeField = e.target.id;
        if(activeField == 'cc-num'){
            creditCardChecker(cardReg, ccNum);
        } else if (activeField =='zip'){
            creditCardChecker(zipReg, zipCode);
        } else if (activeField == 'cvv'){
            creditCardChecker(cvvReg, cvv);
        }
    });
}

function creditCardChecker(reg, field){
    if(!reg.test(field.value)){
        field.style.borderColor = 'red';
        return false;
    } else if(reg.test(field.value)){
        field.style.borderColor = 'green';
        return true;
    }
}

function liveCreditCardError(){
    let cardN = ccNum.value.length;
    let creditError = document.createElement('p');
    creditError.style.color = 'red';
    creditError.style.fontSize = 'small';
    creditCardDiv.appendChild(creditError);
    creditError.style.display = 'none';
    creditCardDiv.addEventListener('focusout', (e) => {
        if(cardN >= 3 && cardN <= 12){
            creditError.textContent = 'Please enter a number that is between 13 and 16 digits long'; 
            creditError.style.display = '';
        }
    })
}

function liveValidators (){

    nameField.addEventListener('keypress', (e) => {
        nameValidator();
    });
    
    emailField.addEventListener('change', (e) => {
        emailValidator();
    });

    creditCardValidator();

    liveCreditCardError();
}


initialSetUp();