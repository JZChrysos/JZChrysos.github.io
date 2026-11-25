if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="Cubes1";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(20cm);

defaultpen(fontsize(16pt));

draw((0,0.125)--(0,1.125), royalblue);
draw((1,0.125)--(1,1.125), royalblue);
draw((0,0.125)--(1,0.125), mediumred+2);
draw((0,1.125)--(1,1.125), mediumred+2);

pair A = (1.7,0);
pair x = (1,0);
pair y = (0.15,0.25);
pair h = (0,1);

draw(A--(A+h),royalblue);
draw((A+x)--(A+x+h),royalblue);
draw((A+x+y)--(A+x+y+h),royalblue);
draw((A+y)--(A+y+h),royalblue);
draw(A--(A+x)--(A+x+y)--(A+y)--cycle, mediumred+2);
draw(shift(0,1)*(A--(A+x)--(A+x+y)--(A+y)--cycle), mediumred+2);

pair B = (3.6,0);

transform T = shift(B+(x+y+h)/2)*scale(0.5)*shift(-1*(B+(x+y+h)/2));

draw((B+y)--T*(B+y), royalblue);
draw((B+y+x)--T*(B+y+x), royalblue);
draw((B+x+y+h)--T*(B+x+y+h), royalblue);
draw((B+y+h)--T*(B+y+h), royalblue);
draw((B+y)--(B+x+y)--(B+x+y+h)--(B+y+h)--cycle, mediumred+2);
draw(T*((B+y)--(B+x+y)--(B+x+y+h)--(B+y+h)--cycle), mediumred+2);
draw((B+h)--T*(B+h),royalblue);
draw(B--T*(B),royalblue);
draw(T*((B+y+h)--(B+h)--B--(B+y)),mediumred+2);
draw((B+y+h)--(B+h)--B--(B+y), mediumred+2);
draw(T*(B--(B+x)--(B+x+y)--(B+x)--(B+x+h)--(B+x+h+y)--(B+x+h)--(B+h)),mediumred+2);
draw(T*(B+x)--(B+x),royalblue);
draw(T*(B+x+h)--(B+x+h),royalblue);
draw(B--(B+x)--(B+x+y)--(B+x)--(B+x+h)--(B+x+h+y)--(B+x+h)--(B+h),mediumred+2);
