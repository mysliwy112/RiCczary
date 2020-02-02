//let partImg=document.getElementById("partMage");
let partImg=new Image();
partImg.src="/assets/mag5.png";

let partMax=document.getElementById("partMax");

export default class Particle {
	constructor(game) {
		this.game=game;
		this.particleSystem = [];
	}
	
	create(posX,posY){
		for(var i=0;i<partMax.value;i++){
			this.particleSystem.push(new miniParticle(posX,posY));
		}
	}
	
	start(){
		this.particleSystem = [];
	}
	
	finish(){
		this.particleSystem.forEach(part => {
			part.time=part.timeMax;
			part.velX*=2;
			part.velY*=2;
		});
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
		this.velX=(Math.random()-0.5)*8;
		this.velY=(Math.random()-0.5)*8;
		this.gravitX=posX;
		this.gravitY=posY;
		this.alpha=1;
		this.timeMax=1000;
		this.time=this.timeMax;
		this.img=partImg;
		this.imgSize=32;
		
	}
	
	normalize(pointX,pointY) {
		var norm = Math.sqrt(pointX * pointX + pointY * pointY);
		if (norm != 0) { // as3 return 0,0 for a point of zero length
			pointX = pointX / norm;
			pointY = pointY / norm;
		}
		return [pointX,pointY];
	}
	
	update(deltaTime){
		//console.log(this.posX);
		this.posX+=this.velX;
		this.posY+=this.velY;
		var addition=this.normalize(this.gravitY-this.posY,this.gravitX-this.posX);
		this.velX+=addition[1]/2;
		this.velY+=addition[0]/2;
		this.time-=deltaTime;
		this.alpha=this.time/this.timeMax;
		
	}
	
	draw(ctx){
		if(this.time>0){
			//ctx.save();
			//ctx.translate(this.posX, this.posY);
			//ctx.rotate(this.velX-Math.sign(this.velX)*this.time/this.timeMax);
			ctx.globalAlpha=this.alpha;
			ctx.drawImage(
			  this.img,
			  this.posX-this.imgSize/2,
			  this.posY-this.imgSize/2,
			  this.imgSize*this.time/this.timeMax,
			  this.imgSize*this.time/this.timeMax
			);
			//ctx.restore();
		}
	}
	

	
	
}