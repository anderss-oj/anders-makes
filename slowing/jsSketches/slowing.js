// slowing slowing
import $ from 'jquery';

var start = new Date;

setInterval(function() {
    // Calculate elapsed time in seconds
    var elapsedTime = (new Date() - start) / 1000;
    
    // Update the timer display
    $('.timer').text(elapsedTime.toFixed(0));
}, 1000);

function changeBackgroundColor() {
    // Define the starting and ending colors
    var startColor = [145, 145, 154]; // grab color of element from css
    var endColor = [118, 45, 12];   // Blue
    
    // Define the duration of the color transition in milliseconds
    var duration = 200000; // 200 seconds
    
    // Get the current time
    var startTime = new Date().getTime();
    
    // Start the color transition animation
    var intervalId = setInterval(function() {
        // Calculate the elapsed time
        var elapsedTime = new Date().getTime() - startTime;
        
        // Calculate the percentage of completion
        var progress = elapsedTime / duration;
        
        // Check if the transition is complete
        if (progress >= 1) {
            clearInterval(intervalId); // Stop the interval
        }
        
        // Interpolate the colors based on the progress
        let currentColor = [];
        for (var i = 0; i < 3; i++) {
            currentColor[i] = startColor[i] + (endColor[i] - startColor[i]) * progress;
        }
        
        // Set the background color
        $('body').css('background-color', 'rgb(' + currentColor.join(',') + ')');
    }, 100); // Update color every 100 milliseconds
}

function populateField() {
    var words = ["craft", "the hand", "human", "transparency", "building", 'reduction', 'decentralizing', 'independence', 'personal', 'generative', 'anti', 'retrogressive', 'appreciation', 'quality', 'small']; // Your list of words

    // Loop through the words array
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var posX = Math.random() * 80; // Random X position
        var posY = Math.random() * 80; // Random Y position
        var $circleDiv = $("<div class='circle'></div>"); // Create a new div for each circle
        $circleDiv.css({ // Set position
            top: posY + "%",
            left: posX + "%"
        });
        // Add hover effect with unique word
        addHoverEffect($circleDiv, word);
        $(".field").append($circleDiv); // Append the circle div to the field
    }
}

function addHoverEffect($element, word) {
    $element.hover(function() {
        $(this).css("background-color", "transparent").text(word);
    }, function() {
        $(this).css("background-color", 'rgb(' + currentColor.join(',') + ')').text("");
    });
}



$(document).ready(function() {
    setTimeout(changeBackgroundColor, 0);

    populateField();

    // Start adding '.' every 2 seconds
    var dotsInterval = setInterval(function() {
        $('.ellipsis').append('.'); // Add a '.' to the div with class 'slowingSlowing'
    }, 2000); // Add '.' every 2 seconds (2000 milliseconds)
    
    // Add a <br> tag after every 10th '.'
    var counter = 0;
    var brInterval = setInterval(function() {
        counter++;
        if (counter % 3 === 0) {
            $('.ellipsis').append(' '); // add space after every 3rd '.'
        }
        if (counter % 18 === 0) {
            $('.ellipsis').append('<br>'); // Add a <br> tag after every 12th count
        }
    }, 2000); // Check every 2 seconds (2000 milliseconds)
    
    // Stop the intervals after a certain duration
    // setTimeout(function() {
    //     clearInterval(dotsInterval); // Stop adding '.'
    //     clearInterval(brInterval); // Stop adding <br> tags
    // }, 60000); // Stop after 60 seconds (60000 milliseconds)
});