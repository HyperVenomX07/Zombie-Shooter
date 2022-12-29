var bg, bgImg;
var player,playerImg,playerImg2;
var heart1, heart2, heart3, heart1_img, heart2_img, heart3_img;
var life=3;
var gameState="fight";
var zombie,zombieImg,zombieGroup;
var bullets=70,bulletImg,bulletGroup,bullet;
var score=0;
var explosionSound;
var loseSound;
var winningSound;
var ground;

function preload(){
  bgImg=loadImage("assets/bg.jpeg");
  playerImg=loadImage("assets/shooter_2.png");
  playerImg2=loadImage("assets/shooter_3.png");
  heart1_img=loadImage("assets/heart_1.png");
  heart2_img=loadImage("assets/heart_2.png");
  heart3_img=loadImage("assets/heart_3.png");
  zombieImg=loadImage("assets/zombie.png");
  bulletImg=loadImage("assets/bullet.png");
  explosionSound=loadSound("assets/explosion.mp3");
  loseSound=loadSound("assets/lose.mp3");
  winningSound=loadSound("assets/win.mp3"); 
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  bg=createSprite(displayWidth/2,displayHeight/2,20,20);
  bg.addImage(bgImg);
  bg.scale=1.1;

  player=createSprite(displayWidth-1250, displayHeight-315,50,50);
  player.addImage(playerImg);
  player.scale=0.64;
  player.debug=true;
  player.setCollider("rectangle",0,0,200,450);

  heart1=createSprite(displayWidth-150,40,20,20);
  heart1.addImage(heart1_img);
  heart1.visible=false;
  heart1.scale=0.24;

  heart2=createSprite(displayWidth-100, 40,20,20);
  heart2.addImage(heart2_img);
  heart2.visible=false;
  heart2.scale=0.24;

  heart3=createSprite(displayWidth-150,40,20,20);
  heart3.addImage(heart3_img);
  heart3.scale=0.24;

 // ground=createSprite(displayWidth,50,1000,1000);


  zombieGroup=new Group();
  bulletGroup=new Group();


}

function draw(){
  background(0);

  if(gameState==="fight"){
    if(life===3){
      heart1.visible=false;
      heart2.visible=false;
      heart3.visible=true;
    }
    if(life===2){
      heart1.visible=false;
      heart2.visible=true;
      heart3.visible=false;
    }
    if(life===1){
      heart1.visible=true;
      heart2.visible=false;
      heart3.visible=false;
    }

    if(life===0){
      gameState="lost";
      heart1.visible=false;
      loseSound.play();
    }
  }

  
  //text("Score:"+score,-1250,140);
  

  if(score==100){
    gameState="won";
    winningSound.play();
  }

  if(keyDown("W")|| touches.length>0){
    player.y=player.y-30;
  }

  if(keyDown("S")|| touches.length>0){
    player.y=player.y+30;
  }

  if(keyWentDown("Space")&& gameState=="fight"){
    player.addImage(playerImg2);
    bullet=createSprite(displayWidth-1100,player.y+30,20,10);
    bullet.velocityX=5.8;
    player.depth=bullet.depth;
    player.depth=player.depth+2;
    bullet.addImage(bulletImg);
    bullet.scale=0.21;
    bulletGroup.add(bullet);
    bullets=bullets-1;
    explosionSound.play();
  }

  if(keyWentUp("Space")){
    player.addImage(playerImg); 
    
  }

  if(bullets===0){
    gameState="bullet";

  }

  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0; i<zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();
        score=score+2;
  
      }
    }

  }

  if(zombieGroup.isTouching(player)){
    for(var i=0;i<zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy();
        life=life-1;
      }
    }
  }



  spawnZombies();

  drawSprites()

  textSize(20);
  fill("white");
  text("Bullets:"+bullets,displayWidth-210,displayHeight/2-260);
  text("Score:"+score,displayWidth-200,displayHeight/2-300);
  text("Lives:"+life,displayWidth-200,displayHeight/2-340);

  if(gameState=="lost"){
    textSize(53);
    fill("white");
    text("You Lost",displayWidth/2-150,displayHeight/2+200);
    zombieGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();
  }
  else if(gameState=="won"){
    textSize(50);
    fill("white");
    text("You Won",displayWidth/2-150,displayHeight/2+200);
    zombieGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();
  }
  else if(gameState=="bullet"){
    textSize(50);
    fill("white");
    text("You Ran Out Of Bullets",displayWidth/2-150,displayHeight/2+200);
    zombieGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();
  }


}

function spawnZombies(){
  if(frameCount%42===0 && gameState=="fight"){
  zombie=createSprite(random(500,1100),random(300,600), 40,40);
  zombie.addImage(zombieImg);
  zombie.scale=0.2;
  zombie.velocityX=-3;
  zombie.debug=true;
  zombie.setCollider("rectangle",0,0,500,900);
  zombie.lifetime=300
  zombieGroup.add(zombie);
}
}

