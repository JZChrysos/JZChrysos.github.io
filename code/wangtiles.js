var stage = new createjs.Stage("TileSpace");

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
var NUM_COLS = 6 // Math.floor(WIDTH / (TILESIZE + TILEBUFFER));
var NUM_ROWS = 6 // Math.floor(HEIGHT / (TILESIZE + TILEBUFFER));
// var TILESIZE = 50;
var TILESIZE = Math.floor(WIDTH / NUM_COLS);
var TILEBUFFER = 0;

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
		this.x = i*(TILESIZE + TILEBUFFER);
		this.y = j*(TILESIZE + TILEBUFFER);
		this.selected = false;
		// this.graphics.beginFill("#eeeeee").drawRect(0, 0, TILESIZE, TILESIZE);
		this.graphics = new createjs.Graphics().beginFill("#eeeeee").drawRect(0,0,TILESIZE,TILESIZE);
		this.tileid = 'blank';
		this.on("click", function(){
			// this.graphics.beginStroke("black").drawRect(1, 1, TILESIZE-1, TILESIZE-1);
			this.selected = true;
			selectedTile = this;
			this.updategraphics();
			// stage.update();
		});
	}
	select() {
		// this.graphics.beginStroke("black").drawRect(1, 1, TILESIZE-1, TILESIZE-1);
		console.log('selected tile at ' + this.i + ',' + this.j)
		this.selected = true;
		selectedTile = this;
		this.updategraphics();
		stage.update();
	}
	unselect() {
		// this.graphics = new createjs.Graphics().beginFill("#eeeeee").drawRect(0, 0, TILESIZE, TILESIZE);
		// this.graphics = GRAPHIC_DICT['blank'];
		console.log('unselected tile at ' + this.i + ',' + this.j)
		this.selected = false;
		this.updategraphics();
		stage.update();
	}
	updategraphics() {
		if (this.tileid === 'blank'){
			this.graphics = new createjs.Graphics().beginFill("#eeeeee").drawRect(0,0,TILESIZE,TILESIZE);
		} else {
			console.log('tileid: ' + this.tileid);
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

window.addEventListener("keydown", function(event){
	// console.log('key: ' + event.key);
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
		// this.on("click", function(){
			
		// });

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

const tiles2 = new Array();

// const panelcoords = [[0,0],[20,0],[40,0]];

for (var i = 0; i < WANG_TILE_SET.length; i++){
	// var x = panelcoords[i][0];
	// var y = panelcoords[i][1];
	var x = i*15 + 5;
	var y = 0;
	var newtile = new Tile2(x,y,i);
	// console.log("tile 2: " + x + " " + y + " " + i);
	tiles2[i] = newtile;
	panel.addChild(newtile);
	panel.update();
}


