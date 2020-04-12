import Player from "./player.js";

export class Mouser{

	constructor(canvas){
		this.isMouse=true;
		this.work=false;
		this.toActivate=false;
		this.canvas=canvas;
	}
	start(){
		this.canvas.addEventListener("mousemove", event =>{
			if(this.work==true){
				if(this.toActivate==true){
					this.toActivate=false;
					this.player.endSpell();
					this.player.chant.start(event.offsetX,event.offsetY);
				}
				this.player.chant.move(event.offsetX,event.offsetY);
			}
		});
		
		this.canvas.addEventListener("mousedown", event =>{
			if(this.player.activeSpell==null){
				this.player.chant.start(event.offsetX,event.offsetY);
			}else{
				this.toActivate=true;	
			}
			this.work=true;
		});
		
		
		this.canvas.addEventListener("mouseup", event =>{
			this.player.chant.finish();
			this.work=false;
		});

		this.canvas.addEventListener("mouseleave", event =>{
			this.player.chant.reset();
			this.work=false;
		});

		document.getElementById("cSpellShape").addEventListener("click", event =>{
			this.player.chant.reset();
			this.player.chant.creationMode=true;
			this.work=false;
		});
	}
	update(deltaTime){
		
	}
	
}


export class Ai{
	constructor(){
		this.work=false;

		this.dist=100;
		this.activ=null;
		this.step=0;
		this.len=0;
		this.lenMax=150;
		this.speed=0.15;
		this.wait=0;
		this.waitMax=150;
		this.speed=0.15;

		this.posX=0;
		this.posY=0;
	}
	start(){

	}
	update(deltaTime){
		if(this.player.hp>0){
			if(this.player.isLoading==0&&this.work==false){
				this.posX=this.player.avatar.dir*this.dist*(-1)+this.player.avatar.posX;
				this.posY=this.player.avatar.posY+this.dist;
				this.player.chant.start(this.posX,this.posY);
				this.wait=0;
				this.activ=this.player.spellBook.spells[Math.floor(Math.random() * this.player.spellBook.spells.length)];
				//this.activ=this.player.spellBook.spells[5];
				this.work=true;
			}
			if(this.work==true){
				this.posX+=Math.cos(this.activ.seq[this.step]/180*Math.PI)*this.speed*deltaTime;
				this.posY+=Math.sin(this.activ.seq[this.step]/180*Math.PI)*this.speed*deltaTime;
				this.len+=this.speed*deltaTime;
				if(this.len>this.activ.seqL[this.step]*this.lenMax){
					this.step++;
					this.len=0;
				}
				this.player.chant.move(this.posX,this.posY);
			}
			if(this.step>=this.activ.seq.length){
				this.step=0;
				this.player.chant.finish();
				this.work=false;
			}
			if(this.player.isLoading==2){
				this.wait+=deltaTime;
				if(this.wait>=this.waitMax){
					if(Math.random()<0.96){
						this.player.attack(this.player.enemies[Math.floor(Math.random()*this.player.enemies.length)]);
					}else {
						this.player.endSpell();
					}
				}
			}
		}
	}
}

export class Net{

	constructor(port){
		this.port=port;
		this.work=false;
		this.connected=false;
	}
	start(){
		var that=this;
		this.socket= new WebSocket('ws://localhost:'+this.port);
		this.socket.addEventListener('open', function (event) {
    	that.connected=true;
			console.log("connected");
		});
		this.player.chant.start(0,0);
		this.socket.addEventListener('message', function (event) {
			var data=JSON.parse(event.data);
			if(data.done==1){
					that.player.chant.finish();
			}else{
				that.player.chant.move(data.pos[0],data.pos[1]);
			}
		});
	}

	update(deltaTime){
		if(this.connected){
			if(this.posX!=this.player.enemies.chant.posX&&this.posY!=this.player.enemies.chant.posY){
				this.posX=this.player.enemies.chant.posX;
				this.posY=this.player.enemies.chant.posY;
				var send_dict={
					done: this.player.enemies.isLoading,
					pos: [this.posX, this.posY]
				};
				this.socket.send(JSON.stringify(send_dict));
			}
		}
	}
}

export class Dummy{
	constructor(){
		this.work=false;

		this.dist=100;
		this.activ=null;
		this.step=0;
		this.len=0;
		this.lenMax=150;
		this.waitMax=150;
		this.wait=0;
		this.speed=0.15;
		
		this.guide=1;

		this.posX=0;
		this.posY=0;
	}
	start(){

	}
	
	beginShape(spellName){
		
		this.step=0;
		this.player.endSpell();
		this.posX=370;
		this.posY=300;
		this.player.chant.start(this.posX,this.posY);
		
		this.activ=this.player.spellBook.spells.find(spell=>spell.name==spellName);
		
		console.log(this.player.spellBook.spells);
		console.log(this.activ);
		
		this.work=true;
		this.wait=0;
	}
	
	
	update(deltaTime){
		if(this.work==true){
			this.posX+=Math.cos(this.activ.seq[this.step]/180*Math.PI)*this.speed*deltaTime;
			this.posY+=Math.sin(this.activ.seq[this.step]/180*Math.PI)*this.speed*deltaTime;
			this.len+=this.speed*deltaTime;
			if(this.len>this.activ.seqL[this.step]*this.lenMax){
				this.step++;
				this.len=0;
			}
			this.player.chant.move(this.posX,this.posY);
		}
		if(this.work==true&&this.step>=this.activ.seq.length){
			this.work=false;
		}
	}
}