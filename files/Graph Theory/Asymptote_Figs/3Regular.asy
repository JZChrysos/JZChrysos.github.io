if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="3Regular";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(6cm);

defaultpen(fontsize(16pt));

pair A,B,C,D,E,F;

A = (0,0);
B = (2,0);
C = (4,1);
D = (4,-1);
E = (3,0);
F = (5,0);

void arm(real r){
	path p = (A--B--C--E--F--C--F--D--E--D--B);
	draw(rotate(r)*p, heavygreen);
	dot(" ",rotate(r)*B,heavygreen);
	dot(" ",rotate(r)*C,heavygreen);
	dot(" ",rotate(r)*D,heavygreen);
	dot(" ",rotate(r)*E,heavygreen);
	dot(" ",rotate(r)*F,heavygreen);
}

arm(90);
arm(210);
arm(330);

dot("$v$",A,NE,heavygreen);