var stage = new createjs.Stage("TileSpace");

var WIDTH = stage.canvas.width;
var HEIGHT = stage.canvas.height;
var TILESIZE = 50;
var TILEBUFFER = 0;
var NUM_COLS = Math.floor(WIDTH / (TILESIZE + TILEBUFFER));
var NUM_ROWS = Math.floor(HEIGHT / (TILESIZE + TILEBUFFER));

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
			this.graphics.beginStroke("black").moveTo(1,1).lineTo(TILESIZE-1,1).lineTo(TILESIZE-1,TILESIZE-1).lineTo(1,TILESIZE-1).lineTo(1,1);
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
	if (j < NUM_ROWS){
		if (tiles[i][j+1].tileid !== 'blank'){
			if (WANG_TILE_SET[tiles[i][j+1].tileid][0] !== WANG_TILE_SET[id][2]){
				return false;
			}
		} 
	}
	if (i < NUM_COLS){
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