import { Point } from "../Shared/Point";
import { Transformation } from "../Shared/Transformation";
import { Plane } from "../Shared/Plane";
import { Color } from "../Shared/Color";


export interface IShape
{
    Id: string;
    Name: string;

    // Planes
    Planes:Plane[];

    // Transformation Effects
    Transformation: Transformation; 
    Color: Color;  
    
    // Copy of the Shape 
    Clone: ()=> IShape;
    
    // Transform Operations
    Rotate:()=> void;
    Move:()=> void;
    Zoom:()=> void;

    // Generate Planes & Apply Transforms (if any)
    SetPlanes:() => void; 

}