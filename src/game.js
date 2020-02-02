import Particles from "./particles.js";

export default class Game {
	constructor(gameWidth, gameHeight) {
		this.particles = new Particles(this);
		this.mouseX=0;
		this.mouseY=0;
		this.work=false;
		document.getElementById("gameScreen").addEventListener("mousemove", event =>{
			if(this.work==true){
				var len=Math.sqrt(Math.pow(this.mouseX-event.offsetX,2)+Math.pow(this.mouseY-event.offsetY,2));
				for(var i=0;i<len;i+=5){
					this.particles.create(this.mouseX+(event.offsetX-this.mouseX)*i/len,this.mouseY+(event.offsetY-this.mouseY)*i/len);
				}
				this.mouseX=event.offsetX;
				this.mouseY=event.offsetY;
			}
			//this.particles.create(this.mouseX,this.mouseY);
		});
		
		document.getElementById("gameScreen").addEventListener("mousedown", event =>{
			this.particles.start();
			this.work=true;
			this.mouseX=event.offsetX;
			this.mouseY=event.offsetY;
		});
		document.getElementById("gameScreen").addEventListener("mouseup", event =>{
			this.particles.finish();
			this.work=false;
		});
	}
	
	update(deltaTime){
		this.particles.update(deltaTime);
	}
	
	draw(ctx){
		this.particles.draw(ctx);
	}
	
	
}
