if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="Ant1";
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

dot("$S$",(0,1),NW);
dot("$G$",(1.4,0.3),SE);

