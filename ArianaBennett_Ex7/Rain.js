var Rain = function(position) {
	this.position = position.copy();
	this.velocity = createVector(random(3), random(3,5));
	this.acceleration = createVector(0.4, 0.1);
	this.life = 255.0;

	this.run = function(){
		this.gone();
		this.update();
		this.display();
	}


	this.display = function(){
		noStroke();
		fill(random(150, 185), random(150, 185), 255, this.life);
		ellipse(this.position.x, this.position.y, 7, 7);
	}
	
	this.update = function(){
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.life -= 2.0;
	}

	this.gone = function(){
		if (this.life < 0.0){
			return true;
		} else{
			return false;
		}
	}
	
}