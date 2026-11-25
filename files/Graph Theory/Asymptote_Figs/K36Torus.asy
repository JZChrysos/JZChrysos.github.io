if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="K36Torus";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(6cm);

draw((0,0)--(0,1)--(1,1)--(1,0)--(0,0),black+2);
pair A,B,C,D,E,F,G,H,P,Q,R,S,T,U;
A = (0,1);
B = (1/2,1);
C = (1,1);
D = (0,1/2);
E = (1,1/2);
F = (0,0);
G = (1/2,0);
H = (1,0);

P = (1/4,3/4);
Q = (1/4,1/4);
R = (3/4,1/4);
S = (1/2,1/2);
T = (1/2,3/4);
U = (3/4,1/2);

defaultpen(heavygreen+1);

draw(P--A);
draw(P--B);
draw(P--D);

draw(Q--D);
draw(Q--F);
draw(Q--G);

draw(R--E);
draw(R--G);
draw(R--H);

draw(S--C);
draw(S--D);
draw(S--G);

draw(T--C);
draw(T--B);
draw(T--D);

draw(U--C);
draw(U--E);
draw(U--G);

dot("$1$",A,NW,heavyred);
dot("$1$",C,NE,heavyred);
dot("$1$",F,SW,heavyred);
dot("$1$",H,SE,heavyred);
dot("$2$",B,N,heavyred);
dot("$2$",G,dir(-90),heavyred);
dot("$3$",D,W,heavyred);
dot("$3$",E,dir(0),heavyred);
dot("$1$",P,SE,heavyblue);
dot("$2$",Q,NE,heavyblue);
dot("$3$",R,NW,heavyblue);
dot("$4$",S,SW,heavyblue);
dot("$5$",T,SE,heavyblue);
dot("$6$",U,NW,heavyblue);
