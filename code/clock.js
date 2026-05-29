const torusScreen = document.getElementById("torusScreen");
const rippleScreen = document.getElementById("rippleScreen");
const ballScreen = document.getElementById("ballScreen");
const coralScreen = document.getElementById("coralScreen");
const clockScreen = document.getElementById("clockface");
const smokeScreen = document.getElementById("smokeScreen");

const pixelsX = 50;
const pixelsY = 105;

// Source - https://stackoverflow.com/a/74186686
// Posted by chungaloider
// Retrieved 2026-05-22, License - CC BY-SA 4.0

// const charbrightness = [0, 0.0751, 0.0829, 0.0848, 0.1227, 0.1403, 0.1559, 0.185, 0.2183, 0.2417, 0.2571, 0.2852, 0.2902, 0.2919, 0.3099, 0.3192, 0.3232, 0.3294, 0.3384, 0.3609, 0.3619, 0.3667, 0.3737, 0.3747, 0.3838, 0.3921, 0.396, 0.3984, 0.3993, 0.4075, 0.4091, 0.4101, 0.42, 0.423, 0.4247, 0.4274, 0.4293, 0.4328, 0.4382, 0.4385, 0.442, 0.4473, 0.4477, 0.4503, 0.4562, 0.458, 0.461, 0.4638, 0.4667, 0.4686, 0.4693, 0.4703, 0.4833, 0.4881, 0.4944, 0.4953, 0.4992, 0.5509, 0.5567, 0.5569, 0.5591, 0.5602, 0.5602, 0.565, 0.5776, 0.5777, 0.5818, 0.587, 0.5972, 0.5999, 0.6043, 0.6049, 0.6093, 0.6099, 0.6465, 0.6561, 0.6595, 0.6631, 0.6714, 0.6759, 0.6809, 0.6816, 0.6925, 0.7039, 0.7086, 0.7235, 0.7302, 0.7332, 0.7602, 0.7834, 0.8037, 0.9999]
const chars = " czj@";
const charbrightness = [0,0.3,0.35,0.5,0.9999];

function realToChar(real){
  if (real < 0){
    real = 0;
  }
  if (real > 0.999){
    real = 0.999;
  }
  for (let i=0; i < charbrightness.length; i++){
    if (real <= charbrightness[i]){
      return [chars[i], charbrightness[i] - real];
    } 
  }
  return ["?",0];
}

function compress(image){
  out = [[]];
  for (let i=0; i<pixelsX; i++){
    out[i] = [];
    for (let j=0; j<pixelsY; j++){
      let t=0;
      let s=0;
      for (let k=Math.floor(image.length * i / pixelsX); k < Math.floor(image.length * (i+1) / pixelsX); k++){
        for (let l=Math.floor(image[0].length * j / pixelsY); l < Math.floor(image[0].length * (j+1) / pixelsY); l++){
          t += image[k][l];
          s += 1;
        }
      }
      out[i][j] = t / s;
    }
  }
  return out;
}

const ditherKernel = [[1,0,7/16], 
                      [-1,1,3/16], 
                      [0,1,5/16], 
                      [1,1,1/16]];

function displayChars(screen, image, dither=true) {
  screen.textContent = "";
  for (let i = 0; i< image.length; i++){
    let displayline = "";
    for (let j = 0; j< image[i].length; j++){
      displayline += realToChar(image[i][j])[0];
      // displayline += realToChar(image[i][j])[0];
      if (dither==true){      
        let error = realToChar(image[i][j])[1];
        for (let k = 0; k < ditherKernel.length; k++){
          let a = ditherKernel[k][0];
          let b = ditherKernel[k][1];
          if (i+a >= 0 && i+a < image.length && j+b >= 0 && j+b < image[0].length){
            image[i+a][j+b] -= error*ditherKernel[k][2];
          }
        }
      }
    }
    screen.textContent += displayline + '\r\n';
  }
}

// ANIMATION STUFF

let torusMoveInterval = null;
let rippleMoveInterval = null;
let ballMoveInterval = null;
let coralMoveInterval = null;
// let brownianMoveInterval = null;

// TORUS

const outer = 30;
const inner = 10;
samples = 70;

function inTorus(torusN,outer,inner,x,y,z){
  let a = torusN[0];
  let b = torusN[1];
  let c = torusN[2];
  return outer**2 + x**2 + y**2 + z**2 - 2*outer*((x**2+y**2+z**2)-(a*x+b*y+c*z)**2)**0.5 <= inner**2;
}

