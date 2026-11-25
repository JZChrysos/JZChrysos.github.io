if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="Bipartite3";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(5cm);

defaultpen(fontsize(20pt));

void bipartite(int n, int m, int[][] edges, pen c = black){
	for (int k = 0; k < edges.length; ++k){
		draw((edges[k][0],0)--(edges[k][1],-1),c);
	}
	for (int i = 0; i < n; ++i){
		dot(" ",(i,0),N);
	}
	for (int j = 0; j< m; ++j){
		dot(" ",(j,-1),N);
	}
}

bipartite(5,5,new int[][]{ {0,1}, {0,2}, {1,0}, {1,2}, {1,3}, {1,4}, {2,1}, {2,2}, {3,1}, {3,2}, {4,3}, {4,4} });