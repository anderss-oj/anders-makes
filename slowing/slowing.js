// slowing slowing
import $ from 'jquery';

var start = new Date;

setInterval(function() {
    // Calculate elapsed time in seconds
    var elapsedTime = (new Date() - start) / 1000;
    
    // Update the timer display
    $('.timer').text(elapsedTime.toFixed(0) + " seconds");
}, 100);

function changeBackgroundColor() {
    // Define the starting and ending colors
    var startColor = [97, 97, 97]; // grab color of element from css
    var endColor = [118, 45, 12];   // Blue
    
    // Define the duration of the color transition in milliseconds
    var duration = 100000; // 5 seconds
    
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
});