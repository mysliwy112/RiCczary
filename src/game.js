import Player from "./player.js";
import * as Ctr from "./controller.js";
import Menu from "./menu.js";
import MaskScreen from "/src/maskScreen.js";
import * as Av from "./avatar.js";

export default class Game {
	constructor(canvas,canvasM) {
		this.startGame=0;
		this.canvas=canvas;
		this.canvasM=canvasM;
		this.maskScreen=new MaskScreen(canvasM);
		this.menu=new Menu(canvas,this.maskScreen,this);
		this.menu.enemyChoose();
	}
	
	update(deltaTime){
		if(this.startGame==1){
			this.mainPlayer.update(deltaTime);
			this.enemyPlayer.update(deltaTime);
		}else{
			this.menu.update(deltaTime);
		}
	}
	
	draw(ctx,ctxM){
		if(this.startGame){
			this.enemyPlayer.draw(ctx,ctxM);
			this.mainPlayer.draw(ctx,ctxM);
			
		}else{
			this.menu.draw(ctx,ctxM);
		}
	}

	startgame(AI){
		this.mainPlayer=new Player(this.canvas,new Av.Protag(document.getElementById("charImage")));
		var enemyMage=new Image();
		enemyMage.src="/assets/drob.png";
		var that=this;
		enemyMage.onload=function(){
			that.enemyPlayer=new Player(that.canvas,new Av.Enemy(enemyMage,that.maskScreen,that.mainPlayer));
			that.startGame=1;
		}
		this.controller=new Ctr.Mouser(this.mainPlayer,this);
		//if(AI==1)
			//this.enem=new Ctr.Ai(this.enemyPlayer);
		//else
			//this.enem=new Ctr.Net(this.enemyPlayer);
		this.controller.start(this.canvasM);
		
	}
}
