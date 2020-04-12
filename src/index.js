import Game from "/src/game.js";
import {SpellBook} from "./spells.js";
import {Book} from "./menu.js";

document.getElementById("charName").value=localStorage.getItem("last");

window.showCast=function(){};

//visible canvas
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
//clickable canvas
let canvasM = document.getElementById("maskScreen");
let ctxM = canvasM.getContext("2d");

let game= new Game(canvas,canvasM);

let book= new Book(game);
book.openPage("character");

let lastTime = 0;
function gameLoop(timestamp){
	let deltaTime = timestamp - lastTime;
	lastTime = timestamp;
	//console.log(deltaTime);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctxM.clearRect(0, 0, canvasM.width, canvasM.height);
	game.update(deltaTime);
	game.draw(ctx,ctxM);

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);





