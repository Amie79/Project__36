//Create variables here
var dog,happydog,database,foodS,foodStock,dog_img,happydog_img,bottles,foodObj,fedTime,lastFed;
function preload()
{
  //load images here
  
  dog_img=loadImage("images/dogImg.png");
  happydog_img=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1000, 500);
  dog=createSprite(800,250,50,40);
  dog.addImage(dog_img);
  dog.scale=0.30;
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
 // bottles=20;

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
  
    lastFed=data.val();
  });

  feed=createButton("Feed the cute doggie");
  feed.position(600,100);
  feed.mousePressed(feedDog);

  addfood=createButton("AddTheFood");
  addfood.position(800,100);
  addfood.mousePressed(addFoods);

  foodObj=new Food();
}


function draw() {  
background(46,139,87);


foodObj.display();
  drawSprites();
  //add styles here

  fill(255,255,254);
  textSize(15);
  
}
function readStock(data){
  foodS = data.val();
  foodobject.updateFoodStock(foodS); 
}
function writeStock(bottles){
  if(bottles<1){
    bottles=0;
  }else{
    bottles=bottles-1;
  }
 database.ref('/').update({
  Food: bottles
})
}


function feedDog(){
  dog.addImage(happydog_img);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  console.log("adding food");
  database.ref('/').update({
    Food: foodS
  })
}

