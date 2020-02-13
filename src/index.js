import Game from "/src/game.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let game = new Game(canvas);

let lastTime = 0;
function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  //console.log(deltaTime);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
