import $ from "jquery";

$(document).ready(function(){
    // let cabinetWrapper = '.cabinetWrapper';
    let cabinet = '.cabinet';

    $(cabinet).css({
        "top": getRandomInt(98) + "%", 
        "left":getRandomInt(98) + "%"
    })

    function cabinetFunctions(cabinet) {
        console.log(cabinetClicks + ' before click');
        $(cabinet).hover(function(){
            $(this).toggleClass('highlight')
        })
        $(cabinet).click(function(){
            console.log(cabinetClicks + ' after click');
            if (cabinetClicks == 0) {
                window.open('fileCabinet/folder.html', '_blank', 'width=1000, height=600, left=500, top=500');
                window.open('fileCabinet/folder.html', '_blank', 'width=1000, height=500, left=400, top=400');
                window.open('fileCabinet/folder.html', '_blank', 'width=1000, height=400, left=300, top=300');
                window.open('fileCabinet/folder.html', '_blank', 'width=1000, height=300, left=200, top=200');
                window.open('fileCabinet/folder.html', '_blank', 'width=1000, height=200, left=100, top=100');
                window.open('fileCabinet/folder.html', '_blank', 'width=1000, height=100, left=0, top=0');
                // cabinetClicks++;
            }
            else if (cabinetClicks == 1) {
                window.open('files.html', '_blank', 'width=970, height=400');
            }
            else if (cabinetClicks == 2) {
                window.open('files.html', '_blank', 'width=950, height=950');
                window.open('files.html', '_blank', 'width=950, height=950');
                window.open('files.html', '_blank', 'width=950, height=950');
                window.open('files.html', '_blank', 'width=950, height=950');
                window.open('files.html', '_blank', 'width=950, height=950');
                window.open('files.html', '_blank', 'width=950, height=950');
                window.open('files.html', '_blank', 'width=950, height=950');
                $(cabinet).css({
                    "top": getRandomInt(98) + "%", 
                    "left":getRandomInt(98) + "%"
                })
            }
            
        })
    }

    cabinetFunctions(cabinet);

    // $(files).click(function(){    
    // })

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
});