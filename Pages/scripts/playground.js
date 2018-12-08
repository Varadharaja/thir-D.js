var required = new Array();
required = [
    "Contracts/Shapes/Polygon",
    "Contracts/Shared/Color",
    "Contracts/Shared/Transformation",
    "Contracts/Shared/Point",
    "Contracts/Shapes/Cube",
    "Contracts/Shared/ShapeAggregator",
    "Contracts/Shared/Scale",
    "Contracts/Shapes/Sphere",
    "Infra/Project",
    "Contracts/Shared/Utilities/GxUtils"
];
var doAnimate = false;
var PolygonNS;
var ColorNS;
var transformNS;
var pointNS;
var cubeNS;
var shapeAggregatorNS;
var scaleNS;
var sphereNS;
var projectNS;
var GxUtilsNS;
requirejs(required,function(poly,clr, txm, pt,cbe, shpAgg,scl, sph, prj, gxUtil)
{
    PolygonNS = poly;
    ColorNS = clr;
    transformNS = txm;
    pointNS = pt;
    cubeNS = cbe;
    shapeAggregatorNS = shpAgg;
    scaleNS = scl;
    sphereNS = sph;
    projectNS = prj;
    GxUtilsNS = gxUtil;
    /* var planes = GetShapes();
    console.log(planes);
    SetWebGLParams(planes);
    animate(0);
    */
});

var Projects = new Array();


LoadProject = function(project)
{
    var planes = new Array();
    var aggregators = new Array();

    //var project = $.map(Projects, function(e,i){return e.Name == ProjectName ? e : null})[0];
    for(var aggCnt=0; aggCnt < project.Aggregators.length; aggCnt++)
    {
        aggregators[aggCnt] = new shapeAggregatorNS.ShapeAggregator();
        var shapeIds = project.Aggregators[aggCnt].ShapeIds.reduce(function(a,b){return a + "," + b});
        var shapeRepeatHints = project.Aggregators[aggCnt].ShapeRepeatHints;
        $.map(project.Shapes,function(e,i)
        {
            if (shapeIds.indexOf(e.Id) > -1)
            {
                var shape;
                switch(e.Type)
                {
                    case "CUBE":
                    shape = GetCube(e);
                    break;
                    case "SPHERE":
                    shape = GetSphere(e);
                    break;
                    case "POLYGON":
                    shape = GetPolygon(e);
                }

                if (shapeRepeatHints != null)
                {
                    aggregators[aggCnt].AddShapeWithRepeatHints(shape,shapeRepeatHints);

                }
                else
                {
                    aggregators[aggCnt].AddShape(shape);

                }
            }
        });
        
        planes = planes.concat(aggregators[aggCnt].Planes);

    }

    SetWebGLParams(planes);
    doAnimate = true;
    animate(0);

}

function GetCube(shp)
{

    var cube = new cubeNS.Cube(shp.Name,shp.L,shp.W,shp.H, new ColorNS.Color(shp.Color.red,shp.Color.green,shp.Color.blue));

    cube.Transformation = new transformNS.Transformation(new pointNS.Point(shp.Transformation.Translation.x,shp.Transformation.Translation.y,shp.Transformation.Translation.z));

    return cube;
}

function GetSphere(shp)
{
    var sphere = new sphereNS.Sphere(shp.Name,shp.Radius,shp.xPartitions,shp.yPartitions,new ColorNS.Color(shp.Color.red,shp.Color.green,shp.Color.blue));
    sphere.Transformation = new transformNS.Transformation(new pointNS.Point(shp.Transformation.Translation.x,shp.Transformation.Translation.y,shp.Transformation.Translation.z));

    return sphere;
 
}

function GetPolygon(shp)
{

}


$(document).ready(function()
{   
    var prjs = ["Fort","Human"];

     $.map(prjs, function(e,i){
        $("#projectSelector").append("<option>" +  e + "</option>");
     
    });

});

$("#glcanvas").click(function(){
    doAnimate = !doAnimate;
    if (doAnimate)
    {
        animate(time_old);
    }
});

$("#projectSelector").change(function()
{
    var prj = $(this).val();
    $.get("../Pages/data/"+ prj + ".json",function(data)
    {
        LoadProject(data);

    })

});