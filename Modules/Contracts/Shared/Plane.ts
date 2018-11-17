import { Point } from "./Point";
import { Color } from "./Color";

export class Plane
{

    Points: Point[];
    Color: Color;
    constructor(pts: Point[], color: Color)
    {
        this.Points = pts;
        this.Color = color;        
    }
    
}