// var declaration

const page = document.getElementById('page');
const slowElements = document.querySelectorAll('.slow');
const animationInput = document.getElementById('animationInput');
const mediumElements = document.querySelectorAll('.medium');
const slowSelector = '.slow';
const mediumSelector = '.medium.showing';
// const mediumFunction = addMediumElements();
let pageState = 0;
// console.log(pageState);

// document.addEventListener("DOMContentLoaded", function() {
//     animationInput.addEventListener('input', (event) => {
//         const inputText = event.target.value.trim().toLowerCase();
//         animationInput.addEventListener("keyup", function(event) {
//             if (event.key === "Enter") { 
//             // enter key event listener 
//                 // this is what happens when we input slow. we take away the intro, and add the medium page
//                 // if (!hasCorrectInput) { // Only execute if correct input hasn't been provided yet        
//                     if (inputText === 'slow') {
//                         pageState = 1;
//                         console.log(pageState + ' = pageState after slow');
//                         pageStateTransition(pageState);
//                     }
//                     else if (inputText === 'slower') {
//                         pageState = 2;
//                         console.log(pageState + ' = pageState after slower');
//                         pageStateTransition(pageState);
//                     }
                
//             }
//         })
//     });
document.addEventListener("DOMContentLoaded", function() {
    animationInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") { 
            const inputText = animationInput.value.trim().toLowerCase();
            // enter key event listener 
            // this is what happens when we input slow. we take away the intro, and add the medium page
            // if (!hasCorrectInput) { // Only execute if correct input hasn't been provided yet        
            if (inputText === 'slow') {
                pageState = 1;
                console.log(pageState + ' = pageState after slow');
                pageStateTransition(pageState);
            }
            else if (inputText === 'slower') {
                pageState = 2;
                console.log(pageState + ' = pageState after slower');
                pageStateTransition(pageState);
            }
        }
    });


    function pageStateTransition (state) {
        if (state === 1) {
            // slow to medium transition
            slowElements.forEach(element => {
                element.dataset.endAfterNextIteration = 'true';
                console.log('slow dataset element status = ' + element.dataset.endAfterNextIteration);
            });
            animationInput.value = '';
            // Call the function for each slow animation
            removeElementsAfterAnimation(slowSelector, addMediumElements);
        }
        if (state === 2) {
            console.log('slower confirmed');
            mediumElements.forEach(element => {
                element.dataset.endAfterNextIteration = 'true';
                console.log('medium dataset element status = ' + element.dataset.endAfterNextIteration);
            });
            // Clear the input after the user inputs 'slower'
            animationInput.value = '';
            // Call the function for each slow animation
            removeElementsAfterAnimation(mediumSelector, addEfficiencyElements);
        }
        if (state === 3) {

        }
        if (state === 4) {

        }
    }
    // Function to remove elements after animation completes
    // calls in elements to add, after it observes the old elements are gone
    function removeElementsAfterAnimation(selector, addElementsFunction) {
        const elements = document.querySelectorAll(selector);
        //check
        console.log('show me the selector= ' + selector);
        console.log('show me the addElementsFunction being passed to the remove= ' + addElementsFunction);

        elements.forEach(element => {
            element.addEventListener('animationiteration', () => {
                if (selector === slowSelector) {
                    if (element.dataset.endAfterNextIteration === 'true') {
                        element.dataset.endAfterNextIteration = 'false';
                        console.log('dataset element status = ' + element.dataset.endAfterNextIteration);
                        element.classList.add('removing');
                        setTimeout(() => {
                            element.remove();
                        }, 4000);
                        console.log('removing slow elements');
                        observerToAdd(addElementsFunction, pageState)
                    }
                }
                else {
                    element.classList.add('removing');
                    setTimeout(() => {
                    element.remove();
                    }, 4000);
                    console.log('removing elements');
                    observerToAdd(addElementsFunction, pageState)
                }
            });
        });

        // Observe for changes in the page div using jQuery
        // we feeding in the add elements function to trigger from here
        function observerToAdd(addElementsFunction, state) {
            // console.log(addElementsFunction() + ' is already in the observer');
            console.log(addElementsFunction + ' was passed in the observer');
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {

                    console.log('pageState = ' + state + ' in observer function');
                    // Check if the page div is empty after elements are removed
                    if ((page.children.length === 0) && (state === 1)) { 
                        addMediumElements();
                        console.log('mediumElements was triggered here');
                        // Disconnect the observer after adding new elements
                        observer.disconnect();
                    }
                    else if ((page.children.length === 0) && (state === 2)) { 
                        addEfficiencyElements();
                        console.log('efficiencyElements was triggered here');
                        // Disconnect the observer after adding new elements
                        observer.disconnect();
                    }
                });
            });
            observer.observe(page, { childList: true });
            console.log(addElementsFunction + ' was passed in the observer, check 2');
        }
    }

    function addMediumElements() {
        console.log('medium elements added');
        $('#page').append("<div id='mediumRandomCont' class='medium'>MEDIUMEDIUMEDIUM  MEDIIUMMEMMEM</div>")
        const mediumRandomCont = $('#mediumRandomCont');
        mediumRandomCont.addClass('showing');
    }
    function addEfficiencyElements() {
        console.log('efficiency elements added');
        $('#page').append("<div id='efficiencyCont' class='efficiency'>EFICCICINCICNECY</div>")
        const efficiencyCont = $('#efficiencyCont');
        efficiencyCont.addClass('showing');
    }
});