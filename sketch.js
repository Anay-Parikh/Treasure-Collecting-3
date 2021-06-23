var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  pathImg = loadImage("Road.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  boyImg = loadAnimation("boy.png");
  endImg = loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth, windowHeight);
  
  // Moving background
  path = createSprite(width/2, 200);
  path.addImage(pathImg);
  path.velocityY = 4;

  // Creating boy running
  boy = createSprite(width/2, height-20,20,20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale=0.15;

  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
}

function draw() {

  if(gameState === PLAY){
    background(0);
    boy.x = World.mouseX;
  
    edges= createEdgeSprites();
    boy.collide(edges);
  
    //code to reset the background
    if(path.y > height) {
      path.y = height/2;
    }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    /*
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
      
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 50;
      
    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 50; 
      
    } else if (swordGroup.isTouching(boy)) {
      gameState = END;
      gameOver();
    }
    */
    
    for (var i = 0; i < diamondsG.length; i++) {
      if (boy.isTouching(diamondsG[i])) {
        diamondsG[i].remove();
        treasureCollection = treasureCollection + 50;
      }
    }
    
    for (i = 0; i < cashG.length; i++) {
      if (boy.isTouching(cashG[i])) {
        cashG[i].remove();
        treasureCollection = treasureCollection + 50;
      }
    }
    
    for (i = 0; i < jwelleryG.length; i++) {
      if (boy.isTouching(jwelleryG[i])) {
        jwelleryG[i].remove();
        treasureCollection = treasureCollection + 50;
      }
    }
    
    if (swordGroup.isTouching(boy)) {
      gameState = END;
      gameOver();
    }
  
    drawSprites();
    textSize(20);
    fill(255);
    text("Treasure: " + treasureCollection, width-525, 30);
  }
}

function createCash() {
  if (World.frameCount % 100 == 0) {
    var cash = createSprite(Math.round(random(width-50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 400;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 225 == 0) {
    var diamonds = createSprite(Math.round(random(width-50, 350), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 400;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 350 == 0) {
    var jwellery = createSprite(Math.round(random(width-50, 350), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 400;
    jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 475 == 0) {
    var sword = createSprite(Math.round(random(width-50, 350), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 400;
    swordGroup.add(sword);
  }
}

function gameOver() {
  /*
  swordGroup.setVelocityYEach(0);
  jwelleryG.setVelocityYEach(0);
  diamondsG.setVelocityYEach(0);  
  cashG.setVelocityYEach(0);
  swordGroup.setLifetimeEach(-1);
  jwelleryG.setLifetimeEach(-1);
  diamondsG.setLifetimeEach(-1);  
  cashG.setLifetimeEach(-1);
  */
  swordGroup.destroyEach();
  jwelleryG.destroyEach();
  diamondsG.destroyEach();  
  cashG.destroyEach();
  path.velocityY = 0;

  
  var end = createSprite(width-500, 300, 10, 10);
  end.addImage(endImg);
}