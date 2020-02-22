import Particle from "./particles.js";
import V from "/src/Vmath.js";

let partMax=document.getElementById("partMax");

export default class Chant {
	constructor(player,canvas,transform=null) {
		this.player=player;
		this.transform=transform;
		//last position for length checking
		this.lastX;
		this.lastY;
		//last position for angle checking
		this.checkX;
		this.checkY;
		//actual position
		this.posX=0;
		this.posY=0;
		
		//particles
		this.particleSystem = [];
		this.canvas=canvas;
		
		this.endGravX=0;
		this.endGravY=0;
		
		//actual spell and allowed spells
		this.spell=0;
		//console.log(this,player.spellBook)
		
		//spell symbol
		this.lens=[];
		this.dirs=[];
		
		//settings
		this.partSize=30;
		this.partPow=8;
		this.burstPow=2;
		this.partMax=3;
		
		//for checking angles and lengths
		this.tans=[];
		this.points=[];
		
		//settings
		this.freqPart=8;
		this.difMin=0.7
		this.checkBound=10
		this.checkSize=3;
		this.varianceCheck=0.009;
		
		//cretion
		this.creationMode=false;
		
	}
	
	move(mouseX,mouseY){
		this.check(mouseX,mouseY);
		var a=[];
		if(this.transform!=null){
			a=this.transform(mouseX,mouseY)
			mouseX=a[0];
			mouseY=a[1];
		}
		var vX=mouseX-this.posX;
		var vY=mouseY-this.posY;
		var len=V.len(vX,vY);
		var i=0;
		for(var i=0;i<len;i+=this.freqPart){
			for(var j=0;j<this.partMax;j++){
				this.particleSystem.push(new Particle(this.posX+vX*i/len,this.posY+vY*i/len,this.partSize,this.partPow));
			}
		}
		this.posX=mouseX;
		this.posY=mouseY;
	}
	
	check(mouseX,mouseY){

		var vX=mouseX-this.checkX;
		var vY=mouseY-this.checkY;
		var len=V.len(vX,vY);
		
		if(len>this.checkBound){
			this.tans.push(Math.atan2(vY,vX));
			this.points.push([mouseX,mouseY]);
			if(this.tans.length>=this.checkSize){
				
				var tans=this.tans.slice();
				var mean=tans[0];
				var accu=tans[0]*tans[0];
				
				for(var i=1;i<tans.length;i++){
					if(tans[i]>tans[i-1]+4)
						tans[i]-=Math.PI*2;
					else if(tans[i]<tans[i-1]-4)
						tans[i]+=Math.PI*2;
					mean+=tans[i];
					accu+=tans[i]*tans[i]
				}
				mean=mean/tans.length;
				accu=accu/tans.length;
				var variance=accu-(mean*mean);
				
				if(variance<this.varianceCheck){
					mean=(mean*tans.length-tans[0])/(tans.length-1);
					if(mean>Math.PI)
						mean-=2*Math.PI;
					else if(mean<-Math.PI)
						mean+=2*Math.PI;
					
					
					
					if(this.dirs.length>0){
						if(mean>this.dirs[this.dirs.length-1]+4)
							mean-=Math.PI*2;
						else if(mean<this.dirs[this.dirs.length-1]-4)
							mean+=Math.PI*2;
						var dif;
						if(mean>this.dirs[this.dirs.length-1])
							dif=mean-this.dirs[this.dirs.length-1];
						else
							dif=this.dirs[this.dirs.length-1]-mean;
						
						if(dif>this.difMin){
							if(mean>Math.PI)
								mean-=2*Math.PI;
							else if(mean<-Math.PI)
								mean+=2*Math.PI;
							this.dirs.push(mean);
							this.lens.push(V.len(this.points[0][0]-this.lastX,this.points[0][1]-this.lastY));
							this.lastX=this.points[0][0];
							this.lastY=this.points[0][1];
							//console.log(this.dirs[this.dirs.length-1]);
							//console.log(this.lens[this.lens.length-1]);
						}
						
					}else{
						this.dirs.push(mean);
						//console.log(this.dirs[this.dirs.length-1]);
						//console.log(this.lens[this.lens.length-1]);
					}

				}
				this.tans.shift();
				if(this.points.length>this.checkSize+2)
					this.points.shift();
				this.mean=mean;
			}
				this.checkX=mouseX;
				this.checkY=mouseY;
		}
	}
	
