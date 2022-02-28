img = "";
status = "";
objects = [];

function navi(){
    window.location="index.html";
}

function preload(){
    img = loadImage("tv.jpg");
}

function setup(){
    canvas = createCanvas(500, 300);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(img, 0, 0, 600, 480)
    if(status != ""){
        for(i = 0;i < objects.length; i++){
            fill("#FF0000");
            percent =floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x , objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}