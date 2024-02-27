// var declaration

const page = document.getElementById('page');
const slowElements = document.querySelectorAll('.slow');
const animationInput = document.getElementById('animationInput');
// const mediumPage = $('#mediumPage');

document.addEventListener("DOMContentLoaded", function() {
    animationInput.addEventListener('input', (event) => {
        const inputText = event.target.value.trim().toLowerCase();
        animationInput.addEventListener("keyup", function(event) {
            if (event.key === "Enter") { 
            // enter key event listener 

            // this is what happens when we input slow. we take away the intro, and add the medium page

                if (inputText === 'slow') {
                    slowElements.forEach(element => {
                        element.dataset.endAfterNextIteration = 'true';
                    });
                    // Clear the input after the user inputs 'slow'
                    animationInput.value = '';
                    // make sure the elements are clear before adding                    
                    if (page.innerHTML === '') {
                        console.log ('slow is gone');
                        // now we add new elements
                        addMediumElements();
                    }
                    else {
                        console.log('pageDiv check did not work');
                    }
                }
            }
        })
    });

    // Function to remove elements after animation completes
    function removeElementsAfterAnimation(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.addEventListener('animationiteration', () => {
                if (element.dataset.endAfterNextIteration === 'true') {
                    element.dataset.endAfterNextIteration = 'false';
                    element.classList.add('removing');
                    setTimeout(() => {
                        element.remove();
                    }, 4000);
                }
            });
        });
    }

    // Call the function for each slow animation
    removeElementsAfterAnimation('.slow', );

    function addMediumElements() {
        $('#page').append("<div id='mediumRandomCont'>medium medium medium medium</div>")
        const mediumRandomCont = $('#mediumRandomCont');
        $(mediumRandomCont).addClass('showing');
    }
});