import { Point } from "../Shared/Point";
import { Transformation } from "../Shared/Transformation";
import { Plane } from "../Shared/Plane";
import { Color } from "../Shared/Color";
import { ShapeTypes } from "../Shapes/ShapeTypes";
import { NumRange } from "../Shared/Range";
import { PlaneColor } from "../Shared/PlaneColor";


export interface IShape
{
    Id: string;
    Name: string;
    Type: ShapeTypes;

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

    // Get Transformed planes
    TransformedPlanes:()=> Plane[];


    ShouldHide: boolean;

    HiddenPlanes: number[];    
    

    PlaneColors: PlaneColor[];

    HiddenRanges: NumRange[];

    VisibleRanges: NumRange[];


}


