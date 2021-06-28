video="";
status="";
objects=[];

function preload(){
    video=createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas=createCanvas(380,300);
    canvas.center();
}

function draw(){
    image(video,0,0,380,300);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status:Objects detected!";
            document.getElementById("no_objects").innerHTML="No. of objects detcted: "+objects.length;

            fill("#C1292E");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x, objects[i].y);
            noFill();
            stroke("#C1292E");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function gotResult(error,results){
if(error){
    console.log(error);
}
console.log(results);
objects=results;
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modeloaded);
   document.getElementById("status").innerHTML="Status:Detcting Objects";
}

function modeloaded(){
    console.log("Model loaded!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume();
}