document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('clickButton');
    const totalClicksDisplay = document.getElementById('totalClicks');

    clickButton.addEventListener('click', () => {
        fetch('http://localhost:3000/clicks', { method: 'POST' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send click data to server');
                }
                return response.json();
            })
            .then(data => {
                console.log('Click data received:', data); // Log the received data
                if (data && typeof data.totalClicks !== 'undefined') {
                    totalClicksDisplay.textContent = data.totalClicks;
                } else {
                    console.error('Invalid or missing totalClicks data');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});