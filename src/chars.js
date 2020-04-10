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
	static baseChars(){
		var characters=[];
		characters.push(new Character("/assets/rex.png",600,100,6,210))
		characters.push(new Character("/assets/drob.png",600,100,36,122))
		characters.push(new Character("/assets/mumion.png",600,100,11,108))
		return characters;
		
	}
}