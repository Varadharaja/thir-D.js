import { Point } from "../Shared/Point";
import { Transformation } from "../Shared/Transformation";
import { Plane } from "../Shared/Plane";


export interface IShape
{
    // Planes
    Planes: ()=>Plane[];
    // Transformation Effects
    Transformation: Transformation;   
}