img="";
status="";
objects=[];
song="";
function preload(){
    img=loadImage("dog_cat.jpg");
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide(); 
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}
function modelLoaded(){
    console.log("modelLoaded");
    status=true;
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(video,0,0,380,380);
r=random(255);
g=random(255);
b=random(255);
objectDetector.detect(video,gotResult);
    if (status!=""){
for(i=0;i<objects.length;i++){
    document.getElementById("status").innerHTML="status: objects detected";
    document.getElementById("number_of_objects").innerHTML="number of objects detected-"+objects.length;
    fill(r,g,b);
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    if (objects[i]=="person"){
        song.play();
    }
}
    }
}