if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="Lshape";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(10cm);

defaultpen(fontsize(12pt));

draw((0,0)--(8,0)--(8,8)--(0,8)--(0,0),black+2);
filldraw((2,3)--(2,4)--(3,4)--(3,3)--cycle, black);

void Lshape(pair C, real angle, pen c){
	real x = xpart(C);
	real y = ypart(C);
	path L = (x,y)--(x,y+2)--(x+1,y+2)--(x+1,y+1)--(x+2,y+1)--(x+2,y)--cycle;
	path L = shift(x,y)*rotate(angle)*shift(-x,-y)*L;
	fill(L,c+opacity(0.5));
}

Lshape((0,0),0,blue);
Lshape((3,2),180,yellow);
Lshape((0,2),0,red);
Lshape((4,2),90,blue);
Lshape((1,5),270,yellow);
Lshape((0,6),270,green);
Lshape((4,6),180,red);
Lshape((3,0),0,green);
Lshape((6,2),180,yellow);
Lshape((0,6),0,yellow);
Lshape((3,8),180,blue);
Lshape((3,8),270,green);
Lshape((4,5),0,yellow);
Lshape((5,6),0,red);
Lshape((8,8),180,yellow);
Lshape((6,2),90,red);
Lshape((4,5),270,green);
Lshape((8,0),90,green);
Lshape((6,6),270,blue);
Lshape((6,3),270,blue);
Lshape((8,3),90,yellow);

