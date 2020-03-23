import Chant from "./chant.js";
import * as Av from "./avatar.js";
import {Spell, MagicBall, SpellBook} from "./spells.js";

export default class Player {
	constructor(canvas,avatar){

		this.chant=new Chant(this,canvas);
		this.avatar=avatar;
		this.avatar.set(this);
		
		//statistics
		this.hp=5;
		this.dmg=1;
		this.def=1;
		
		this.effects={};
		
		this.spellBook=SpellBook.basicSpellBook();
		
		this.activeSpell=null;
		this.isLoading=0;
		this.loadTimeMax=1000;
		this.loadTime=0;
		this.dischargeTimeMax=10000;
		
		
		this.endSpell=this.endSpell.bind(this);
		
		
		
	}
	update(deltaTime){
		if(this.effects.length>0){
		console.log(this.effects);
		}
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
	
	//when this character gets hit
	hit(magic){
		console.log("this");
		for (var effect of magic.effects){
			switch (effect){
				case "sen":
					this.endSpell();
				break;
				case "clear":
					this.effects={};
				break;
				case "budyn":
					this.addEffect(effect);
				break;
				case "ciemnosc":
					this.addEffect(effect);
				break;
				case "wiry":
					this.addEffect(effect);
				break;
				default:
					this.addEffect(effect);
			}
		}
		console.log(this.effects);
		this.hp-=magic.dmg/this.def;
		console.log(this.hp);
	}
	//set spell after chanting
	cast(spell){
		console.log(spell);
		this.isLoading=1;
		this.loadTime=0;
		this.activeSpell=spell;
	}
	//destroy active spell
	endSpell(){
		this.loadTime=0;
		this.activeSpell=null;
		this.isLoading=0;
		this.chant.reset();
		this.chant.particleSystem=[];
		
		//console.log("broke");
	}
	//attacks enemy with active spell
	attack(enemy){
		if(this.isLoading==2 && this.activeSpell!=null){
			enemy.hit(new MagicBall(this.activeSpell,{'dmg':this.dmg}));
			this.endSpell();
		}
	}
	
	addEffect(effect){
		if(this.effects[effect]==undefined){
			this.effects[effect]=1;
		}else{
			this.effects[effect]++;
		}
	}
}
