import { Point } from "../Shared/Point";
import { Transformation } from "../Shared/Transformation";
import { Plane } from "../Shared/Plane";
import { Color } from "../Shared/Color";


export interface IShape
{
    // Planes
    Planes: ()=>Plane[];
    // Transformation Effects
    Transformation: Transformation; 
    Color: Color;  
}