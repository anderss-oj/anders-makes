import $ from 'jquery';

let workDict = {
    0 : "collateral suites gif link",
    1 : "social campaigns gif link",
    2 : "environmental gif link",
    3 : "proposal graphics and infographics gif link",
};

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

    //m.c. dean page scripts for image carousel
    $(".imageCarousel").hover(
        function() {
            $(this).css("background-color", "white");
        },
        function() {
            $(this).css("background-color", "");
        }
    );
});