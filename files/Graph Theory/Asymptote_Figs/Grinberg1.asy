if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="Grinberg1";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(6cm);

defaultpen(fontsize(16pt));

pair A,B,C,D,E,F,G,H;

A = dir(0);
B = dir(45);
C = dir(90);
D = dir(135);
E = dir(180);
F = dir(225);
G = dir(270);
H = dir(315);

defaultpen(black+2);

draw(A--B--C--D--E--F--G--H--A);
draw(A--2*A);
draw(B--2*B);
draw(C--2*C);
draw(D--2*D);
draw(E--2*E);
draw(F--2*F);
draw(G--2*G);
draw(H--2*H);
//
//draw(2*A--1.1*(A+B)--2*B--1.1*(B+C)--2*C--1.1*(C+D)--2*D--1.1*(D+E)--2*E--1.1*(E+F)--2*F--1.1*(F+G)--2*G--1.1*(G+H)--2*H--1.1*(A+H)--2*A);

draw(2*A--1.3*(A+B)--2*B--1.3*(B+C)--2*C--1.3*(C+D)--2*D--1.3*(D+E)--2*E--1.3*(E+F)--2*F--1.3*(F+G)--2*G--1.3*(G+H)--2*H--1.3*(A+H)--2*A);