if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="Cubes2";
if(settings.render < 0) settings.render=4;
settings.outformat="pdf";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

size(20cm);

defaultpen(fontsize(16pt));

draw((0,0.125)--(0,1.125), royalblue+opacity(0.3));
draw((1,0.125)--(1,1.125), royalblue+opacity(0.3));
draw((0,0.125)--(1,0.125), mediumred+opacity(0.3)+2);
draw((0,1.125)--(1,1.125), mediumred+opacity(0.3)+2);

draw((0,0.125)--(0,1.125), black+3.5);
draw((1,0.125)--(1,1.125), black+3.5);
draw((0,0.125)--(1,0.125), black+3.5);
draw((0,1.125)--(1,1.125), black+3.5);
draw((0,0.125)--(0,1.125), heavygreen+2);
draw((1,0.125)--(1,1.125), heavygreen+2);
draw((0,0.125)--(1,0.125), heavygreen+2);
draw((0,1.125)--(1,1.125), heavygreen+2);

pair A = (1.7,0);
pair x = (1,0);
pair y = (0.15,0.25);
pair h = (0,1);

draw(A--(A+h),royalblue+opacity(0.3));
draw((A+x)--(A+x+h),royalblue+opacity(0.3));
draw((A+x+y)--(A+x+y+h),royalblue+opacity(0.3));
draw((A+y)--(A+y+h),royalblue+opacity(0.3));
draw(A--(A+x)--(A+x+y)--(A+y)--cycle, mediumred+opacity(0.3)+2);
draw(shift(0,1)*(A--(A+x)--(A+x+y)--(A+y)--cycle), mediumred+opacity(0.3)+2);
//drawx(A--(A+x)--(A+x+y)--(A+y), heavygreen+2);
draw(A--(A+y), heavygreen+2+dotted);
//drawx(shift(0,1)*(A--(A+x)--(A+x+y)--(A+y)), heavygreen+2);
draw(shift(0,1)*(A--(A+y)), heavygreen+2+dotted);
//drawx(A--(A+h),heavygreen+2);
//drawx((A+y)--(A+y+h),heavygreen+2);
draw(A--(A+x)--(A+x+y)--(A+y)--(A+y+h)--(A+y+h+x)--(A+x+h)--(A+h)--A,black+3.5);
draw((A+y)--(A+y+h),heavygreen+2);
draw((A+h)--(A+h+x),black+3.5);
draw((A+y+h)--(A+y+h+x)--(A+x+h)--(A+h)--A--(A+x)--(A+x+y)--(A+y),heavygreen+2);

pair B = (3.6,0);

transform T = shift(B+(x+y+h)/2)*scale(0.5)*shift(-1*(B+(x+y+h)/2));

draw((B+y)--T*(B+y), royalblue+opacity(0.3));
draw((B+y+x)--T*(B+y+x), royalblue+opacity(0.3));
draw((B+x+y+h)--T*(B+x+y+h), royalblue+opacity(0.3));
draw((B+y+h)--T*(B+y+h), royalblue+opacity(0.3));
draw((B+y)--(B+x+y)--(B+x+y+h)--(B+y+h)--cycle, mediumred+opacity(0.3)+2);
draw(T*((B+y)--(B+x+y)--(B+x+y+h)--(B+y+h)--cycle), mediumred+opacity(0.3)+2);
draw((B+h)--T*(B+h),royalblue+opacity(0.3));
draw(B--T*(B),royalblue+opacity(0.3));
draw(T*((B+y+h)--(B+h)--B--(B+y)),mediumred+opacity(0.3)+2);
draw((B+y+h)--(B+h)--B--(B+y), mediumred+opacity(0.3)+2);
draw(T*(B--(B+x)--(B+x+y)--(B+x)--(B+x+h)--(B+x+h+y)--(B+x+h)--(B+h)),mediumred+opacity(0.3)+2);
draw(T*(B+x)--(B+x),royalblue+opacity(0.3));
draw(T*(B+x+h)--(B+x+h),royalblue+opacity(0.3));
draw(B--(B+x)--(B+x+y)--(B+x)--(B+x+h)--(B+x+h+y)--(B+x+h)--(B+h),mediumred+opacity(0.3)+2);
draw((B+x+y)--(B+x)--B--(B+h)--(B+x+h)--(B+x+h+y),heavygreen+2);
draw((B+x+h+y)--(B+h+y),heavygreen+2+dotted);
draw((B+y+h)--(B+y),heavygreen+2);
draw((B+y)--(B+x+y),heavygreen+2);
draw(T*((B+x+y)--(B+x)--B--(B+h)--(B+x+h)--(B+x+h+y)),heavygreen+2);
draw(T*((B+x+h+y)--(B+h+y)),heavygreen+2+dotted);
draw(T*((B+y+h)--(B+y)),heavygreen+2);
draw(T*((B+y)--(B+x+y)),heavygreen+2);
draw(T*(B+y+x+h)--(B+y+x+h),heavygreen+2);
draw(T*(B+y+h)--(B+y+h),heavygreen+2);

draw((B+x+y)--(B+y)--(B+y+h)--T*(B+y+h)--T*(B+y)--T*(B+y+x),black+3.5);
draw((B+x+y)--(B+y)--(B+y+h)--T*(B+y+h)--T*(B+y)--T*(B+y+x),heavygreen+2);
draw(T*(B+x+y)--T*(B+x)--T*(B)--T*(B+h)--T*(B+h+x)--T*(B+h+x+y)--(B+h+x+y)--(B+h+x),black+3.5);
draw(T*(B+y)--T*(B+x+y)--T*(B+x)--T*(B)--T*(B+h)--T*(B+h+x)--T*(B+h+x+y)--(B+h+x+y),heavygreen+2);
draw((B+h+x)--(B+h)--B--(B+x)--(B+x+y),black+3.5);
draw((B+h+x+y)--(B+h+x)--(B+h)--B--(B+x)--(B+x+y)--(B+y),heavygreen+2);