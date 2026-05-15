var stage = new createjs.Stage("TileSpace");

createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick", stage);

var WIDTH = stage.canvas.width;
var HEIGHT = stage.canvas.height;

// resize canvas
var NEW_WIDTH = 600;
var NEW_HEIGHT = 600;
var scale = NEW_WIDTH / WIDTH;
stage.canvas.width = NEW_WIDTH;
stage.canvas.height = NEW_HEIGHT;
stage.scaleX = stage.scaleY = scale;
stage.update();

// set params
// initialize score, size, highlight

if (localStorage.getItem('score') === null){
	localStorage.setItem('score',0);
	localStorage.setItem('SIZE',4);
} else {
	var score = localStorage.getItem('score');
	if (localStorage.getItem("SIZE") === null){
		localStorage.setItem('SIZE',Math.max(parseInt(score)+1,4));
	}
}

if (localStorage.getItem('highlight') === null){
	localStorage.setItem('highlight','false');
}

var SIZE = localStorage.getItem("SIZE");

//DIALOG BOX + BUTTONS

let winBox = document.getElementById("winBox");
let winMessage = document.getElementById("winMessage");
let yesButton = document.getElementById("yesButton");
let noButton = document.getElementById("noButton");
let span = document.getElementsByClassName("close")[0];
let span2 = document.getElementsByClassName("close")[1];
let submitButton = document.getElementById("submitButton");
let optionsButton = document.getElementById("optionsButton");
let homeButton = document.getElementById("homeButton");
let highlightCheckbox = document.getElementById("highlight");

span.onclick = function() {
  winBox.open = false;
}
window.onclick = function(event) {
  winBox.open = false;
}
yesButton.onclick = function() {
	var score = localStorage.getItem('score');
	localStorage.setItem("SIZE", parseInt(score) + 1);
	window.location.reload();
}
noButton.onclick = function() {
  winBox.open = false;
}

span2.onclick = function() {
  optionsBox.open = false;
}
submitButton.onclick = function() {
	const sizeInput = document.getElementById("sizeInput").value;
	if (/^\d+$/.test(sizeInput)){
		let newsize = parseInt(sizeInput);
		if (newsize >= 1 && newsize <= 24){
			localStorage.setItem("SIZE",newsize);
			window.location.reload();
		} else {
			alert("Size must be an integer in [1,24]");
		}
	} else {
		alert("Size must be an integer in [1,24]");
	}
}

optionsButton.onclick = function() {
	optionsBox.open = true;
}

highlightCheckbox.onclick = function() {
	var checked = document.getElementById('highlight').checked;
	localStorage.setItem('highlight', checked);
}

// set highlight checkbox according to stored data
document.getElementById('highlight').checked = (localStorage.getItem('highlight') === 'true');

homeButton.onclick = function() {
	window.location.href = "./fun.html";
}

const MYBEST = 7;

function winMessageText(recentscore, prevbestscore){
	var score = parseInt(localStorage.getItem('score'));
	var message = "You've successfully solved the tiling puzzle at size "+ recentscore + "x" + recentscore + ". ";
	if (recentscore > MYBEST){
		message += "That's better than my own personal best of " + MYBEST + "x" + MYBEST + ". Nicely done! "
	}
	if (recentscore == MYBEST){
		message += "You've matched my own personal best of " + MYBEST + "x" + MYBEST + ". "
		if (score > MYBEST){
			message += "And in the past you did even better! "
		}
	}
	if (recentscore < MYBEST){
		message += "My personal best is " + MYBEST + "x" + MYBEST ;
		if (score == MYBEST){
			message += ", which you've also achieved in the past. "
		}
		if (score > MYBEST){
			message += ", which you've surpassed previously. "
		}
		if (score < MYBEST){
			message += ". "
		}
	}
	// if (recentscore > prevbestscore){
	// 	message += "That's better than your previous largest solution of " + prevbestscore + "x" + prevbestscore + ". ";
	// 	// if (recentscore > (prevbestscore + 1)){
	// 	// 	message += "By a lot! ";
	// 	// }
	// }
	// if (recentscore === prevbestscore){
	// 	message += "You've tied your previous largest solution of " + prevbestscore + "x" + prevbestscore + ". ";
	// }
	// if (recentscore < prevbestscore){
	// 	message += "It's not as good as your previous best of " + prevbestscore + "x" + prevbestscore + ". "
	// }
	// if (score > MYBEST){
	// 	message += "You've surpassed my best performance of "+MYBEST+". ";
	// 	if (score > (MYBEST + 1)){
	// 		message += "By a lot! ";
	// 	}
	// 	message += "Nicely done. ";
	// }
	// if (score < MYBEST){
	// 	message += "My own personal best is " + MYBEST + ". ";
	// }
	// if (score === MYBEST){
	// 	message += "You've matched my own personal best of " + MYBEST + ". Well done. If you could beat me, that would be pretty impressive, I think. "
	// }
	message += "Would you like to try the next size you haven't beaten yet, " + (score + 1) + "x" + (score + 1) + "? ";
	return message;
}

