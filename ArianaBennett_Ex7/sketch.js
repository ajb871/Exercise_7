//"Through Love"
//a story of the stages of falling in love, and how a solid, lasting relationship grows
//from it
//two people represented by planets, relationship represented by a growing plant
//"collision", "spinning", "the slow down"
//"collision", two planets orbit near one another, come into eachothers lives
//this is the seed, a potential for a relationship
//"spinning" represented with a galaxy, hurricane and whirpool, the stage
//of dizzying obsession, unstable, exciting, constant movement, move around&towards eachother
//the water from this whirpool waters the seed of the relationship, grows into a sapling
//"slow down", from lust&passion to partnership & attatchment
//return to the spinning, which starts to slow down, this can go one of two ways 
//either 

//IMAGES
var sky1; //stores sky bg image
var stars;
//
var cloudCollage = []; //stores generated clouds
var cloudArray = new Array(2); //stores cloud images
var soilArray = new Array(3); //stores soil images
var seed;

//OTHER VARS
var plantSeed = false;
var fcount = 0; //frame count
var fcount2;
var scene1 = true;
var scene2 = false;
var scene3 = false;
var t = 255; //transparency for soil
var yseed = 100;

function preload() {
  for (var i = 1; i < 5; i++) {
    soilArray[i] = loadImage('data/soil' + i + '.jpg');
  }
  for (var i = 1; i < 3; i++) {
    cloudArray[i] = loadImage('data/clouds' + i + '.png');
  }
  stars = loadImage('data/stars1.jpg');
  sky1 = loadImage('data/sky1.jpg');
  skyhalf = loadImage('data/skyhalf.jpg');
  seed = loadImage('data/seed.png');
}

function setup() {
  createCanvas(900, 600);
  background(0);
  imageMode(CENTER); //so images can be rotated around center
}

function draw() {
  console.log(fcount);
  console.log(yseed);
  //first scene, two planets orbit near eachother
  if (scene1 ===true){
    image(stars, width/2, height/2, 900, 900); //space image covers entire screen
    stars(createVector(mouseX, mouseY));
  }
  //scene of dirt on the ground, clouds go past, the user mouse controls a seed
  //once the seed touches the dirt, scene shifts
  if (scene2 === true) {
    if (plantSeed === false) {
      if (fcount < 80) {
        tint(255, 80); //transparency for "trail" effect
        //top half of bg is redrawn to animate clouds across screen
        image(skyhalf, width / 2, height / 3, 900, 390);
        cloudFunc();
      }
      if ((70 < fcount) && (fcount < 90)) {
        for (var i = 1; i < 5; i++) {
          drawdirt(i); //dirt is drawn as it cycles through array
        }
      }
      if (fcount > 90) {
        //a seed appears on screen after background generates
        //if the mouse is over it, and u press, the seed moves to the dirt
        image(seed, width / 2, yseed, 50, 50);
        yseed += 10;
        /*if ((mouseX > 425) & (mouseX < 475) & (mouseY > 75) & (mouseY < 125)) {
          var sedPos = true;
        }
        */
        background(0, map(yseed, 200, 500, 0, 255));
      }
      if (yseed > 460) {
        plantSeed = true;
      }
      fcount++;
    } else {
      background(255);
      background(0);
      fcount2 = fcount;
      scene2 = true;
    }
  }
  if (scene3 === true) {
    fcount2++;
  }
  if (fcount2 > 20) {

  }
}


/*function birds() {
  for (var i = 0; i < 5; i++) {
    i = new Particle(createVector(0, random(0, height)));
    birdz.push(i);
  }
  for(var i = 0; i < birdz.length; i ++){
    birdz[i].run();
  }
}
*/

//generate clouds with cloud Class
function cloudFunc() {
  if (fcount < 600) {
    i = new Clouds(createVector(random(0, 2 * width / 3), random(50, 170)));
    cloudCollage.push(i);
  }
  for (var i = 0; i < cloudCollage.length; i += 30) {
    cloudCollage[i].run();
  }
}

//generate dirt collage 
function drawdirt(soilnum) { //paramaters passed to Array, determines value
  push(); //push&pop for rotation
  var soilpos = createVector(random(width), random(4 * height / 5, height));
  translate(soilpos.x, soilpos.y); //translate so it rotates from center
  rotate(random(PI / 6)); //random rotations
  tint(255, t); //transparency set with var t
  image(soilArray[soilnum], 0, 0, 150, 150);
  pop();
  t -= 1.0; //transparency decreases as more are drawn
}

//stars that get larger as they mousePos gets closer
function stars(mousePos){
  var starsize;
  var star = createVector(random(width), random(height));
  ellipse(star.x, star.y, starsize);
  
}

function space() {

}