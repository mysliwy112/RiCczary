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
		var characters={}
		characters.rex=new Character("/assets/rex.png",500,100,6,210);
		characters.drob1=new Character("/assets/drob1.png",600,2,36,122);
		characters.dummy=new Character("/assets/drobd.png",600,2,36,122);
		characters.drob2=new Character("/assets/drob2.png",600,2,36,122);
		characters.drob3=new Character("/assets/drob3.png",600,2,36,122);
		characters.drob4=new Character("/assets/drob4.png",600,2,36,122);
		characters.mum1=new Character("/assets/Smumion1.png",400,296,148,-40);
		characters.mum2=new Character("/assets/Smumion2.png",400,296,148,-40);
		characters.mum3=new Character("/assets/Smumion3.png",400,296,148,-40);
		characters.mum4=new Character("/assets/Smumion4.png",444,329,164,-44);
		return characters;
		
	}
}