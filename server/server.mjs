import express from 'express';
import fs from 'fs';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

let clickData = { totalClicks: 0 };

app.get('/clicks', (req, res) => {
    res.json(clickData);
});

// Update totalClicks and write to clicks.json file
app.post('/clicks', (req, res) => {
    clickData.totalClicks++;
    fs.writeFile('clicks.json', JSON.stringify(clickData), (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to save click data' });
        } else {
            res.status(200).json({ totalClicks: clickData.totalClicks }); // Send totalClicks in the response
        }
    });
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default server; // Export the server instance