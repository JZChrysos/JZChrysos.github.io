if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="Lshape2";
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

void Lshape(pair C, real angle, pen c, real op = 0.5){
	real x = xpart(C);
	real y = ypart(C);
	path L = (x,y)--(x,y+2)--(x+1,y+2)--(x+1,y+1)--(x+2,y+1)--(x+2,y)--cycle;
	path L = shift(x,y)*rotate(angle)*shift(-x,-y)*L;
	fill(L,c+opacity(op));
}

Lshape((5,5),180,black, op = 1);
Lshape((2,6),270,red);
Lshape((6,6),180,blue);
Lshape((6,2),90,green);
Lshape((4,2),90,yellow);
Lshape((1,1),0,red);
Lshape((0,0),0,yellow);
Lshape((4,0),90,blue);
Lshape((0,4),270,blue);
Lshape((7,1),90,yellow);
Lshape((4,0),0,red);
Lshape((8,0),90,green);
Lshape((8,4),180,red);
Lshape((7,7),180,green);
Lshape((8,8),180,blue);
Lshape((8,4),90,yellow);
Lshape((4,8),270,yellow);
Lshape((1,7),270,blue);
Lshape((0,8),270,red);
Lshape((0,4),0,green);
Lshape((4,8),180,green);

draw((4,0)--(4,8), black+2);
draw((0,4)--(8,4), black+2);

