if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="Wilson";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(4cm);

defaultpen(fontsize(10pt));
dotfactor = 10;

void square(real x, int[][][] p, pen[] colors, bool label = false){
	for (int i = 0; i < 3; ++i){
		for (int j = 0; j < 3; ++j){
			if (label == true){
				dot((string) (i+3*j),(x+i,j),NW);
				} else {
				dot(" ",(x+i,j),NW);
				}
		}
		draw((x+i,0)--(x+i,2));
		draw((x,i)--(x+2,i));
	}
	for (int m=p.length - 1; m >= 0; --m){
		for (int k=0; k<p[m].length; ++k){
			if (k > 0){
				draw((x+p[m][k-1][0],p[m][k-1][1])--(x+p[m][k][0],p[m][k][1]),colors[m]+2,arrow=Arrow(size = 3mm, position=0.55));
			} 
			if ((k < p[m].length - 1) || (k==0)){
				dot(" ",(x+p[m][k][0],p[m][k][1]), colors[m]);
			}
		}
	}
}

square(0,
new int[][][] {
{{0,0}}, 
{{1,0},{1,1},{0,1},{0,0}},
{{2,0},{2,1},{1,1}},
{{0,2},{1,2},{2,2},{2,1}}
}, 
new pen[] {red,heavycyan,heavygreen,purple},
label=true);

label("$w_1$",(0.8,0.5),heavycyan);
label("$w_2$",(1.8,0.5),heavygreen);
label("$w_3$",(0.5,1.8),purple);