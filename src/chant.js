import Particle from "./particles.js";
import V from "/src/Vmath.js";

let partMax=document.getElementById("partMax");

export default class Chant {
	constructor(canvas) {
		
		this.lastX;
		this.lastY;
		
		this.checkX;
		this.checkY;
		
		this.posX=0;
		this.posY=0;
		
		
		
		
		this.particleSystem = [];
		this.canvas=canvas;
		
		this.spell=0;
		this.spellBook=0;
		this.lens=[];
		this.dirs=[];

		this.tans=[];
		this.points=[];
		
		//settings
		this.freqPart=8;
		
		this.checkSize=3;
		this.checkMul=3;
		
	}
	
	move(mouseX,mouseY){
		this.check(mouseX,mouseY);
		var vX=mouseX-this.posX;
		var vY=mouseY-this.posY;
		var len=V.len(vX,vY);
		var i=0;
		for(var i=0;i<len;i+=this.freqPart){
			for(var j=0;j<partMax.value;j++){
				this.particleSystem.push(new Particle(this.posX+vX*i/len,this.posY+vY*i/len));
			}
		}
		this.mouseX=mouseX;
		this.mouseY=mouseY;
		if(len>25){
			this.posX=mouseX;
			this.posY=mouseY;
		}
	}
	
	check(mouseX,mouseY){
		var vX=mouseX-this.posX;
		var vY=mouseY-this.posY;
		var len=V.len(vX,vY);
		if(this.tans.length>=this.checkSize){
			this.tans.shift();
		}
		this.tans.push(Math.atan2(vY,vX));
	}
	
	reset(){
		this.particleSystem = [];
		this.lens=[];
		this.dirs=[];
		this.tans=[];
	}
	
	start(mouseX,mouseY){
		this.reset();
		this.posX=mouseX;
		this.posY=mouseY;
		this.lastX=mouseX;
		this.lastY=mouseY;
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
	draw(){
		var c=this.canvas.getContext("2d");
		if(this.tans.length>0){
			c.beginPath();
			//c.moveTo(this.canvas.width/2,this.canvas.height/2);
			var accu=this.tans[0];
			var tans=this.tans.slice();
			for(var i=1;i<tans.length;i++){
				if(tans[i]>tans[i-1]+4)
					tans[i]-=Math.PI*2;
				else if(tans[i]<tans[i-1]-4)
					tans[i]+=Math.PI*2;
				accu+=tans[i];
			}
			accu=accu/this.tans.length;
			c.moveTo(this.mouseX,this.mouseY);
			//var v=V.normalize(Math.cos(this.tans[this.tans.length-1]),Math.sin(this.tans[this.tans.length-1]));
			var v=V.normalize(Math.cos(accu),Math.sin(accu));
			c.lineTo(this.mouseX+v[0]*200,this.mouseY+v[1]*200);
			console.log(accu);
			c.stroke();
		}
		
		this.particleSystem.forEach(part => part.draw(this.canvas.getContext("2d")));
	}
	
}