let required = new Array();
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
let doAnimate = false;
let PolygonNS;
let ColorNS;
let transformNS;
let pointNS;
let cubeNS;
let shapeAggregatorNS;
let scaleNS;
let sphereNS;
let projectNS;
let GxUtilsNS;
let angNS; 

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

let Projects = new Array();
let Project = null;

LoadProject = function(project, selectShapeId = "")
{
    Project = project;
    let planes = new Array();
    let aggregators = new Array();

    for(let aggCnt=0; aggCnt < project.Aggregators.length; aggCnt++)
    {
        aggregators[aggCnt] = new shapeAggregatorNS.ShapeAggregator();

        if (project.Aggregators[aggCnt].Transformation != null)
        {
            aggregators[aggCnt].Transformation = GetTransformation(project.Aggregators[aggCnt].Transformation);
        }

        let shapeIds = project.Aggregators[aggCnt].ShapeIds.reduce(function(a,b){return a + "," + b});
        let shapeRepeatHints = project.Aggregators[aggCnt].ShapeRepeatHints;
        $.map(project.Shapes,function(e,i)
        {
            if (shapeIds.indexOf(e.Id) > -1)
            {
                let shape;
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

                if (e.Id == selectShapeId)
                {
                    shape.Color = new ColorNS.Color(255,0,0);
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
    doAnimate = false;
}

function LoadShapes(project)
    {
        $("#shapes").html("");

        for (let aggCnt=0; aggCnt < project.Aggregators.length; aggCnt++)
        {
            let shapeMenuHtml = '<hr/><div  class="shape-menu">';
            shapeMenuHtml += "<span>" + project.Aggregators[aggCnt].Name + "</span>";
            shapeMenuHtml += "<br/>";
            let shapeIds = project.Aggregators[aggCnt].ShapeIds.reduce(function(a,b){return a + "," + b});

            $.map(project.Shapes,function(e,i)
            {
                if (shapeIds.indexOf(e.Id) > -1)
                {
                    shapeMenuHtml += '<div class="shape-menu">' + '<a href="#" shape-id="'+ e.Id +'">' +  e.Name+ '</a></div>';
                }
            });
            

            shapeMenuHtml += "</div>";
            $("#shapes").append(shapeMenuHtml);
        }


}


function GetTransformation(txm)
{
    let angle;
    let pt;
    let zoom;
    if (txm.Rotation != null)
    {
        angle = new angNS.Angle(txm.Rotation.alpha, txm.Rotation.beta,txm.Rotation.gamma);
    }

    if (txm.Translation != null)
    {
        pt = new pointNS.Point(txm.Translation.x,txm.Translation.y,txm.Translation.z);

    }

    if (txm.Zoom != null)
    {
        zoom = new scaleNS.Scale(txm.Zoom.xScale,txm.Zoom.yScale,txm.Zoom.zScale);
    }
    
    return new transformNS.Transformation(pt, angle,null,zoom);
}

function GetCube(shp)
{

    let cube = new cubeNS.Cube(shp.Name,shp.L,shp.W,shp.H, new ColorNS.Color(shp.Color.red,shp.Color.green,shp.Color.blue));

    cube.Transformation = GetTransformation(shp.Transformation);

    return cube;
}

function GetSphere(shp)
{
    let sphere = new sphereNS.Sphere(shp.Name,shp.Radius,shp.xPartitions,shp.yPartitions,new ColorNS.Color(shp.Color.red,shp.Color.green,shp.Color.blue));
    sphere.Transformation = GetTransformation(shp.Transformation);
    sphere.yPartStart = shp.yPartStart;
    sphere.yPartEnd = shp.yPartEnd;
    return sphere;
 
}

function GetPolygon(shp)
{
    let poly = new PolygonNS.Polygon(shp.Name,shp.SidesCount,shp.A,shp.B,shp.H, new ColorNS.Color(shp.Color.red,shp.Color.green,shp.Color.blue));
    poly.Transformation = GetTransformation(shp.Transformation);
    return poly;
}


$(document).ready(function()
{   
    let prjs = ["Fort","Human"];

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
    let prj = $(this).val();
    $.get("../Pages/data/"+ prj + ".json",function(data)
    {
        LoadProject(data);
        LoadShapes(data);

    })

});

$(document).on("click","a[shape-id]",function(e)
{
    LoadProject(Project, $(this).attr("shape-id"));
});