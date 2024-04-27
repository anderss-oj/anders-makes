import $ from "jquery";
import html2canvas from 'html2canvas';

document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('clickButton');
    // const totalClicksDisplay = document.getElementById('totalClicks');
    const archive = $('#archive');
    const dayCount = $('#dayCount');
    const timer = $('#timer');
    const ellipses = $('#ellipses');
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
                console.log('Click data received:', data); // Log the received data
                totalClicks = data.totalClicks; // Access the totalClicks property
                if (typeof totalClicks === 'number') {
                    // totalClicksDisplay.textContent = totalClicks; // Update the DOM with the totalClicks value
                    // Pass the specific element to updateFont
                    updateFont(archive);
                    updateFont(dayCount);
                    updateFont(timer);
                    updateFont(ellipses);

                } else {
                    console.error('Invalid or missing totalClicks data');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    fetchClickData();

    clickButton.addEventListener('click', () => {
        fetchClickData();
    });

    function updateFont(element) {
        if (totalClicks <= 10 ) {
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

    function screenShotSend(element) {

    }
});
