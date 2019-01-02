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
let aggIncludes = new Array();
let aggIncludeLoadedCount = 0; 
let aggTotalCount = 0;

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
            
            if (project.Aggregators[aggCnt] == null)
            {
                continue;
            }
            aggregators[aggCnt].Id = project.Aggregators[aggCnt].Id;
            aggregators[aggCnt].Name = project.Aggregators[aggCnt].Name;
            aggregators[aggCnt].ParentId = project.Aggregators[aggCnt].ParentId;
            aggregators[aggCnt].Include = project.Aggregators[aggCnt].Include;
            aggregators[aggCnt].ApplyAfterTransformation = project.Aggregators[aggCnt].ApplyAfterTransformation;
            if (project.Aggregators[aggCnt].Transformation != null)
            {
                aggregators[aggCnt].Transformation = transformNS.Transformation.Import(project.Aggregators[aggCnt].Transformation);
            }
            if (project.Aggregators[aggCnt].ShapeRepeatTransformationHint != null)
            {
                aggregators[aggCnt].ShapeRepeatTransformationHint = project.Aggregators[aggCnt].ShapeRepeatTransformationHint;
            }

            if (project.Aggregators[aggCnt].Include != null)
            {
                continue;
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
                    if (aggregators[aggCnt].ParentId != null)
                    {
                        aggregators.forEach(function(agg)
                        {
                            if (agg.Name == aggregators[aggCnt].ParentId)
                            {

                                if (shapeRepeatHints != null)
                                {
                                    agg.AddShapeWithRepeatHints(shape,shapeRepeatHints);
                                }
                                else if (shapeRepeatTransformationHint != null)
                                {
                                    agg.AddShapeWithRepeatTransformationHint(shape,shapeRepeatTransformationHint);
                                }                    
                                else
                                {
                                    agg.AddShape(shape);
                                }

                            }
                        });
                    }
                    
                    else if (shapeRepeatHints != null)
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


        }

        for (let aggCnt=0; aggCnt< aggregators.length; aggCnt++)
        {
            if (aggregators[aggCnt].ParentId == null)
            {
                if (aggregators[aggCnt].Transformation != null)
                {
                    planes = planes.concat(aggregators[aggCnt].TransformedPlanes());
                }   
                else
                {
                    planes = planes.concat(aggregators[aggCnt].Planes);
    
                }
            }
        }

        Planes = planes;
    }
    //AssignLightIntensity();

    SetWebGLParams(Planes.filter(function(pl){return pl != null && !pl.ShouldHide}));
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

            if (project.Aggregators[aggCnt].Include != null)
            {
                continue;
            }
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
    let prjs = ["Tree/Cube","Fort","Human","Eye","NewFort","Elephant","Fort/Wall/Pillar1","Fort/Wall/Pillar2", "Fort/Wall/Wall","Fort/Wall/FortWallDemo","Fort/Wall/Entrance","Tree/Leaf","Tree/TreeDemo"];

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
    aggIncludeLoadedCount = 0;
    aggTotalCount = 0;
    aggIncludes = new Array();
    $.get("../Pages/data/"+ prj + ".json",function(data)
    {
        Project = data;

        LoadIncludes();
        //LoadProject(data);
        
        //LoadShapes(data);
        //AssignLightIntensity();

    })

});


LoadIncludes = function()
{

    
    aggIncludes = Project.Aggregators.filter(function(agg){return agg.Include != null});
    aggTotalCount = aggIncludes.length;
     
    if (aggIncludes != null && aggIncludes.length > 0)
    {
        for(let includeCnt=0; includeCnt < aggIncludes.length; includeCnt++)
        {
            LoadInclude(aggIncludes[includeCnt].Include, aggIncludes[includeCnt].Name);
        
        }
    }
    else
    {
        LoadProject(Project);
        LoadShapes(Project);
    }
}

function LoadInclude(include, aggregatorName)
{
    $.get("../Pages/data/"+ include + ".json?" + aggregatorName,function(data)
            {
    
                aggIncludeLoadedCount++;

                let querySplit = this.url.split("?");
                
                let urlParts = querySplit[0].split("/");
                let aggName = urlParts[urlParts.length-1].replace(".json","");
                let parentId = querySplit[1] == null ? data.Name : querySplit[1];
                Project.Shapes = Project.Shapes.concat(data.Shapes.map(function(shp){
                    shp.Id =  aggName + "." + shp.Id;
                    return shp;
                }));

                Project.Aggregators = Project.Aggregators.concat(data.Aggregators.map(function(agg)
                {
                    if (agg.Include != null)
                    {
                        aggTotalCount++;
                        LoadInclude(agg.Include,agg.Name);
                        //agg.ParentId = parentId;
                        return agg;
                    }
                    else
                    {
                        agg.ShapeIds = agg.ShapeIds.map(function(shpId)
                        {
                            return  aggName + "." + shpId; 
                        });
                        agg.ParentId = parentId;
                        return agg;
    
                    }
                }));
    
                if (aggIncludeLoadedCount == aggTotalCount)
                {
                    LoadProject(Project);
                    //LoadShapes(Project);
                }
        
            });
 
}

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

