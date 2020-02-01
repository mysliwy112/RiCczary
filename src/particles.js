let partImg=document.getElementById("partMage");
let partMax=document.getElementById("partMax").value;

export default class Particle {
	constructor() {
		this.particleSystem = [];

	}
	
	create(posX,posY){
		for(var i=0;i<partMax;i++){
			this.particleSystem.push(new miniParticle(posX,posY));
		}
	}
	
	update(deltaTime){
		this.particleSystem.forEach(part => part.update(deltaTime));
	}
	draw(ctx){
		//for(var i=0;i<this.particleSystem.)
		this.particleSystem.forEach(part => part.draw(ctx));
	}
	
}

class miniParticle{
	constructor(posX,posY){
		this.posX=posX;
		this.posY=posY;
		this.velX=(Math.random()-0.5)*10;
		this.velY=Math.random()*-1*10;
		this.gravity=0.5;
		this.time=1000;
		
	}
	
	update(deltaTime){
		//console.log(this.posX);
		this.posX+=this.velX;
		this.posY+=this.velY;
		this.velY+=this.gravity;
		this.time-=deltaTime;
		
	}
	
	draw(ctx){
		if(this.time>0){
			ctx.drawImage(
			  partImg,
			  this.posX-(partImg.width/2),
			  this.posY-(partImg.height/2),
			  (partImg.width/2),
			  (partImg.height/2)
			);
		}
	}
	
	
}