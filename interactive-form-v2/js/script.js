
const otherTitle = document.querySelector('#other-title');
const jobRole = document.querySelector('select#title');
const colorSelect = document.querySelector('select#color');
const designSelect = document.querySelector('select#design');
const jsPun = colorSelect.querySelectorAll('#js-puns');
const heartShirt = colorSelect.querySelectorAll('#heart-js');

function initialSetUp() {
    document.getElementById('name').focus();
    otherTitle.style.display = 'none';
    colorSelect.style.display = 'none';
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

            for(let i = 0; i < jsPun.length; i++){
                jsPun[i].disabled = false;
                jsPun[i].style.display = '';
            }
            for(let i = 0; i < heartShirt.length; i++){
                heartShirt[i].disabled = true;
                heartShirt[i].style.display = 'none';
            } 

        } else if (designSelect.value == 'heart js') {
            colorSelect.style.display = '';
            pleaseSelect.style.display = 'none';
            for(let i = 0; i < heartShirt.length; i++){
                jsPun[i].disabled = true;
                jsPun[i].style.display = 'none';
            }
            for(let i = 0; i < jsPun.length; i++){
                heartShirt[i].disabled = false;
                heartShirt[i].style.display = '';
            }
        } else {
            pleaseSelect.style.display = '';
            colorSelect.style.display = 'none';

        }
    });
};

initialSetUp();
