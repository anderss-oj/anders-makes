import p5 from 'p5';
import io from 'socket.io-client';

const sketch = (p) => {
  let dots = []; // Array to store information about each dot
  let symbols = []; // Array to store symbols
  let symbolSpeed = 0.03; // Speed at which symbols slide down
  let redaction1P5; // Declare a variable to store the loaded font
  let fonts = []; // Array to store loaded fonts
  let socket; // Socket.IO instance
  let prevDots = []; // Store the previous state of dots
  let prevSymbols = []; // Store the previous state of symbols

  // p.preload = () => {
  //   // Load the font files
  // const fontPromises = [
  //   p.loadFont('fonts/redactionOTF/Redaction-Regular.otf'),
  //   p.loadFont('fonts/redactionOTF/Redaction10-Regular.otf'),
  //   p.loadFont('fonts/redactionOTF/Redaction20-Regular.otf'),
  //   p.loadFont('fonts/redactionOTF/Redaction35-Regular.otf'),
  //   p.loadFont('fonts/redactionOTF/Redaction50-Regular.otf'),
  //   p.loadFont('fonts/redactionOTF/Redaction70-Regular.otf'),
  //   p.loadFont('fonts/redactionOTF/Redaction100-Regular.otf')
  // ];

  // Promise.all(fontPromises)
  //   .then(loadedFonts => {
  //     fonts = loadedFonts.filter(font => font !== null);
  //   })
  //   .catch(error => {
  //     console.error('Error loading fonts:', error);
  //   });
  // };

  p.setup = () => {
    let canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('canvasContainer');

    // Connect to the Socket.IO server
    socket = io('http://localhost:3001');

    // Handle Socket.IO events
    socket.on('connect', () => {
      console.log('Socket.IO connection opened');
    });

    socket.on('canvasState', (data) => {
      console.log('Received canvas state:', data);

      // Update the dots and symbols arrays based on the received data
      dots = data.dots;
      symbols = data.symbols;
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO connection closed');
    });
  };

  p.draw = () => {
    p.background(145, 145, 154);

    for (let i = symbols.length - 1; i >= 0; i--) {
      let symbol = symbols[i];
      let elapsedSymbolTime = p.millis() - symbol.startTime;

      // Define the color transition points
      const colorPoints = [
        { time: 0, color: p.color(173, 216, 230) }, // Light blue
        { time: 5000, color: p.color(105, 105, 105) }, // Dark gray
        { time: 60000, color: p.color(255, 165, 0) }, // Bright orange
        { time: 100000, color: p.color(143, 93, 32) } // Darker orange
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
      
          // Set the font based on the updated font index, but only if fonts array is not empty
    // if (fonts.length > 0) {
    //   p.textFont(fonts[symbol.fontIndex]);
    // }


      p.push();
      p.translate(symbol.x, symbol.y);
      p.rotate(symbol.angle);
      p.text(symbol.char, 0, 0);
      p.pop();

      symbol.y += symbolSpeed;
      if (symbol.y > p.height + 10) {
        symbols.splice(i, 1);
      }
    }

    // Iterate through all dots
    for (let dot of dots) {
      let elapsedTime = p.millis() - dot.startTime;

      // Define the color transition points for dots
      const dotColorPoints = [
        { time: 0, color: p.color(173, 216, 230) }, // Light blue
        { time: 5000, color: p.color(105, 105, 105) }, // Dark gray
        { time: 60000, color: p.color(255, 165, 0) }, // Bright orange
        { time: 100000, color: p.color(143, 93, 32) } // Darker orange
      ];

      // Find the two closest color points based on elapsed time
      let prevColorPoint, nextColorPoint;
      for (let j = 0; j < dotColorPoints.length - 1; j++) {
        if (elapsedTime >= dotColorPoints[j].time && elapsedTime < dotColorPoints[j + 1].time) {
          prevColorPoint = dotColorPoints[j];
          nextColorPoint = dotColorPoints[j + 1];
          break;
        }
      }

      // Lerp between the two closest color points
      let lerpedColor;
      if (prevColorPoint && nextColorPoint) {
        const t = p.map(elapsedTime, prevColorPoint.time, nextColorPoint.time, 0, 1);
        lerpedColor = p.lerpColor(prevColorPoint.color, nextColorPoint.color, t);
      } else {
        // If elapsed time is beyond the last color point, use the last color
        lerpedColor = dotColorPoints[dotColorPoints.length - 1].color;
      }

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
    // Check if there are changes in the dots or symbols arrays
    const dotsChanged = !areArraysEqual(dots, prevDots);
    const symbolsChanged = !areArraysEqual(symbols, prevSymbols);

    if (dotsChanged || symbolsChanged) {
      const canvasState = { dots, symbols };
      socket.emit('canvasState', canvasState);

      // Update the previous state
      prevDots = [...dots];
      prevSymbols = [...symbols];
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

// Helper function to compare arrays
function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (!isObjectEqual(arr1[i], arr2[i])) {
      return false;
    }
  }

  return true;
}

// Helper function to compare objects
function isObjectEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

