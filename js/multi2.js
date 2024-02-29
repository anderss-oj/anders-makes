import $ from 'jquery';

// var declaration

const page = document.getElementById('page');
const slowElements = document.querySelectorAll('.slow');
const animationInput = document.getElementById('animationInput');
let pageState = 0;

// img name id strings
const woodBoxId = 'woodBox';
const metalBookId = 'metalBook';
const cdId = 'cd';
const chairId = 'chair';
const workId = 'work';
const notesId = 'notes';

// img file paths
const woodBoxPath = '/images/multi/woodBoxes.png';
const metalBookPath = '/images/multi/bookDuos.gif';
const cdPath = '/images/multi/bitRot_cds.png';
const chairPath = '';
const workPath = '/images/multi/workPics.gif';
const notesPath = '/images/multi/notesPics.gif';

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
        }
    }
    function addMediumElements() {
        console.log('medium elements added');
        $('#page').append("<div id='mediumRandomCont' class='medium'></div>")
        const mediumRandomCont = $('#mediumRandomCont');
        mediumRandomCont.addClass('showing');
        
        // image specific functions
        randomImagePlace(woodBoxId, 'wood', woodBoxPath);
        randomImagePlace(metalBookId, 'aluminum cover book', metalBookPath);
        randomImagePlace(cdId, "cd's", cdPath);
    }
    function addEfficiencyElements() {
        console.log('efficiency elements added');
        $('#page').append("<div id='efficiencyCont' class='efficiency'></div>")
        const efficiencyCont = $('#efficiencyCont');
        efficiencyCont.addClass('showing');

        randomImagePlace(workId, 'work', workPath);
        randomImagePlace(notesId, 'notes', notesPath);
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

    // Define a function to handle the click event on word blocks
    function handleWordBlockHover(imageId) {
        // Attach a mouseenter event listener to show the corresponding image
        $('#' + imageId).on('mouseenter', function () {
            // Show the corresponding image by changing its display property
            $('#' + imageId + 'Img').css('display', 'block');
            console.log(imageId + ' image should be shown');
        });
    
        // Attach a mouseleave event listener to hide the corresponding image
        $('#' + imageId).on('mouseleave', function () {
            // Hide the corresponding image by changing its display property
            $('#' + imageId + 'Img').css('display', 'none');
            console.log(imageId + ' image should go away');
        });
    }

    // Modify your randomImagePlace function to include the click event handler
    function randomImagePlace(imageId, imageName, filePath) {
        var imgPosition = getRandomPosition($('#page'));
        $('#page').append('<div class="word-block" id="' + imageId + '">' + imageName + '</div>');
        var imageDiv = $('<img>').attr('src', filePath).attr('id', imageId + 'Img').css({
            'display': 'none',
            'position': 'absolute', // Position absolutely
            'max-width': '50vw',   // Add max-width and max-height to restrict size
            'max-height': '70vh'
        });
        $('#page').append(imageDiv);
        
        // Attach hover event handlers to the word block
        handleWordBlockHover(imageId);

        // Set the position of the word block
        $('#' + imageId).css({'position': 'absolute', 'left': imgPosition.x / 1.1, 'top': imgPosition.y / 1.1});
        $('#' + imageId).addClass('word-block');
    }
});

