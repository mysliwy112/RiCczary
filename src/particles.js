import V from "/src/Vmath.js";

let img=new Image();
img.src="/assets/mag5.png";

export default class Particle{
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
		this.img=img;
		this.imgSize=32;
	}
	
	update(deltaTime){
		//console.log(this.posX);
		this.posX+=this.velX;
		this.posY+=this.velY;
		var addition=V.normalize(this.gravitY-this.posY,this.gravitX-this.posX);
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