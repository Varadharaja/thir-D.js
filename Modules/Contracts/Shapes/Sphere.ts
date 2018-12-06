import { Shape } from "./Shape";
import { Color } from "../Shared/Color";
import { ShapeTypes } from "./ShapeTypes";

export class Sphere extends Shape
{
    Radius: number;
    xPartitions: number;
    yPartitions: number;

    constructor(name: string,r:number,xParts: number, yParts: number, clr: Color)
    {
        super(name);
        this.Type = ShapeTypes.SPHERE;
        this.Radius = r;        
        this.xPartitions = xParts;
        this.yPartitions = yParts;

        this.Color = clr;
    }

    SetPlanes:()=> void = function():void
    {


    }
}