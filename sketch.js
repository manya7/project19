var back,ballImg,paddleImg,ground,player,playerImg;
var banana,bananaImg;
var obstacle,obstacleImg;
var survivalTime=0;
var obstaclesGroup;
var bananaGroup;

function preload() {
ballImg=loadImage("jungle.jpg");
  playerImg=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
   bananaImg=loadImage("banana.png");
  obstacleImg=loadImage("stone.png");
  
}
function setup() {
  createCanvas(400, 400);
  back=createSprite(200,200,10,10)
    back.addImage(ballImg,"jungle.jpg");
  back.velocityX=-7;
  
   player=createSprite(100,290,20,50);
player.addAnimation("monkey",playerImg);
player.scale=0.1;
  
  ground=createSprite(400,350,800,10);
ground.velocityX=-4;
ground.visible=false;
   ground.x=ground.width/2;
  
   obstaclesGroup = new Group();
    bananaGroup = new Group();
  
  


  
  back.x =back.width/2;

}

function draw() {
  background(205,153,0);
  if (back.x < 0) {
  back.x =back.width/2;
}
  if (ground.x < 0) {
  ground.x =ground.width/2;
}
  
  
  if (keyDown("space")&&player.y >=270) {
  player.velocityY=-13;
}
player.velocityY=player.velocityY+0.5;
  
  if(bananaGroup.isTouching(player)){
      survivalTime=survivalTime+2;
    bananaGroup.destroyEach();
  }
  food();
  
  if(obstaclesGroup.isTouching(player)){
      survivalTime=0;
bananaGroup.lifetime=-1;
    obstaclesGroup.lifetime=-1;
    back.velocityX=0;
    bananaGroup.velocityX=0;
  
    
  }
  
   
    switch(survivalTime){
        
      case 10:player.scale=0.12;
        break;
         case 20:player.scale=0.14;
        break;
         case 30:player.scale=0.16;
        break;
         case 40:player.scale=0.18;
        break;
         case 50 :player.scale=0.20;
        break;
         case 60 :player.scale=0.22;
        break;
        default:break;
        
    } 


  SpawnObstacle();
  
  player.collide(ground);
  player.collide(ground);
  survivalTime.depth=back.depth+1;
  
  drawSprites ();
  stroke("black");
textSize(20);
fill("black");
survivalTime=Math.ceil(frameCount/frameRate());
text("surviavl Time:"+survivalTime,100,50);
  
}
function food(){      
if (frameCount%80===0) {
   var banana=createSprite(400,random(120,200),20,20);
   banana.addAnimation( "Banana",bananaImg);
   banana.scale=0.05;
   banana.velocityX=-2;
   banana.lifetime=300;
     bananaGroup.add(banana);
 banana.lifetime = 300; player.depth = banana.depth + 1;

}
}

function SpawnObstacle(){      
if (frameCount%100===0) {
   var obstacle=createSprite(400,329,20,20);
  obstacle.addAnimation("Stone",obstacleImg);
   obstacle.scale=0.1;
  obstacle.velocityX=-2;
  obstacle.lifetime=200;
   obstaclesGroup.add(obstacle);
  }
}
