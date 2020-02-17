import Player from "./player.js";
import * as Ctr from "./controller.js";
import Menu from "./menu.js";
import MaskScreen from "/src/maskScreen.js";

export default class Game {
	constructor(canvas,canvasM) {
		this.canvas=canvas;
		this.maskScreen=new MaskScreen(canvasM);
		this.menu=new Menu(canvas,this.maskScreen,this);
		this.menu.enemyChoose();
		this.mainPlayer=new Player(canvas);
		
		this.controller=new Ctr.Mouser(this.mainPlayer);
		this.controller.start(canvasM);
		//this.enemy=new Player;
		//this.controller=new Ai(this.mainPlayer);
	}
	
	update(deltaTime){
		this.mainPlayer.update(deltaTime);
		this.menu.update(deltaTime);
	}
	
	draw(ctx,ctxM){
		this.mainPlayer.draw(ctx,ctxM);
		this.menu.draw(ctx,ctxM);
	}

	startgame(AI){
		console.log(AI);
	}
}
