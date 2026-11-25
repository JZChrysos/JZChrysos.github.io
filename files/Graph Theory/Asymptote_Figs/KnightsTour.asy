if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="KnightsTour";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(10cm);

defaultpen(fontsize(16pt));

void grid(real x, real y, int n, int m, pen[][] colors, string[][] labels){
	for (int i = 0; i < n; ++i){
		for (int j = 0; j < m; ++j){
			path square = (0,0)--(0,1)--(1,1)--(1,0)--cycle;
			filldraw(shift(i+x,m-j+y-1)*square,colors[j][i]);
			label(labels[j][i],(i+x+0.5,m-j+y-0.5));
		}
	}
	for (int i = 0; i < n+1; ++i){
		draw((x+i,y)--(x+i,y+m),black+1);	
	}
	for (int j = 0; j < m+1; ++j){
		draw((x,y+j)--(x+n,y+j),black+1);
	}
}

grid(0,0.5,3,3,
new pen[][] {{mediumred,mediumred,mediumred},{mediumred,lightblue,mediumred},{mediumred,mediumred,mediumred}},
new string[][] {{"1","1","1"},{"1","2","1"},{"1","1","1"}}
);

grid(5,0,4,4,
new pen[][] {{heavygreen,mediumred,lightblue,yellow},{lightblue,black,black,mediumred},{mediumred,black,black,lightblue},{orange,lightblue,mediumred,lightmagenta}},
new string[][] {{"3","1","2","4"},{"2","","","1"},{"1","","","2"},{"5","2","1","6"}}
);

grid(11,0.5,6,3,
new pen[][] {{mediumred,lightblue,black,black,yellow,heavygreen},{cyan,lightmagenta,black,black,purple,pink},{lightblue,mediumred,black,black,heavygreen,yellow}},
new string[][] {{"1","2","","","5","6"},{"3","4","","","7","8"},{"2","1","","","6","5"}}
);