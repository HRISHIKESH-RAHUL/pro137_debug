input="";
video="";
Status = "";
objects="";
SpeechRecognition = window.webkitSpeechRecognition ;

function setup(){
canvas = createCanvas(480,380);
canvas.center();
video=createCapture(VIDEO);
video.hide();

}

function start(){
    objectDetector=ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    input=document.getElementById("obj_input").value;
    console.log(input);
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status=true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
    console.log(results);
    objects=results;
    }
}

function speak(){
    synth = window.speechSynthesis ;
   speak_data = "Object Detcted " ;
    utterThis = new SpeechSynthesisUtterance(speak_data) ;
    synth.speak(utterThis);
}

function draw(){
    image(video , 0 , 0 , 480 , 380);
    if(Status !=""){
        objectDetector.detect(video , gotResult);
        for(i=0; i<objects.length ; i++){
            if(results=input){
            document.getElementById("status").innerHTML="Status : Object Detected";
            console.log("Object Detected");
            speak();
            }
            else{
                document.getElementById("status").innerHTML="Status : Object Not Detected";
                console.log("Object Not Detected");  
            }
            document.getElementById("no_obj").innerHTML="Number Of Objects Detected = "+objects.length;
            r=Math.random()*255;
            g=Math.random()*255;
            b=Math.random()*255;
            fill(r,g,b)
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);


        }
    }
    }
    

