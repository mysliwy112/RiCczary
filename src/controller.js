import Player from "./player.js";

export class Controller{
	constructor(player){
		this.player=player;
		this.work=false;
	}
}

export class Mouser extends Controller{
	start(canavas){
		canavas.addEventListener("mousemove", event =>{
			if(this.work==true){
				this.player.chant.move(event.offsetX,event.offsetY)
			}
		});
		canavas.addEventListener("mousedown", event =>{
			this.player.chant.start(event.offsetX,event.offsetY);
			this.work=true;
		});
		canavas.addEventListener("mouseup", event =>{
			this.player.chant.finish();
			this.work=false;
		});
		canavas.addEventListener("mouseleave", event =>{
			this.player.chant.reset();
			this.work=false;
		});
	}
	stop(canavas){
		this.player.chant.finish();
		this.work=false;
	}

}