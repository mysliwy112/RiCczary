export default class V {
	static normalize(pointX,pointY) {
		var norm = Math.sqrt(pointX * pointX + pointY * pointY);
		if (norm != 0) { // as3 return 0,0 for a point of zero length
			pointX = pointX / norm;
			pointY = pointY / norm;
		}
		return [pointX,pointY];
	}
	static len(pointX,pointY) {
		return Math.sqrt(pointX * pointX + pointY * pointY);
	}
}
	