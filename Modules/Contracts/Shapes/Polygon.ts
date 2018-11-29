import { IShape } from "../Interfaces/IShape";
import { Point } from "../Shared/Point";
import { Transformation } from "../Shared/Transformation";
import { Degree } from "../Shared/Degree";
import { Plane } from "../Shared/Plane";
import { Angle } from "../Shared/Angle";
import { Color } from "../Shared/Color";


// Regular Polygon in 3D
//  Eg., Number of sides - 6
//
//      Top Face - Single side length - A 
//      ______
//     /      \   Top face angle (TopAngle) with respect to X-Axis = 0
//    |\______/|
//    |        |
//    |        |    Height of the polygon - H
//    |        |
//    |        |
//    | _ _ _ _|   Bottom Face - Single Side Length - B
//    |/       \    In this case A = B
//     \_______/    Bottom face angle (BottomAngle) with respect to x - Axis = 0
//  -----------------------------------------------------------------------------> X - axis
//           
//      
//      


export class Polygon implements IShape
{

    // Basic properties of the Shape
    SidesCount: number; 
    A: number;
    B: number;
    H: number;

    TopFaceInclination : Angle;
    BottomFaceInclination: Angle;

    
    // IShape members
    Transformation: Transformation;   

    Color: Color;

    Planes: ()=> Plane[] = function(): Plane[]
    {
        var planes: Plane[] = new Array();
        var theta = Math.PI * (1/2 - 1/this.SidesCount);

        var R1 = this.A/2 * 1/Math.cos(theta);
        var R2 = this.B/2 * 1/Math.cos(theta);

        var alpha = 2* Math.PI/this.SidesCount;
        var topFacePoints:Point[] = new Array();
        var bottomFacePoints: Point[] = new Array();
        var origin = this.Transformation != null && this.Transformation.Translation != null ? this.Transformation.Translation :  new Point(0,0,0);

        for (var sideIdx=0;sideIdx < this.SidesCount; sideIdx++)
        {
            var topPt =     new Point(
                origin.x + R1 * Math.cos(sideIdx * alpha),
                origin.y + this.H,
                origin.z + R1 * Math.sin(sideIdx * alpha)
           );

           var pt =     new Point(
                origin.x + R2 * Math.cos(sideIdx * alpha),
                origin.y,
                origin.z + R2 * Math.sin(sideIdx * alpha)
            );

            topFacePoints[sideIdx] = topPt;
            bottomFacePoints[sideIdx] = pt;
        } 

        planes[planes.length] = new Plane(topFacePoints, this.Color);
        planes[planes.length] = new Plane(bottomFacePoints, this.Color);


        for (var sideIdx = 0; sideIdx < this.SidesCount; sideIdx++)
        {
            var facePoints:Point[] = new Array();
            var idx1 = sideIdx;
            var idx2 = ((sideIdx+1) == this.SidesCount) ? 0 : sideIdx+1;
            facePoints = 
            [
                topFacePoints[idx1],
                topFacePoints[idx2],
                bottomFacePoints[idx2],
                bottomFacePoints[idx1]
            ];

            
            
            var r = this.Color.red;
            var g = this.Color.green;
            var b = this.Color.blue;

            var clr = new Color(r* (1- sideIdx/10)/255,g * (1- sideIdx/10)/255,b * (1- sideIdx/10)/255);
            planes[planes.length] = new Plane(facePoints,clr);

        }

        return planes;
    }

    constructor(sides:number,a: number, b: number, h: number, color: Color,tAng : Angle = new Angle(0,0,0), bAng: Angle= new Angle(0,0,0))
    {
        this.SidesCount =sides;

        this.A = a;
        this.B = b;
        this.H = h;
        this.Color = color;
        this.TopFaceInclination = tAng;
        this.BottomFaceInclination = bAng;         
    }


}
