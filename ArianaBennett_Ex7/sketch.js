//"Through Love"
//a visualition of the stages of falling in love, and how a lasting relationship grows
//from it
//two people represented by planets, relationship represented by a growing plant
//"collision", "spinning", "the slow down"
//"collision", two planets orbit near one another, come into eachothers lives
//this is the seed, a potential for a relationship
//"spinning" represented with a galaxy, hurricane and whirpool, the stage
//of dizzying obsession, unstable, exciting, move around&towards eachother
// waters the seed of the relationship, grows into a sapling
//"slow down", from obsession&passion to partnership & attatchment
//return to the spinning, which starts to slow down, the two become bonded 


//FONTS
var font1;
//IMAGES
var stars;
var plan1;
var plan2;
var sky1; //stores sky bg image
var seed2;
var galaxy;
var hurricane;
var sap;
var stars2;
var tree1;

//ARRAYS
var raining = [];
var raining2 = [];
var starShow = [];
var cloudCollage = []; //stores generated clouds
var cloudArray = new Array(2); //stores cloud images
var soilArray = new Array(3); //stores soil images

//MVMT VARS
var start1;
var start2;
var start3;
var spin;
var b;
var rotr;
var cstart1;
var cstart2;
var slowR;
var plandistance = 250;

//OTHER VARS
//frame counts, scenes, & bools
var fcount1 = 0;
var fcount2 = 0;
var fcount3 = 0; //frame count
var fcount4 = 0;
var fcount5 = 0;
var fcount6 = 0;
var dirtcount = 0;
var endcount = 0;
var planted = false;
var plantSeed = false;
var planetpass = false;
var addR;
var scene1 = true;
var scene2 = false;
var scene3 = false;
var scene4 = false;
var scene5 = false;
var scene6 = false;

//misc
var t = 255; //transparency for soil
var yseed = 100;
var x = 0; //pixel locations in sapling
var y = 0;
var linethicc = 0;

function preload() {
	for (var i = 1; i < 5; i++) {
		soilArray[i] = loadImage('data/soil' + i + '.jpg');
	}
	for (var c = 1; c < 3; c++) {
		cloudArray[c] = loadImage('data/clouds' + c + '.png');
	}
	stars = loadImage('data/stars1.jpg');
	sky1 = loadImage('data/sky2.jpg');
	sky2 = loadImage('data/sky1.jpg');
	seed2 = loadImage('data/seed2.png');
	plan1 = loadImage('data/planet1.png');
	plan2 = loadImage('data/pluto1.png');
	font1 = loadFont('data/font1.ttf');
	galaxy = loadImage('data/spinning_galaxy.jpg');
	hurricane = loadImage('data/hurricane1.gif');
	sap = loadImage('data/sapling1.jpg');
	stars2 = loadImage('data/stars2.jpeg');
	tree1 = loadImage('data/tree1.png');
}

