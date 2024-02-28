// var declaration

const page = document.getElementById('page');
const slowElements = document.querySelectorAll('.slow');
const animationInput = document.getElementById('animationInput');
let pageState = 0;
const imgWoodBoxes = '/images/multi/woodboxes.png';

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
            else if (inputText === 'slowing') {
                pageState = 3;
                console.log(pageState + ' = pageState after slower');
                pageStateTransition(pageState);
            }
            else if (inputText === 'slowing...') {
                pageState = 4;
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
            console.log('slowing confirmed');
            animationInput.value = '';
            removeElementsAfterAnimation(addProcessElements);
        }
        if (state === 4) {
            console.log('slowing... confirmed');
            animationInput.value = '';
            removeElementsAfterAnimation(addInstallationElements);
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
        $('#page').append("<div id='mediumRandomCont' class='medium'></div>")
        const mediumRandomCont = $('#mediumRandomCont');
        mediumRandomCont.addClass('showing');
        randomImagePlace('woodBlocksImg', 'wood')
    }
    function addEfficiencyElements() {
        console.log('efficiency elements added');
        $('#page').append("<div id='efficiencyCont' class='efficiency'></div>")
        const efficiencyCont = $('#efficiencyCont');
        efficiencyCont.addClass('showing');
    }
    function addProcessElements() {
        console.log('process elements added');
        $('#page').append("<div id='processCont' class='efficiency'></div>")
        const processCont = $('#processCont');
        processCont.addClass('showing');
    }
    function addInstallationElements() {
        console.log('installation elements added');
        $('#page').append("<div id='installationCont' class='installation'></div>")
        const installationCont = $('#installationCont');
        installationCont.addClass('showing');
    }

    $(document).ready(function() {
        // Function to generate random number of elements
        function getRandomElementCount() {
            return Math.floor(Math.random() * 10) + 1; // Adjust range as needed
        }

        // Function to add elements to containers at random positions and random count
        function addRandomElements() {
            var mediumPosition = getRandomPosition('.medium');
            var efficiencyPosition = getRandomPosition('.efficiency');
            var mediumCount = getRandomElementCount();
            var efficiencyCount = getRandomElementCount();

            // Add medium elements
            for (var i = 0; i < mediumCount; i++) {
                $('.medium').append('<div class="medium-element">MATERIAL</div>');
            }
            $('.medium-element').css({'position': 'relative', 'left': mediumPosition.x, 'top': mediumPosition.y });

            // Add efficiency elements
            for (var i = 0; i < efficiencyCount; i++) {
                $('.efficiency').append('<div class="efficiency-element">EFFICIENCY</div>');
            }
            $('.efficiency-element').css({'position': 'relative', 'left': efficiencyPosition.x, 'top': efficiencyPosition.y });
        }

        // Add random elements initially
        addRandomElements();

            // Debounce function
        function debounce(func, delay) {
            let timeout;
            return function() {
                const context = this;
                const args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    func.apply(context, args);
                }, delay);
            };
        }

        // Debounce mousemove event
        const debouncedMouseMove = debounce(function(event) {
            $('.medium').empty();
            $('.efficiency').empty();
            addRandomElements();
        }, 17);
        // Adjust delay as needed
        // Bind debounced mousemove event
        $(document).on('mousemove', debouncedMouseMove);
    });

    // Function to generate random position
    function getRandomPosition(container) {
        var positionX = Math.floor(Math.random() * ($(container).width() - 100)); // Adjust range as needed
        var positionY = Math.floor(Math.random() * ($(container).height() - 100)); // Adjust range as needed
        return { x: positionX, y: positionY };
    }

    // Function to generate random image <div> position + label it
    function randomImagePlace (imageId, imageName) {
        console.log (imageId + ' is imageIdJQ value');
        var imgPosition = getRandomPosition($('#page'));
        $('#page').append('<div id=' + imageId + '>' + imageName + '</div>');
        
        // Object to map image IDs to jQuery selectors
        var imageSelectors = {
            'woodBlocksImg': '#woodBlocksImg',
            'metalBookImg': '#metalBookImg',
            'cdImg': '#cdImg',
            'chairImg': '#chairImg',
            'vibratorImg': '#vibratorImg'
        };

        // Get the corresponding jQuery selector based on imageId
        var imageSelector = imageSelectors[imageId];

        // Select the image div using the corresponding selector
        var imageDiv = $(imageSelector);

        imageDiv.css({'position': 'absolute', 'left': imgPosition.x / 2, 'top': imgPosition.y / 2});
        imageDiv.addClass('image');
        console.log (imgPosition.x + 'is x ' + imgPosition.y + 'is y');
    }
});

