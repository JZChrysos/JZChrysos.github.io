if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="Grinberg2";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(6cm);

defaultpen(fontsize(16pt));

draw((0,0)--dir(0));
draw((0,0)--dir(120));
draw((0,0)--dir(240));

for (int i = 0; i < 20; ++i){
	draw(dir(20*i)--dir(20*(i+1)));
	draw(dir(20*i)--1.3*dir(20*i)--1.4*dir(20*i+10)--1.3*dir(20*(i+1)));
	dot(" ",dir(20*i));
	dot(" ",1.3*dir(20*i));
	dot(" ",1.4*dir(20*i+10));
}

dot(" ",(0,0));
