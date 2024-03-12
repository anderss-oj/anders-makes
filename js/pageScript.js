import $ from 'jquery';

$(document).ready(function() {
    //hover function
    function stretchOnOff(element) {
        element.hover(
            function addStretch() {
                element.addClass("fontStretch");
            },
            function removeStretch() {
                element.removeClass("fontStretch");
            }
        )
    };
    
    //header content hover
    $(".headerContent").hover(
        function addStretch() {
            $(this).addClass("fontStretch");
        },
        function removeStretch() {
            $(this).removeClass("fontStretch");
        }
    );

    //work page title hover
    stretchOnOff($(".titleText"));

    $("a").hover(
        function() {
            $(this).css("background-color", "white");
        },
        function() {
            $(this).css("background-color", "");
        }
    );
});