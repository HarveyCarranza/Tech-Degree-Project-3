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
     *  They'll enter the correct if conditional and then have items hidden and disabled as needed.
     *  If js puns is the value of the user selected drop down then we enter the if conditional.
     */
    designSelect.addEventListener('change', () => {
        if (designSelect.value == 'js puns') {
            colorSelect.style.display = '';
            pleaseSelect.style.display = 'none';
            colorLabel.style.display = '';

            /** For loop that loops through items with the value of js puns */
            for(let i = 0; i < jsPun.length; i++){
                /**I'm making sure the items with js puns as the value
                 * are not hidden and are enabled
                 */
                jsPun[i].disabled = false;
                jsPun[i].style.display = '';
            }
            /** This for loop disables all of the js heart value items and then hides them */
            for(let i = 0; i < heartShirt.length; i++){
                heartShirt[i].disabled = true;
                heartShirt[i].style.display = 'none';
            } 
                colorSelect.value = jsPun[0].value;
            /** Does everything the if before does but reversed since this is if the heart js 
             *  drop down option is selected.
             */
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

    /** Calling the activitiesRegistration, payment, and liveValidators within my initial
     * setup function to have everything I need run on page load.
     */
    activitiesRegistration();
    payment();
    liveValidators();
};
//declared this globally as I used it in another function
let selectionMessage = document.createElement('p');
    /** Function that handles all of the activity registration actions */
function activitiesRegistration(){
    //creating two elements a div and a paragraph
    let priceDiv = document.createElement('div');
    let priceText = document.createElement('p');
    // setting the text content of selectionMessage.
    selectionMessage.textContent = 'Please make a selection';
    // changing the color and text size
    selectionMessage.style.color = 'red';
    selectionMessage.style.fontSize = 'small';
    // adding selection message to the legend element with the class activities
    selectionError.appendChild(selectionMessage);
    //setting the display to none so the message is not visible until the error occurs
    selectionMessage.style.display = 'none';
    priceDiv.appendChild(priceText);
    activitiesBox.appendChild(priceDiv);
    //declaring a variable to store the running total as activities are selected
    let runningTotal = 0;
    //selecting the fieldset with the activities class and setting a listener to any changes
    document.querySelector('.activities').addEventListener('change', (e) => {
        //setting the value of clicked to whatever the user clicks within the fieldset
        let clicked = e.target;
        /** storing the attribute (date and time value) with the 
         * id data-day-and-time within clickedTime
         * We'll call this DDT for short
         */
        let clickedTime = e.target.getAttribute('data-day-and-time');
        // storing the price value and parsing the value to an int as it 
        //had a 0 before the number in the formatting
        let price = parseInt(e.target.getAttribute('data-cost'));
        //whenever a change occurs we add the price to our running total
        runningTotal += price;
        //whenever a change occurs we update the running total on the page
        priceText.innerHTML = 'Total Cost: $' + runningTotal;
        //when a selection is made we hide the selection message as it's no longer needed
        selectionMessage.style.display = 'none';
        //Loops through all of the activity options
        for(let i = 0; i < activityOptions.length; i++){
            // storing the value of the date and time for each checkbox through the loop
            let activityTimes = activityOptions[i].getAttribute('data-day-and-time');
            /**Checking to see if the selected DDT value is equal to the currently looped value
             * and if it is we disable the option preventing same timed activities from being selected
             * we also further specify the if conditional by checking to see if the clicked time
             * does not equal the currently looped option as we do not want to disable the selected option
             */
            if(clickedTime === activityTimes && clicked !== activityOptions[i]){
                activityOptions[i].disabled = true;
                //to be honest i didn't really follow this in the prep assignment
                //I just understood that this let's us undo what we've done
                //It seemed that this let's us enable the disabled option when the selected 
                //time was deselected
                //My attempt at understanding it is if e.target.checked is true
                //If the box is checked which it wont be because we just unchecked it
                //we enable all of the options with the same DDT
                //hmm writing it out might have actually helped me understand it better
                if(clicked.checked){
                    activityOptions[i].disabled = true;
                    //if clicked.checked is not true, do not disable the option
                } else {
                    activityOptions[i].disabled = false;  
                }
            }
            /**Checking to see if the value of clicked.checked is false
             * if it is false then we enter the loop and subtract the value of price
             * from runningTotal
             * It has to be double the value because we're adding in the value once
             * at the same time when the activityOption is selected (clicked on) again
             */
       } if(!clicked.checked){
            runningTotal -= (price * 2);
            priceText.innerHTML = 'Total Cost: $' + runningTotal;
         }
         // If running total is 0, I hide the priceDiv which holds the running total
         if (runningTotal === 0){
            priceDiv.style.display = 'none';
         } else {
             //display priceDiv when running total is equal to anything other than 0
            priceDiv.style.display = '';
         }
    });

}

function payment(){
    // more selection goodness
    const paymentOptions = document.querySelectorAll('#payment option');
    const paypalDiv = document.querySelector('div#paypal');
    const bitcoinDiv = document.querySelector('div#bitcoin');
    //disabling the 'select payment option' option but not hiding 
    //because I thought it looked nice and serves as instructions
    paymentOptions[0].disabled = true;
    //setting the displayed option to credit card by default on page load
    paymentSelector.value = paymentOptions[1].value;
    // Hiding both the paypal and bitcoin paragraps
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';

    // added an event listener to the payment selector
    // to change what is displayed based on what is selected.
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
// name validator function
const nameValidator = (e) => {
    // store the value in the namefield in name
    let name = nameField.value;
    //check to see if the length is greater than 0
    //if it is change the border to green and return true
    if(name.length > 1){
        nameField.style.borderColor = 'green';
        return true;
    } else {
        // if it's not true, change the border to red and return false
        nameField.style.borderColor = 'red';
        return false;
    }
}
//email validator function
const emailValidator = (e) => {
    let emailReg = /^[\w\s@_!#$%^&*()<>?/|}{~:\]]*@\w*(.)[^@]\w*/;
    //storing the value of the email field to emailValue
    let emailValue = emailField.value;
    // finding and storing the number at which the @ appears in the email value
    let atIndexOf = emailValue.indexOf('@');
    // finding and storing the number of the last '.' in the email value
    let dotIndexOf = emailValue.lastIndexOf('.');
    // checking to see if the atindex is greater than 1
    // and if the dotindex is greater than the atindex
    if(atIndexOf > 1 && dotIndexOf > (atIndexOf + 1) && emailReg.test(emailValue) == true){
        emailField.style.borderColor = 'green';
        return true;
    } else {
        emailField.style.borderColor = 'red';
        return false;
    }
}
// activity validator function
const activityValidator = (e) => {
    // for loop that cycles through all of the options and sees if they are checked
    for (let i = 0; i < activityOptions.length; i++){
    // if a value is checked return true
    if(activityOptions[i].checked){
        return true;
        }   // if no value is checked exit the loop show the message and return false to prevent default
    }   selectionMessage.style.display = '';
        return false;

}
//regEx for credit card, zip code, and cvv
let cardReg = /^\d{13,16}$/;
let zipReg = /^\d{5}$/;
let cvvReg = /^\d{3}$/;

//event listener on the form when it submits
form.addEventListener('submit', (e) => {
    //upon submit declare and call name, email, and activity validator
    let name = nameValidator();
    let email = emailValidator();
    let activity = activityValidator();

    // if name is false prevent default
    if(!name){
        e.preventDefault();
    }
    // if email is false prevent default
    if(!email){
        e.preventDefault();
    }
    // if activity is false prevent default
    if (!activity){
        e.preventDefault();
    }
    // only check and prevent defaults if the credit card option is selected
    if(paymentSelector.value == paymentSelector[1].value){
        // if credit card is selected call and declare the following with the following parameters
        let creditCard = creditCardChecker(cardReg, ccNum);
        let zip = creditCardChecker(zipReg, zipCode);
        let cardCvv = creditCardChecker(cvvReg, cvv);

        // if creditCard is false prevent default
        if(!creditCard){
            e.preventDefault();
        }
        // if zip is false prevent default   
        if(!zip){
            e.preventDefault();
        }
        // if cardCvv is false prevent default
        if(!cardCvv){
            e.preventDefault();
        }
    }

});

const creditCardValidator = (e) => {
    // setting a listener to the creditcarddiv that activates on focusout
    creditCardDiv.addEventListener('focusout', (e) => {
        //setting activeField to the id of what is selected
        let activeField = e.target.id;
        //if the id is any of the following call the function with the indicated parameters
        if(activeField == 'cc-num'){
            creditCardChecker(cardReg, ccNum);
        } else if (activeField =='zip'){
            creditCardChecker(zipReg, zipCode);
        } else if (activeField == 'cvv'){
            creditCardChecker(cvvReg, cvv);
        }
    });
}
// function used to check if the credit card #, zip code, and cvv are valid
// based on the regEx
function creditCardChecker(reg, field){
    if(!reg.test(field.value)){
        field.style.borderColor = 'red';
        return false;
    } else if(reg.test(field.value)){
        field.style.borderColor = 'green';
        return true;
    }
}
//function I used to have the live error message appear for credit card #
function liveCreditCardError(){
    //declare then modify creditError's properties (I think they're called properties)
    let creditError = document.createElement('p');
    creditError.style.color = 'red';
    creditError.style.fontSize = 'small';
    // attaching the credit error message to the parent of ccNum
    ccNum.parentNode.appendChild(creditError);
    // hide the message at first
    creditError.style.display = 'none';
    // listener based on focusout added to ccNum for the live message
    ccNum.addEventListener('focusout', (e) => {
        //store the length of the ccNum value in cardN
        // if credit card number is less than 13 but greater than 8 show error message
        let cardN = ccNum.value.length;
        if(cardN <= 13 && cardN >= 8){
            creditError.textContent = 'Please enter a number that is between 13 and 16 digits long'; 
            creditError.style.display = '';
        } else if(cardN == 0){
            creditError.textContent = 'Credit Card field is empty';
            creditError.style.display = '';
        } else {
            //hide the message otherwise
            creditError.style.display = 'none';
        }
    })
}

function liveValidators (){

    //for practice added live validators to name and email
    nameField.addEventListener('change', (e) => {
        nameValidator();
    });
    
    emailField.addEventListener('change', (e) => {
        emailValidator();
    });

    //calling credit and live credit validators which is then called in initial
    creditCardValidator();

    liveCreditCardError();
}


initialSetUp();