function torusNormal(torusN,outer,inner,x,y,z){
  let a = torusN[0];
  let b = torusN[1];
  let c = torusN[2];
  if ((a*x+b*y + c*z)**2 >= x**2+y**2+z**2){
    let n = [outer*(-2*x + 2*a**2*x-2*a*(b*y+c*z)),
            outer*(-2*x + 2*b**2*y-2*b*(a*x+c*z)),
            outer*(-2*x + 2*c**2*c-2*b*(a*x+b*y))];
    let nmag = (n[0]**2 + n[1]**2 + n[2]**2)**0.5;
    return [n[0]/nmag,n[1]/nmag,n[2]/nmag];
  } else {
    let n = [
      2*x - (outer*(2*x - 2*a**2*x-2*a*(b*y+c*z)))/((x**2+y**2+z**2 - (a*x+b*y+c*z)**2)**0.5),
      2*y - (outer*(2*y - 2*b**2*y-2*b*(a*x+c*z)))/((x**2+y**2+z**2 - (a*x+b*y+c*z)**2)**0.5),
      2*z - (outer*(2*z - 2*c**2*x-2*c*(b*y+a*x)))/((x**2+y**2+z**2 - (a*x+b*y+c*z)**2)**0.5),
    ];
    let nmag = (n[0]**2 + n[1]**2 + n[2]**2)**0.5;
    return [n[0]/nmag,n[1]/nmag,n[2]/nmag];
  }
}

function showTorus(screen,torusN,lightDirection){
  let diffuse = 0.5;
  let specular = 0.66;
  let shininess = 0.1;
  let ambient = 0.15; 
  let frameSize = 100;
  const img = [];
  for (let i=0; i <= pixelsX; i++){
    img[i] = [];
    for (let j=0; j<= pixelsY; j++){
      let x = i * frameSize / pixelsX - frameSize / 2;
      let y = j * frameSize / pixelsY - frameSize / 2;
      let found = false;
      for (let k = 0; k<= samples; k++){
        let z = k * frameSize / samples - frameSize / 2;
        if (inTorus(torusN,outer,inner,x,y,z)){
          let n = torusNormal(torusN,outer,inner,x,y,z);
          let m = (lightDirection[0]*n[0]+lightDirection[1]*n[1] + lightDirection[2]*n[2]);
          let difLight = diffuse*m;
          let refDirection = [n[0]*2*m - lightDirection[0],
                              n[1]*2*m - lightDirection[1],
                              n[2]*2*m - lightDirection[2]];
          let specLight = specular*Math.max(refDirection[2],0)**shininess; 
          let phong = 1- difLight - specLight - ambient;
          img[i][j] = phong;
          found = true;
          break;
        }
      } 
      if (found){
        continue;
      } else {
        img[i][j] = 1;
      }
    }
  }
  displayChars(screen,img,dither=true);
}

let tTorus=0;

let light = [2,0,1];
let lightR = (light[0]**2 + light[1]**2 + light[2]**2)**0.5;
let lightDirection = [light[0]/lightR,light[1]/lightR,light[2]/lightR];

function torusMove(){
  movingN = [Math.sin(tTorus/7)*Math.sin(tTorus),Math.cos(tTorus/7)*Math.sin(tTorus),Math.cos(tTorus)];
  showTorus(torusScreen,movingN,lightDirection);
  tTorus += 0.07; 
}

torusScreen.onmouseover = function() {
  torusMoveInterval = setInterval(torusMove,50);
}

torusScreen.onmouseout = function() {
  clearInterval(torusMoveInterval);
}

//RIPPLE

let tRipple=0;

const source1X = -30;
const source1Y = 40;
const source2X = 30;
const source2Y = -25;

function rippleMove(){
  const img = [];
  for (let i=0; i <= pixelsX; i++){
    img[i] = [];
    for (let j=0; j<= pixelsY; j++){
      let frameSize = 100;
      let x = i * frameSize / pixelsX - frameSize / 2;
      let y = j * frameSize / pixelsY - frameSize / 2;
      let r1 = ((x - source1X)**2 + (y-source1Y)**2)**0.5;
      let r2 = ((x - source2X)**2 + (y-source2Y)**2)**0.5;
      img[i][j] = 0.25*(2+Math.sin(r1-tRipple) + Math.sin(r2-tRipple));
    }
  }
  tRipple += 0.07;
  displayChars(rippleScreen,img);
}

rippleScreen.onmouseover = function() {
  rippleMoveInterval = setInterval(rippleMove,50);
}

rippleScreen.onmouseout = function() {
  clearInterval(rippleMoveInterval);
}

//BALL

const centerX = 50;
const centerY = 50;
const centerZ = 0;
const radius = 35;

