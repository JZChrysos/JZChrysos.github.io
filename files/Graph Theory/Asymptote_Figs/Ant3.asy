if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="Ant3";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(20cm);

defaultpen(fontsize(10pt));

void cube(real x, string A, string B, string C, string D){
	draw(shift(x,0)*((0,0)--(0,1)--(1,1)--(1,0)--(0,0)));
	draw(shift(x,0)*shift(0.4,0.3)*((0,0)--(0,1)--(1,1)--(1,0)--(0,0)));
	draw((x,0)--(x + 0.4,0.3));
	draw((x,1)--(x + 0.4,1.3));
	draw((x + 1,0)--(x + 1.4,0.3));
	draw((x + 1,1)--(x + 1.4,1.3));
	dot(A,(x,1),NW);
	dot(B,(x+0.4,1.3),NW);
	dot(B,(x,0),NW);
	dot(B,(x+1,1),NW);
	dot(C,(x+0.4,0.3),NW);
	dot(C,(x+1,0),NW);
	dot(C,(x+1.4,1.3),NW);
	dot(D,(x+1.4,0.3),NE);
}

cube(0, "1","0","0","0");
label("day 0", (0.6,-0.3));
cube(2.3, "0","1","0","0");
label("day 1", (2.3 + 0.6,-0.3));
cube(4.6, "3","0","2","0");
label("day 2", (4.6 + 0.6,-0.3));
cube(6.9, "0","7","0","6");
label("day 3", (6.9 + 0.6,-0.3));
cube(9.2, "21","0","20","0");
label("day 4", (9.2 + 0.6,-0.3));
cube(11.5, "0","61","0","60");
label("day 5", (11.5 + 0.6,-0.3));
