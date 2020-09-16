
const otherTitle = document.querySelector('#other-title');
const jobRole = document.querySelector('select#title');
const colorSelect = document.querySelector('select#color');
const designSelect = document.querySelector('select#design');
const jsPun = colorSelect.querySelectorAll('#js-puns');
const heartShirt = colorSelect.querySelectorAll('#heart-js');
const colorLabel = colorSelect.previousElementSibling;

function initialSetUp() {
    document.getElementById('name').focus();
    otherTitle.style.display = 'none';
    colorSelect.style.display = 'none';
    colorLabel.style.display = 'none';
    var pleaseSelect = document.createElement('p');
    pleaseSelect.innerHTML = 'Please select a t-shirt theme';
    colorSelect.parentNode.appendChild(pleaseSelect);

    jobRole.addEventListener('change', () => {
        if (jobRole.value == 'other') {
            otherTitle.style.display = '';
            } else {
                otherTitle.style.display = 'none';
            }
    });

    designSelect.addEventListener('change', () => {
        if (designSelect.value == 'js puns') {
            colorSelect.style.display = '';
            pleaseSelect.style.display = 'none';
            colorLabel.style.display = '';

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
};

function activitiesRegistration(){
    const activitiesBox = document.querySelector('.activities');
    var priceDiv = document.createElement('div');
    var priceText = document.createElement('p');
    priceDiv.appendChild(priceText);
    activitiesBox.appendChild(priceDiv);
    const activityOptions = document.querySelectorAll('.activities input');
    var runningTotal = 0;
    document.querySelector('.activities').addEventListener('change', (e) => {
        var clicked = e.target;
        var clickedTime = e.target.getAttribute('data-day-and-time');
        var price = parseInt(e.target.getAttribute('data-cost'));
        runningTotal += price;
        priceText.innerHTML = 'Total Cost: $' + runningTotal;
        for(let i = 0; i < activityOptions.length; i++){
            var activityTimes = activityOptions[i].getAttribute('data-day-and-time');
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
    const paymentSelector = document.querySelector('select#payment');
    const paymentOptions = document.querySelectorAll('#payment option');
    const paypalDiv = document.querySelector('div#paypal');
    const bitcoinDiv = document.querySelector('div#bitcoin');
    const creditCardDiv = document.querySelector('div#credit-card');
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


initialSetUp();