function showBall(screen, lightDirection){
  let diffuse = 0.3;
  let specular = 0.66;
  let shininess = 0.5;
  let ambient = 0.15; 
  let frameSize = 100;
  const img = [];
  for (let i=0; i <= pixelsX; i++){
    img[i] = [];
    for (let j=0; j<= pixelsY; j++){
      let x = i * frameSize / pixelsX;
      let y = j * frameSize / pixelsY;
      if ((x-centerX)**2 + (y-centerY)**2 > radius**2){
        img[i][j]= 1;
      } else {
        let z = (radius**2 - (x-centerX)**2 - (y-centerY)**2)**0.5;
        let n = [(x-centerX)/radius,(y-centerY)/radius,(z - centerZ)/radius];
        let m = (lightDirection[0]*n[0]+lightDirection[1]*n[1] + lightDirection[2]*n[2]);
        let difLight = diffuse*m;
        let refDirection = [n[0]*2*m - lightDirection[0],
                            n[1]*2*m - lightDirection[1],
                            n[2]*2*m - lightDirection[2]];
        let specLight = specular*Math.max(refDirection[2],0)**shininess; 
        let phong = 1- difLight - specLight - ambient;
        img[i][j] = phong;
      }
    }
  }
  displayChars(screen,img,dither=true);
}

let tBall = 0;

function ballMove(){
  movingLight = [Math.sin(tBall/7)*Math.sin(tBall),Math.cos(tBall/7)*Math.sin(tBall),Math.cos(tBall)];
  showBall(ballScreen,movingLight);
  tBall += 0.07; 
}

ballScreen.onmouseover = function() {
  ballMoveInterval = setInterval(ballMove,50);
}

ballScreen.onmouseout = function() {
  clearInterval(ballMoveInterval);
}

// CORAL

const floorlevel = 3;
const stepsize = 2;
const stickdistX = 1;
const stickdistY = 2;
const clustermin = 1;

let coralimg = [];

for (let i=0; i<pixelsX; i++){
  coralimg[i] = [];
  for (let j=0; j<pixelsY + 1; j++){
    if (pixelsX - i <= floorlevel){
      coralimg[i][j] = 1;
    } else {
      coralimg[i][j] = 0;
    }
  }
}

let fallingXY = null;
let toppedout = false;

function coralShow(){
  let imgtemp = [[]];
  for (let i=0; i<pixelsX; i++){
    imgtemp[i] = coralimg[i].slice();
  }

  if (fallingXY != null){
    let fX = fallingXY[0];
    let fY = fallingXY[1];
    imgtemp[fX][fY] = 1;
  }
  displayChars(coralScreen,imgtemp,dither=false);
}

function coralSettle(){
  let fX = fallingXY[0];
  let fY = fallingXY[1];
  let clustersize = 0;
  for (let i=0; i < stickdistX +1; i++){
    for (let j=-1*stickdistY; j<stickdistY +1; j++){
      if (coralimg[fX + i][(fY + j) % pixelsY] == 1) {
        clustersize += 1;
      }
    }
  }
  if (clustersize >= clustermin){
    return true;
  }
  return false;
}

function coralMove(){
  if (toppedout == false){
    if (fallingXY === null){
      let fX = 0;
      let fY = Math.floor(Math.random() * pixelsY);
      fallingXY = [fX,fY];
    } else if (coralSettle() === true){
      let fX = fallingXY[0];
      let fY = fallingXY[1];
      coralimg[fX][fY] = 1;
      if (fX <= 1){
        toppedout = true;
      }
      fallingXY = null;
    } else {
      let fX = fallingXY[0];
      let fY = fallingXY[1];
      let step = Math.floor(Math.random()*2*stepsize) - stepsize;
      fallingXY = [fX + 1, (fY + step + pixelsY) % pixelsY];
    }
  }
  coralShow();
}

coralScreen.onmouseover = function() {
  coralMoveInterval = setInterval(coralMove,5);
}

coralScreen.onmouseout = function() {
  clearInterval(coralMoveInterval);
}

// CLOCK

function textToArray(text) {
  let out = [[]];
  for(let i=0; i< text.length; i++){
    if (text[i] == '\n'){
      out.push([]);
    } else if (text[i] == ' '){
      let last = out.length - 1;
      out[last].push(0);
    } else if (text[i] == '\t'){
      let last = out.length - 1;
      out[last].push(0);
      out[last].push(0);
      out[last].push(0);
      out[last].push(0);
    } else if (text[i] == '\r'){
    } else if (text[i] == '@'){
      let last = out.length - 1;
      out[last].push(1);
    }
  }
  return out;
}