var NUM_COLS = SIZE // Math.floor(WIDTH / (TILESIZE + TILEBUFFER));
var NUM_ROWS = SIZE // Math.floor(HEIGHT / (TILESIZE + TILEBUFFER));
// var TILESIZE = 50;
var TILESIZE = Math.floor(WIDTH / NUM_COLS);
var correctionfactor = (WIDTH - TILESIZE * NUM_COLS)/2;
var TILEBUFFER = 0;
var wonthissession = false; //tracks if victory has already occurred, if so the celebration and win screen won't play

const WANG_TILE_SET = [ // (N,W,S,E)
	[1,3,1,1],
	[2,3,2,1],
	[1,3,3,3],
	[0,2,1,2],
	[2,2,0,2],
	[0,0,1,0],
	[1,0,2,3],
	[2,1,2,0],
	[2,1,0,1],
	[3,1,2,3],
	[1,3,1,0]
];

const COLOR_DICT = {
	0:"#FB8B24",
	1:"#D90368",
	2:"#2382C1",
	3:"#04A777",
};

let selectedTile = null;

class Tile extends createjs.Shape {
	constructor(i, j) {
		super();
		this.i = i;
		this.j = j;
		this.x = i*(TILESIZE + TILEBUFFER) + correctionfactor;
		this.y = j*(TILESIZE + TILEBUFFER) + correctionfactor;
		this.selected = false;
		// this.graphics.beginFill("#eeeeee").drawRect(0, 0, TILESIZE, TILESIZE);
		this.graphics = new createjs.Graphics().beginFill("#eeeeee").drawRect(0,0,TILESIZE,TILESIZE);
		this.tileid = 'blank';
		this.on("click", function(){
			// this.graphics.beginStroke("black").drawRect(1, 1, TILESIZE-1, TILESIZE-1);
			this.selected = true;
			selectedTile = this;
			this.updategraphics();
			if (localStorage.getItem('highlight') === 'true'){
				updatehighlight(this.i,this.j);
			}
			// stage.update();
		});
		this.on("dblclick", function(){
			this.selected=true;
			selectedTile = this;
			this.tileid ='blank'
			this.updategraphics();
			if (localStorage.getItem('highlight') === 'true'){
				updatehighlight(this.i,this.j);
			}
		})
	}
	select() {
		this.selected = true;
		selectedTile = this;
		this.updategraphics();
		if (localStorage.getItem('highlight') === 'true'){
			updatehighlight(this.i,this.j);
		}
		stage.update();
	}
	unselect() {
		this.selected = false;
		this.updategraphics();
		stage.update();
	}
	updategraphics() {
		if (this.tileid === 'blank'){
			this.graphics = new createjs.Graphics().beginFill("#eeeeee").drawRect(0,0,TILESIZE,TILESIZE);
		} else {
			var tile = WANG_TILE_SET[this.tileid];
			var tilecolors = []; 
			for (j = 0; j < 4; j++){
				tilecolors[j] = COLOR_DICT[tile[j]];
			}
			var tilegraphics = new createjs.Graphics();
			tilegraphics.beginFill(tilecolors[0]).moveTo(TILESIZE/2,TILESIZE/2).lineTo(0,0).lineTo(TILESIZE,0).closePath(); // N
			tilegraphics.beginFill(tilecolors[1]).moveTo(TILESIZE/2,TILESIZE/2).lineTo(0,0).lineTo(0,TILESIZE).closePath(); // W
			tilegraphics.beginFill(tilecolors[2]).moveTo(TILESIZE/2,TILESIZE/2).lineTo(TILESIZE,TILESIZE).lineTo(0,TILESIZE).closePath(); // S
			tilegraphics.beginFill(tilecolors[3]).moveTo(TILESIZE/2,TILESIZE/2).lineTo(TILESIZE,TILESIZE).lineTo(TILESIZE,0).closePath().endFill(); // E
			this.graphics = tilegraphics;
		};
		if (this.selected === true){
			this.graphics.setStrokeStyle(0.5).beginStroke("black").drawRect(0.25,0.25,TILESIZE-0.5,TILESIZE-0.5);
			// stage.addChild(this); // to bring to front
			// moveTo(0,0).lineTo(TILESIZE,0).lineTo(TILESIZE,TILESIZE).lineTo(0,TILESIZE).lineTo(0,0);
		};
		stage.update();
	}
}

const tiles = new Array();

