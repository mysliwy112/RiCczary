export default class Character{
	constructor(img,posX,posY,rPosX,rPosY){
		var a=new Image();
		a.src=img;
		this.img=a;
		this.posX=posX;
		this.posY=posY;
		this.rPosX=rPosX;
		this.rPosY=rPosY;
	}
}