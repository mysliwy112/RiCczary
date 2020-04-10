export default class V {
	//returns normalized vector
	static normalize(pointX,pointY) {
		var norm = Math.sqrt(pointX * pointX + pointY * pointY);
		if (norm != 0) { // as3 return 0,0 for a point of zero length
			pointX = pointX / norm;
			pointY = pointY / norm;
		}
		return [pointX,pointY];
	}
	//
	static len(pointX,pointY) {
		return Math.sqrt(pointX * pointX + pointY * pointY);
	}
	static toNearest(num, numr){
		num=Math.round(num/Math.PI*180)+180;
		numr=Math.round(numr/Math.PI*180);
		var how=num-num%numr;
		
		if(num%numr>numr/2){
			how+=numr;
		}
		return (how-180)/180*Math.PI;
	}
}
	