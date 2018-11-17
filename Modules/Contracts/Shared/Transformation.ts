import { Point } from "./Point";
import { Angle } from "./Angle";
import { Scale } from "./Scale";

export class Transformation
{
    Translation: Point;
    Rotation: Angle;
    Skewness: Angle;
    Zoom: Scale;

    constructor(translate: Point, rotate: Angle, skew: Angle, zoom: Scale)
    {
        this.Translation = translate;
        this.Rotation = rotate;
        this.Skewness = skew;
        this.Zoom  = zoom; 
    }
}