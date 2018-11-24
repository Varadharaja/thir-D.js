var required = new Array();
required = [
    "Shapes/Polygon",
    "Shared/Color"
]


require(required,function(poly,clr){

    var polygon = new poly.Polygon(4,5,4,10, new clr.Color(255,255,255));
    console.log(polygon.Planes())


});