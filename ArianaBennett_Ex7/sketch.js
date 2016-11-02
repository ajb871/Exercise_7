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

var font1;
//IMAGES
var stars;
var plan1;
var plan2;
var sky1; //stores sky bg image
var seed;
//
var starShow = [];
var cloudCollage = []; //stores generated clouds
var cloudArray = new Array(2); //stores cloud images
var soilArray = new Array(3); //stores soil images

//MVMT VARS
var start1;
var start2;
var spin;

//OTHER VARS
var spark1;
var fcount1 = 0;
var fcount2 = 0;
var fcount3 = 0; //frame count
var startime = true;
var plantSeed = false;
var planetpass = false;
var scene1 = true;
var scene2 = false;
var scene3 = false;
var t = 255; //transparency for soil
var yseed = 100;

function preload() {
	for (var i = 1; i < 5; i++) {
		soilArray[i] = loadImage('data/soil' + i + '.jpg');
	}
	for (var c = 1; c < 3; c++) {
		cloudArray[c] = loadImage('data/clouds' + c + '.png');
	}
	stars = loadImage('data/stars1.jpg');
	sky1 = loadImage('data/sky1.jpg');
	skyhalf = loadImage('data/skyhalf.jpg');
	seed = loadImage('data/seed.png');
	plan1 = loadImage('data/planet1.png');
	plan2 = loadImage('data/pluto1.png');
	font1 = loadFont('data/font1.ttf');
}

function setup() {
	start1 = 5 * PI / 4;
	start2 = PI / 4;
	createCanvas(700, 600);
	background(0);
	imageMode(CENTER); //so images can be rotated around center
	for (var x = 0; x < width + 20; x += 20) {
		for (var y = 0; y < height + 20; y += 20) {
			spark = new Sparkle(x, y);
			starShow.push(spark);
		}
	}
}

function draw() {
	//two scenes alternate, plants moving through space & a seed(then tree) being grown in dirt in front of a blue sky and clouds
	//what happens in each scene is relative to the other
	//console.log(fcount);
	//console.log(yseed);
	//first scene, two planets orbit near eachother
	if (scene1 === true) {
		image(stars, width / 2, height / 2, width, height); //space image covers entire screen
		for (var i = 1; i < starShow.length; i++) {
			starShow[i].run(); //run every star in array
		}
		planets1(0, height / 2, plan1);
		planets2(width, height / 2, plan2);
		if (fcount1 > 50) {
			textFont(font1);
			textAlign(CENTER);
			textSize(60);
			text("the beginning", width / 2, height / 2);
		}

		if (fcount1 > 100) {
			planetpass = true;
		}
		//test = new Sparkle(width/2, height/2);
		//test.run();
		//console.log(test.distance);
		fcount1++;
		console.log(fcount1);
		if (planetpass === true) scene1 = false;
	} //scene1

	if (scene1 === false) scene2 = true;
	//scene of dirt on the ground, clouds go past, the user mouse controls a seed
	//once the seed touches the dirt, scene shifts
	if (scene2 === true) {
		if (plantSeed === false) {
			if (fcount2 < 70) {
				//top half of bg is redrawn to animate clouds across screen
				cloudFunc();
			}
			if ((fcount2 > 50) && (fcount2 < 70)) {
				tint(255, 40); //transparency for fade-in
				image(skyhalf, width / 2, 195, width, 390);
			}
			if ((50 < fcount2) && (fcount2 < 80)) {
				for (var l = 1; l < 5; l++) {
					drawdirt(l); //dirt is drawn as it cycles through array
				}
			}
			if (fcount2 > 80) {
				//a seed appears on screen after background generates
				//if the mouse is over it, and u press, the seed moves to the dirt
				tint(255);
				image(seed, width / 2, yseed, 50, 50);
				yseed += 10;
				/*if ((mouseX > 425) & (mouseX < 475) & (mouseY > 75) & (mouseY < 125)) {
				  var sedPos = true;
				}
				*/
				background(0, map(yseed, 380, 460, 0, 255));
			}
			if (yseed > 460) {
				plantSeed = true;
			}
			fcount2++;
		} else {
			background(255);
			background(0);
			scene2 = false;
			scene3 = true;
		}
	} //scene2
	if (scene3 === true) {
		console.log(fcount3);
		fcount3++;
	} //scene3

	if (fcount3 > 20) {

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

//function planets creates one rotating planet at location put in parameters
function planets1(Px, Py, plannum) {
	//originally a class
	/*planet1 = new Planet(Px, Py);
	planet1.run();*/
	spin = radians(2);
	push();
	translate(Px, Py);
	rotate(start1);
	image(plannum, 210, 210, 90, 90);
	start1 += spin;
	pop();
	//console.log(rotation);
}

function planets2(Px, Py, plannum) {
	//originally a class
	/*planet1 = new Planet(Px, Py);
	planet1.run();*/
	spin = radians(2);
	push();
	translate(Px, Py);
	rotate(start2);
	image(plannum, 210, 210, 90, 90);
	start2 += spin;
	pop();
	//console.log(rotation);
}

//generate clouds with cloud Class
function cloudFunc() {
		i = new Clouds(createVector(random(width), random(0, 230)));
		cloudCollage.push(i);
	for (var i = 0; i < cloudCollage.length; i += 30) {
		cloudCollage[i].run();
	}
}

//generate dirt collage 
function drawdirt(soilnum) { //paramaters passed to Array, determines value
	push(); //push&pop for rotation
	var soilpos = createVector(random(width), random(2 * height / 3, height));
	translate(soilpos.x, soilpos.y); //translate so it rotates from center
	rotate(random(PI / 6)); //random rotations
	tint(255, t); //transparency set with var t
	image(soilArray[soilnum], 0, 0, 150, 150);
	pop();
	t -= 1.0; //transparency decreases as more are drawn
}

//stars that get larger as they mousePos gets closer
/*function starSpark(mousepos) {
  //the starsize is going to be inverse to the difference between the star and mouse pos
  for(var s = 0; s < starShow.length;s ++){
    starShow[s].run();
  }
}
*/