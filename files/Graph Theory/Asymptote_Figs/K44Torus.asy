if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="K44Torus";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(6cm);

draw((0,0)--(0,1)--(1,1)--(1,0)--(0,0),black+2);
pair A,B,C,D,E,F,G,H,I,J,K,L,X,Y,Z;
A = (0,1);
B = (1/3,1);
C = (2/3,1);
D = (1,1);
E = (0,2/3);
F = (1,2/3);
G = (0,1/3);
H = (1,1/3);
I = (0,0);
J = (1/3,0);
K = (2/3,0);
L = (1,0);

X = (1/4,3/4);
Y = (1/2,1/2);
Z = (3/4,1/4);

defaultpen(heavygreen+1);

draw(A--B);
draw(C--D);
draw(A--E);
draw(D--F);
draw(G--I);
draw(H--L);
draw(I--J);
draw(K--L);

draw(X--B);
draw(X--C);
draw(X--E);
draw(X--G);
draw(Y--C);
draw(Y--F);
draw(Y--G);
draw(Y--J);
draw(Z--F);
draw(Z--H);
draw(Z--J);
draw(Z--K);

dot("$1$",B,N,heavyred);
dot("$1$",J,S,heavyred);
dot("$2$",C,N,heavyred);
dot("$2$",K,S,heavyred);
dot("$3$",E,W,heavyred);
dot("$3$",F,dir(0),heavyred);
dot("$4$",G,W,heavyred);
dot("$4$",H,dir(0),heavyred);

dot("$1$",A,NW,heavyblue);
dot("$1$",D,NE,heavyblue);
dot("$1$",I,SW,heavyblue);
dot("$1$",L,SE,heavyblue);
dot("$2$",X,NW,heavyblue);
dot("$3$",Y,NW,heavyblue);
dot("$4$",Z,NW,heavyblue);

