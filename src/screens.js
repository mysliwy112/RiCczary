import Chant from "./chant.js";
import * as Av from "./avatar.js";
import MaskScreen from "/src/maskScreen.js";
import Player from "./player.js";
import * as Ef from "./effects.js";

export class Screens{
	constructor(cnv,cnvM,game){
		this.game=game;
		this.cnv=cnv;
		this.cnvM=cnvM;
		this.maskScreen=0;
		this.maskScreen=new MaskScreen(cnvM);
	}
	update(deltaTime){

	}
	draw(ctx,ctxM){

	}
	unloadMask(){
		this.maskScreen.unload();
	}
}

export class BattleScreen extends Screens{
	constructor(cnv,cnvM,game){
		super(cnv,cnvM,game);
		this.contr=[];
		this.teams=[[],[]];
		
		var bars=document.getElementById("hpBars").getElementsByClassName("hpBar");
		
		for(var bar of bars){
			if(bar.id!="defaultBar"){
				bar.parentNode.removeChild(bar);
			}
		}

	}
	
	unloadMask(){
		this.maskScreen.unload();
		var bars=document.getElementById("hpBars").getElementsByClassName("hpBar");
		
		for(var bar of bars){
			if(bar.id!="defaultBar"){
				bar.parentNode.removeChild(bar);
			}
		}
	}
	
	
	addPlayer(stats,contr,team){
		var player=new Player(stats);
		if(team==0){
			player.addAvatar(new Av.Avatar(stats.img));
			this.teams[0].push(player);
		}else{
			if(contr.guide==1){
				player.hp=10;
				player.def=10;
				player.addAvatar(new Av.Dummy(stats.img,contr,this.game));
			}else{
				player.addAvatar(new Av.Enemy(stats.img));
			}
			this.teams[1].push(player);
		}
		contr.player=player;
		if(contr.isMouse==true){
			this.mouse=this.contr.length;
		}
		this.contr.push(contr);
	}
	
	start(){
		for(var i=0;i<this.teams.length;i++){
			for(var j=0;j<this.teams.length;j++){
				if(i==j){
					this.teams[i].forEach(pl=>Array.prototype.push.apply(pl.allies,this.teams[j]));
				}else{
					this.teams[i].forEach(pl=>Array.prototype.push.apply(pl.enemies,this.teams[j]));
				}
			}
		}
		if(this.mouse!=undefined){
			for(var i of this.teams)
			i.forEach(pl=>pl.avatar.addHitbox(this.maskScreen,this.contr[this.mouse].player));
		}
		this.contr.forEach(ctr=>ctr.start());
	}
	
	update(deltaTime){
		for(var i=this.teams.length-1;i>=0;i--){
			for(var j=this.teams[i].length-1;i>=0;i--){
				if(this.teams[i][j].hp<=0){
					if(this.teams[i][j].fade==-1){
						this.teams[i][j].update(deltaTime);
						this.teams[i][j].fade=255;
					}
					this.teams[i][j].fade-=deltaTime*0.3;
					
					if(this.teams[i][j].fade<=0){
						this.teams[i].splice(j);
					}
					if(this.teams[0].length==0){
						this.game.defeat();
					}
					if(this.teams[1].length==0){
						this.game.won();
					}
				}else{
					this.teams[i][j].update(deltaTime);		
				}
			}
		}
		for(var i=this.contr.length-1;i>=0;i--){
			this.contr[i].update(deltaTime);
			//if(this.contr[i].player.hp<=0){
			//	this.contr.splice(i);
			//}
		}
	}
		
		
	draw(ctx,ctxM){
		for(var i=this.teams.length-1;i>=0;i--){
			for(var j=this.teams[i].length-1;i>=0;i--){
				if(this.teams[i][j].fade!=-1)
					ctx.globalAlpha=this.teams[i][j].fade/255;
				this.teams[i][j].draw(ctx,ctxM);
				ctx.globalAlpha=1;
			}
		}
		
		if(this.contr[this.mouse].player.effects["wiry"]>0){
			if(this.whril==undefined){
				this.whril=new Ef.Whril();
			}else{
				this.whril.move(ctx,this.contr[this.mouse].player.effects["wiry"]);
			}
		}else{
			if(this.whril!=undefined){
				if(this.whril.finish(ctx)==1){
					this.whril=undefined;
				}
			}
		}
	}
}

