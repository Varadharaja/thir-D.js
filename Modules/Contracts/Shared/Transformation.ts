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

    static Import(txm:any ): Transformation
    {
        if (txm != null)
        {
            let angle;
            let pt;
            let zoom;
            if (txm.Rotation != null)
            {
                angle = new Angle(txm.Rotation.alpha, txm.Rotation.beta,txm.Rotation.gamma);
            }

            if (txm.Translation != null)
            {
                pt = new Point(txm.Translation.x,txm.Translation.y,txm.Translation.z);

            }

            if (txm.Zoom != null)
            {
                zoom = new Scale(txm.Zoom.xScale,txm.Zoom.yScale,txm.Zoom.zScale);
            }
            
            return new Transformation(pt, angle,null,zoom);
        }
        else
        {
            return null;
        }
    }
}