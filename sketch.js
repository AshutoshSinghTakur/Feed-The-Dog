var dog,sadDog,happyDog;
var database;
var feed

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  feed= createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95)
  addFood.mousePressed(addFood)
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObj = new Food(50,100);
  lastFed = new Food(100,100);

}

function draw() {
  background(46,139,87);

  fill(255,255,255);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM", 350, 30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM ", 350, 30);
  }else{
    text("Last Feed : "+ lastFed + "AM", 350, 30);
  }

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
  lastFed= data.val();
  })

  foodObj.display();
  lastFed.display();

  drawSprites();
}

//function to read food Stock


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

//function to update food stock
//function feedDog(){
//  dog.addImage(happyDog);
//
//  if(foodObj.getFoodStock()<= 0){
//    foodObh.updateFoodStock(foodObj.getFoodStock()*0);
//  }else{
//    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
//  }
//}

//function to add food in stock
function addfood(){
  foodS++;
  database.ref('/').update({
    Food: foodS
   })
  }