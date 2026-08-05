const torusScreen = document.getElementById("torusScreen");

const pixelsX = 50;
const pixelsY = 105;

const chars = "@jzc ";
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

window.onload = function () {
  torusMove();
}