// import p5 from 'p5';

// let canvas;

// const sketch = (p) => {
//     p.setup = () => {
//         canvas = p.createCanvas(window.innerWidth, window.innerWidth);
//     };
    

//     p.draw = () => {
//         p.background(220);
//         // Display rust effect
//         simulateRust(p);
//     };

//     p.mousePressed = () => {
//         // Trigger bloom effect when mouse is pressed
//         bloomEffect(p.mouseX, p.mouseY, p);
//     };

//     function bloomEffect(x, y, p) {
//         // Set bloom color and draw a circle
//         p.fill(255, 0, 0, 150);
//         p.noStroke();
//         p.ellipse(x, y, 100, 100);
//     }

//     function simulateRust(p) {
//         // Simulate rust by gradually changing the background color
//         let rustColor = p.color(139, 69, 19); // Brown color for rust
//         let backgroundColor = p.lerpColor(p.background(220), rustColor, 0.01); // Gradually transition to rust color
//         p.background(backgroundColor);
//     }
// };

export const sketch = (p) => {
  let canvas;

  p.setup = () => {
      canvas = p.createCanvas(window.innerWidth, window.innerWidth);
  };
  
  p.draw = () => {
      p.background(220);
      // Display rust effect
      simulateRust();
  };

  p.mousePressed = () => {
      // Trigger bloom effect when mouse is pressed
      bloomEffect(p.mouseX, p.mouseY);
  };

  function bloomEffect(x, y) {
      // Set bloom color and draw a circle
      p.fill(255, 0, 0, 150);
      p.noStroke();
      p.ellipse(x, y, 100, 100);
  }

  function simulateRust() {
      // Simulate rust by gradually changing the background color
      let rustColor = p.color(139, 69, 19); // Brown color for rust
      let backgroundColor = p.lerpColor(p.background(220), rustColor, 0.01); // Gradually transition to rust color
      p.background(backgroundColor);
  }
};



// Exporting a function called 'mySketch'
// export const mySketch = (p) => {
//     let maxSize = 500
//     let wspeed = 1.66
//     let hspeed = 1.33
//     let w = 0
//     let h = maxSize
//     let r = 0
  
//     // Calling p5.js functions, using the variable 'p'
//     p.setup = () => {
//       // Creating a canvas using the entire screen of the webpage
//       p.createCanvas(window.innerWidth, window.innerHeight)
//       p.strokeWeight(5)
//       p.background(255)
  
//       console.log('p5.js setup function executed!')
//     }
  
//     p.draw = () => {
//       // Clear the frame
//       p.background(255, 50)
  
//       // Draw an ellipse
//       p.translate(p.width / 2, p.height / 2)
//       p.rotate(r)
//       p.fill(0, 1)
//       p.stroke(5)
//       p.ellipse(0, 0, w, h)
  
//       // Updating rotation and increment values
//       r = r + 0.015
//       w = w + wspeed
//       h = h + hspeed
//       if (w < 0 || w > maxSize) wspeed *= -1
//       if (h < 0 || h > maxSize) hspeed *= -1
//     }
  
//     p.windowResized = () => {
//       p.resizeCanvas(window.innerWidth, window.innerHeight)
//     }
//   }
