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
    "Contracts/Shared/Utilities/GxUtils",
    "Contracts/Shared/Angle"
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
var angNS; 
requirejs(required,function(poly,clr, txm, pt,cbe, shpAgg,scl, sph, prj, gxUtil, ang)
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
    angNS = ang;
});

var Projects = new Array();


LoadProject = function(project)
{
    var planes = new Array();
    var aggregators = new Array();

    for(var aggCnt=0; aggCnt < project.Aggregators.length; aggCnt++)
    {
        aggregators[aggCnt] = new shapeAggregatorNS.ShapeAggregator();

        if (project.Aggregators[aggCnt].Transformation != null)
        {
            aggregators[aggCnt].Transformation = GetTransformation(project.Aggregators[aggCnt].Transformation);
        }

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

        if (aggregators[aggCnt].Transformation != null)
        {
            planes = planes.concat(aggregators[aggCnt].TransformedPlanes());
        }   
        else
        {
            planes = planes.concat(aggregators[aggCnt].Planes);

        }
        

    }

    SetWebGLParams(planes);
    doAnimate = true;
    animate(0);

}

function GetTransformation(txm)
{
    var angle;
    
    if (txm.Rotation != null)
    {
        angle = new angNS.Angle(txm.Rotation.alpha, txm.Rotation.beta,txm.Rotation.gamma);
    }
    return new transformNS.Transformation(null, angle,null,null)
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
    sphere.yPartStart = shp.yPartStart;
    sphere.yPartEnd = shp.yPartEnd;
    return sphere;
 
}

function GetPolygon(shp)
{
    var poly = new PolygonNS.Polygon(shp.Name,shp.SidesCount,shp.A,shp.B,shp.H, new ColorNS.Color(shp.Color.red,shp.Color.green,shp.Color.blue));

    poly.Transformation = new transformNS.Transformation(new pointNS.Point(shp.Transformation.Translation.x,shp.Transformation.Translation.y,shp.Transformation.Translation.z));
    return poly;
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