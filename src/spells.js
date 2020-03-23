export class Spell{
	constructor(name,dirs,lens,effects=null,dmg=0){
		this.name=name;
		this.seq=dirs;
		this.seqL=lens;
		
		this.dmg=dmg
		this.effects=effects
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
				new Spell("sen",[-90,45,-45,90],[1,1,1,1],["sen"],1),
				new Spell("budyn",[180,90,0,90,180],[1,1,1,1,1],["budyn"],1),
				new Spell("zaba",[90,0,-90,180,45,135],[1,1,1,1,1,1],["zaba"],1),
				new Spell("ciemnosc",[0,-135,-45,180],[1,1,1,1],["ciemnosc"],1),
				new Spell("muchy",[90,-135,0,-135],[2,1,2,1],["muchy"],1),
				new Spell("wiry",[-90,45,-90,135,0],[1,2,1,2,1],["wiry"],1),
				new Spell("clear",[90,0,-90,180],[1,1,1,1],["clear"],0)
			]
		);
		return book
	}
}