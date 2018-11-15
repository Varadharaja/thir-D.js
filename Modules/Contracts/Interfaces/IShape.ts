import { Point } from "../Shared/Point";
import { Transformation } from "../Shared/Transformation";


export interface IShape
{
    // Function to  generate the coordinates
    Points: () => Point[] ;
    // Transformation Effects
    Transformation: Transformation;   
}