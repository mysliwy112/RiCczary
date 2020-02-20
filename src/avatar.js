export class Enemy{
	constructor(img,maskScreen,from){
		this.img=img;
		this.maskScreen=maskScreen;
		this.hit=this.hit.bind(this,from);
		this.imgM=this.maskScreen.addObject(img,this.hit);
	}
	
	set(player){
		this.player=player;
		this.player.chant.transform=this.enemyScreenTransform;
		this.player.chant.partSize=15;
		this.player.chant.partPow=4;
		this.player.chant.burstPow=1.2;
		this.player.chant.partMax=1;
	}
	
	
	enemyScreenTransform(pointX,pointY){
		pointX=(pointX*-0.5)+600;
		pointY=(pointY*0.5)+100;
		return [pointX,pointY];
	}
	
	draw(ctx,ctxM){
		ctx.drawImage(
			this.img,
			100,
			100
		);
		ctxM.drawImage(
			this.imgM,
			100,
			100
		);
	}
	
	hit(attacker){
		attacker.attack(this.player);
	}
}

export class Protag{
	constructor(img){
		this.img=img;
	}
	
	set(player){
		this.player=player;
	}
	
	draw(ctx,ctxM){
		ctx.drawImage(
			this.img,
			600,
			100
		);
	}
}