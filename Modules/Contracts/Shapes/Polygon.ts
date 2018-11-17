import { IShape } from "../Interfaces/IShape";
import { Point } from "../Shared/Point";
import { Transformation } from "../Shared/Transformation";
import { Degree } from "../Shared/Degree";
import { Plane } from "../Shared/Plane";


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

    TopAngle : Degree;
    BottomAngle: Degree;

    
    // IShape members
    Transformation: Transformation;   

    Planes: ()=> Plane[] = function(): Plane[]
    {
        var planes: Plane[] = new Array();

        return planes;
    }

    constructor(a: number, b: number, h: number, tAng : Degree = new Degree(0), bAng: Degree= new Degree(0))
    {

        this.A = a;
        this.B = b;
        this.H = h;
        this.TopAngle = tAng;
        this.BottomAngle = bAng;         
    }


}
