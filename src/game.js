import Player from "./player.js";
import * as Ctr from "./controller.js";
import Menu from "./menu.js";
import MaskScreen from "/src/maskScreen.js";
import * as Av from "./avatar.js";
import Character from "/src/chars.js";

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
			this.enemyController.update(deltaTime);
			this.mainPlayer.update(deltaTime);
			this.enemyPlayer.update(deltaTime);
			if(this.mainPlayer.hp<=0){
				this.menu.banner.src="/assets/gameover.png";
				this.endGame();
			}else if(this.enemyPlayer.hp<=0){
				this.menu.banner.src="/assets/win.png";
				this.endGame();
			}
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
		this.mainPlayer=new Player(this.canvas,new Av.Protag(this.menu.chars[this.menu.nowChar]));
		var enemyMage=new Character("/assets/rex.png",600,100,6,210);
		var that=this;
		enemyMage.img.onload=function(){
			that.enemyPlayer=new Player(that.canvas,new Av.Enemy(enemyMage,that.maskScreen,that.mainPlayer));
			if(AI==1){
				that.enemyController=new Ctr.Ai(that.enemyPlayer,that.mainPlayer);
			}else{
				that.enemyController=new Ctr.Net(that.enemyPlayer,that.mainPlayer);
				that.enemyController.start(7891);
			}
			that.startGame=1;
		}

		this.controller=new Ctr.Mouser(this.mainPlayer,this);
		this.controller.start(this.canvasM);


	}

	endGame(){
		this.startGame=0;
		this.mainPlayer=null;
		this.enemyPlayer=null;
		this.controller=null;
		this.enemyController=null;
	}
}
