if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="Ant2";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(5cm);

defaultpen(fontsize(14pt));

draw((0,0)--(0,1)--(1,1)--(1,0)--(0,0));
draw(shift(0.4,0.3)*((0,0)--(0,1)--(1,1)--(1,0)--(0,0)));
draw((0,0)--(0.4,0.3));
draw((0,1)--(0.4,1.3));
draw((1,0)--(1.4,0.3));
draw((1,1)--(1.4,1.3));

dot("$A$",(0,1),NW,red);
dot("$B$",(0.4,1.3),NW,orange);
dot("$B$",(0,0),NW,orange);
dot("$B$",(1,1),NW,orange);
dot("$C$",(0.4,0.3),NW,blue);
dot("$C$",(1,0),NW,blue);
dot("$C$",(1.4,1.3),NW,blue);
dot("$D$",(1.4,0.3),SE,heavygreen);

