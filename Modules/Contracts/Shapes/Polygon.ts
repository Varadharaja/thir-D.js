import { IShape } from "../Interfaces/IShape";
import { Point } from "../Shared/Point";
import { Transformation } from "../Shared/Transformation";
import { Degree } from "../Shared/Degree";


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
    A: number;
    B: number;
    H: number;

    TopAngle : Degree;
    BottomAngle: Degree;

    
    // IShape members
    Transformation: Transformation;   

    Points: () => Point[] = function(): Point[]
    {
        var points:Point[] = new Array();
        // Logic to generate the coordinates based on A,B, H, Top & Bottom Angles 
        return points;
    }

}
