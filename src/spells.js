export class Spell{
	constructor(name,dirs,lens,effect){
		this.name=name;
		this.seq=dirs;
		this.seqL=lens;
		this.eff=effect;
	}
	
	effect(){
		this.eff();
	}
}

export class Effects{
	static sen(){
		console.log("sen");
	}
	
	static budyn(){
		console.log("budyn");
	}
	
	constructor(){
		this.dic={
			"sen":this.sen,
			"budyn":this.budyn,
		}
	}
	

}