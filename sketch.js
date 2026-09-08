//minute log
let previousMinute = -1;

function setup() {
  //Canvas size
  createCanvas(800, 600);
  
  //Change color mode to HSB
  colorMode(HSB, 360, 100, 100);

  //Change angle mode to degrees
  angleMode(DEGREES);

  //no stroke
  noStroke();
}

function draw() {
  
  //background color
  background(15)

  //get current time
  let h = hour();
  let m = minute();
  let s = second();

  //log the minute when it changes
  if (m !== previousMinute) {
    console.log(m);
    previousMinute = m;
  }
  
//defines center
  let centerX = width / 2;
  let centerY = height / 2;
  
  //convert the current time to seconds
  let totalSeconds = h * 3600 + m * 60 + s;

  //convert time to percentage of the day (12 hour cycle)
  let twelveHourSeconds = 12 * 60 * 60;

  //color resets after 12 hours
  let cycleSeconds = totalSeconds % twelveHourSeconds;

  //Map hours (1-12) to hue (0-360)
  let timeHue = map(cycleSeconds, 0, twelveHourSeconds, 0, 360);

//SECONDS RING
  
  //second ring radius
  let whiteRingRadius = 250;

  //Each section represents 1 second
  let secondSectionAngle = 360 / 60;

  //white ring section fills every second
  for(let i = 0; i < s; i++) {

    //Start angle for filled section
    let startAngle = i * secondSectionAngle - 90;

    //End angle for filled section
    let endAngle = (i + 1) * secondSectionAngle - 90;

    //color of seconds ring
    stroke("white");
    strokeWeight(18);

     //starting point
    let x1 = centerX + cos(startAngle) * whiteRingRadius;
    let y1 = centerY + sin(startAngle) * whiteRingRadius;

    //ending point
    let x2 = centerX + cos(endAngle) * whiteRingRadius;
    let y2 = centerY + sin(endAngle) * whiteRingRadius

    line(x1, y1, x2, y2);
  }

//MINUTES RING
  
  //Minute ring radius
  let minuteRadius = 180;
  
  //Each section represents 1 minute
  let minuteSectionAngle = 360 / 60;

  //Unfilled ring
  for(let i = 0; i < 60; i++){
    
  //Map each section to hue
  let fillHue = map(i, 0, 59, 0, 360);

  //unfilled ring color
   stroke(fillHue, 100, 40); //lower saturation
  strokeWeight(25);
  
    //starting and ending angles
    let startAngle = i * minuteSectionAngle - 90;
    let endAngle = (i + 1) * minuteSectionAngle - 90;
    //starting point
    let x1 = centerX + cos(startAngle) * minuteRadius;
    let y1 = centerY + sin(startAngle) * minuteRadius;

    //ending point
    let x2 = centerX + cos(endAngle) * minuteRadius;
    let y2 = centerY + sin(endAngle) * minuteRadius

    line(x1, y1, x2, y2);  
  }
  
  //ring fills with bright color each minute
  for(let i = 0; i < m; i++) {

    // map section to hue
    let fillHue = map(i, 0, 59, 0, 360);

    //section color
    stroke(fillHue, 100, 100);
    strokeWeight(25);
    
    //starting and ending angles
    let startAngle = i * minuteSectionAngle - 90;
    let endAngle = (i + 1) * minuteSectionAngle - 90;
    //starting point
    let x1 = centerX + cos(startAngle) * minuteRadius;
    let y1 = centerY + sin(startAngle) * minuteRadius;

    //ending point
    let x2 = centerX + cos(endAngle) * minuteRadius;
    let y2 = centerY + sin(endAngle) * minuteRadius

    line(x1, y1, x2, y2);  
  }
  
//HOURS RING
  
  noStroke();
  
  // color changes every hour 
  fill(timeHue, 90, 100);
  circle(400, 300, 200);

// AM/PM CIRCLE
  if(h < 12){
    fill(0); //am white
  }
  else{
   fill(20); //pm black;
  }

  circle(centerX, centerY, 80);
}