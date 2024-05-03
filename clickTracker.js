import $ from "jquery";
import html2canvas from 'html2canvas';

document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('clickButton');
    const archive = $('#archive');
    const dayCount = $('#dayCount');
    const timer = $('#timer');
    const ellipses = $('#ellipses');
    const back = $('#back');
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

    const captureBtn = document.getElementById('captureBtn');

    captureBtn.addEventListener('click', () => {
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
        
});

