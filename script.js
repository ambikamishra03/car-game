const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};
let player = { speed: 10, score: 0 };

// move lines
const moveLines = () =>{
  let lines = document.querySelectorAll(".line");
  lines.forEach(function(item){
    if(item.y>=1500){
      item.y -= 1500;
    }
    item.y +=player.speed;
    item.style.top = item.y +"px";
  })
}

// prevent collision 
const isCollide = (a,b) =>{
 let aRect = a.getBoundingClientRect();
 let bRect = b.getBoundingClientRect();

 return !(
  (aRect.bottom<bRect.top) ||
  (aRect.top>bRect.bottom) ||
  (aRect.right<bRect.left) ||
  (aRect.left>bRect.right)
 )

}
// move enemy
const moveEnemy = (car) =>{
  let ele = document.querySelectorAll(".enemy");
  ele.forEach(function(item){
    if(isCollide(car,item)){
      console.log("HIT");
      endGame();
    }
    if(item.y>=1500){
      item.y = -600;
      item.style.left = Math.floor(Math.random()*150) + "px";
      item.style.backgroundColor = randomColor();
    }
    item.y +=player.speed;
    item.style.top = item.y +"px";
  })
}


const playGame = () => {
  // console.log("inplay");
  let car = document.querySelector(".car");
  moveLines();
  moveEnemy(car);
  let road  = gameArea.getBoundingClientRect();
  // console.log(road);
  if (player.start) {
    if (keys.ArrowUp && player.y > road.top) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < (road.width - 50)) {
      player.x += player.speed;
    }
    car.style.left = player.x + "px";
    car.style.top = player.y + "px";

    window.requestAnimationFrame(playGame);
    player.score++;
    score.innerText="Score: " +player.score;
  }
};


// generate random colors 
const randomColor = () => {
  const c =() => {
    let hex= Math.floor(Math.random()*256).toString(16);
    return ("0"+String(hex)).substring(-2);
  }
  return "#" +c()+c()+c();
}

// end the game
const endGame =() =>{
  player.start= false;
  score.innerHTML ="Game Over <br> Your Score Was : " +player.score;
  startScreen.classList.remove("hide");
}
const start = () => {
  // console.log("clicked");
  startScreen.classList.add("hide");
  // gameArea.classList.remove("hide");
  gameArea.innerHTML="";
  player.start = true; 
  player.score =0;
  for(let x=0;x<10;x++){
    let div = document.createElement("div");
    div.classList.add("line");
    div.y= x*150;
    div.style.top =(x*150)+"px";
    gameArea.appendChild(div);
  }
  //  for Animation
  window.requestAnimationFrame(playGame);
  let car = document.createElement("div");
  // car.innerText = "Car";
  car.setAttribute("class", "car");
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  for(let x=0;x<3;x++){
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.innerHTML = "<br>"+(x+1);
    enemy.y= ((x+1)*600)* -1 ;
    enemy.style.top =enemy.y+"px";
    enemy.style.left = Math.floor(Math.random()*250) + "px";
    enemy.style.backgroundColor = randomColor();
    gameArea.appendChild(enemy);
  }
};

const pressOn = (e) => {
  e.preventDefault();
  keys[e.key] = true;
  console.log(keys);
};

const pressOff = (e) => {
  e.preventDefault();
  keys[e.key] = false;
  console.log(keys);
};

startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

