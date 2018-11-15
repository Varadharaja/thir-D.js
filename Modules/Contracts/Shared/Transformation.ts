import { Point } from "./Point";
import { Angle } from "./Angle";
import { Scale } from "./Scale";

export class Transformation
{
    Translation: Point;
    Rotation: Angle;
    Skewness: Angle;
    Zoom: Scale;
}