// the ascii of the clock face
let clocktext = "                                             @@@@@@@@@@@@@@@                                              \n                                               @   @  @  @                                                \n                        @@@@@@@@@@@@            @ @   @  @              @@@@@                             \n                          @   @  @               @    @  @                @                               \n                           @ @   @              @ @   @  @                @                               \n                            @    @             @   @  @  @                @                               \n                           @ @   @           @@@@@@@@@@@@@@@              @                               \n                          @   @  @                                        @                               \n                        @@@@@@@@@@@@								    @@@@@                             \n                                                                                                          \n        @@@@@@@@@                                                                       @@@@@@@@          \n          @   @                                                                           @  @            \n           @ @                                                                            @  @            \n            @                                                                             @  @            \n           @ @                                                                            @  @            \n          @   @                                                                           @  @            \n        @@@@@@@@@                                                                       @@@@@@@@          \n                                                                                                          \n                                                                                                          \n                                                                                                          \n                                                                                                          \n@@@@@@@@@@@                                                                                     @@@@@@@@@ \n  @ @   @                                                                                         @ @ @   \n  @  @ @                                                                                          @ @ @   \n  @   @                                                                                           @ @ @   \n  @  @ @                                                                                          @ @ @   \n  @ @   @                                                                                         @ @ @   \n@@@@@@@@@@@                                                                                     @@@@@@@@@ \n                                                                                                          \n                                                                                                          \n                                                                                                          \n                                                                                                          \n     @@@@@@@@@@@@@@@@                                                                 @@@@@@@@@@@@        \n       @   @  @ @ @                                                                     @  @   @          \n       @   @  @ @ @                                                                     @  @   @          \n       @   @  @ @ @                                                                     @  @   @          \n        @ @   @ @ @                                                                     @   @ @           \n         @    @ @ @                                                                     @    @            \n     @@@@@@@@@@@@@@@@                                                                 @@@@@@@@@@@@        \n                                                                                                          \n                       @@@@@@@@@@@@@@                                @@@@@@@@@@@                          \n                         @   @  @ @                                    @     @                            \n                         @   @  @ @                                    @     @                            \n                         @   @  @ @           @@@@@@@@@@@@              @   @                             \n                          @ @   @ @             @   @  @                 @ @                              \n                           @    @ @             @   @  @                  @                               \n                       @@@@@@@@@@@@@@           @   @  @             @@@@@@@@@@@                          \n                                                 @ @   @                                                  \n                                                  @    @                                                  \n                                              @@@@@@@@@@@@                                                "

async function showClock() {
  // const file = await fetch('./code/clockface.txt');
  // const text = await file.text();
  let clockimg = textToArray(clocktext);

  const date = new Date();
  const hour = date.getHours() % 12;
  const minute = date.getMinutes();
  const second = date.getSeconds();

  let lHour = 9;
  let lMinute = 12;
  let lSecond = 13; 
  for (let i=0; i<pixelsX; i++){
    for (let j=0; j<pixelsY; j++){
      let frameSize = 50;
      let hourShade = 0;
      let minShade = 0;
      let detail = 3;
      for (let d=0; d<detail; d++){
        for (let e=0; e<detail; e++){
          let x = (i+d/(detail) - 1/2) * frameSize / pixelsX - frameSize / 2;
          let y = (j+e/(detail) - 1/2) * frameSize / pixelsY - frameSize / 2;
          let hourAngle = (3/4)*Math.PI - (hour + minute/60) * Math.PI/6;
          let minuteAngle = (3/4)*Math.PI - (minute) * Math.PI/30;
          let xHour = x*Math.cos(hourAngle) + y*Math.sin(hourAngle);
          let yHour = -1*x*Math.sin(hourAngle) + y*Math.cos(hourAngle);
          if ((lHour/(lHour - 1.2))*(xHour-1.2) <= yHour && (lHour/(lHour - 1.2))*(yHour-1.2) <= xHour && (2)*(xHour+1) >= yHour && 2*(yHour+1) >= xHour){
            hourShade += 1/detail**2;
          }
          let xMinute = x*Math.cos(minuteAngle) + y*Math.sin(minuteAngle);
          let yMinute = -1*x*Math.sin(minuteAngle) + y*Math.cos(minuteAngle);
          if ((lMinute/(lMinute - 1.2))*(xMinute-1.2) <= yMinute && (lMinute/(lMinute - 1.2))*(yMinute-1.2) <= xMinute && (2)*(xMinute+1) >= yMinute && 2*(yMinute+1) >= xMinute){
            minShade += 1/detail**2;
          }
        }
      }
      if(hourShade > 0 || minShade > 0){
        clockimg[i][j] = Math.max(hourShade,minShade);
      }
    }
  }
  displayChars(clockScreen,clockimg,dither=true);
}

