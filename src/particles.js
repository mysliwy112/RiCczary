import V from "/src/Vmath.js";

let img=new Image();
img.src="/assets/mag5.png";

export default class Particle{
	constructor(posX,posY,size=20,initialPower=10){
		this.posX=posX;
		this.posY=posY;
		this.velX=(Math.random()-0.5)*initialPower;
		this.velY=(Math.random()-0.5)*initialPower;
		this.gravitX=posX;
		this.gravitY=posY;
		this.loss=1;
		this.alpha=1;
		this.timeMax=1000;
		this.time=this.timeMax;
		this.img=img;
		this.imgSizeMax=size;
		this.imgSize=size;
		this.update=this.normalSpell;
	}
	
	normalSpell(deltaTime){
		//console.log(this.posX);
		
		var addition=V.normalize(this.gravitY-this.posY,this.gravitX-this.posX);
		this.velX+=addition[1]*0.5;
		this.velY+=addition[0]*0.5;
		this.velX=this.velX*this.loss;
		this.velY=this.velY*this.loss;
		this.posX+=this.velX;
		this.posY+=this.velY;
		
		
		this.time-=deltaTime;
		this.alpha=this.time/this.timeMax;
		this.imgSize=this.imgSizeMax*this.time/this.timeMax
		
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
			  this.imgSize,
			  this.imgSize
			);
			ctx.globalAlpha=1;
			//ctx.restore();
		}
	}
}