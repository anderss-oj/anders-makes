import p5 from 'p5';

let canvas;

const sketch = (p) => {
    p.setup = () => {
        canvas = p.createCanvas(windowWidth, windowHeight);
    };
    

    p.draw = () => {
        p.background(220);
        // Display rust effect
        simulateRust(p);
    };

    p.mousePressed = () => {
        // Trigger bloom effect when mouse is pressed
        bloomEffect(p.mouseX, p.mouseY, p);
    };

    function bloomEffect(x, y, p) {
        // Set bloom color and draw a circle
        p.fill(255, 0, 0, 150);
        p.noStroke();
        p.ellipse(x, y, 100, 100);
    }

    function simulateRust(p) {
        // Simulate rust by gradually changing the background color
        let rustColor = p.color(139, 69, 19); // Brown color for rust
        let backgroundColor = p.lerpColor(p.background(220), rustColor, 0.01); // Gradually transition to rust color
        p.background(backgroundColor);
    }
};

new p5(sketch);
