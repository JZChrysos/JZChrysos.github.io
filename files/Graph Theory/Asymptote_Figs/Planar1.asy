if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="Planar1";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(6cm);

real r=2.2;

for (int i = 0; i < 5; ++i){
	draw(r*dir(72*i)--r*dir(72*(i+1))--dir(72*(i+1))--dir(72*i));
	draw(r*dir(72*i)--dir(72*(i+1)));
	draw(dir(72*i)--r*dir(72*(i+1)));
	dot(" ",dir(72*i));
	dot(" ",r*dir(72*i));
}

