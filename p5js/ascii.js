const elementsX = 10;
const elementsY= 30;

var charset = "'';;;::';''::"

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  // fill(0);
  // noStroke();
  
  textFont('Courier New')
  textAlign(CENTER,CENTER);
  textSize((height/elementsY) *2);
  
  for (let y = 0; y < elementsY + 1; y++) {
    for (let x = 0; x < charset.length + 1; x++) {
      let posY = map(y, 0, elementsY, 0, height);
      let magX = map(sin(radians(posY * 0.4 + frameCount)), -1, 1, - width * 0.4, width * 0.4)
      let posX = map(x, 0, charset.length, -magX, magX);
      
      
      let selector = x
      push();
      translate(width / 2 + posX, posY);
      text(charset[selector],0 ,0);
      pop();
    }
  }
}
console.log (window.innerHeight, window.innerWidth)