	create(){
		for(var i=0;i<this.dirs.length;i++){
			this.dirs[i]=Math.round(V.toNearest(this.dirs[i],45/180*Math.PI)/Math.PI*180);
			if(this.dirs[i]==-180)
				this.dirs[i]=180;
		}
		var low=this.lens[0];
		for(var i=1;i<this.lens.length;i++){
			if(this.lens[i]<low)
				low=this.lens[i];
		}
		for(var i=0;i<this.lens.length;i++){
			this.lens[i]=Math.round(this.lens[i]/low);
		}
		document.getElementById("cSpellOut").value="new Spell(\""+document.getElementById("cSpellName").value+"\","+JSON.stringify(this.dirs)+","+JSON.stringify(this.lens)+",Effects."+document.getElementById("cSpellName").value;
		this.creationMode=false;
	}
	
	compare(){
		for(var i=0;i<this.dirs.length;i++){
			this.dirs[i]=Math.round(V.toNearest(this.dirs[i],45/180*Math.PI)/Math.PI*180);
			if(this.dirs[i]==-180)
				this.dirs[i]=180;
		}
		
		var good=new Array(this.player.spellBook.length).fill(true);
		for(var i=0;i<this.dirs.length;i++){
			for(var j=0;j<good.length;j++){
				if(good[j]){
					if(this.dirs.length!=this.player.spellBook[j].seq.length||this.dirs[i]!=this.player.spellBook[j].seq[i])
						good[j]=false;
				}
			}
		}

		for(var j=0;j<good.length;j++){
			if(good[j]){
				this.player.cast(this.player.spellBook[j]);
				return 1;
			}
		}
		return 0;
	}
	
	reset(){
		
		this.lens=[];
		this.dirs=[];
		this.tans=[];
		this.points=[];
	}
	
	start(mouseX,mouseY){
		this.reset();
		
		this.particleSystem = [];
		
		this.lastX=mouseX;
		this.lastY=mouseY;
		this.checkX=mouseY;
		this.checkY=mouseY;
		var a=[];
		if(this.transform!=null){
			a=this.transform(mouseX,mouseY)
			mouseX=a[0];
			mouseY=a[1];
		}
		this.posX=mouseX;
		this.posY=mouseY;
	}
	
	finish(){
		this.particleSystem.forEach(part => {
			part.time=part.timeMax;
			part.velX*=this.burstPow;
			part.velY*=this.burstPow;
		});
		this.lens.push(V.len(this.posX-this.lastX,this.posY-this.lastY));
		
		if(this.dirs.length>0&&this.dirs.length==this.lens.length){
			if(this.creationMode)
				this.create();
			else
				if(this.compare()){
					var a=this.player.loadTimeMax;
					this.particleSystem.forEach(part =>{
						part.timeMax=a;
						part.time=part.timeMax+111;
						part.gravitX=this.endGravX;
						part.gravitY=this.endGravY;
						part.loss=0.98;
						
					});
				}
		}else{
			this.particleSystem = [];
		}
		this.reset();
	}
	
	charged(){
		this.particleSystem.forEach(part =>{
			part.timeMax=10000;
			part.time=part.timeMax;
			part.velX*=this.burstPow;
			part.velY*=this.burstPow;
			part.loss=0.999;
						
		});
	}
	
	update(deltaTime){
		
		this.particleSystem.forEach(part => part.update(deltaTime));
	}
	draw(ctx,ctxM){
		//var ctx=this.canvas.getContext("2d");
		if(document.getElementById("DBG").checked){
			ctx.beginPath();
			ctx.moveTo(this.posX,this.posY);
			//var v=V.normalize(Math.cos(this.mean),Math.sin(this.mean));
			var v=V.normalize(Math.cos(this.mean),Math.sin(this.mean));
			ctx.lineTo(this.posX+v[0]*200,this.posY+v[1]*200);
			ctx.stroke();
			
			ctx.beginPath();
			ctx.arc(this.lastX,this.lastY,30,0,2*Math.PI);
			ctx.fillStyle = "black";
			ctx.fill();
			
			for(var i=0;i<this.points.length;i++){
				ctx.beginPath();
				ctx.arc(this.points[i][0],this.points[i][1],10,0,2*Math.PI);
				ctx.fillStyle = "red";
				ctx.fill();
			}
		}
		if(this.creationMode){
			ctx.beginPath();
			var posX=this.canvas.width/2;
			var posY=this.canvas.height/2;
			ctx.moveTo(posX,posY);
			for(var i=0;i<this.lens.length;i++){
				var v=V.normalize(Math.cos(V.toNearest(this.dirs[i],45/180*Math.PI)),Math.sin(V.toNearest(this.dirs[i],45/180*Math.PI)));
				//console.log(V.toNearest(this.dirs[i],45/180*Math.PI));
				posX=posX+v[0]*this.lens[i]/5;
				posY=posY+v[1]*this.lens[i]/5;
				ctx.lineTo(posX,posY);
			}
			ctx.stroke();
		}
		
		this.particleSystem.forEach(part => part.draw(ctx));
	}
	
}