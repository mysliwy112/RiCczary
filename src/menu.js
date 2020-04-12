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
		if(pageName=="leaderboard"){
			this.genLeaderboardPage();
		}			
		if(document.getElementById("b"+pageName)!=undefined){
			document.getElementById("b"+pageName).className += " active";
		}
	}
	
	genLeaderboardPage(){
		var table=document.getElementById("lead");
		var base=document.getElementById("tableBase").cloneNode(true);
		
		var child = table.lastElementChild; 
		while (child) { 
            table.removeChild(child); 
            child = table.lastElementChild; 
        } 
		
		var leads=[];
		var i=0;
		var store=localStorage.key(i);
		while(store!=null){
			if(store!="last"&&store!="hiscore"){
				leads.push([store,localStorage.getItem(store)]);
			}
			i++;
			store=localStorage.key(i);
		}
		leads=leads.sort(function(a,b){return b[1] - a[1];});
		
		table.appendChild(base);
		for(i=0;i<leads.length;i++){
			var entry=base.cloneNode(true);
			entry.getElementsByClassName("tablePlace")[0].innerHTML=(i+1)+".";
			entry.getElementsByClassName("tableName")[0].innerHTML=leads[i][0];
			entry.getElementsByClassName("tableScore")[0].innerHTML=leads[i][1];
			table.appendChild(entry);
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
			write.children.namedItem("spellName").innerHTML=spell.name;
			write.children.namedItem("spellName").removeAttribute("id");
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
		mcStats.hp=5;
		mcStats.dmg=1;
		mcStats.def=1;
		mcStats.effects={};
		mcStats.name=document.getElementById("charName").value;
		localStorage.setItem("last",mcStats.name);
		if(mcStats.name!=""){
			mcStats.book.name=mcStats.name;
		}
		mcStats.img=Character.baseChars().rex;
		
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