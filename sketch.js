let video,video2;
let pointsOld=0;
let points;

let nose;
let eye;
let mouth;
let pumpkin;

let scale;

let first = true;

function preload(){
    pumpkin = loadImage("pumpkin.png");
    eye = loadImage("eye.png");
    nose = loadImage("nose.png");
    mouth = loadImage("mouth.png");
}
function setup(){ 
    // createCanvas(500, 375);
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO); // camera is inverted
    video.size(width,height);
    video.hide(); // we want it to be on the canvas
    //lets hide it

    video2 = createCapture(VIDEO); // camera is inverted
    video2.size(230,129.38);
    video2.hide();

    // Create a new poseNet method
    const poseNet = ml5.poseNet(video, modelLoaded); //callback function
    

    // When the model is loaded
    function modelLoaded() {
        console.log('Model Loaded!');
        // Listen to new 'pose' events (event listener)
        poseNet.on('pose', gotPoses); // 
    }
}

function gotPoses(poses){
    //console.log(poses); // an object of the points;

    //https://www.tensorflow.org/lite/models/pose_estimation/overview
    // reference
    if (poses.length >0){
    
        let eyeR_X = poses[0].pose.keypoints[2].position.x;
        let eyeR_Y = poses[0].pose.keypoints[2].position.y;
        let eyeL_X = poses[0].pose.keypoints[1].position.x;
        let eyeL_Y = poses[0].pose.keypoints[1].position.y;
        scale = dist(eyeR_X,eyeR_Y,eyeL_X,eyeL_Y);
        
        if (first) // only do this the first time
        {
            pointsOld = poses;
            points= poses;
            first = false;
        }
        else {
            pointsOld = points;
            points= poses;
        }
    }

}

function draw(){ // loops
    background(220);
    image(video2,0,0); // draw our video on the corner
    
    if (points){ // as long as points isn't empty
        drawLegL();
        drawLegR();
        drawArmR();
        drawArmL();    
        drawBody();
        drawFace();  
    }

}

function drawBody(){
    fill(0);
    beginShape();
    vertex(lerping(5,"x"),lerping(5,"y"));
    vertex(lerping(6,"x"),lerping(6,"y"));
    vertex(lerping(12,"x"),lerping(12,"y"));
    vertex(lerping(11,"x"),lerping(11,"y"));
    endShape(CLOSE);
}

function drawFace(){
    let noseX = lerping(0,"x");
    let noseY = lerping(0,"y");
    let eyeR_X = lerping(2,"x");
    let eyeR_Y = lerping(2,"y");
    let eyeL_X = lerping(1,"x");
    let eyeL_Y = lerping(1,"y");

    push();
    imageMode(CENTER);
    image(pumpkin,noseX,noseY-scale/1.3,scale*4,scale*4);
    image(nose,noseX,noseY-scale/2,scale/1.5,scale/1.5);
    image(eye,eyeL_X,eyeL_Y-scale/1.3,scale/1.4,scale/1.4);
    image(eye, eyeR_X,eyeR_Y-scale/1.3,scale/1.4,scale/1.4);
    image(mouth, noseX,noseY+scale/2.5,scale/0.5,scale/1.4);
    pop();

}

function lerping(keypoint, pos){ // smooth out noise
    if (pos === "x"){
        return lerp(pointsOld[0].pose.keypoints[keypoint].position.x, points[0].pose.keypoints[keypoint].position.x, 0.5)
    }
    else {
        return lerp(pointsOld[0].pose.keypoints[keypoint].position.y, points[0].pose.keypoints[keypoint].position.y, 0.5)
    }
}

function drawArmR(){
    strokeWeight(scale/1.3);
    stroke(0);
    // top of arm
    line(lerping(6,"x"), lerping(6,"y"), lerping(8,"x"), lerping(8,"y"));
    point(lerping(8,"x"), lerping(8,"y"));
    // bottom of arm
    line(lerping(8,"x"), lerping(8,"y"), lerping(10,"x"), lerping(10,"y"));
}

function drawArmL(){
    strokeWeight(scale/1.3);
    stroke(0);
    // top of arm
    line(lerping(5,"x"), lerping(5,"y"), lerping(7,"x"), lerping(7,"y"));
    point(lerping(7,"x"), lerping(7,"y"));
    // bottom of arm
    line(lerping(7,"x"), lerping(7,"y"), lerping(9,"x"), lerping(9,"y"));
}

function drawLegL(){
    strokeWeight(scale/1.3);
    stroke(0);
    // top of leg
    line(lerping(11,"x"), lerping(11,"y"), lerping(13,"x"), lerping(13,"y"));
    point(lerping(13,"x"), lerping(13,"y"));
    // bottom of leg
    line(lerping(13,"x"), lerping(13,"y"), lerping(15,"x"), lerping(15,"y"));
}

function drawLegR(){
    strokeWeight(scale/1.3);
    stroke(0);
    // top of leg
    line(lerping(12,"x"), lerping(12,"y"), lerping(14,"x"), lerping(14,"y"));
    point(lerping(14,"x"), lerping(14,"y"));
    // bottom of leg
    line(lerping(14,"x"), lerping(14,"y"), lerping(16,"x"), lerping(16,"y"));
}