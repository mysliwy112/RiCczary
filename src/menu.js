export default class Menu {
	constructor(canvas,maskScreen,game){
		document.getElementById("DBG").addEventListener("input", event =>{
			if(event.target.checked==true){
				document.getElementById("debugMenu").style.display="block"
			}else{
				document.getElementById("debugMenu").style.display="none"
			}
		});
		this.enemyMenu=new EnemyMenu(canvas,maskScreen,game);
	}
	
	enemyChoose(){
		this.drawer=this.enemyMenu;
		this.upader=this.enemyMenu;
	}
	
	nonChoose(){
		this.drawer=NULL;
	}
	update(){
		this.upader.update();
	}
	draw(ctx,ctxM){
		//this.drawer(ctx,ctxM);
		this.drawer.draw(ctx,ctxM);
	}
}
class Windows{}

class EnemyMenu{
	constructor(canvas,maskScreen,game){
		this.game=game;
		this.ok=0;
		var that=this;
		this.loadWait=0;
		
		this.vsAi=new Image();
		this.vsAi.src="/assets/vsAi.png";
		this.vsAi.onload=function(){
			that.vsAiX=canvas.width/3-that.vsAi.width/2;
			that.vsAiY=canvas.height/2-that.vsAi.height/2;
			that.loadWait++;
		};
		
		this.vsPlayer=new Image();
		this.vsPlayer.src="/assets/vsPlayer.png"
		this.vsPlayer.onload=function(){
			
			that.vsPlayerX=canvas.width/3*2-that.vsAi.width/2;
			that.vsPlayerY=canvas.height/2-that.vsAi.height/2;
			that.loadWait++;
		};
		this.maskScreen=maskScreen;

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
