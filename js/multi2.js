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
const workshopId = 'workshop';
const barcodeId = 'barcode';
const decayId = 'decay';
const interactionId = 'interaction';
const slowingId = 'slowing';
const manifestationId = 'manifestation';
const errorId = 'error';
const natureId = 'nature';
const humanMachineId = 'humanMachine';

// img file paths
const woodBoxPath = '/images/multi/woodBoxes.png';
const metalBookPath = '/images/multi/bookDuos.gif';
const cdPath = '/images/multi/bitRot_cds.png';
const chairPath = '';
const workPath = '/images/multi/workPics.gif';
const notesPath = '/images/multi/notesPics.gif';
const workshopPath = '/images/multi/rustGif.gif';
const barcodePath = '/images/multi/barcodePng.png';
const decayPath = '/images/multi/cycleCircle.png';
const interactionPath = '/images/multi/interactionScanner.webp';
const slowingPath = '/images/multi/slowZoneSign.png';
const manifestationPath = '/images/multi/slowZoneSketchbookScans.gif';
const errorPath = '';
const naturePath = '/images/multi/rustDiagram.jpg';
const humanMachinePath = '';

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
        randomImagePlace(barcodeId, 'barcodes', barcodePath);
        randomImagePlace(humanMachineId, 'human ~ machine', humanMachinePath);
    }
    function addProcessElements() {
        console.log('process elements added');
        $('#page').append("<div id='processCont' class='process'></div>")
        const processCont = $('#processCont');
        processCont.addClass('showing');

        randomImagePlace(workshopId, 'rust workshop', workshopPath);
        randomImagePlace(decayId, 'decay', decayPath);
        randomImagePlace(errorId, 'error as part of the process', errorPath);
        randomImagePlace(natureId, 'natural process', naturePath);
    }
    function addInstallationElements() {
        console.log('installation elements added');
        $('#page').append("<div id='installationCont' class='installation'></div>")
        const installationCont = $('#installationCont');
        installationCont.addClass('showing');

        randomImagePlace(interactionId, 'interaction / tool interface', interactionPath);
        randomImagePlace(slowingId, 'slowing', slowingPath);
        randomImagePlace(manifestationId, 'physical manifestation', manifestationPath);
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
            var processPosition = getRandomPosition('.process');
            var installationPosition = getRandomPosition('.installation');
            var mediumCount = getRandomElementCount();
            var efficiencyCount = getRandomElementCount();
            var processCount = getRandomElementCount();
            var installationCount = getRandomElementCount();

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

            // Add process elements
            for (var i = 0; i < processCount; i++) {
                $('.process').append('<div class="process-element">PROCESS</div>');
            }
            $('.process-element').css({'position': 'relative', 'left': processPosition.x, 'top': processPosition.y });

            // Add installation elements
            for (var i = 0; i < installationCount; i++) {
                $('.installation').append('<div class="installation-element">PRODUCTION</div>');
            }
            $('.installation-element').css({'position': 'relative', 'left': installationPosition.x, 'top': installationPosition.y });
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
            $('.process').empty();
            $('.installation').empty();
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

