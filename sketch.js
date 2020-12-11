var gameState = 1;
var score = 0;

function preload() {
  backgroundImg = loadImage("Images.sprites/mushroomkingdom.png");
  MarioImg = loadAnimation("Images.sprites/mario.png");
  obstacleImg = loadAnimation("Images.sprites/coinblock.gif");
  enemyImg = loadImage("Images.sprites/thwomp.png");
  gameoverImg = loadImage("Images.sprites/gameover.jpg");
  coinImg = loadImage("Images.sprites/coin.png");
  restartImg = loadImage("Images.sprites/restart.png");
}

function setup() {
  createCanvas(2000, 700);
  Background = createSprite(1000, 350, 2000, 700);
  Background.addImage(backgroundImg);
  Background.scale = 0.5;
  Mario = createSprite(200, 500);
  Mario.addAnimation("mario", MarioImg);
  Mario.scale = 0.25;
  restart = createSprite(1000, 320, 456, 456);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  obstaclesGroup = createGroup();
  enemiesGroup = createGroup();
  coinGroup = createGroup();
}

function draw() {
  background(0);
  if(gameState === 1){
  obstacles();
  enemies();
  coins();
  restart.visible = false;
  coinGroup.setDepthEach(5);
  enemiesGroup.setDepthEach(4);
  obstaclesGroup.setDepthEach(3);
  for(var i = 0; i < coinGroup.length; i++){
    if(coinGroup.get(i).isTouching(Mario)){
      coinGroup.get(i).destroy();
      score++
    }
  }
  Mario.velocityX = 0;
  if(keyDown("space")) {
    Mario.velocityY = -8;
  }
  if(keyDown("left")) {
    Mario.velocityX = -4;
  }
  if(keyDown("right")) {
    Mario.velocityX = 4;
  }
  Mario.velocityY += 0.2;
  Mario.collide(obstaclesGroup);
  if(Mario.isTouching(enemiesGroup)){
    gameState = 0;
  }
}
if(gameState === 0){
  Background.addImage(gameoverImg);
  Background.scale = 1.3;
  obstaclesGroup.destroyEach();
  enemiesGroup.destroyEach();
  Mario.destroy();
  coinGroup.destroyEach();
  restart.visible = true;
}
  drawSprites();
  
  fill("green");
  textSize(30);
  text("Score: " + score, 1000,50);
}

function obstacles() {
  if(frameCount % 105 === 0) {
    obstacle = createSprite(2000, random(350,650));
    obstacle.velocityX = -4;
    obstacle.addAnimation("Hi",obstacleImg);
    obstacle.scale = 0.25;
    obstaclesGroup.add(obstacle);
  }
}

function enemies() {
  if(frameCount % 150 === 0) {
    enemy = createSprite(2000, random(350,650));
    enemy.velocityX = -5;
    enemy.addImage(enemyImg);
    enemy.scale = 0.5;
    enemiesGroup.add(enemy);
  }
}

function coins() {
  if(frameCount % 50 === 0) {
    coin = createSprite(2000, random(350,650));
    coin.velocityX = -4;
    coin.addImage("Hi",coinImg);
    coin.scale = 0.25;
    coinGroup.add(coin);
  }
}