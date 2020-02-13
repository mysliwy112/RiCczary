import Player from "./player.js";

export default class Game {
	constructor(canvas) {
		this.canvas=canvas;
		this.work=false;
		this.mainPlayer=new Player;
		this.controller=new Mouser(this.mainPlayer);
		this.controller.start(canvas);
		this.enemy=new Player;
		this.controller=new Ai(this.mainPlayer);
	}
	
	update(deltaTime){
		this.mainPlayer.update(deltaTime);
	}
	
	draw(ctx){
		this.mainPlayer.draw(ctx);
	}
}
