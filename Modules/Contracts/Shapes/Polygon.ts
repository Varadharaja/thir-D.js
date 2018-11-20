import { IShape } from "../Interfaces/IShape";
import { Point } from "../Shared/Point";
import { Transformation } from "../Shared/Transformation";
import { Degree } from "../Shared/Degree";
import { Plane } from "../Shared/Plane";
import { Angle } from "../Shared/Angle";


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

    Planes: ()=> Plane[] = function(): Plane[]
    {
        var planes: Plane[] = new Array();
        var theta = Math.PI * (1/2 - 1/this.SidesCount);

        var R = this.A/2 * 1/Math.cos(theta);
        var topFacePoints:Point[] = new Array();

        



        return planes;
    }

    constructor(a: number, b: number, h: number, tAng : Angle = new Angle(0,0,0), bAng: Angle= new Angle(0,0,0))
    {

        this.A = a;
        this.B = b;
        this.H = h;
        this.TopFaceInclination = tAng;
        this.BottomFaceInclination = bAng;         
    }


}
