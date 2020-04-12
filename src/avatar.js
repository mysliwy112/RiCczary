import V from "/src/Vmath.js";
import Character from "/src/chars.js";
import Particle from "./particles.js";

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
		
		this.resize=1;
		
		this.muchy={
			muchy:[],
			size:50,
			ile:5
		}
		this.muchy.img=new Image();
		this.muchy.img.src="/assets/mucha.png";
		
		this.ciemnosc={
			size:330
		}
		this.ciemnosc.img=new Image();
		this.ciemnosc.img.src="/assets/ciemnosc.png";
		
		
		this.budyn={
			budyn:[],
			size:200,
			ile:10
		}
		this.budyn.img=new Image();
		this.budyn.img.src="/assets/budyn.png";
		
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
		if(this.player.effects.muchy>0){
			this.muchy.muchy=this.muchy.muchy.slice(0,this.muchy.ile*this.player.effects.muchy);
			for(var i=0;i<this.muchy.ile*this.player.effects.muchy;i++){
				if(i>=this.muchy.muchy.length){
					this.muchy.muchy.push(new Particle(this.posX+100,this.posY+100,this.resize*this.muchy.size,8,this.muchy.img,"much"));
				}
				this.muchy.muchy[i].gravityX=this.posX+100*this.dir;
				this.muchy.muchy[i].gravityY=this.posY+100;
				this.muchy.muchy[i].update(deltaTime);
			}
		}else{
			this.muchy.muchy=[];
		}
		
		if(this.player.effects.ciemnosc>0){
			if(this.ciemnosc.ciemnosc==undefined){
				this.ciemnosc.ciemnosc=new Particle(this.posX+20,this.posY+150,this.resize*this.ciemnosc.size,8,this.ciemnosc.img,"ciemnosc");
			}
			this.ciemnosc.ciemnosc.imgSize=this.ciemnosc.size*this.resize*this.player.effects.ciemnosc;
			this.ciemnosc.ciemnosc.gravityX=this.posX+200*this.dir;
			this.ciemnosc.ciemnosc.gravityY=this.posY+150;
			this.ciemnosc.ciemnosc.update(deltaTime);
		}else{
			this.ciemnosc.ciemnosc==undefined;
		}
		
		if(this.player.effects.budyn>0){
			this.budyn.budyn=this.budyn.budyn.slice(0,this.budyn.ile*this.player.effects.budyn);
			for(var i=0;i<this.budyn.ile*this.player.effects.budyn;i++){
				if(i>=this.budyn.budyn.length){
					var offX=Math.random()*400;
					var offY=Math.random()*400;
					this.budyn.budyn.push(new Particle(this.posX+offX,this.posY+offY,this.resize*this.budyn.size,8,this.budyn.img,"budyn"));
					this.budyn.budyn[this.budyn.budyn.length-1].offX=offX;
					this.budyn.budyn[this.budyn.budyn.length-1].offY=offY;
					this.budyn.budyn[this.budyn.budyn.length-1].imgSize=Math.random()*this.budyn.size;
					this.budyn.budyn[this.budyn.budyn.length-1].imgSize2=Math.random()*this.budyn.size;
				}
				this.budyn.budyn[i].gravityX=this.posX;
				this.budyn.budyn[i].gravityY=this.posY;
				this.budyn.budyn[i].update(deltaTime);
			}
		}else{
			this.budyn.budyn=[];
		}
		
		
		this.updateSecond(deltaTime);
	}
	
	updateSecond(ctx,ctxM){
		
	}
	
	
	draw(ctx,ctxM){
		ctx.drawImage(
			this.charImg.img,
			this.posX,
			this.posY
		);
		

		
		if(this.imgM!=undefined){
			ctxM.drawImage(
				this.imgM,
				this.posX,
				this.posY
			);
		}
		
		this.budyn.budyn.forEach(part => part.draw(ctx));
		
		
		if(this.ciemnosc.ciemnosc!=undefined){
			this.ciemnosc.ciemnosc.draw(ctx);
		}
		
		this.muchy.muchy.forEach(part => part.draw(ctx));
		this.drawSecond(ctx,ctxM);
	}
	
	drawSecond(ctx,ctxM){}

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
		this.resize=0.7;

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

	updateSecond(deltaTime){
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
			if(this.player.effects.budyn!=undefined){
				this.posX+=this.velX*this.speed*deltaTime/this.player.effects.budyn;
				this.posY+=this.velY*this.speed*deltaTime/this.player.effects.budyn;
			}else{
				this.posX+=this.velX*this.speed*deltaTime;
				this.posY+=this.velY*this.speed*deltaTime;
			}
			this.time-=deltaTime;
		}

	}
	
	drawSecond(ctx,ctxM){}
}

export class Dummy extends Avatar{
	constructor(charImg,ctrl,game){
		super(charImg);


		this.game=game;
		this.ctrl=ctrl;
		this.dir=1;
		//avatar position
		this.posX=100;
		this.posY=100;

		this.hpTeam="enemiesBars";
		this.resize=0.7;
		this.imgBack=new Image();
		this.imgBack.src="/assets/restart.png"

		this.addButtons();
	}
	
	addHitbox(maskScreen,clicker){
		
		var that=this;
		
		this.imgBack.onload=function(){
			that.imgBackM=maskScreen.addObject(that.imgBack,that.back.bind(that));
		};
		this.imgM=maskScreen.addObject(this.charImg.img,this.hit.bind(this,clicker));
	}
	
	back(){
		window.showCast=function(){};
		this.game.choose();
	}
	
	
	
	
	addButtons(){
		var spells=document.getElementById("spellsGrid");
		var that=this;
		window.showCast=function(){
			that.ctrl.beginShape(event.target.getElementsByClassName("name")[0].innerHTML);
		};
		//for(var spell of spells.children){}
		
	}

	//chantSettings(){
		//this.player.chant.transform=this.enemyScreenTransform;
		// this.player.chant.partSize=29;
		// this.player.chant.partPow=6;
		// this.player.chant.burstPow=1.8;
		// this.player.chant.partMax=1;	
	//}

	//enemyScreenTransform(pointX,pointY){
	//	pointX=(pointX*-1)+400;
	//	return [pointX,pointY];
	//}

	updateSecond(deltaTime){

	}
	
	drawSecond(ctx,ctxM){
		ctx.drawImage(
			this.imgBack,
			10,
			515,
			75,
			75
		);
		
		if(this.imgBackM!=undefined){
			ctxM.drawImage(
				this.imgBackM,
				10,
				515,
				75,
				75
			);
		}
	}
	
}