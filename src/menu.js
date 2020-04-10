import Character from "/src/chars.js";
import {SpellBook} from "./spells.js";

export class Book{
	constructor(game){
		this.game=game;
		document.defaultView.


		window.openPage=this.openPage.bind(this);
		
		window.newGame=this.newGame.bind(this);
		window.activateGame=this.activateGame.bind(this);
		window.saveGame=this.saveGame.bind(this);
		window.loadGame=this.loadGame.bind(this);
		this.activateGame();
	}
	
	openPage(pageName){
		var i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("page");
		
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}

		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}
					
		document.getElementById(pageName).style.display = "block";
		if(pageName=="spells"){
			this.genSpellPage(this.game.mcStats.book);
		}		
		if(document.getElementById("b"+pageName)!=undefined){
			document.getElementById("b"+pageName).className += " active";
		}
	}
	
	genSpellPage(spellBook){
		var spells=document.getElementById("spellsGrid");
		var template=document.getElementById("defaultSpell");
		
		var child = spells.lastElementChild; 
		while (child) { 
            spells.removeChild(child); 
            child = spells.lastElementChild; 
        } 
		
		document.getElementById("casterName").innerHTML=spellBook.name+"'s spells";
		for(let spell of spellBook.spells){
			
			var write=template.cloneNode(true);
			write.id="spell"+spell.name;

			for(let i of spell.points){
				var point=write.children.namedItem("spellShp").createSVGPoint();
				point.x=i[0];
				point.y=i[1];
				write.children.namedItem("spellShp").children.item(0).points.appendItem(point);
			}
			
			write.children.namedItem("spellShp").removeAttribute("id");
			write.children.namedItem("spellDesc").innerHTML=spell.description;
			write.children.namedItem("spellDesc").removeAttribute("id");
			spells.appendChild(write);
		}
	}
	
	
	
	
	
	setCharImg(){
		document.getElementById("charImage").src=this.chars[this.nowChar].img.src;
	}
	
	newGame(){
		window.openPage("createGame");
	}
	
	activateGame(){
		
		var mcStats={};
		
		mcStats.book=SpellBook.basicSpellBook();
		mcStats.hp=3;
		mcStats.dmg=1;
		mcStats.def=1;
		mcStats.effects={};
		mcStats.name=document.getElementById("charName").value;
		if(mcStats.name!=""){
			mcStats.book.name=mcStats.name;
		}
		mcStats.img=Character.baseChars()[0];
		
		this.game.mcStats=mcStats;
		
		window.openPage("spells");
		this.game.choose();
	}
		
	saveGame(){
		saveGame();
	}
	loadGame(){
		loadGame();
	}
}