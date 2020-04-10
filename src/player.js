import Chant from "./chant.js";
import * as Av from "./avatar.js";
import {Spell, MagicBall, SpellBook} from "./spells.js";

export default class Player {
	constructor(stats,avatar,chant){
		if(chant!=undefined){
			this.addChant(chant);
		}else{
			this.addChant(new Chant());
		}
		if(avatar!=undefined){
			this.addAvatar();
		}
		
		
		//statistics
		this.hp=stats.hp;
		this.dmg=stats.dmg;
		this.def=stats.def;
		
		this.effects=stats.effects;
		
		this.spellBook=stats.book;
		
		this.activeSpell=null;
		this.isLoading=0;
		this.loadTimeMax=5000;
		this.loadTime=0;
		this.dischargeTimeMax=10000;
		
		this.endSpell=this.endSpell.bind(this);
		
		this.allies=[];
		this.enemies=[];
		
		
	}
	addChant(chant){
		this.chant=chant;
		this.chant.setPlayer(this);
	}
	
	addAvatar(avatar){
		this.avatar=avatar;
		this.avatar.setPlayer(this);
	}
	
	
	
	update(deltaTime){
		if(this.effects.length>0){
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
		this.hp-=magic.dmg/this.def;
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
