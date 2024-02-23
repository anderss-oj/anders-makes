// Input functionality
const pageContainer = document.getElementById('page');

document.addEventListener("DOMContentLoaded", function() {
    const animationInput = document.getElementById('animationInput');
    animationInput.addEventListener('input', (event) => {
        const inputText = event.target.value.trim().toLowerCase();
        animationInput.addEventListener("keyup", function(event) {
            if (event.key === "Enter") { 
            // enter key event listener 
                if (inputText === 'slow') {
                    const elements = document.querySelectorAll('.slow');
                    elements.forEach(element => {
                        element.dataset.endAfterNextIteration = 'true';
                    });
                    // Clear the input after the user inputs 'slow'
                    animationInput.value = '';

                    // now we add new elements
                    const part1Element1 = document.createElement('div');
                    part1Element1.className = 'part1 1'
                    // part1Element1. //adding elements?
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
    removeElementsAfterAnimation('.slow');

});