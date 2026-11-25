if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="6Triangles";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(5cm);

pair A,B,C;
A = (0,0);
B = (1,0);
C = dir(60);

draw(A--C--B--(B+C)--2*B--(2*B+C)--3*B--(3*B+C)--4*B--(4*B+C)--5*B--(5*B+C)--6*B--A, black+1.2);

for (int i = 0; i < 6; ++i){
	dot(" ", i*B);
	dot(" ", i*B+C);
}

dot(" ", 6*B);