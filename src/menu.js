
export default class Menu {
	static start(){
		document.getElementById("DBG").addEventListener("input", event =>{
			if(event.target.checked==true){
				document.getElementById("debugMenu").style.display="block"
			}else{
				document.getElementById("debugMenu").style.display="none"
			}
		});
	}
}