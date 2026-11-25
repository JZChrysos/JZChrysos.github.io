if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="K2nTorus";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(5cm);

draw((0,0)--(0,1)--(1,1)--(1,0)--(0,0),black+2);

defaultpen(heavygreen+1);

int n = 10;

for (int k = 1; k < n; ++k){
	pair X = (k/n,1/2);
	draw((1/2,1/4)--X--(1/2,3/4));
	dot(" ",X,heavyblue);
}

dot("$1$",(1/2,3/4),N,heavyred);
dot("$2$",(1/2,1/4),S,heavyred);