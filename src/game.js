import Player from "./player.js";
import * as Ctr from "./controller.js";
import * as Scr from "./screens.js";
import MaskScreen from "/src/maskScreen.js";
import * as Av from "./avatar.js";
import Character from "/src/chars.js";
import {SpellBook,Spell} from "./spells.js";

export default class Game {
	constructor(cnv,cnvM){
		this.screen=new Scr.Screens(cnv,cnvM,this);
		this.cnv=cnv;
		this.cnvM=cnvM;
		this.mcStats={};
		this.enemies=[];
		this.createEnemies();
		this.points=0;
	}

	update(deltaTime){
		this.screen.update(deltaTime);
	}

	draw(ctx,ctxM){
		this.screen.draw(ctx,ctxM);
	}

	startgame(AI){
		this.screen.unloadMask();
		this.screen=new Scr.BattleScreen(this.cnv,this.cnvM,this);
		this.screen.addPlayer(this.mcStats,new Ctr.Mouser(this.cnvM),0);
		if(AI==1){
			this.screen.addPlayer(this.enemies[0][Math.floor(Math.random()*this.enemies[0].length)],new Ctr.Ai(),1);
			this.points=0;
			this.stage=1;
		}else{
			this.screen.addPlayer(this.mcStats,new Ctr.Dummy(),1);
			this.stage=0;
		}
		this.screen.start();
	}
	
	choose(){
		this.screen.unloadMask();
		this.screen=new Scr.EnemyMenu(this.cnv,this.cnvM,this)
	}

	endGame(){

	}
	
	won(){
		if(this.stage>0){
			this.points+=this.stage;
			document.getElementById("points").innerHTML="Points: "+this.points;
			this.stage++;
			var ctr=new Ctr.Ai();
			ctr.speed=0.15+this.stage*0.02;
			var nemy=0;
			if(this.stage<=5){
				nemy=0;
			}else if(this.stage<=10){
				nemy=1
			}else if(this.stage<=15){
				nemy=2;
			}else{
				nemy=3;
			}
			
			this.screen.unloadMask();
			this.screen=new Scr.BattleScreen(this.cnv,this.cnvM,this);
			this.screen.addPlayer(this.mcStats,new Ctr.Mouser(this.cnvM),0);
			this.screen.addPlayer(this.enemies[nemy][Math.floor(Math.random()*this.enemies[nemy].length)],ctr,1);
			this.screen.start();
			
		}else{
			this.choose();
		}
	}
	
	defeat(){
		var score=0;
		document.getElementById("points").innerHTML="";
		var points=localStorage.getItem(this.mcStats.name);
		if(points==null||points<this.points){
			localStorage.setItem(this.mcStats.name,this.points);
			score=1;
		}
		
		var points=localStorage.getItem("hiscore");
		if(points==null||points<this.points){
			localStorage.setItem("hiscore",this.points);
			score=2;
		}
		
		this.screen.unloadMask();
		this.screen=new Scr.FinishScreen(this.cnv,this.cnvM,this,score,this.points);
		
		
		this.points=0;
	}
	
	

