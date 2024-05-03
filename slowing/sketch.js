// let dots = []; // Array to store information about each dot

// function setup() {
//   createCanvas(900, 900);
// }

// function draw() {
//   background(220);
//   // Iterate through all dots
//   for (let dot of dots) {
//     let elapsedTime = millis() - dot.startTime; // Calculate elapsed time since the dot's start time
    
//     // Calculate color based on elapsed time
//     let lerpedColor = lerpColor(color(255, 0, 0), color(0, 0, 255), map(min(elapsedTime, 60000), 0, 60000, 0, 1));
//     noStroke();
//     fill(lerpedColor); // Set fill color
//     ellipse(dot.x, dot.y, dot.diameter, dot.diameter); // Draw circles with varying sizes and changing colors
//   }
// }

// function mouseDragged() {
//   let startTime = millis(); // Log the time of the click event
  
//   // Add new dots to the array
//   for (let i = 0; i < 5; i++) { // Reduce the number of dots for smoother dragging
//     let angle = random(TWO_PI); // Random angle within the circle
//     let radius = sqrt(random(600, 1000)); // Random radius (sqrt of the distance) within the maximum distance
//     let jitterX = random(-30, 30); // Random jitter for x-axis
//     let jitterY = random(-30, 30); // Random jitter for y-axis
//     let diameter = random(2, 4); // Random diameter for each circle

//     let x = mouseX + radius * cos(angle) + jitterX; // Calculate x position with jitterX
//     let y = mouseY + radius * sin(angle) + jitterY; // Calculate y position with jitterY
    
//     dots.push({ x, y, diameter, startTime }); // Add dot information to the array along with its start time
//   }
// }

let dots = []; // Array to store information about each dot

function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('canvasContainer');
}

function draw() {
  // background(none);
  
  // Iterate through all dots
  for (let dot of dots) {
    let elapsedTime = millis() - dot.startTime; // Calculate elapsed time since the dot's start time
    
    // Calculate color based on elapsed time
    let lerpedColor = lerpColor(color(255, 0, 0), color(0, 0, 255), map(min(elapsedTime, 120000), 0, 120000, 0, 1));
    noFill();
    strokeWeight(1);
    stroke(lerpedColor); // Set stroke color
    
    // Draw irregular shapes instead of ellipses
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
  let startTime = millis(); // Log the time of the click event
  
  // Add new dots to the array
  for (let i = 0; i < 2; i++) { // Reduce the number of dots for smoother dragging
    let angle = random(TWO_PI); // Random angle within the circle
    let radius = sqrt(random(600, 1000)); // Random radius (sqrt of the distance) within the maximum distance
    let jitterX = random(-30, 30); // Random jitter for x-axis
    let jitterY = random(-30, 30); // Random jitter for y-axis
    let diameter = random(10, 20); // Random diameter for each dot
    
    let x = mouseX + radius * cos(angle) + jitterX; // Calculate x position with jitterX
    let y = mouseY + radius * sin(angle) + jitterY; // Calculate y position with jitterY
    
    let vertices = []; // Array to store irregular shape vertices
    for (let i = 0; i < 4; i++) {
      let xOff = random(-diameter / 2, diameter / 2); // Random x offset within half of the diameter
      let yOff = random(-diameter / 2, diameter / 2); // Random y offset within half of the diameter
      vertices.push([x + xOff, y + yOff]);
    }
    
    dots.push({ x, y, diameter, startTime, shape: vertices }); // Add dot information to the array along with its start time and shape
  }
}
