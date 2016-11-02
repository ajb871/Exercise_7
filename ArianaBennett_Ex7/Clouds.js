var Clouds = function(position){
  this.velocity = createVector(random(1, 3),0);
  this.pos = position.copy();
  this.t = 0.0;
  
  this.run = function(){
    this.update();
    this.display();
  }
  
  this.display = function(){
    tint(255, this.t);
    image(cloudArray[int(random(1,2))], this.pos.x, this.pos.y);
  }
  
  this.update = function(){
    this.pos.add(this.velocity);
    this.t += 5.0;
  }
  
  //function to remove "dead" clouds, no real purpose
  /*this.dead = function(){
    if (this.lifespan < 0){
      return true;
    } else{
      return false;
    }
  }
  */
}
