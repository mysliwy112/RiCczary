import Chant from "./chant.js";

export default class Player {
	constructor(canvas){
		this.lives=3;
		this.activeSpell=0;
		this.chant=new Chant(canvas);
	}
	update(deltaTime){
		this.chant.update(deltaTime);
	}
	draw(ctx){
		this.chant.draw();
	}
}