// BROWNIAN

let bRadius = 30;
let bPos = [0,0];
let bVel = [20,0];

function showBrownian(){
  let frameSize = 300;
  let brownimg = [];
  for (let x=0; x<frameSize; x++){
    brownimg[x] = [];
    for (let y=0; y<frameSize + 1; y++){
      if (((x-bPos[0]) % frameSize)**2 + ((y-bPos[1]) % frameSize)**2 <= bRadius**2){
        brownimg[x][y] = 1;
      } else {
        brownimg[x][y]=0;
      }
    }
  }
  let brownimg_compressed = compress(brownimg);
  displayChars(brownianScreen,brownimg_compressed);
}

let turnIncrement = Math.PI/18; // 10 deg

function brownianMove(){
  let frameSize=300;
  bPos[0] = (bPos[0] + bVel[0] + frameSize) % frameSize;
  bPos[1] = (bPos[1] + bVel[1] + frameSize) % frameSize;

  let turnAmount = Math.floor(Math.random() * 5) - 2;
  let turn = turnIncrement * turnAmount;
  bVel = [Math.cos(turn)*bVel[0] + Math.sin(turn)*bVel[1],
          -1*Math.sin(turn)*bVel[0] + Math.cos(turn)*bVel[1]];
  showBrownian();
}

// brownianScreen.onmouseover = function() {
//   brownianMoveInterval = setInterval(brownianMove,50);
// }

// brownianScreen.onmouseout = function() {
//   clearInterval(brownianMoveInterval);
// }

// SMOKE

let particles = [];
let smokeFrameX = 100;
let smokeFrameY = 100;

// each particle is a list of the form [position, velocity, vorticity]

let gridX = pixelsX;
let gridY = pixelsY;
let dX = smokeFrameX/gridX;
let dY = smokeFrameY/gridY;
let grid = [];

//each position in the grid has its own velocity and vorticity. Initially all are 0:

for (let i=0; i<gridX; i++){
  grid[i] = [];
  for (let j=0; j<gridY; j++){
    grid[i][j] = [[smokeFrameX * i/gridX, smokeFrameY * j/gridY],[0,0],0];
  }
}

let particlesPerPixel = 3;

function smokeShow(){
  let smokeimg = [];
  for (let i=0; i<pixelsX; i++){
    smokeimg[i] = [];
    for (let j=0; i<pixelsY; j++){
      smokeimg[i][j] = 0;
    }
  }
  for (let i=0; i<particles.length; i++){
    let p = particles[i];
    let pX = p[0][0];
    let pY = p[0][1];
    smokeimg[Math.floor(pX * pixelsX/gridX)][Math.floor(pY*pixelsY/gridY)] += 1/particlesPerPixel;
  }
  displayChars(smokeScreen,smokeimg, dither=true);
}

function smokeMove() {
  // add new particles (just one for now)
  let newdir = Math.random()* 2 * Math.PI;
  let p = [[smokeFrameX / 2, smokeFrameY/2],[Math.cos(newdir),Math.sin(newdir)],0];
  particles.push(p);
  // particle vor -> update grid vor
  for (i=0; i<particles.length; i++){
    let p = particles[i];
    let pX = p[0][0];
    let pY = p[0][1];
    let a = Math.floor(gridX * pX/smokeFrameX);
    let b = Math.floor(gridY * pY / smokeFrameY);
    grid[a][b][2] += p[2]*(a+1 - pX)*(b+1-pY)/(dX*dY); 
    grid[a+1][b][2] += p[2]*(pX)*(b+1-pY)/(dX*dY); 
    grid[a][b+1][2] += p[2]*(a+1 - pX)*(pY)/(dX*dY); 
    grid[a+1][b+1][2] += p[2]*(pX)*(pY)/(dX*dY); 
  }
  // grid vor -> update grid vel
  let psi = [];
  for (let i=0; i<gridX; i++){
    psi[i] = [];
    for (let j=0; j<gridY; j++){
      psi[i][j] = 1; // RETURN TO WORK HERE
    }
  }
  // grid vel -> update particle vel 
  // particle vel -> update particle pos
  // show smoke
  smokeShow();
}

window.onload = function () {
  torusMove();
  rippleMove();
  ballMove();
  coralMove();
  showClock();
  // brownianMove();
  setInterval(showClock,30000);
}
