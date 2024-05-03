import $ from "jquery";
import html2canvas from 'html2canvas';

document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('clickButton');
    const archive = $('#archive');
    const dayCount = $('#dayCount');
    const timer = $('#timer');
    const ellipses = $('#ellipses');
    const back = $('#back');
    const clock = $('#clock');
    const captureBtn = $('#captureBtn');
    let totalClicks;
    let startDate;

    const fetchStartDate = () => {
        fetch('http://localhost:3000/startDate')
            .then(response => response.json())
            .then(data => {
                startDate = new Date(data.startDate);
                console.log('Start date received:', startDate);
                setInterval(updateClock, 1000); // Start updating the clock every second
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    fetchStartDate();

    const fetchClickData = () => {
        fetch('http://localhost:3000/clicks', { method: 'POST' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch click data from server');
                }
                return response.json();
            })
            .then(data => {
                console.log('Click data received:', data);
                totalClicks = data.totalClicks;
                if (typeof totalClicks === 'number') {
                    updateFont(archive);
                    updateFont(dayCount);
                    updateFont(timer);
                    updateFont(ellipses);
                    updateFont(back);
                    updateFont(clock);
                    updateFont(captureBtn);
                } else {
                    console.error('Invalid or missing totalClicks data');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    fetchClickData();

    // Add event listener for key presses
    document.addEventListener('keydown', handleKeyPress);

    // Add event listener for body clicks
    document.body.addEventListener('click', handleBodyClick);

    function handleKeyPress(event) {
        // Exclude certain keys (e.g., Shift, Ctrl, Alt, etc.)
        if (!event.metaKey && !event.ctrlKey && !event.altKey) {
          fetchClickData();
        }
      }
      
      function handleBodyClick() {
        fetchClickData();
      }

    // const captureBtn = document.getElementById('captureBtn');

    document.getElementById('captureBtn').addEventListener('click', () => {
        html2canvas(document.body)
            .then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.download = 'screenshotNow.png';
                downloadLink.href = imgData;
                downloadLink.click();
            })
            .catch(error => {
                console.error('Error capturing screenshot:', error);
            });
    });

    function updateFont(element) {
        if (totalClicks <= 10) {
            $(element).removeClass('redaction2 redaction3 redaction4 redaction5 redaction6');
            $(element).addClass('redaction1');
        }
        else if (totalClicks <= 20) {
            $(element).removeClass('redaction1 redaction3 redaction4 redaction5 redaction6');
            $(element).addClass('redaction2');
        }
        else if (totalClicks <= 30) {
            $(element).removeClass('redaction1 redaction2 redaction4 redaction5 redaction6');
            $(element).addClass('redaction3');
        }
        else if (totalClicks <= 40) {
            $(element).removeClass('redaction1 redaction2 redaction3 redaction5 redaction6');
            $(element).addClass('redaction4');
        }
        else if (totalClicks <= 50) {
            $(element).removeClass('redaction1 redaction2 redaction3 redaction4 redaction6');
            $(element).addClass('redaction5');
        }
        else if (totalClicks >= 60) {
            $(element).removeClass('redaction1 redaction2 redaction3 redaction4 redaction5');
            $(element).addClass('redaction6');
        }
    }

    function captureScreenshot() {
        const currentDate = new Date();
        const timeDiff = currentDate.getTime() - startDate.getTime();
        const minutesSinceStart = Math.floor(timeDiff / (1000 * 60));

        if (minutesSinceStart % 20 === 0) {
            html2canvas(document.body)
                .then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const downloadLink = document.createElement('a');
                    downloadLink.download = `screenshot_${new Date().toISOString()}.png`;
                    downloadLink.href = imgData;
                    downloadLink.click();
                })
                .catch(error => {
                    console.error('Error capturing screenshot:', error);
                });
        }
    }

    function updateClock() {
        const currentDate = new Date();
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    
        const clockDisplay = `${hours}:${minutes}:${seconds}`;
        document.getElementById('clock').textContent = clockDisplay;
    }
    

    // Run the captureScreenshot function every 20 minute
    setInterval(captureScreenshot, 1200000);
});
