import V from "/src/Vmath.js";
import Character from "/src/chars.js";

let chmura=new Image();
chmura.src="/assets/ciemnosc.png";

export class Avatar{
	constructor(charImg){
		this.charImg=charImg;
		
		//character position
		this.dir=-1;
		this.posX=this.charImg.posX;
		this.posY=this.charImg.posY;
		
		this.hpTeam="protagBars";
		
	}
	addBar(){
		var template=document.getElementById("defaultBar");
		this.hpBar=template.cloneNode(true);
		
		this.hpBar.max=this.player.hp;
		
		this.hpBar.optimum=this.player.hp;
		this.hpBar.high=this.player.hp*0.8;
		this.hpBar.low=this.player.hp*0.3;
		
		this.hpBar.value=this.player.hp;

		this.hpBar.removeAttribute("id");
		document.getElementById(this.hpTeam).appendChild(this.hpBar);
	}
	
	
	
	setPlayer(player){
		this.player=player;
		this.chantSettings();
		this.addBar();
	}
	
	addHitbox(maskScreen,clicker){
		this.imgM=maskScreen.addObject(this.charImg.img,this.hit.bind(this,clicker));
	}
	
	
	chantSettings(){
		this.player.chant.endGravX=this.charImg.rPosX+this.charImg.posX;
		this.player.chant.endGravY=this.charImg.rPosY+this.charImg.posY;
		this.player.chant.partSize=30;
		this.player.chant.partPow=8;
		this.player.chant.burstPow=2;
		this.player.chant.partMax=2;
	}
	
	update(deltaTime){
		this.hpBar.value=this.player.hp;
	}
	
	draw(ctx,ctxM){
		ctx.drawImage(
			this.charImg.img,
			this.posX,
			this.posY
		);
		
		if(this.player.effects["ciemnosc"]>0){
			ctx.drawImage(
				chmura,
				this.posX+50,
				this.posY+50
			);
		}
		
		if(this.imgM!=undefined){
			ctxM.drawImage(
				this.imgM,
				this.posX,
				this.posY
			);
		}
	}
	


	hit(attacker){
		attacker.attack(this.player);
	}
}

export class Enemy extends Avatar{
	constructor(charImg){
		super(charImg);

		this.dir=1;
		//avatar position
		this.posX=100;
		this.posY=100;
		//avatar move direction
		this.velX=0;
		this.velY=0;
		//number of steps to do
		this.timeMax=1200;
		this.timeMin=500;
		this.time=0;
		//movement speed
		this.speed=0.1;
		this.hpTeam="enemiesBars";

	}
	

	
	
	
	chantSettings(){
		this.player.chant.transform=this.enemyScreenTransform;
		this.player.chant.partSize=29;
		this.player.chant.partPow=6;
		this.player.chant.burstPow=1.8;
		this.player.chant.partMax=1;	
	}

	enemyScreenTransform(pointX,pointY){
		pointX=(pointX*-1)+400;
		return [pointX,pointY];
	}

	update(deltaTime){
		this.hpBar.value=this.player.hp;
		this.player.chant.endGravX=this.charImg.rPosX+this.posX;
		this.player.chant.endGravY=this.charImg.rPosY+this.posY;
		if(this.time<=0){
			this.gravityX=(Math.random()-0.5)*100;
			if(this.posX>170){
				if(this.gravityX>0)
					this.gravityX=this.gravityX*-1;
			}else if(this.gravityX+this.posX<130){
				if(this.gravityX<0)
					this.gravityX=this.gravityX*-1;
			}

			this.gravityY=(Math.random()-0.5)*100;
			if(this.posY>200){
				if(this.gravityY>0)
					this.gravityY=this.gravityY*-1;
			}else if(this.gravityY+this.posY<100){
				if(this.gravityY<0)
					this.gravityY=this.gravityY*-1;
			}

			var a=V.normalize(this.gravityX,this.gravityY);
			this.gravityX=a[0];
			this.gravityY=a[1];
			this.time=Math.random()*(this.timeMax-this.timeMin)+this.timeMin;
		}else{
			var a=V.normalize((this.gravityX-this.velX),(this.gravityY-this.velY));
			this.velX+=a[0];
			this.velY+=a[1];
			this.posX+=this.velX*this.speed*deltaTime;
			this.posY+=this.velY*this.speed*deltaTime;
			this.time-=deltaTime;
		}

	}
}