function setup() {
	start1 = 5 * PI / 4;
	start2 = PI / 4;
	start3 = PI / 6;
	cstart1 = 0;
	cstart2 = TWO_PI;
	addR = radians(2);
	rotr = random(TWO_PI);
	slowR = radians(3.5);

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

	//first scene, two planets orbit past eachother
	//SCENE ONE

	if (scene1 === true) {
		image(stars, width / 2, height / 2, width, height); //space image covers entire screen
		for (var i = 1; i < starShow.length; i++) {
			starShow[i].run(); //run every star in array
		}
		//I couldn't use parameters to input a starting position so I created 2 seperate functions for each planet
		planets1(0, height / 2);
		planets2(width, height / 2);
		if (fcount1 > 50) {
			textFont(font1);
			textAlign(CENTER);
			textSize(60);
			text("the beginning", width / 2, height / 2);
			addR = radians(0.5);
		}
		if (fcount1 > 80) {
			planetpass = true;
		}
		fcount1++;
		console.log(fcount1);
		if (planetpass === true) {
			scene1 = false;
			scene2 = true;
		}
	} //scene1

	//SCENE TWO - a seed is planted
	//scene of dirt on the ground, clouds go past, the user mouse controls a seed
	//once the seed touches the dirt, scene shifts
	if (scene2 === true) {
		scene1 = false;
		if ((planted === false) && (fcount2 > 20)) {
			tint(255, 130); //transparency for fade-in
			image(sky1, width / 2, height / 2, width, height);
		}
		if ((planted === false)) {
			//top half of bg is redrawn to animate clouds across screen
			cloudFunc();
		}
		if ((fcount2 > 30) && (planted === false)) {
			//a seed appears on screen after background generates
			//if the mouse is over it, and u press, the seed moves to the dirt
			tint(255);
			image(seed2, mouseX, mouseY, 30, 40);
		}
		if ((mouseY > 490) && (mouseX > width / 2 - 100) && (mouseX < width / 2 + 100) && (planted === false)) {
			image(seed2, mouseX, mouseY, 40, 50);
			if (mouseIsPressed) {
				planted = true;
			}
		}
		if ((planted === true)) {
			dirtcount++;
			if (dirtcount < 15) {
				for (var l = 1; l < 5; l++) {
					drawdirt(l); //dirt is drawn as it cycles through array
				}
			}
			if (dirtcount > 5) {
				fill(90);
				text("concept", width / 2, height / 4);
			}
			if (dirtcount > 70) {
				plantSeed = true;
			}
		}
		fcount2++;
		if (plantSeed === true) {
			endcount++;
			background(0, 200);
			scene1 = false;
			scene2 = false;
			scene3 = true;
		}
	} //scene2

	//SCENE THREE - they orbit one another
	if (scene3 === true) {
		scene1 = false;
		scene2 = false;
		tint(255, 90);
		if ((fcount3 > 10) && (fcount3 < 80)) {
			image(galaxy, width / 2, height / 2);
			image(plan1, width / 2, height / 2, 150, 150);
			spinning();
		}
		if (fcount3 > 40) {
			fill(255);
			text("gravitation", width / 2, height / 3);
		}
		if (fcount3 > 50) {
			tint(255, 80);
			hurrispin();
		}
		if ((fcount3 > 60) && (scene3 === true)) {
			text("obsession", width / 2, 2 * height / 3 + 40);
			hurrispin2();
		}

		if (fcount3 > 150) {
			scene1 = false;
			scene2 = false;
			scene3 = false;
			scene4 = true;
		}
		console.log(fcount3);
		fcount3++;
	} //scene3

	//SCENE 4 - a sapling grows
	if (scene4 === true) {
		scene1 = false;
		scene2 = false;
		scene3 = false;
		if (fcount4 < 50) {
			background(205);
			tint(255, 100);
			image(sap, width / 2, height / 2, width, height);
		}
		if ((fcount4 > 20) && (fcount4 < 200)) {
			itswater(0, 0);
		}
		if (fcount4 > 20) {
			background(0, 1); //fade to black
		}

		if (fcount4 > 240) {
			background(0, 30);
		}

		if (fcount4 > 260) {
			scene1 = false;
			scene2 = false;
			scene3 = false;
			scene4 = false;
			scene5 = true;
		}
		console.log(fcount4);
		fcount4++;
	}

	//SCENE 5 - the two planets revolving around one another
	if (scene5 === true) {
		scene1 = false;
		scene2 = false;
		scene3 = false;
		scene4 = false;
		tint(255, 80);
		image(stars2, width / 2, height / 2, width, height);
		if (fcount5 > 25) {
			tint(255);
			image(stars2, width / 2, height / 2, width, height);
			connection();
		}
		if (fcount5 > 110) {
			fill(255);
			text("attachment", width / 2, 3 * height / 4 + 20);
		}
		if (fcount4 > 120) {
			background(0, 30);
		}
		if (fcount5 > 130) {
			scene1 = false;
			scene2 = false;
			scene3 = false;
			scene4 = false;
			scene5 = false;
			scene6 = true;
		}
		console.log(fcount5);
		fcount5++;
	}

	//SCENE 6 - final scene, shows the full "tree" of the relationship
	if (scene6 === true) {
		scene1 = false;
		scene2 = false;
		scene3 = false;
		scene4 = false;
		scene5 = false;
		if (fcount6 < 90) {
			tint(255, 80);
			image(sky2, width / 2, height / 2, width, height);
			cloudFunc();
		}
		if ((fcount6 > 30) && (fcount6 < 95)) {
			image(tree1, width / 2, 2 * height / 3 - 60, 480, 450);
			text("commitment", width / 2, height - 50);
		}
		if (fcount6 > 95) {
			background(0);
			fill(255);
			text("end", width / 2, height / 2);
		}
		if (fcount6 > 60) {
			itswater(random(width / 2), random(height));
		}
		fcount6++;
	}
}

