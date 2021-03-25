var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  racer1 = loadImage("images/opponent1.png");
    racer2 = loadImage("images/opponent4.png");
    racer3 = loadImage("opponent7.png");
  bell = loadSound("sound/bell.mp3");
  GAMEOVER = loadImage("gameOver.png");
  RESTART = loadImage("restart.png");
  lost = loadSound("mixkit-sad-game-over-trombone-471.wav")
}

function setup()
{
  
createCanvas(800,500);
   OpponentA  = new Group();
  OpponentB = new Group();
  OpponentC = new Group();
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);


//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.addAnimation("SahilFall",mainRacerImg2);
mainCyclist.scale=0.07;
  
  GameOver = createSprite(350,200,10,10);
  GameOver.scale = 1.7;
  GameOver.addImage("k",GAMEOVER);
  
  Restart = createSprite(350,350,10,10);
  Restart.addImage("l",RESTART);
  Restart.scale = 0.3;
}

function draw() 
{
  background(0);
  
 
  if(gameState===PLAY)
  {
    GameOver.visible = false;
    Restart.visible = false;
    path.velocityX = -8;
    mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
  distance = distance + Math.round(getFrameRate()/50);
    
    mainCyclist.y = World.mouseY;
   
    if(path.x < 0 )
  {
    path.x = width/2;
  }
    
    if(frameCount%100===0)
      {
        Opp();
      }
    
     if(frameCount%250===0)
      {
        Opp2();
      }
    
     if(frameCount%320===0)
      {
        Opp3();
      }   
    
    if(OpponentA.isTouching(mainCyclist))
    {
        mainCyclist.changeAnimation("SahilFall",mainRacerImg2);
      lost.play();
      gameState = END;
    }
    
    if(OpponentB.isTouching(mainCyclist))
    {
        mainCyclist.changeAnimation("SahilFall",mainRacerImg2);
      lost.play();
       gameState = END;
    }
    
    if(OpponentC.isTouching(mainCyclist))
    {
        mainCyclist.changeAnimation("SahilFall",mainRacerImg2);
      lost.play();
       gameState = END;
    }
   
    
    if(distance%100===0)
      {
        bell.play();
      }
    
    if(distance >= 200)
      {
        path.velocityX = -10;
        OpponentA.setVelocityXEach(-10);
        OpponentB.setVelocityXEach(-10);
        OpponentC.setVelocityXEach(-10);
      }
    
    if(distance >= 500)
      {
        path.velocityX = -12;
        OpponentA.setVelocityXEach(-15);
        OpponentB.setVelocityXEach(-15);
        OpponentC.setVelocityXEach(-15);
      }
    
    if(distance >= 700)
      {
        path.velocityX = -20;
        OpponentA.setVelocityXEach(-20);
        OpponentB.setVelocityXEach(-20);
        OpponentC.setVelocityXEach(-20);
      }
 }
  
  else if( gameState === END)
    {
        path.velocityX = 0;
      OpponentA.destroyEach();
      OpponentB.destroyEach();
      OpponentC.destroyEach();
      OpponentA.setLifetimeEach(-1);
         OpponentB.setLifetimeEach(-1);
         OpponentC.setLifetimeEach(-1);
      
       GameOver.visible = true;
      Restart.visible = true;
      
      if(mousePressedOver(Restart))
        {
          distance = 0;
         gameState = PLAY;
        }
    }
  
   drawSprites();
  textSize(20);
  fill("yellow");
  text("Distance: "+ distance,350,30);
  
  }

function Opp()
{
  Opponent1 = createSprite(800,0,10,10);
  Opponent1.addAnimation("a",racer1);
   Opponent1.y = Math.round(random(10,490));
  Opponent1.velocityX = -5;
   Opponent1.scale = 0.06;
   Opponent1.lifetime = 200;
  OpponentA.add(Opponent1);

}

function Opp2()
{
  Opponent2 = createSprite(800,0,10,10);
  Opponent2.addAnimation("b",racer2);
   Opponent2.y = Math.round(random(10,490));
  Opponent2.velocityX = -5;
   Opponent2.scale = 0.06;
   Opponent2.lifetime = 200;
  OpponentB.add(Opponent2);
}


function Opp3()
{
  Opponent3 = createSprite(800,0,10,10);
  Opponent3.addAnimation("c",racer3);
   Opponent3.y = Math.round(random(10,490));
  Opponent3.velocityX = -5;
   Opponent3.scale = 0.06;
   Opponent3.lifetime = 200;
  OpponentC.add(Opponent3);
}



