if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="Planar2";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(6cm);

pair A,B,C,D,E,F,G,H,I;

A = dir(0);
B = dir(40);
C = dir(80);
D = dir(120);
E = dir(160);
F = dir(200);
G = dir(240);
H = dir(280);
I = dir(320);

draw(A--B--C--D--E--F--G--H--I--A);
draw(A--C);
draw(A--D);
draw(D--F);
draw(D--I);
draw(F--I);
draw(F--H);

for (int i = 0; i < 9; ++i){
	dot(" ", dir(i*40));
}