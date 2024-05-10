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
    const archiveSoon = $('#archiveSoon');
    const startDate = new Date();
    let totalClicks;

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
                    updateFont(archiveSoon);

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

    function updateFont(element) {
        if (totalClicks <= 200) {
            $(element).removeClass('redaction2 redaction3 redaction4 redaction5 redaction6');
            $(element).addClass('redaction1');
        }
        else if (totalClicks <= 600) {
            $(element).removeClass('redaction1 redaction3 redaction4 redaction5 redaction6');
            $(element).addClass('redaction2');
        }
        else if (totalClicks <= 900) {
            $(element).removeClass('redaction1 redaction2 redaction4 redaction5 redaction6');
            $(element).addClass('redaction3');
        }
        else if (totalClicks <= 1100) {
            $(element).removeClass('redaction1 redaction2 redaction3 redaction5 redaction6');
            $(element).addClass('redaction4');
        }
        else if (totalClicks <= 3100) {
            $(element).removeClass('redaction1 redaction2 redaction3 redaction4 redaction6');
            $(element).addClass('redaction5');
        }
        else if (totalClicks >= 1500) {
            $(element).removeClass('redaction1 redaction2 redaction3 redaction4 redaction5');
            $(element).addClass('redaction6');
        }
    }

    function captureScreenshot(isScheduled = false) {
        html2canvas(document.body)
          .then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
      
            if (isScheduled) {
              const currentDate = new Date();
              const timeDiff = currentDate.getTime() - startDate.getTime();
              const minutesSinceStart = Math.floor(timeDiff / (1000 * 60));
      
              if (minutesSinceStart % 20 !== 0) {
                return; // Exit the function if it's not the scheduled time
              }
      
              downloadLink.download = `screenshot_${currentDate.toISOString()}.png`;
            } else {
              downloadLink.download = 'screenshotNow.png';
            }
      
            downloadLink.href = imgData;
            downloadLink.click();
          })
          .catch(error => {
            console.error('Error capturing screenshot:', error);
          });
      }
      
      // Add event listener for the captureBtn click
      document.getElementById('captureBtn').addEventListener('click', () => {
        captureScreenshot(false); // Call the function with isScheduled set to false
      });
      
      // Call the captureScreenshot function every minute to check for the scheduled time
      setInterval(() => {
        captureScreenshot(true); // Call the function with isScheduled set to true
    }, 600000); // 600000 milliseconds = 10 minute

    // Combine getDate and updateClock functions
    function updateClock() {
        const currentDate = new Date();
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');

        const clockDisplay = `${hours}:${minutes}:${seconds}`;
        document.getElementById('clock').textContent = clockDisplay;
    }

    // Call updateClock every second
    setInterval(updateClock, 1000);
});
