import { Point } from "./Point";
import { Color } from "./Color";

export class Plane
{

    Points: Point[];
    Color: Color;
    ShapeId: string;

    constructor(pts: Point[], color: Color, shapeId: string = "")
    {
        this.Points = pts;
        this.Color = color;        
        if (shapeId != "")
        {
            this.ShapeId = shapeId;
        }
    }
    
}