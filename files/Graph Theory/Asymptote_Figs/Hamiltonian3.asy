if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="Hamiltonian3";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(10cm);

defaultpen(fontsize(16pt));

void gridpath(real x, real y, int n, int m, path p, pen c){
	for (int i = 0; i< n; ++i){
		for (int j = 0; j<m; ++j){
			if ((i + j) % 2 == 0){
				path square = (0,0)--(0,1)--(1,1)--(1,0)--cycle;
				filldraw(shift(x+i,y+j)*square, heavygray);
			} 
		}
	}
	for (int i = 0; i < n+1; ++i){
		draw((x+i,y)--(x+i,y+m),black+1);	
	}
	for (int j = 0; j < m+1; ++j){
		draw((x,y+j)--(x+n,y+j),black+1);
	}
	draw(shift(x+0.5,y+0.5)*p,c+5+opacity(0.6));
}

gridpath(0,0,7,5,
(6,4)--(0,4)--(0,3)--(4,3)--(4,2)--(0,2)--(0,0)--(1,0)--(1,1)--(2,1)--(2,0)--(3,0)--(3,1)--(4,1)--(4,0)--(6,0)--(6,1)--(5,1)--(5,2)--(6,2)--(6,3)--(5,3),
heavygreen
);