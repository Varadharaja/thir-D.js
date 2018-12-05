import { IShape } from "../Interfaces/IShape";
import { Plane } from "./Plane";
import { Transformation } from "./Transformation";
import { Point } from "./Point";

export class ShapeAggregator
{
    Transformation: Transformation;

    constructor(transformation: Transformation)
    {
        this.Transformation = transformation;
    }

    Planes: Plane[]  = new Array();
    Add = function(shape: IShape): void {
        
        shape.SetPlanes();
        this.Planes = this.Planes.concat(shape.Planes);

    }

    AddPlanes = function(planes:Plane[]): void {
        
        this.Planes = this.Planes.concat(planes);
    }

    TransformedPlanes = function(): Plane[]
    {
        var aggPlanes: Plane[] = new Array();
        for(var plCnt=0; plCnt < this.Planes.length; plCnt++)
        {
            var pts: Point[] = new Array();

            for (var ptCnt=0; ptCnt < this.Planes[plCnt].Points.length; ptCnt ++)
            {
                var pt = this.Planes[plCnt].Points[ptCnt];

                pts.push(new Point(pt.x * this.Transformation.Zoom.xScale,
                                    pt.y* this.Transformation.Zoom.yScale,
                                    pt.z*this.Transformation.Zoom.zScale));

            }
            
            aggPlanes.push(new Plane(pts,this.Planes[plCnt].Color));
        }
        return aggPlanes;

    }
}