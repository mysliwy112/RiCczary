import Player from "./player.js";
import * as Ctr from "./controller.js";
import Menu from "./menu.js";

export default class Game {
	constructor(canvas) {
		this.canvas=canvas;
		Menu.start();
		this.mainPlayer=new Player(canvas);
		this.controller=new Ctr.Mouser(this.mainPlayer);
		this.controller.start(canvas);
		//this.enemy=new Player;
		//this.controller=new Ai(this.mainPlayer);
	}
	
	update(deltaTime){
		this.mainPlayer.update(deltaTime);
	}
	
	draw(ctx){
		this.mainPlayer.draw(ctx);
	}
}
