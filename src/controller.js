import Player from "./player.js";

export class Mouser{

	constructor(player,game){
		this.player=player;
		this.work=false;
		this.game=game;
	}
	start(canavas){
		canavas.addEventListener("mousemove", event =>{
			if(this.work==true){
				this.player.chant.move(event.offsetX,event.offsetY);
			}
		});
		canavas.addEventListener("mousedown", event =>{
			this.player.chant.start(event.offsetX,event.offsetY);
			this.work=true;
		});
		canavas.addEventListener("mouseup", event =>{
			this.player.endSpell();
			this.player.chant.finish();
			this.work=false;
		});
		canavas.addEventListener("mouseleave", event =>{
			this.player.chant.reset();
			this.work=false;
		});
		document.getElementById("cSpellShape").addEventListener("click", event =>{
			this.player.chant.reset();
			this.player.chant.creationMode=true;
			this.work=false;
		});
	}
}

export class Ai{
	constructor(player,enemies,game){
		this.player=player;
		this.enemies=enemies;
		this.game=game;
		this.work=false;

		this.dist=100;
		this.activ=null;
		this.step=0;
		this.len=0;
		this.lenMax=100;
		this.speed=0.1;

		this.posX=0;
		this.posY=0;
	}
	start(canavas){

	}
	update(deltaTime){
		if(this.player.isLoading==0&&this.work==false){
			this.posX=this.player.avatar.dir*this.dist+this.player.avatar.posX;
			this.posY=this.player.avatar.posY+this.dist;
			this.player.chant.start(this.posX,this.posY);
			this.activ=this.player.spellBook.spells[Math.floor(Math.random() * this.player.spellBook.spells.length)];
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
			this.player.endSpell();
			this.player.chant.finish();
			this.work=false;
		}
		if(this.player.isLoading==2){
			if(Math.random()<0.90){
				this.player.attack(this.enemies);
			}else {
				this.player.endSpell();
			}
		}
	}
}

export class Net{

	constructor(player,enemies,game){
		this.player=player;
		this.enemies=enemies;
		this.work=false;
		this.game=game;
		this.connected=false;


	}
	start(port){
		var that=this;
		this.socket= new WebSocket('ws://localhost:'+port);
		this.socket.addEventListener('open', function (event) {
    	that.connected=true;
			console.log("connected");
		});
		this.player.chant.start(0,0);
		this.socket.addEventListener('message', function (event) {

    	console.log('Message from server \"'+ event.data+"\"");
			var data=JSON.parse(event.data)
			that.player.chant.move(data[0],data[1]);
		});
	}

	update(deltaTime){
		if(this.connected){

			if(this.posX!=this.enemies.chant.posX&&this.posY!=this.enemies.chant.posY){
				this.posX=this.enemies.chant.posX;
				this.posY=this.enemies.chant.posY;
				this.socket.send("["+JSON.stringify(this.enemies.chant.posX)+", "+JSON.stringify(this.enemies.chant.posY)+"]");
			}
		}
	}
}
