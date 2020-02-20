export default class MaskScreen{
	constructor(canvas){
		var that=this;
		this.objects={};
		this.rgb=1;
		this.canvas=canvas;
		this.globalFunc=null;
		this.objects[0]=[null,null];
		
		
		canvas.addEventListener("mousedown",  event =>{
			var imageData = that.canvas.getContext("2d").getImageData(event.offsetX, event.offsetY, 1, 1);
			var data = imageData.data;
			
			if(document.getElementById("DBG").checkeds){
				console.log(event.offsetX+","+event.offsetY);
			}
			
			if(data[3]>0)
				that.objects[data[0]+data[1]*256+data[2]*65536][1]();
			else if(this.objects[0][1]!=null)
				this.objects[0][1]();
		});

	}
	
	addNull(func){
		this.objects[0][1]=func;
	}
	
	addObject(img,func){
		var cnv=document.createElement('canvas');
		cnv.width=img.width;
		cnv.height=img.height;
		cnv.getContext("2d").drawImage(img,0,0);
		var imageData = cnv.getContext("2d").getImageData(0, 0, cnv.width, cnv.height);
		var data = imageData.data;
		
		var r=this.rgb%256;
		var g=(this.rgb%65536-this.rgb%256)/256;
		var b=(this.rgb%16777216-this.rgb%65536)/65536;
		
		for (var i = 0; i < data.length; i += 4) {
			data[i]=r;//red
			data[i+1]=g;//green
			data[i+2]=b;//blue
		}
		
		cnv.getContext("2d").putImageData(imageData, 0, 0);
		this.objects[this.rgb]=[cnv,func];
		this.rgb++;
		return cnv;
	}

	
}
