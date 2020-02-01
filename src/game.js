import Particles from "./particles.js";

export default class Game {
	constructor(gameWidth, gameHeight) {
		this.particles = new Particles();
		this.mouseX=0;
		this.mouseY=0;
		document.getElementById("gameScreen").addEventListener("mousemove", event =>{
			this.mouseX=event.offsetX;
			this.mouseY=event.offsetY;
			this.particles.create(this.mouseX,this.mouseY);
		});
	}
	
	update(deltaTime){
		this.particles.update(deltaTime);
	}
	
	draw(ctx){
		this.particles.draw(ctx);
	}
	
	
}