//function planets creates one rotating planet at location put in parameters
//generate clouds with cloud Class
function cloudFunc() {
	i = new Clouds(createVector(random(0, width / 2), random(0, 230)));
	cloudCollage.push(i);
	for (var i = 0; i < cloudCollage.length; i += 30) {
		cloudCollage[i].run();
	}
}

//generate dirt collage w/ random vector, rotated
function drawdirt(soilnum) { //paramaters passed to Array, determines value
	push(); //push&pop for rotation
	var soilpos = createVector(random(width), random(4 * height / 5 + 20, height));
	translate(soilpos.x, soilpos.y); //translate so it rotates from center
	rotate(random(PI / 6)); //random rotations
	tint(255, t); //transparency set with var t
	image(soilArray[soilnum], 0, 0, 150, 150);
	pop();
	t -= 2.0; //transparency decreases as more are drawn
}

//The two planet functinons for scene 1
function planets1(Px, Py) {
	push();
	translate(Px, Py);
	rotate(start1);
	image(plan1, 210, 210, 90, 90);
	start1 += addR;
	pop();
	//console.log(rotation);
}

function planets2(Px, Py) {
	push();
	translate(Px, Py);
	rotate(start2);
	image(plan2, 210, 210, 90, 90);
	start2 += addR;
	pop();
	//console.log(rotation);
}

//plan 2 rotating around planet 1
function spinning() {
	push();
	translate(width / 2, height / 2);
	rotate(start3);
	image(plan2, 180, 180, 150, 150);
	start3 += radians(2);
	pop();
}

//rotating hurricane image overlayed 
function hurrispin() {
	push();
	translate(width / 2, height / 2);
	rotate(start1);
	tint(255, 180);
	image(hurricane, 0, 0, width + 300, height + 300);
	start1 += radians(2);
	pop();
}

function hurrispin2() {
	b = new Rain(createVector(random(-100, 100), random(-100, 100)));
	raining.push(b);
	push();
	translate(width / 2, height / 2);
	rotate(rotr);
	for (var r = 0; r < raining.length; r++) {
		raining[r].run();
	}
	rotr += radians(4);
	pop();
}

function itswater(x, y) {
	j = new Rain(createVector(x, y));
	raining2.push(j);
	for (var r = 0; r < raining2.length; r++) {
		raining2[r].run();
	}
}

function connection() {
	push();
	if (plandistance > 100) {
		var mX = map(mouseX, width, 0, width / 2 - 100, width / 2 + 100);
		var mY = map(mouseY, height, 0, height / 2 - 100, height / 2 + 100);
		plandistance -= 2;
		linethicc += 1.0;
	}
	if (plandistance <= 100) {
		mX = width / 2;
		mY = height / 2;
	}
	translate(mX, mY);
	rotate(cstart2);
	strokeWeight(linethicc);
	stroke(255, 100);
	line(plandistance, 0, -plandistance, 0);
	image(plan1, plandistance, 0, 80, 80);
	image(plan2, -plandistance, 0, 80, 80);
	cstart2 += slowR;
	if (slowR > 0) {
		slowR -= radians(0.02);
	}
	pop();
}

//an attempt to make the tree generate from bottom to top, was very laggy and couldn't get it to work in time
/*
function treegrow() {
	for (var y = tree1.height; y > 0; y -= 2) {
		for (var x = 0; x < tree1.width; x += 2) {
			var loc = (x + (y * tree1.width)) * 4;
			var r = tree1.pixels[loc];
			var g = tree1.pixels[loc + 1];
			var b = tree1.pixels[loc + 2];
			noStroke();
			fill(r, g, b, 150);
			ellipse(x, y, 5, 5);
		}
	}
}
*/