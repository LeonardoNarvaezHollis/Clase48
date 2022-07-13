//Las variables (fondo, obstaculos,player, monedas (vida)
var road1;
var road2;
var ambulance;
var truck, greenTruck;
var policeCar;
var carB, carGreen, carGray, carR, carY
var bg;
var coin;
var player;
var obstaclesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
//Cargar las imagenes  
  road1 = loadImage("./Image/carretera1.jpg");
  road2 = loadImage("./Image/carretera2.jpg");
  ambulance = loadImage("./Image/ambulance.png");
  truck = loadImage("./Image/truck.png");
  coin = loadImage("./Image/coin.png");
  carB = loadImage("./Image/carBlue.png");
  carGreen = loadImage("./Image/carGreen.png");
  carGray = loadImage("./Image/carGrey.png");
  carR = loadImage("./Image/carRed.png");
  carY = loadImage("./Image/yellowCar.png");
  greenTruck = loadImage("./image/greenTruck.png");
  restartImg = loadImage("./image/restart.png");
  gameOverImg = loadImage("./image/gameOver.png");
}


function setup() {
  createCanvas(600,300);
  
  bg = createSprite(300, 700);
  bg.addImage("bg", road1);
  bg.velocityY = 2.5;

  //Carro del player
  player = createSprite(400,160,100,150);
  player.addImage("jugador",carGray);
  player.scale = 0.3

  //Crear el grupo de obstaculos
  obstaclesGroup = new Group();

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
 
}

function draw() {
  background(255,255,255);
 // console.log(bg.y); 
 if(gameState === PLAY){

  gameOver.visible = false;
  restart.visible = false;
  

  if(bg.y > 225){
    bg.y = 75.5;
  }
  
  if (keyDown("LEFT_ARROW")){
    player.x = player.x -3;
    
  }
  
  if (keyDown("RIGHT_ARROW")){
    player.x += 3;
    
  }
  
  if (keyDown("DOWN_ARROW")){
    player.y = player.y +3;
    
  }

  console.log(player.x);
  spawnObstacles();

  if(obstaclesGroup.isTouching(player)){
    gameState = END;

  }

   }
   else if(gameState == END){
    gameOver.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)) {
      reset();}
    bg.velocityY = 0;
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityYEach(0);

   }

   touches

  drawSprites();

}
//switch/grupos para los obstaculos (el juego del Trex clase #18)

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite( Math.round(random(300,400)),160,10,40);
    //obstacle.velocityX = -(6 + score/100);
    obstacle.velocityY += 3;

     //generar obstáculos al azar
     var rand = Math.round(random(1,8));
     switch(rand) {
       case 1: obstacle.addImage(ambulance);
               break;
       case 2: obstacle.addImage(carB);
               break;
       case 3: obstacle.addImage(carGreen);
               break;
       case 4: obstacle.addImage(carR);
               break;
       case 5: obstacle.addImage(greenTruck);
               break;
       case 6: obstacle.addImage(policeCar);
               break;
       case 7: obstacle.addImage(truck);
               break;
       case 8: obstacle.addImage(carY);
               break;
       default: break;
     }
    
     //asignar escala y ciclo de vida al obstáculo           
     obstacle.scale = 0.2;
     obstacle.lifetime = 300;
    
    //agregar cada obstáculo al grupo
     obstaclesGroup.add(obstacle);
  }
 }
 


