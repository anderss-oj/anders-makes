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
        var currentColor = [];
        for (var i = 0; i < 3; i++) {
            currentColor[i] = startColor[i] + (endColor[i] - startColor[i]) * progress;
        }
        
        // Set the background color
        $('body').css('background-color', 'rgb(' + currentColor.join(',') + ')');
    }, 100); // Update color every 100 milliseconds
}

$(document).ready(function() {
    setTimeout(changeBackgroundColor, 0);

    // Start adding '.' every 2 seconds
    var dotsInterval = setInterval(function() {
        $('.slowingSlowing').append('.'); // Add a '.' to the div with class 'slowingSlowing'
    }, 2000); // Add '.' every 2 seconds (2000 milliseconds)
    
    // Add a <br> tag after every 10th '.'
    var counter = 0;
    var brInterval = setInterval(function() {
        counter++;
        if (counter % 15 === 0) {
            $('.slowingSlowing').append('<br>'); // Add a <br> tag after every 10th '.'
        }
    }, 2000); // Check every 2 seconds (2000 milliseconds)
    
    // Stop the intervals after a certain duration
    // setTimeout(function() {
    //     clearInterval(dotsInterval); // Stop adding '.'
    //     clearInterval(brInterval); // Stop adding <br> tags
    // }, 60000); // Stop after 60 seconds (60000 milliseconds)
});