for (var i = 0; i < NUM_COLS; i++){
	tiles[i] = new Array();
	for (var j = 0; j < NUM_ROWS; j++){
		var newtile = new Tile(i,j);
		tiles[i][j] = newtile;
		stage.addChild(newtile);
		stage.update();
	}
}

function gridcomplete(){
	for (var i = 0; i < NUM_COLS; i++){
		for (var j = 0; j < NUM_ROWS; j++){
			if (tiles[i][j].tileid === 'blank'){
				return false;
			}
		}
	}
	return true;
}

function validtile(i,j,id){
	if (j > 0){
		if (tiles[i][j-1].tileid !== 'blank'){
			if (WANG_TILE_SET[tiles[i][j-1].tileid][2] !== WANG_TILE_SET[id][0]){
				return false;
			}
		} 
	}
	if (i > 0){
		if (tiles[i-1][j].tileid !== 'blank'){
			if (WANG_TILE_SET[tiles[i-1][j].tileid][3] !== WANG_TILE_SET[id][1]){
				return false;
			}
		} 
	}
	if (j < NUM_ROWS - 1){
		if (tiles[i][j+1].tileid !== 'blank'){
			if (WANG_TILE_SET[tiles[i][j+1].tileid][0] !== WANG_TILE_SET[id][2]){
				return false;
			}
		} 
	}
	if (i < NUM_COLS - 1){
		if (tiles[i+1][j].tileid !== 'blank'){
			if (WANG_TILE_SET[tiles[i+1][j].tileid][1] !== WANG_TILE_SET[id][3]){
				return false;
			}
		} 
	}
	return true;
}

function celebration(){
	var si = selectedTile.i;
	var sj = selectedTile.j;
	var delayfactor = 150;
	for(var i = 0; i < SIZE; i++){
		for (var j=0; j<SIZE; j++){
			var delay = Math.sqrt((si-i)**2 + (sj-j)**2);
			var tx = tiles[i][j].x;
			var ty = tiles[i][j].y;
			createjs.Tween.get(tiles[i][j], {loop: false})
			.wait(delay*delayfactor)
          	.to({scaleX: 0.3, scaleY:0.3, x: tx + TILESIZE*0.35, y: ty + TILESIZE*0.35}, 500, createjs.Ease.getPowInOut(2))
          	.to({scaleX: 1, scaleY:1, x:tx, y:ty}, 400, createjs.Ease.getPowInOut(2));
		}
	}
	wonthissession = true;
	const timeout = setTimeout(displayWinBox, SIZE*1.5*delayfactor + 1000);
}

function displayWinBox(){
	winBox.open = true;
}

stage.addEventListener("click", function(){
	for(var i = 0; i < tiles.length; i++){
		for(var j = 0; j < tiles[0].length; j++){
			if (tiles[i][j].selected == true){
				tiles[i][j].unselect();
			}
		}
	}
	stage.update();
}, capture=true);

window.addEventListener("click", function (event){
	if (event.target.id != "TileSpace"){
		if (selectedTile !== null){
			selectedTile.unselect();
			selectedTile = null;
		}
		if (localStorage.getItem('highlight') === 'true'){
			for (var i = 0; i < WANG_TILE_SET.length; i++){
				tiles2[i].alpha = 1;
			}
		}
		panel.update();
	}
}, capture=true);

window.addEventListener("keydown", function(event){
	// ARROWS
	if (event.key === "ArrowUp"){
		if (selectedTile !== null){
			let i = selectedTile.i;
			let j = selectedTile.j;
			if (j > 0){
				tiles[i][j-1].select();
				tiles[i][j].unselect();
			}
		}
	}
	if (event.key === "ArrowDown"){
		if (selectedTile !== null){
			let i = selectedTile.i;
			let j = selectedTile.j;
			if (j < NUM_ROWS){
				tiles[i][j+1].select();
				tiles[i][j].unselect();
			}
		}
	}
	if (event.key === "ArrowLeft"){
		if (selectedTile !== null){
			let i = selectedTile.i;
			let j = selectedTile.j;
			if (i > 0){
				tiles[i-1][j].select();
				tiles[i][j].unselect();
			}
		}
	}
	if (event.key === "ArrowRight"){
		if (selectedTile !== null){
			let i = selectedTile.i;
			let j = selectedTile.j;
			if (i < NUM_COLS){
				tiles[i+1][j].select();
				tiles[i][j].unselect();
			}
		}
	}
	// LETTERS
	const letterdict = {'a': 0, 'b': 1, 'c': 2, 'd':3, 'e':4, 'f':5, 'g':6, 'h':7, 'i':8, 'j':9, 'k':10};
	if (Object.keys(letterdict).includes(event.key)){
		if (validtile(selectedTile.i,selectedTile.j,letterdict[event.key])){
			selectedTile.tileid = letterdict[event.key];
			selectedTile.updategraphics();
			if (gridcomplete() === true && wonthissession === false){
				let prevbestscore = localStorage.getItem('score');
				localStorage.setItem('score',Math.max(prevbestscore, SIZE));
				updatescore();
				winMessage.innerHTML = winMessageText(SIZE,prevbestscore);
				celebration();
			}
		}
	}

	if (event.key === ' '){
		selectedTile.tileid = 'blank';
		selectedTile.updategraphics();
	}
});


