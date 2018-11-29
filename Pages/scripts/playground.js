var required = new Array();
required = [
    "Shapes/Polygon",
    "Shared/Color",
    "Shared/Transformation",
    "Shared/Point"
];
var doAnimate = false;
var PolygonNS;
var ColorNS;
var transformNS;
var pointNS;
var sharedNS;

require(required,function(poly,clr, txm, pt, shd)
{
    PolygonNS = poly;
    ColorNS = clr;
    transformNS = txm;
    pointNS = pt;
    sharedNS = shd;

    var planes = GetShapes();
    console.log(planes);
    SetWebGLParams(planes);
    animate(0);


});

function GetShapes()
{

    /* var polygon1 = new PolygonNS.Polygon(4,1,0.8,1, new ColorNS.Color(255,255,255));

    polygon1.Transformation = new transformNS.Transformation(new pointNS.Point(0,0,0));


     var polygon2 = new PolygonNS.Polygon(4,0.5,0.5,0.2, new ColorNS.Color(255,255,255));
    polygon2.Transformation = new transformNS.Transformation(new pointNS.Point(0,1,0));
    

    return polygon1.Planes().concat(polygon2.Planes());
*/

var ground = new PolygonNS.Polygon(4,0.5,0.5,0.2, new ColorNS.Color(255,255,255));

return GetMandapam();
   
}

function GetMandapam()
{
    var pillar1 = Pillar(new pointNS.Point(-2,-2,0));

    var pillar2 = Pillar(new pointNS.Point(2,-2,0));

    var pillar3 = Pillar(new pointNS.Point(2,-2,-4));

    var pillar4 = Pillar(new pointNS.Point(-2,-2,-4));

    var ceiling = new PolygonNS.Polygon(5,5,5,0.2, new ColorNS.Color(0,0,255));
    ceiling.Transformation = new transformNS.Transformation(new pointNS.Point(.2,1.2,-2));

    return pillar1.concat(pillar2).concat(pillar3).concat(pillar4).concat(ceiling.Planes());

}

function Pillar(translationPt)
{
    var polygon1 = new PolygonNS.Polygon(5,1,0.8,0.2, new ColorNS.Color(0,255,0));

    polygon1.Transformation = new transformNS.Transformation(new pointNS.Point(translationPt.x,translationPt.y + 3, translationPt.z ));

    var polygon2 = new PolygonNS.Polygon(5,0.5,0.5,2, new ColorNS.Color(0,255,0));

    polygon2.Transformation = new transformNS.Transformation(new pointNS.Point(translationPt.x,translationPt.y + 1, translationPt.z ));
    return polygon1.Planes().concat(polygon2.Planes());
}

$("#glcanvas").click(function(){
    doAnimate = !doAnimate;
    if (doAnimate)
    {
        animate(time_old);
    }
});