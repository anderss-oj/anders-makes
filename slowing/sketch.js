import p5 from 'p5';

const sketch = (p) => {
  let dots = []; // Array to store information about each dot
  let symbols = []; // Array to store symbols
  let symbolSpeed = 0.03; // Speed at which symbols slide down
  let redaction1P5; // Declare a variable to store the loaded font
  let fonts = []; // Array to store loaded fonts

  p.preload = () => {
    // Load the font files
    fonts.push(p.loadFont('/fonts/redactionOTF/Redaction-Regular.otf'));
    fonts.push(p.loadFont('/fonts/redactionOTF/Redaction10-Regular.otf'));
    fonts.push(p.loadFont('/fonts/redactionOTF/Redaction20-Regular.otf'));
    fonts.push(p.loadFont('/fonts/redactionOTF/Redaction35-Regular.otf'));
    fonts.push(p.loadFont('/fonts/redactionOTF/Redaction50-Regular.otf'));
    fonts.push(p.loadFont('/fonts/redactionOTF/Redaction70-Regular.otf'));
    fonts.push(p.loadFont('/fonts/redactionOTF/Redaction100-Bold.otf'));
  };

  p.setup = () => {
    let canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('canvasContainer');
  };

  p.draw = () => {
    p.background(145, 145, 154);

    for (let i = symbols.length - 1; i >= 0; i--) {
      let symbol = symbols[i];
      let elapsedSymbolTime = p.millis() - symbol.startTime;

      // Define the color transition points
      const colorPoints = [
        { time: 0, color: p.color(173, 216, 230) }, // Light blue
        { time: 20000, color: p.color(105, 105, 105) }, // Dark gray
        { time: 40000, color: p.color(255, 165, 0) }, // Bright orange
        { time: 60000, color: p.color(255, 140, 0) } // Darker orange
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
        const t = p.map(elapsedSymbolTime, prevColorPoint.time, nextColorPoint.time, 0, 1);
        lerpedColor = p.lerpColor(prevColorPoint.color, nextColorPoint.color, t);
      } else {
        // If elapsed time is beyond the last color point, use the last color
        lerpedColor = colorPoints[colorPoints.length - 1].color;
      }

      p.textSize(symbol.size);
      p.fill(lerpedColor);
      p.noStroke();

      // Update the font index based on the elapsed time for the symbol
      symbol.fontIndex = p.floor(p.map(elapsedSymbolTime % 60000, 0, 60000, 0, fonts.length));

      // Set the font based on the updated font index
      p.textFont(fonts[symbol.fontIndex]);

      p.push();
      p.translate(symbol.x, symbol.y);
      p.rotate(symbol.angle);
      p.text(symbol.char, 0, 0);
      p.pop();

      symbol.y += symbolSpeed;
      if (symbol.y > p.height - 10) {
        symbols.splice(i, 1);
      }
    }

    // Iterate through all dots
    for (let dot of dots) {
      let elapsedTime = p.millis() - dot.startTime;
      let lerpedColor = p.lerpColor(p.color(255, 0, 0), p.color(0, 0, 255), p.map(p.min(elapsedTime, 60000), 0, 60000, 0, 1));
      p.noFill();
      p.strokeWeight(1);
      p.stroke(lerpedColor);
      let vertices = dot.shape;
      for (let i = 0; i < vertices.length - 1; i++) {
        let currentVertex = vertices[i];
        let nextVertex = vertices[i + 1];
        p.line(currentVertex[0], currentVertex[1], nextVertex[0], nextVertex[1]);
      }
    }
  };

  p.mouseDragged = () => {
    createDots();
  };

  p.mousePressed = () => {
    createDots();
  };

  function createDots() {
    let startTime = p.millis();
    for (let i = 0; i < 1; i++) {
      let angle = p.random(p.TWO_PI);
      let radius = p.sqrt(p.random(600, 1000));
      let jitterX = p.random(-30, 30);
      let jitterY = p.random(-30, 30);
      let diameter = p.random(10, 20);
      let x = p.mouseX + radius * p.cos(angle) + jitterX;
      let y = p.mouseY + radius * p.sin(angle) + jitterY;
      let vertices = [];
      for (let i = 0; i < 10; i++) {
        let xOff = p.random(-diameter / 2, diameter / 2);
        let yOff = p.random(-diameter / 2, diameter / 2);
        vertices.push([x + xOff, y + yOff]);
      }
      dots.push({ x, y, diameter, startTime, shape: vertices });
    }
  }

  p.keyPressed = () => {
    if (p.key !== ' ' && p.key !== 'Enter' && p.key !== 'Tab' && p.key !== 'Shift' && p.key !== 'Control' && p.key !== 'Alt' && p.key !== 'Meta' && p.key !== 'Backspace') {
      let symbolSize = p.random(10, 30);
      let symbolColor = p.color(p.random(255), p.random(255), p.random(255));
      let symbolX = p.random(p.width - symbolSize);
      let symbolY = p.random(p.height - symbolSize);
      let angle = p.random(p.TWO_PI);
      let symbolStartTime = p.millis();

      // Add the symbol to the symbols array with the initial font index set to 0
      symbols.push({ char: p.key, size: symbolSize, color: symbolColor, x: symbolX, y: symbolY, angle: angle, startTime: symbolStartTime, fontIndex: 0 });
    }
  };
};

new p5(sketch);
