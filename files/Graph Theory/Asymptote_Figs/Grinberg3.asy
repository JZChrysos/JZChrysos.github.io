if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="Grinberg3";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(6cm);

pair A,B,C,D,E,F,G,H,I,J,K;

A = (0,0);
B = 0.8*dir(-30);
C = 1.5*dir(10);
D = 2.6*dir(10);
E = 3.5*dir(-5);
F = 4.2*dir(-30);
G = 6*dir(-30);
H = 6*dir(10);
I = 4.2*dir(10);
J = 3.65*dir(30);
K = 3*dir(30);

path p = A--B--C--1.5*dir(50)--C--D--E--I--E--F--G--H--6*dir(50)--H--I--J--K--D;

draw(p);
draw(rotate(120)*p);
draw(rotate(240)*p);

draw(reflect((0,0),(0,1))*p);
draw(reflect((0,0),(0,1))*rotate(120)*p);
draw(reflect((0,0),(0,1))*rotate(240)*p);

