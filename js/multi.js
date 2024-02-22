// Input functionality
document.addEventListener("DOMContentLoaded", function() {
    const animationInput = document.getElementById('animationInput');
    animationInput.addEventListener('input', (event) => {
        const inputText = event.target.value.trim().toLowerCase();
        if (inputText === 'slow') {
            const elements = document.querySelectorAll('.slow');
            elements.forEach(element => {
                element.dataset.endAfterNextIteration = 'true';
            });
            // Clear the input after the user inputs 'slow'
            animationInput.value = '';
        }
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