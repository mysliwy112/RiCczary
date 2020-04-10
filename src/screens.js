import Chant from "./chant.js";
import * as Av from "./avatar.js";
import MaskScreen from "/src/maskScreen.js";
import Player from "./player.js";

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
		this.players=[];
		this.contr=[];
		this.teams=[[],[]];
	}
	
	addPlayer(stats,contr,team){
		var player=new Player(stats);
		if(team==0){
			player.addAvatar(new Av.Avatar(stats.img));
			this.teams[0].push(player);
		}else{
			player.addAvatar(new Av.Enemy(stats.img));
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
		this.players=this.teams.flat();
		if(this.mouse!=undefined){
			this.players.forEach(pl=>pl.avatar.addHitbox(this.maskScreen,this.contr[this.mouse].player));
		}
		this.contr.forEach(ctr=>ctr.start());
	}
	
	update(deltaTime){
		for(var i=this.players.length-1;i>=0;i--){
			if(this.players[i].hp<=0){
				this.players.splice(i);
				console.log(this.teams);
			}else{
				this.players[i].update(deltaTime);
			}
		}
		for(var i=this.contr.length-1;i>=0;i--){
			if(this.contr[i].player.hp<=0){
				this.contr.splice(i);
			}else{
				this.contr[i].update(deltaTime);
			}
		}
	}
		
		
	draw(ctx,ctxM){
		
		for(var i=this.players.length-1;i>=0;i--){
			this.players[i].draw(ctx,ctxM);	
		}
		// if(this.mainPlayer.effects["wiry"]>0){
			// if(this.whril==undefined){
				// this.whril=new Ef.Whril();
			// }else{
				// this.whril.move(ctx,this.mainPlayer.effects["wiry"]);
			// }
		// }else{
			// if(this.whril!=undefined){
				// if(this.whril.finish(ctx)==1){
					// this.whril=undefined;
				// }
			// }
		// }
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
			that.vsPlayerX=cnv.width/3*2-that.vsAi.width/2;
			that.vsPlayerY=cnv.height/2-that.vsAi.height/2;
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
