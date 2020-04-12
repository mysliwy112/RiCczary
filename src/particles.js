import V from "/src/Vmath.js";

export default class Particle{
	constructor(posX,posY,size=20,initialPower=10,img,beh="normalSpell"){
		this.posX=posX;
		this.posY=posY;
		this.velX=(Math.random()-0.5)*initialPower;
		this.velY=(Math.random()-0.5)*initialPower;
		this.gravityX=posX;
		this.gravityY=posY;
		this.loss=1;
		this.alpha=1;
		this.timeMax=1000;
		this.time=this.timeMax;
		this.img=img;
		this.imgSizeMax=size;
		this.imgSize=size;
		this.imgSize2=size;
		this.update=this[beh];
	}
	
	normalSpell(deltaTime){
		//console.log(this.posX);
		
		var addition=V.normalize(this.gravityY-this.posY,this.gravityX-this.posX);
		this.velX+=addition[1]*0.5;
		this.velY+=addition[0]*0.5;
		this.velX=this.velX*this.loss;
		this.velY=this.velY*this.loss;
		this.posX+=this.velX;
		this.posY+=this.velY;
		
		
		this.time-=deltaTime;
		this.alpha=this.time/this.timeMax;
		this.imgSize=this.imgSizeMax*this.time/this.timeMax
		
		this.imgSize2=this.imgSize;
		
	}
	
	much(deltaTime){
		//console.log(this.posX);
		
		var addition=V.normalize(this.gravityY-this.posY,this.gravityX-this.posX);
		this.velX+=addition[1]*0.5;
		this.velY+=addition[0]*0.5;
		this.velX=this.velX*this.loss;
		this.velY=this.velY*this.loss;
		this.posX+=this.velX;
		this.posY+=this.velY;
		this.imgSize2=this.imgSize;
	}
	
	ciemnosc(deltaTime){
		//console.log(this.posX);
		
		var addition=V.normalize(this.gravityY-this.posY,this.gravityX-this.posX);
		this.posX+=addition[1];
		this.posY+=addition[0];
		this.imgSize2=this.imgSize*0.5;

	}
	
	budyn(deltaTime){
		//console.log(this.posX);
		
		var addition=V.normalize(this.gravityY-this.posY,this.gravityX-this.posX);
		this.posX=this.gravityX+this.offX;
		this.posY=this.gravityY+this.offY;
		this.imgSize2=this.imgSize;

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
			  this.posY-this.imgSize2/2,
			  this.imgSize,
			  this.imgSize2
			);
			ctx.globalAlpha=1;
			//ctx.restore();
		}
	}
}