export class EnemyMenu extends Screens{
	constructor(cnv,cnvM,game){
		super(cnv,cnvM,game);
		this.ok=0;
		var that=this;
		this.loadWait=0;

		this.vsAi=new Image();
		this.vsAi.src="/assets/vsAi.png";
		this.vsAi.onload=function(){
			that.vsAiX=cnv.width/3-that.vsAi.width/2;
			that.vsAiY=cnv.height/2-that.vsAi.height/2;
			that.loadWait++;
		};

		this.vsPlayer=new Image();
		this.vsPlayer.src="/assets/vsPlayer.png"
		this.vsPlayer.onload=function(){
			that.vsPlayerX=cnv.width/3*2-that.vsPlayer.width/2;
			that.vsPlayerY=cnv.height/2-that.vsPlayer.height/2;
			that.loadWait++;
		};
	}

	update(deltaTime){
		if(this.loadWait==2&&this.ok==0){
			this.playAi=this.playAi.bind(this);
			this.playPlayer=this.playPlayer.bind(this);
			this.vsAiM=this.maskScreen.addObject(this.vsAi,this.playAi);
			this.vsPlayerM=this.maskScreen.addObject(this.vsPlayer,this.playPlayer);
			this.ok=1;
		}
	}

	draw(ctx,ctxM){
		if(this.ok==1){
			ctx.drawImage(
				this.vsAi,
				this.vsAiX,
				this.vsAiY
			);
			ctx.drawImage(
				this.vsPlayer,
				this.vsPlayerX,
				this.vsPlayerY
			);
			ctxM.drawImage(
				this.vsAiM,
				this.vsAiX,
				this.vsAiY
			);
			ctxM.drawImage(
				this.vsPlayerM,
				this.vsPlayerX,
				this.vsPlayerY
			);
		}
	}

	playAi(){
		this.game.startgame(1);
	}

	playPlayer(){
		this.game.startgame(0);
	}
}

export class FinishScreen extends Screens{
	constructor(cnv,cnvM,game,score,points){
		super(cnv,cnvM,game);
		
		this.points=points;
		this.score=score;
		
		this.ok=0;
		var that=this;

		this.restart=new Image();
		this.restart.src="/assets/restart.png"
		this.restart.onload=function(){
			that.restartX=cnv.width/2-that.restart.width/2;
			that.restartY=cnv.height/3*2-that.restart.height/2;
			that.ok=1;
		};
	}

	update(deltaTime){
		if(this.ok==1){
			this.toMenu=this.toMenu.bind(this);
			this.restartM=this.maskScreen.addObject(this.restart,this.toMenu);
			this.ok=2;
		}
	}

	draw(ctx,ctxM){
		if(this.score==0){
			ctx.font = "30px Arial";
			ctx.fillText("You got: "+this.points, 10, 50);
		}else if(this.score==1){
			ctx.font = "30px Arial";
			ctx.fillText("Good You got new personal best: "+this.points, 10, 50);
		}else if(this.score==2){
			ctx.font = "30px Arial";
			ctx.fillText("Congratulations! You got new high score: "+this.points, 10, 50);
		}
		
		if(this.ok==2){
			ctx.drawImage(
				this.restart,
				this.restartX,
				this.restartY
			);

			ctxM.drawImage(
				this.restartM,
				this.restartX,
				this.restartY
			);
		}
	}

	toMenu(){
		this.game.choose();
	}
}