if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="walk1";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(4cm);

defaultpen(fontsize(10pt));
dotfactor = 10;

pair A,B,C,D,X;
A = (0,2);
B = (2,2);
C = (2,0);
D = (0,0);
X = (1,1);

for (int i = 0; i < 3; ++i){
	draw((i,0)--(i,2));
	draw((0,i)--(2,i));
}

for (int i = 0; i < 3; ++i){
	for (int j = 0; j < 3; ++j){
		dot(" ",(i,j),NW);
	}
}

dot("$A$",A,NW,red);
dot("$B$",B,NW,heavycyan);
dot("$C$",C,NW,heavygreen);
dot("$D$",D,NW,purple);
dot("$X$",X,NW,black);