// LOWER PANEL

var panel = new createjs.Stage("TileGuide");

var WIDTH2 = panel.canvas.width;
var HEIGHT2 = panel.canvas.height;

// resize canvas
var k = 1.5;
var NEW_WIDTH2 = 600*k;
var NEW_HEIGHT2 = 400*k;
var scale2 = NEW_WIDTH2 / WIDTH2;
panel.canvas.width = NEW_WIDTH2;
panel.canvas.height = NEW_HEIGHT2;
panel.scaleX = panel.scaleY = scale2*0.35;
panel.update();

var TILESIZE2 = (panel.canvas.width / 11)*0.3/k - 6;

class Tile2 extends createjs.Shape {
	constructor(x, y, tileid) {
		super();
		this.x = x;
		this.y = y;
		this.tileid = tileid;
		this.on("click", function(){
			if (selectedTile != null){
				selectedTile.select();
				if (validtile(selectedTile.i,selectedTile.j,tileid)){
					selectedTile.tileid = tileid;
					selectedTile.updategraphics();
					if (gridcomplete() === true && wonthissession === false){
						let prevbestscore = localStorage.getItem('score');
						localStorage.setItem('score',Math.max(prevbestscore, SIZE));
						updatescore();
						winMessage.innerHTML = winMessageText(SIZE,prevbestscore);
						celebration();
					}
				}
			}
		});

		var tile = WANG_TILE_SET[this.tileid];
		var tilecolors = []; 
		for (j = 0; j < 4; j++){
			tilecolors[j] = COLOR_DICT[tile[j]];
		}
		var tilegraphics = new createjs.Graphics();
		tilegraphics.beginFill(tilecolors[0]).moveTo(TILESIZE2/2,TILESIZE2/2).lineTo(0,0).lineTo(TILESIZE2,0).closePath(); // N
		tilegraphics.beginFill(tilecolors[1]).moveTo(TILESIZE2/2,TILESIZE2/2).lineTo(0,0).lineTo(0,TILESIZE2).closePath(); // W
		tilegraphics.beginFill(tilecolors[2]).moveTo(TILESIZE2/2,TILESIZE2/2).lineTo(TILESIZE2,TILESIZE2).lineTo(0,TILESIZE2).closePath(); // S
		tilegraphics.beginFill(tilecolors[3]).moveTo(TILESIZE2/2,TILESIZE2/2).lineTo(TILESIZE2,TILESIZE2).lineTo(TILESIZE2,0).closePath().endFill(); // E
		this.graphics = tilegraphics;

		// LABEL
		const letterdictreversed = {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4:'e', 5:'f', 6:'g', 7:'h', 8:'i', 9:'j', 10:'k'};

		var text = new createjs.Text(letterdictreversed[tileid],"8px Arial", "#000000");
		text.x = this.x + TILESIZE2/2;
		text.y = this.y + 12;
		text.textAlign = "center";
		panel.addChild(text);

		panel.update();
	}
}

var spacetext = new createjs.Text("[space] = blank","8px Arial", "#000000");
spacetext.x = 35;
spacetext.y = 27;
spacetext.textAlign = "center";
panel.addChild(spacetext);
panel.update();

const scoretext = new createjs.Text(" ","8px Arial", "#000000");
scoretext.x = 140;
scoretext.y = 27;
scoretext.textAlign = "center";
panel.addChild(scoretext);

function updatescore() {
	var score = localStorage.getItem('score');
	scoretext.text = "your best: " + score + "x" + score;
	panel.update();
}

if (localStorage.getItem('score') != null){
	updatescore();
}

const tiles2 = new Array();

for (var i = 0; i < WANG_TILE_SET.length; i++){
	// var x = panelcoords[i][0];
	// var y = panelcoords[i][1];
	var x = i*15 + 6;
	var y = 0;
	var newtile = new Tile2(x,y,i);
	tiles2[i] = newtile;
	panel.addChild(newtile);
	panel.update();
}

function updatehighlight(i,j) {
	if (localStorage.getItem('highlight') === 'true'){
		for (var k = 0; k < WANG_TILE_SET.length; k++){
			if (validtile(i,j,k)){
				tiles2[k].alpha = 1;
			} else {
				tiles2[k].alpha = 0.3;
			}
		}
	}
	panel.update();
}