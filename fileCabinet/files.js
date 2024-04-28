import $ from "jquery";

$(document).ready(function(){
    // let cabinetWrapper = '.cabinetWrapper';
    let cabinet = '.cabinet';

    // $(cabinet).css({
    //     "top": getRandomInt(98) + "%", 
    //     "left":getRandomInt(98) + "%"
    // })

    function openPopup(filePath, width, height, left, top) {
        window.open(filePath, '_blank', `width=${width}, height=${height}, left=${left}, top=${top}`);
    }

    function openPopupsNTimes(filePath, width, height, maxLeft, maxTop, n) {
        for (let i = 0; i < n; i++) {
            openPopup(filePath, width, height, getRandomInt(maxLeft), getRandomInt(maxTop));
        }
    }

    function cabinetFunctions(cabinet) {
        // console.log(cabinetClicks + ' before click');
        $(cabinet).hover(function(){
            $(this).toggleClass('highlight')
        })
        $(cabinet).click(function(){
            // console.log(cabinetClicks + ' after click');
            if (cabinetClicks == 0) {
                window.open('fileCabinet/folder.html', '_blank', 'width=400, height=200, left=900, top=500');
                window.open('fileCabinet/folder.html', '_blank', 'width=400, height=200, left=750, top=400');
                window.open('fileCabinet/folder.html', '_blank', 'width=400, height=200, left=500, top=300');
                window.open('fileCabinet/folder.html', '_blank', 'width=400, height=200, left=250, top=200');
                window.open('fileCabinet/folder.html', '_blank', 'width=400, height=200, left=150, top=100');
                window.open('fileCabinet/folder.html', '_blank', 'width=400, height=200, left=0, top=50');
                // cabinetClicks++;
            }
            else if (cabinetClicks == 1) {
                window.open('files.html', '_blank', 'width=300, height=100, left=700, top=300');
                window.open('files.html', '_blank', 'width=300, height=100, left=600, top=250');
                window.open('files.html', '_blank', 'width=300, height=100, left=500, top=200');
                window.open('files.html', '_blank', 'width=300, height=100, left=400, top=150');
                window.open('files.html', '_blank', 'width=300, height=100, left=300, top=100');
                window.open('files.html', '_blank', 'width=300, height=100, left=200, top=50');


            }
            else if (cabinetClicks == 2) {
                openPopupsNTimes('fileData.html', 70, 70, 1800, 900, numberFiles); // Opens 'files.html' popup (numberFiles) times with left and top random

                $(cabinet).css({
                    "top": getRandomInt(98) + "%", 
                    "left":getRandomInt(98) + "%"
                })
            }
            else if (cabinetClicks == 3) {
                openPopupsNTimes('dataPoint.html', 600, 50, 2000, 800, 1); // Opens 'dataPoint.html' popup (numberFiles) times with left and top random
            }
        })
    }

    cabinetFunctions(cabinet);

    // hover over data point
    $('p').hover(function(){
        $(this).toggleClass('highlight')
    });

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
});