	createEnemies(){
		this.enemies=[];
		var mumionV1={
			hp:2,
			dmg:1,
			def:1,
			effects:{},
			name:"Mumion",
			img:Character.baseChars().mum1
		};
		mumionV1.book=new SpellBook(
				mumionV1.name,
					[
						new Spell("Darkness",[0,-135,-45,180],[1,1,1,1],["ciemnosc"],1,"Spreads darkness."),
						new Spell("Flies",[90,-135,0,-135],[2,1,2,1],["muchy"],1,"Flies everywhere."),
					]
				);
					

		var mumionV2={
			hp:3,
			dmg:1,
			def:1,
			effects:{},
			name:"Mumion",
			img:Character.baseChars().mum2
		};
		mumionV2.effects["muchy"]=1;
		mumionV2.book=new SpellBook(
				mumionV2.name,
					[
						new Spell("Sleep",[-90,45,-45,90],[1,1,1,1],["sen"],1, "Makes enemy sleep."),
						new Spell("Darkness",[0,-135,-45,180],[1,1,1,1],["ciemnosc"],1,"Spreads darkness."),
						new Spell("Flies",[90,-135,0,-135],[2,1,2,1],["muchy"],2,"Flies everywhere."),
					]
				);
		var mumionV3={
			hp:4,
			dmg:1,
			def:1.5,
			effects:{},
			name:"Mumion",
			img:Character.baseChars().mum3
		};
		mumionV3.effects["muchy"]=1;
		mumionV3.book=new SpellBook(
				mumionV3.name,
					[
						new Spell("Sleep",[-90,45,-45,90],[1,1,1,1],["sen"],1, "Makes enemy sleep."),
						new Spell("Darkness",[0,-135,-45,180],[1,1,1,1],["ciemnosc"],2,"Spreads darkness."),
						new Spell("Flies",[90,-135,0,-135],[2,1,2,1],["muchy"],2,"Flies everywhere."),
						new Spell("Plague",[90,-135,0,-135],[2,1,2,1],["muchy","ciemnosc"],1,"Flies in the dark."),
					]
				);
				
		var drobV1={
			hp:3,
			dmg:1,
			def:1,
			effects:{},
			name:"Drob",
			img:Character.baseChars().drob1
		};
		drobV1.book=new SpellBook(
				drobV1.name,
					[
						new Spell("Sleep",[-90,45,-45,90],[1,1,1,1],["sen"],1, "Makes enemy sleep."),
						new Spell("Pudding",[180,90,0,90,180],[1,1,1,1,1],["budyn"],1,"Covers object in pudding."),
					]
				);
		
		var drobV2={
			hp:3,
			dmg:1,
			def:1,
			effects:{},
			name:"Drob",
			img:Character.baseChars().drob2
		};
		drobV2.book=new SpellBook(
				drobV2.name,
					[
						new Spell("Sleep",[-90,45,-45,90],[1,1,1,1],["sen"],1, "Makes enemy sleep."),
						new Spell("Pudding",[180,90,0,90,180],[1,1,1,1,1],["budyn"],1,"Covers object in pudding."),
						new Spell("Darkness",[0,-135,-45,180],[1,1,1,1],["ciemnosc"],1,"Spreads darkness."),
						new Spell("Flies",[90,-135,0,-135],[2,1,2,1],["muchy"],1,"Flies everywhere."),
					]
				);
		
		var drobV3={
			hp:3,
			dmg:1,
			def:1,
			effects:{},
			name:"Drob",
			img:Character.baseChars().drob3
		};
		drobV3.book=new SpellBook(
				drobV3.name,
					[
						new Spell("Sleep",[-90,45,-45,90],[1,1,1,1],["sen"],1, "Makes enemy sleep."),
						new Spell("Pudding",[180,90,0,90,180],[1,1,1,1,1],["budyn"],1,"Covers object in pudding."),
						new Spell("Darkness",[0,-135,-45,180],[1,1,1,1],["ciemnosc"],1,"Spreads darkness."),
						new Spell("Flies",[90,-135,0,-135],[2,1,2,1],["muchy"],1,"Flies everywhere."),
						new Spell("Vortexes",[-90,45,-90,135,0],[1,2,1,2,1],["wiry"],1,"Makes everything dizzy."),
						new Spell("Clear",[90,0,-90,180],[1,1,1,1],["clear"],0,"Clears status.")
					]
				);

		var faraon={
			hp:5,
			dmg:1.5,
			def:1.5,
			effects:{},
			name:"Faraon",
			img:Character.baseChars().mum4
		};
		faraon.effects["muchy"]=1;
		faraon.effects["ciemnosc"]=1;
		faraon.book=new SpellBook(
				faraon.name,
					[
						new Spell("Sleep",[-90,45,-45,90],[1,1,1,1],["sen"],1, "Makes enemy sleep."),
						new Spell("Plague",[90,-135,0,-135],[2,1,2,1],["muchy","ciemnosc"],2,"Flies in the dark."),
					]
				);
				
		var TKTPM={
			hp:5,
			dmg:1,
			def:1,
			effects:{},
			name:"TKTPM",
			img:Character.baseChars().drob4
		};
		TKTPM.book=new SpellBook(
				TKTPM.name,
					[
						new Spell("Sleep",[-90,45,-45,90],[1,1,1,1],["sen"],2, "Makes enemy sleep."),
						new Spell("Pudding",[180,90,0,90,180],[1,1,1,1,1],["budyn"],2,"Covers object in pudding."),
						new Spell("Vortexes",[-90,45,-90,135,0],[1,2,1,2,1],["wiry"],1,"Makes everything dizzy."),
						new Spell("Clear",[90,0,-90,180],[1,1,1,1],["clear"],0,"Clears status.")
					]
				);

		this.enemies.push([mumionV1,drobV1]);
		this.enemies.push([mumionV2,drobV2]);
		this.enemies.push([mumionV3,drobV3]);
		this.enemies.push([faraon,TKTPM]);
	}
}








