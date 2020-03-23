export class Whril{
	constructor(){
		this.max=10;
		this.now=0;
		this.speed=0;
		this.power=0.1;
		this.width=800;
		this.height=600;
	}
	
	move(ctx,power){
		power=power*5
		var spower=power/4
		this.speed+=Math.sign(spower-this.speed)/30;
		
		this.power+=Math.sign(power-this.power)/30;
		if(this.speed==0)
			this.speed=0.1;
		if(Math.abs(spower-this.speed)<0.5)
			this.speed=spower+0.0001;
		if(Math.abs(power-this.power)<0.5)
			this.power=power;
		
		var data=ctx.getImageData(0, 0, this.width, this.height).data;
		var imageData=ctx.createImageData(this.width, this.height);
		imageData.data.fill(0,0,data.length)
		
		var now=0;
		for(var i=0;i<this.height;i++){
			
			if(now>=0){
				var dt=data.slice(i*this.width*4,(i+1)*this.width*4-now*4);
				imageData.data.set(dt,i*this.width*4+now*4);
			}else{
				var dt=data.slice(i*this.width*4-now*4,(i+1)*this.width*4);
				imageData.data.set(dt,i*this.width*4);
			}
			now=Math.round(Math.sin((i+this.now)*this.power*0.005)*this.power*2);
		}
		this.now+=this.speed;
		ctx.putImageData(imageData,0,0);
		//this.now+=this.dir;
	}
	
	finish(ctx){
		this.move(ctx,0);
		if(this.power<1){
			return 1;
		}else{
			return 0;
		}
	}
}