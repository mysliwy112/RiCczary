import Chant from "./chant.js";
import * as Av from "./avatar.js";
import {Spell} from "./spells.js";

export default class Player {
	constructor(canvas,avatar){

		this.chant=new Chant(this,canvas);
		this.avatar=avatar;
		this.avatar.set(this);
		
		this.lives=3;
		
		this.activeSpell=null;
		this.isLoading=0;
		this.loadTimeMax=4000;
		this.loadTime=0;
		this.dischargeTimeMax=10000;
		
		
		this.endSpell=this.endSpell.bind(this);
		
		this.spellBook=[
			new Spell("sen",[-90,45,-45,90],[1,1,1,1]),
			new Spell("budyn",[180,90,0,90,180],[1,1,1,1,1]),
			new Spell("zaba",[90,0,-90,180,45,180],[1,1,1,1,1,1]),
			new Spell("ciemnosc",[0,-135,-45,180],[1,1,1,1]),
			new Spell("muchy",[90,-135,0,-135],[2,1,2,1]),
			new Spell("wiry",[-90,45,-90,135,0],[1,2,1,2,1])
		];
		
	}
	update(deltaTime){
		if(this.isLoading>0){
			this.loadTime+=deltaTime;
		}
		if(this.isLoading==1&&this.loadTime>=this.loadTimeMax){
			this.isLoading=2;
			this.loadTime=0;
			console.log("activated");
			this.chant.charged();
		}
		if(this.isLoading==2&&this.loadTime>=this.dischargeTimeMax){
			this.chant.reset();
			this.chant.particleSystem=[];
			this.endSpell();
		}
		
		this.chant.update(deltaTime);
		this.avatar.update(deltaTime);
	}
	draw(ctx,ctxM){
		this.avatar.draw(ctx,ctxM);
		this.chant.draw(ctx,ctxM);
	}
	hit(magic){
		this.lives--;
		console.log(this.lives);
	}
	cast(spell){
		console.log(spell);
		this.isLoading=1;
		this.loadTime=0;
		this.activeSpell=spell;
	}
	endSpell(){
		this.loadTime=0;
		this.activeSpell=null;
		this.isLoading=0;
		//console.log("broke");
	}
	attack(enemy){
		if(this.isLoading==2 && this.activeSpell!=null){
			enemy.hit(new magicBall(this.activeSpell));
			this.endSpell();
		}
	}
}

class magicBall{
	constructor(spell){
		this.spell=spell;
	}
	
}