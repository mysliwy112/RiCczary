export class Spell{
	constructor(name,dirs,lens,effects=null,dmg=0,description){
		this.name=name;
		this.seq=dirs;
		this.seqL=lens;
		this.points=this.toPoints();
		
		this.dmg=dmg;
		this.effects=effects;
		
		this.description=description;
	}
	
	toPoints(){
		var points=[];
		var posX=0;
		var posY=0;
		points.push([posX,posY]);
		var minX;
		var maxX;
		var minY;
		var maxY;
		for(var step=0;step<this.seq.length;step++){
			posX+=Math.cos(this.seq[step]/180*Math.PI)*100*this.seqL[step];
			posY+=Math.sin(this.seq[step]/180*Math.PI)*100*this.seqL[step];
			if(maxY==undefined||posY>maxY)
				maxY=posY;
			if(minY==undefined||posY<minY)
				minY=posY;
			if(maxX==undefined||posX>maxY)
				maxX=posX;
			if(minX==undefined||posX<minX)
				minX=posX;
			points.push([posX,posY]);
		}
		var distX=-(minX+maxX)/2;
		var distY=-(minY+maxY)/2;
		for(var i=0;i<points.length;i++){
			points[i][0]+=distX;
			points[i][1]+=distY;
		}
		return points;
	}
}

export class MagicBall{
	constructor(spell,stats){
		this.effects=spell.effects;
		this.dmg=spell.dmg*stats.dmg;
	}
}

export class SpellBook{
	constructor(name,spells){
		this.name=name;
		this.spells=spells;
	}
	static basicSpellBook(name="nobody") {
		var book = new SpellBook(
			name,
			[
				new Spell("Sleep",[-90,45,-45,90],[1,1,1,1],["sen"],1, "Breaks enemy spell."),
				new Spell("Pudding",[180,90,0,90,180],[1,1,1,1,1],["budyn"],1,"Covers object in pudding."),
				//new Spell("Frog",[90,0,-90,180,45,135],[1,1,1,1,1,1],["zaba"],1, "Changes being into frog."),
				new Spell("Darkness",[0,-135,-45,180],[1,1,1,1],["ciemnosc"],1,"Spreads darkness."),
				new Spell("Flies",[90,-135,0,-135],[2,1,2,1],["muchy"],1,"Flies everywhere."),
				new Spell("Vortexes",[-90,45,-90,135,0],[1,2,1,2,1],["wiry"],1,"Makes everything dizzy."),
				new Spell("Clear",[90,0,-90,180],[1,1,1,1],["clear"],0,"Clears status.")
			]
		);
		return book
	}
	addSpell(){
		
	}
	
	removeSpell(){
		
	}
}