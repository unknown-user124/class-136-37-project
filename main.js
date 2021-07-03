video="";
object="";



function preload() {
    video=createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.position(400 , 310);
   
    
}


function draw() {
    image(video , 0 ,0,480,380);
    if (status !="") {
        objectDetector.detect(video,gotResult);
    for(i=0; i<object.length; i++) {
        document.getElementById("h2tagstatus").innerHTML="Status : Objects Detected ";
        document.getElementById("h2tagnob").innerHTML=" Number of Objects Detected are : "+object.length;
        fill("#FF0000");
        percent=floor(object[i].confidence * 100);
        text(object[i].label + "" + percent+"%",object[i].x+15 , object[i].y + 15 );
        noFill();
        stroke("#FF0000");
        rect(object[i].x , object[i].y , object[i].width , object[i].height);
        if (object[i].label==objectname) {
            video.stop();
            objectDetector.detect(video,gotResult);
            document.getElementById("h2tagstatus1").innerHTML=objectname+" Object Found";
            
        } else {
            document.getElementById("h2tagstatus1").innerHTML=objectname+" Object Not Found";
        }

    }
    }
    }


function start() {
    objectDetector=ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("h2tagstatus").innerHTML="Status : Detecting Objects";
    objectname=document.getElementById("input1").value
}

function modelLoaded() {
    console.log("Model Loaded!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error,results) {
 if (error) {
     console.log(error);
     
 }
 console.log(results);
 object=results;
}