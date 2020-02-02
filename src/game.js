import Particles from "./particles.js";

export default class Game {
	constructor(gameWidth, gameHeight) {
		this.particles = new Particles();
		this.mouseX=0;
		this.mouseY=0;
		document.getElementById("gameScreen").addEventListener("mousemove", event =>{
			
			var len=Math.sqrt(Math.pow(this.mouseX-event.offsetX,2)+Math.pow(this.mouseY-event.offsetY,2));
			console.log(len);
			for(var i=0;i<len;i+=5){
				this.particles.create(this.mouseX+(event.offsetX-this.mouseX)*i/len,this.mouseY+(event.offsetY-this.mouseY)*i/len);
			}
			
			this.mouseX=event.offsetX;
			this.mouseY=event.offsetY;
			//this.particles.create(this.mouseX,this.mouseY);
		});
	}
	
	update(deltaTime){
		this.particles.update(deltaTime);
	}
	
	draw(ctx){
		this.particles.draw(ctx);
	}
	
	
}
