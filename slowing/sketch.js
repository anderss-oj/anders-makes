let dots = []; // Array to store information about each dot
let symbols = []; // Array to store symbols
let symbolSpeed = 0.03; // Speed at which symbols slide down
let redaction1P5; // Declare a variable to store the loaded font
let fonts = []; // Array to store loaded fonts

function preload() {
  // Load the font file
  fonts.push(loadFont('/fonts/redactionOTF/Redaction-Regular.otf'));
  fonts.push(loadFont('/fonts/redactionOTF/Redaction10-Regular.otf'));
  fonts.push(loadFont('/fonts/redactionOTF/Redaction20-Regular.otf'));
  fonts.push(loadFont('/fonts/redactionOTF/Redaction35-Regular.otf'));
  fonts.push(loadFont('/fonts/redactionOTF/Redaction50-Regular.otf'));
  fonts.push(loadFont('/fonts/redactionOTF/Redaction70-Regular.otf'));
  fonts.push(loadFont('/fonts/redactionOTF/Redaction100-Bold.otf'));
}


function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('canvasContainer');

  // textFont(redaction1P5);
}

function draw() {
  background(145, 145, 154);

  for (let i = symbols.length - 1; i >= 0; i--) {
    let symbol = symbols[i];
    let elapsedSymbolTime = millis() - symbol.startTime;

    // Define the color transition points
    const colorPoints = [
      { time: 0, color: color(173, 216, 230) }, // Light blue
      { time: 20000, color: color(105, 105, 105) }, // Dark gray
      { time: 40000, color: color(255, 165, 0) }, // Bright orange
      { time: 60000, color: color(255, 140, 0) } // Darker orange
    ];

    // Find the two closest color points based on elapsed time
    let prevColorPoint, nextColorPoint;
    for (let j = 0; j < colorPoints.length - 1; j++) {
      if (elapsedSymbolTime >= colorPoints[j].time && elapsedSymbolTime < colorPoints[j + 1].time) {
        prevColorPoint = colorPoints[j];
        nextColorPoint = colorPoints[j + 1];
        break;
      }
    }

    // Lerp between the two closest color points
    let lerpedColor;
    if (prevColorPoint && nextColorPoint) {
      const t = map(elapsedSymbolTime, prevColorPoint.time, nextColorPoint.time, 0, 1);
      lerpedColor = lerpColor(prevColorPoint.color, nextColorPoint.color, t);
    } else {
      // If elapsed time is beyond the last color point, use the last color
      lerpedColor = colorPoints[colorPoints.length - 1].color;
    }

    textSize(symbol.size);
    fill(lerpedColor);
    noStroke();

    // Update the font index based on the elapsed time for the symbol
    symbol.fontIndex = floor(map(elapsedSymbolTime % 60000, 0, 60000, 0, fonts.length));

    // Set the font based on the updated font index
    textFont(fonts[symbol.fontIndex]);

    push();
    translate(symbol.x, symbol.y);
    rotate(symbol.angle);
    text(symbol.char, 0, 0);
    pop();

    symbol.y += symbolSpeed;
    if (symbol.y > height - 10) {
      symbols.splice(i, 1);
    }
  }

  // Iterate through all dots
  for (let dot of dots) {
    let elapsedTime = millis() - dot.startTime;
    let lerpedColor = lerpColor(color(255, 0, 0), color(0, 0, 255), map(min(elapsedTime, 60000), 0, 60000, 0, 1));
    noFill();
    strokeWeight(1);
    stroke(lerpedColor);
    let vertices = dot.shape;
    for (let i = 0; i < vertices.length - 1; i++) {
      let currentVertex = vertices[i];
      let nextVertex = vertices[i + 1];
      line(currentVertex[0], currentVertex[1], nextVertex[0], nextVertex[1]);
    }
  }
}

function mouseDragged() {
  createDots();
}

function mousePressed() {
  createDots();
}

function createDots() {
  let startTime = millis();
  for (let i = 0; i < 1; i++) {
    let angle = random(TWO_PI);
    let radius = sqrt(random(600, 1000));
    let jitterX = random(-30, 30);
    let jitterY = random(-30, 30);
    let diameter = random(10, 20);
    let x = mouseX + radius * cos(angle) + jitterX;
    let y = mouseY + radius * sin(angle) + jitterY;
    let vertices = [];
    for (let i = 0; i < 10; i++) {
      let xOff = random(-diameter / 2, diameter / 2);
      let yOff = random(-diameter / 2, diameter / 2);
      vertices.push([x + xOff, y + yOff]);
    }
    dots.push({ x, y, diameter, startTime, shape: vertices });
  }
}

function keyPressed() {
  if (key !== ' ' && key !== 'Enter' && key !== 'Tab' && key !== 'Shift' && key !== 'Control' && key !== 'Alt' && key !== 'Meta' && key !== 'Backspace') {
    let symbolSize = random(10, 30);
    let symbolColor = color(random(255), random(255), random(255));
    let symbolX = random(width - symbolSize);
    let symbolY = random(height - symbolSize);
    let angle = random(TWO_PI);
    let symbolStartTime = millis();

    // Add the symbol to the symbols array with the initial font index set to 0
    symbols.push({ char: key, size: symbolSize, color: symbolColor, x: symbolX, y: symbolY, angle: angle, startTime: symbolStartTime, fontIndex: 0 });
  }
}
