if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="Hamiltonian2";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(10cm);

defaultpen(fontsize(16pt));

void gridpath(real x, real y, int n, int m, path p, pen c){
	for (int i = 0; i < n+1; ++i){
		draw((x+i,y)--(x+i,y+m),black+1);	
	}
	for (int j = 0; j < m+1; ++j){
		draw((x,y+j)--(x+n,y+j),black+1);
	}
	draw(shift(x+0.5,y+0.5)*p,c+5+opacity(0.6));
}

gridpath(0,0,7,6,
(0,0)--(6,0)--(6,1)--(1,1)--(1,2)--(6,2)--(6,3)--(1,3)--(1,4)--(6,4)--(6,5)--(0,5)--cycle,
mediumred
);