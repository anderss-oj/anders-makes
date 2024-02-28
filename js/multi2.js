// var declaration

const page = document.getElementById('page');
const slowElements = document.querySelectorAll('.slow');
const animationInput = document.getElementById('animationInput');
let pageState = 0;

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
            animationInput.value = '';
            removeElementsAfterAnimation(addMediumElements);
        }
        if (state === 2) {
            console.log('slower confirmed');
            animationInput.value = '';
            removeElementsAfterAnimation(addEfficiencyElements);
        }
        if (state === 3) {

        }
        if (state === 4) {

        }
    }

    function removeElementsAfterAnimation(addElementsFunction) {
        page.innerHTML = '';
        if (page.children.length === 0) { 
            addElementsFunction();
            console.log(addElementsFunction + ' was triggered here');
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

    $(document).mousemove(function(event) {
        // Get the mouse position
        var mouseX = event.pageX;
        var mouseY = event.pageY;
    
        // Calculate the number of elements based on the mouse position
        var mediumCount = Math.floor((mouseX / $(window).width()) * 20); // Adjust the factor (10) as needed
        var efficiencyCount = Math.floor((mouseY / $(window).height()) * 20); // Adjust the factor (10) as needed
    
        // Remove existing elements from containers
        $('.medium div').remove();
        $('.efficiency div').remove();
    
        // Add new elements to containers
        for (var i = 0; i < mediumCount; i++) {
            $('.medium').append('<div>Medium Element</div>');
        }
        for (var i = 0; i < efficiencyCount; i++) {
            $('.efficiency').append('<div>Efficiency Element</div>');
        }
    });
});

