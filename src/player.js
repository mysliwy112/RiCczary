import Chant from "./chant.js";

export default class Player {
	constructor(){
		this.lives=3;
		this.activeSpell=0;
		this.chant=new Chant;
	}
	update(deltaTime){
		this.chant.update(deltaTime);
	}
	draw(ctx){
		this.chant.draw(ctx);
	}
}