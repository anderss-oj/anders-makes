let curves = []; // Array to store bezier curves
const maxCurves = 90; // Maximum number of curves to keep on the canvas

let lastMouseX;
let lastMouseY;

function setup() {
  let canvas= createCanvas(windowWidth, windowHeight);
  background(0);
  canvas.mouseMoved(mouseMoveChange);
  canvas.mouseClicked(showCoordinates);
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function draw() {
  // Draw the new bezier curve if mouse is moving
  if (mouseX !== lastMouseX || mouseY !== lastMouseY) {
    // Draw the new bezier curve
    let newCurve = {
      x1: mouseX, 
      y1: (mouseY),
      x2: (mouseY),
      y2: (mouseX),
      x3: (mouseX),
      y3: (mouseY),
      x4: (mouseX),
      y4: (mouseY),
      x5: (mouseX),
      y5: (mouseY),
      x6: (mouseX),
      y6: windowHeight
    };
    curves.push(newCurve);

    // Draw all curves
    background(0); // Clear the canvas
    noFill();
    // stroke(255);
    for (let i = max(curves.length - maxCurves, 0); i < curves.length; i++) {
      let curve = curves[i];
      bezier(curve.x1, curve.y1, curve.x2, curve.y2, curve.x3, curve.y3, curve.x4, curve.y4, curve.x5, curve.y5, curve.x6, curve.y6);
    }
    
    // Remove the oldest curve if the total number of curves exceeds 10
    if (curves.length > maxCurves) {
      curves.shift();
    }

  // Start the loop if it's not already running
      if (!isLooping()) {
        loop();
      }
      else { // Stop the loop if mouse is not moving
      noLoop();
    }

    // Update last mouse position
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }
}
  

function mouseMoveChange() {
  stroke(random(255), random(255), random(255));
  // console.log('mouseMoveChange has run');
  loopCheck();
}

function loopCheck() {
  if (isLooping()) {
    noLoop();
  }
  else {
    loop();
  }
}

function showCoordinates () {
  console.log (mouseX + 'x. ' + mouseY + 'y.')
}