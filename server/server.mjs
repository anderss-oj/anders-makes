import express from 'express';
import fs from 'fs';
import cors from 'cors';
import https from 'https';
import http from 'http';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

let clickData = { totalClicks: 0 };
let startDate;

startDate = new Date(); // Use the local system time as a fallback

setupServer();

function setupServer() {
  app.get('/clicks', (req, res) => {
    res.json(clickData);
  });

  // Get the start date
  app.get('/startDate', (req, res) => {
    res.json({ startDate: startDate.toISOString() });
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

  server.listen(PORT, () => {
    console.log(`Main server is running on port ${PORT}`);
  });
}
