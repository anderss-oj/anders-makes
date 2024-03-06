import $ from 'jquery';

$(document).ready(function() {
    $(".titleSection").hover(
        function() {
            // Wrap the content of the hovered element in a container
            // $(this).wrapInner("<div class='text-container'></div>");
            // Add the stretching class to the container
            // $(this).find('.text-container').addClass("fontStretch");
            $(this).addClass("fontStretch");
        },
        function() {
            // Remove the stretching class and unwrap the content
            $(this).removeClass("fontStretch");
            // $(this).find('.text-container').removeClass("fontStretch");
            // $(this).contents().unwrap();
        }
    );
});