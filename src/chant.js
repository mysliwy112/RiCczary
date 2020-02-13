import Particle from "./particles.js";

let partMax=document.getElementById("partMax");

export default class Chant {
	constructor() {
		this.posX=0;
		this.posY=0;
		this.particleSystem = [];
		this.spell=0;
		this.spellList=0;
		this.canvas;
		this.lens=[];
		this.dirs=[];
	}
	
	move(mouseX,mouseY){
		var len=Math.sqrt(Math.pow(this.posX-mouseX,2)+Math.pow(this.posY-mouseY,2));
		var i=0;
		for(var i=0;i<len;i+=5){
			for(var j=0;j<partMax.value;j++){
				this.particleSystem.push(new Particle(this.posX+(mouseX-this.posX)*i/len,this.posY+(mouseY-this.posY)*i/len));
				console.log(this.particleSystem.len);
			}
		}
		this.posX=mouseX;
		this.posY=mouseY;
	}
	
	start(mouseX,mouseY){
		this.particleSystem = [];
		this.lens=[];
		this.dirs=[];
		this.posX=mouseX;
		this.posY=mouseY;
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
		this.particleSystem.forEach(part => part.draw(ctx));
	}
	
}