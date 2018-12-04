var required = new Array();
required = [
    "Shapes/Polygon",
    "Shared/Color",
    "Shared/Transformation",
    "Shared/Point",
    "Shapes/Cube",
    "Shared/ShapeAggregator",
    "Shared/Scale"

];
var doAnimate = false;
var PolygonNS;
var ColorNS;
var transformNS;
var pointNS;
var cubeNS;
var shapeAggregatorNS;
var scaleNS;

requirejs(required,function(poly,clr, txm, pt,cbe, shpAgg,scl)
{
    PolygonNS = poly;
    ColorNS = clr;
    transformNS = txm;
    pointNS = pt;
    cubeNS = cbe;
    shapeAggregatorNS = shpAgg;
    scaleNS = scl;
    var planes = GetShapes();
    console.log(planes);
    SetWebGLParams(planes);
    animate(0);


});

function GetShapes()
{

   var shapeAggregator = new shapeAggregatorNS.ShapeAggregator();

   var ground = new cubeNS.Cube(6,6,0.2,new ColorNS.Color(0,255,0));
   ground.Transformation = new transformNS.Transformation(new pointNS.Point(-3,-1.5,-3));

   shapeAggregator.Add(ground);

   var water = new cubeNS.Cube(5,5,0.3,new ColorNS.Color(0,0,255));
   water.Transformation = new transformNS.Transformation(new pointNS.Point(-2.5,-1.55,-2.5));

   shapeAggregator.Add(water);


   var island = new cubeNS.Cube(4,4,0.3, new ColorNS.Color(0,255,0));

    island.Transformation = new transformNS.Transformation(new pointNS.Point(-2,-1.495,-2));

    shapeAggregator.Add(island);

    var brickRowCnt = 7;

    for (var rowCnt=0; rowCnt <= brickRowCnt; rowCnt++)
    {
        for (var brickCnt=0; brickCnt< 20; brickCnt++)
        {
            // back wall
            var brick = new cubeNS.Cube(0.2,0.2,0.1, new ColorNS.Color(208,133,111));
            brick.Transformation = new transformNS.Transformation(new pointNS.Point((rowCnt %2 ==0  ?  -2 : -1.9) + brickCnt*0.2,-1.18+rowCnt * 0.1,-2));

            shapeAggregator.Add(brick);
        
            // front wall
            if (brickCnt<= 7 ||  brickCnt>= 13 )
            {
                brick = new cubeNS.Cube(0.2,0.2,0.1, new ColorNS.Color(208,133,111));
                brick.Transformation = new transformNS.Transformation(new pointNS.Point((rowCnt %2 ==0  ?  -2 : -1.9) + brickCnt*0.2,-1.18+rowCnt * 0.1,1.8));
            }

            shapeAggregator.Add(brick);
        
        }
    }

    for (var rowCnt=0; rowCnt <= brickRowCnt; rowCnt++)
    {
        for (var brickCnt=0; brickCnt< 19; brickCnt++)
        {
            // side wall 1
            var brick = new cubeNS.Cube(0.2,0.2,0.1, new ColorNS.Color(208,133,111));
            brick.Transformation = new transformNS.Transformation(new pointNS.Point(-2,-1.18+rowCnt * 0.1,(rowCnt %2 ==0  ?  -2 : -1.9) + brickCnt*0.2));

            shapeAggregator.Add(brick);

            // side wall 2
            brick = new cubeNS.Cube(0.2,0.2,0.1, new ColorNS.Color(208,133,111));
            brick.Transformation = new transformNS.Transformation(new pointNS.Point(1.8,-1.18+rowCnt * 0.1,(rowCnt %2 ==0  ?  -2 : -1.9) + brickCnt*0.2));

            shapeAggregator.Add(brick);
        }
    }
    
     
   var frontWall = new cubeNS.Cube(3.8,0.2,0.1, new ColorNS.Color(208,133,111));
   frontWall.Transformation = new transformNS.Transformation(new pointNS.Point(-2,-1.18,1.3));
   shapeAggregator.Add(frontWall);
    
   
   /* var frontBehindWall = new cubeNS.Cube(3.8,0.01,0.5, new ColorNS.Color(83,43,28));
   frontBehindWall.Transformation = new transformNS.Transformation(new pointNS.Point(-2,-1.2,1.7));
   shapeAggregator.Add(frontBehindWall);
    
   */
   
   var frontWallCeiling = new cubeNS.Cube(3.8,0.2,0.1, new ColorNS.Color(210,139,119));
   frontWallCeiling.Transformation =  new transformNS.Transformation(new pointNS.Point(-2,-0.7,1.3));
   shapeAggregator.Add(frontWallCeiling);

   for (var pillarCnt=0; pillarCnt < 19; pillarCnt++)
   {

        if (pillarCnt < 9 || pillarCnt>=11)
        {

            
            var pillar = new PolygonNS.Polygon(6,0.04,0.04,0.5, new ColorNS.Color(208,133,111));

            pillar.Transformation = new transformNS.Transformation(new pointNS.Point(-1.9 + pillarCnt * 0.2,-1.18,1.4));

            shapeAggregator.AddPlanes(pillar.Planes());
        }
   }
   


   return shapeAggregator.Planes;
   
}



$("#glcanvas").click(function(){
    doAnimate = !doAnimate;
    if (doAnimate)
    {
        animate(time_old);
    }
});