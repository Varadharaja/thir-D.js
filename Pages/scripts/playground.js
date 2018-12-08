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

var Projects = [
    {
        Name: "Fort",
        Shapes : [
            {
               Id: "4845c49b-a9a5-400f-a4e3-cae9b5ca4e9c",
               Name: "ground",
               Type: "CUBE",
               L: 6,
               W: 6,
               H: 0.2,
               Color: {
                   red: 0,
                   green: 255,
                   blue: 0
                },
                Transformation: {
                    Translation: 
                    {
                        x: -3,
                        y: -1.5,
                        z: -3
                    }
                }
            },
            {
                Id: "d7f3a04f-e010-4b13-85bc-893fb6b6ea06",
                Name: "water",
                Type: "CUBE",
                L: 5,
                W: 5,
                H: 0.3,
                Color: {
                    red: 0,
                    green: 0,
                    blue: 255
                 },
                 Transformation: {
                     Translation: 
                     {
                         x: -2.5,
                         y: -1.55,
                         z: -2.5
                     }
                 }
             },
             {
                 Id: "2eebf304-bf5f-479c-8131-04f9e70d80fd",
                 Name: "island",
                 Type: "CUBE",
                 L: 4,
                 W: 4,
                 H: 0.3,
                 Color: {
                     red: 0,
                     green: 255,
                     blue: 0
                  },
                  Transformation: {
                      Translation: 
                      {
                          x: -2,
                          y: -1.495,
                          z: -2
                      }
                  }
              }
        ],
        Aggregators: [
            {
                Name: "LandAndWater",
                ShapeIds: [
                    "4845c49b-a9a5-400f-a4e3-cae9b5ca4e9c",
                    "d7f3a04f-e010-4b13-85bc-893fb6b6ea06",
                    "2eebf304-bf5f-479c-8131-04f9e70d80fd"
                ]
            }
        ]
    },
    {
        Name: "Human",
        Shapes: [
            {
                Id: "abcd",
                Name: "Test Sphere",
                Type: "SPHERE",
                Radius: 0.5,
                xPartitions: 20,
                yPartitions: 20,
                Color: {
                    red: 255,
                    green: 224,
                    blue: 189
                 },
                Transformation: {
                    Translation: 
                    {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                }
            }
        ],
        Aggregators: [
            {
                Name: "Head",
                ShapeIds: [
                    "abcd"
                ]
            }
        ]
    }
]; 


LoadProject = function(ProjectName)
{
    var planes = new Array();
    var aggregators = new Array();

    var project = $.map(Projects, function(e,i){return e.Name == ProjectName ? e : null})[0];
    for(var aggCnt=0; aggCnt < project.Aggregators.length; aggCnt++)
    {
        aggregators[aggCnt] = new shapeAggregatorNS.ShapeAggregator();
        var shapeIds = project.Aggregators[aggCnt].ShapeIds.reduce(function(a,b){return a + "," + b});

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
                aggregators[aggCnt].Add(shape);
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
     $.map(Projects, function(e,i){
        $("#projectSelector").append("<option>" +  e.Name + "</option>");
     
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
    LoadProject(prj);

});