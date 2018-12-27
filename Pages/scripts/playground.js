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
    "Contracts/Shared/Angle",
    "Contracts/Interfaces/IShape",
    "Contracts/Shared/Range"
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
let numRangeNS;
let iShapeNS;

requirejs(required,function(poly,clr, txm, pt,cbe, shpAgg,scl, sph, prj, gxUtil, ang, iShp, numRng)
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
    iShapeNS = iShp;
    angNS = ang;
    numRangeNS = numRng; 
});

let Projects = new Array();
let Project = null;
let Planes = new Array();
let shapeMaps = new Array();
let selectedShapeId = "";
LoadProject = function(project, selectShapeId = "", reusePlanes= false)
{
    Project = project;
    selectedShapeId = selectShapeId;
    if (!reusePlanes)
    {

        let planes = new Array();
        let aggregators = new Array();

        shapeMaps = new Array();

        for(let aggCnt=0; aggCnt < project.Aggregators.length; aggCnt++)
        {
            aggregators[aggCnt] = new shapeAggregatorNS.ShapeAggregator();

            if (project.Aggregators[aggCnt].Transformation != null)
            {
                aggregators[aggCnt].Transformation = transformNS.Transformation.Import(project.Aggregators[aggCnt].Transformation);
            }

            let shapeIds = project.Aggregators[aggCnt].ShapeIds.reduce(function(a,b){return a + "," + b});
            let shapeRepeatHints = project.Aggregators[aggCnt].ShapeRepeatHints;
            let shapeRepeatTransformationHint = project.Aggregators[aggCnt].ShapeRepeatTransformationHint;
            $.map(project.Shapes,function(e,i)
            {

                if (shapeIds.indexOf(e.Id) > -1 && (e.ShouldHide == null || (e.ShouldHide != null && e.ShouldHide != true)))
                {
                    let shape;
                    switch(e.Type)
                    {
                        case "CUBE":
                        shape = cubeNS.Cube.Import(e);
                        break;
                        case "SPHERE":
                        shape = sphereNS.Sphere.Import(e);
                        break;
                        case "POLYGON":
                        shape = PolygonNS.Polygon.Import(e);
                    }

                    if (e.Id == selectShapeId)
                    {
                        shape.Color = new ColorNS.Color(255,0,0);
                    }
                    if (shapeRepeatHints != null)
                    {

                        aggregators[aggCnt].AddShapeWithRepeatHints(shape,shapeRepeatHints);

                    }
                    else if (shapeRepeatTransformationHint != null)
                    {
                        aggregators[aggCnt].AddShapeWithRepeatTransformationHint(shape,shapeRepeatTransformationHint);

                    }
                    else
                    {
                        aggregators[aggCnt].AddShape(shape);

                    }

                    shapeMaps.push({OldId: e.Id, NewId: shape.Id});
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
        Planes = planes;
    }
    //AssignLightIntensity();

    SetWebGLParams(Planes.filter(function(pl){return !pl.ShouldHide}));
    //SetWebGLParams(Planes);
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
                    shapeMenuHtml += '<br/><div class="shape-menu"><input type="checkbox" checked shp-idx="'+ e.Id +'"/>' + '<a href="#" shape-id="'+ e.Id +'">' +  e.Name+ '</a></div>';
                }
            });
            

            shapeMenuHtml += "</div>";
            $("#shapes").append(shapeMenuHtml);
        }


}


$(document).ready(function()
{   
    let prjs = ["Fort","Human","Eye","NewFort"];

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
        //AssignLightIntensity();

    })

});

$(document).on("click","a[shape-id]",function(e)
{
    LoadProject(Project, $(this).attr("shape-id"));

    LoadShapeProperties( $(this).attr("shape-id"), $(this).html().trim())

});



function LoadShapeProperties(shapeId, shapeName)
{
    $("span[for='shape-name']").html(shapeName);

    let newShapeId = shapeMaps.filter(function(e){return e["OldId"] == shapeId})[0].NewId;

    let shapePlanes = Planes.filter(function(e){ return e["ShapeId"] == newShapeId});
    let planesCnt = shapePlanes.length;
    let MaxColumnCnt = 5;
    let MaxRowCount = planesCnt/MaxColumnCnt;
    let pageNum = 0;

    $("#planes-removal-tbl").html("");

    let plIdx =  pageNum * MaxColumnCnt * MaxRowCount;
    for (let rowCnt = 0; rowCnt < MaxRowCount; rowCnt++)
    {
        let htmlContent = "<tr>";

        for (let colCnt = 0; colCnt < MaxColumnCnt; colCnt++)
        {
            if (plIdx<= planesCnt)
            {
                if (Planes[plIdx].ShouldHide)
                {
                    htmlContent += "<td> <input type='checkbox' pl-idx='"+ plIdx +"'/><a href='#'>"+ plIdx +"</a></td>";

                }
                else
                {
                    htmlContent += "<td> <input type='checkbox' pl-idx='"+ plIdx +"' checked/><a href='#'>"+ plIdx +"</a></td>";

                }

                plIdx++;
            }

        }
        
        htmlContent += "</tr>";
        $("#planes-removal-tbl").append(htmlContent);
    }

    /* for (var rowCnt=0; rowCnt < 10; rowCnt++)
    {

    }
    $("#planes-removal-tbl").html(""); */
}



$(document).on("change","input[pl-idx]",function(e)
{
    let currentPlIdx = Number($(this).attr("pl-idx"));

    let newShapeId = shapeMaps.filter(function(e){return e["OldId"] == selectedShapeId})[0].NewId;

    var plIdx = 0;
    Planes.forEach(function(e,i){ 
        if (e["ShapeId"] == newShapeId)
            {
                plIdx++;

                if (plIdx == currentPlIdx)
                {
                    Planes[i].ShouldHide = !Planes[i].ShouldHide;
                    Planes[i].Color =  Planes[i].ShouldHide ? new ColorNS.Color(255,255,0) : new ColorNS.Color(255,0,0) ;
                }
                

            }
        });

    LoadProject(Project, selectedShapeId, true);


});


$(document).on("change","input[shp-idx]",function(e)
{
    let currentShpIdx = ($(this).attr("shp-idx"));

    Project.Shapes.forEach(function(e,i)
    {
        if (e.Id == currentShpIdx)
        {
            
            e.ShouldHide = !e.ShouldHide ;
        }
    })
    
    LoadProject(Project, selectedShapeId, false);


});

let distanceArray = new Array();



AssignLightIntensity = function()
{
    let lightSource = new pointNS.Point(0,0,0);

   /* Planes.forEach(function(pl,i)
    {
        let centroid = GxUtilsNS.GxUtils.GetCentroid([pl]); 

        
        let distance = GxUtilsNS.GxUtils.ComputeDistance(lightSource, centroid);

        distanceArray.push(distance);
              
    });

    var sortedArray = distanceArray.sort();
    */

    Planes.forEach(function(pl,i)
    {
        let centroid = GxUtilsNS.GxUtils.GetCentroid([pl]); 

        
        let distance = GxUtilsNS.GxUtils.ComputeDistance(lightSource, centroid);
        //let rnk = sortedArray.indexOf(distance);
        //let lightIntensity  = rnk/sortedArray.length;
       let lightIntensity = 1/Math.pow(distance,1);
        //console.log(lightIntensity);
        
        pl.Color.red =  ( 1 -   lightIntensity);
         pl.Color.green =  ( 1 -     lightIntensity);
         pl.Color.blue = (1 -     lightIntensity);

        //pl.Color = new ColorNS.Color(r,g,b);
                 
    });


}

