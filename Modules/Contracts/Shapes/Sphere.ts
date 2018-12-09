import { Shape } from "./Shape";
import { Color } from "../Shared/Color";
import { ShapeTypes } from "./ShapeTypes";
import { Plane } from "../Shared/Plane";
import { Point } from "../Shared/Point";

export class Sphere extends Shape
{
    Radius: number;
    xPartitions: number;
    yPartitions: number;
    yPartStart: number;
    yPartEnd: number;

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
        var origin = this.Transformation != null && this.Transformation.Translation != null ? this.Transformation.Translation :  new Point(0,0,0);

        var planes: Plane[] = new Array();

        this.yPartStart = this.yPartStart ==  null ? 0 : this.yPartStart;
        this.yPartEnd = this.yPartEnd ==  null ? this.yPartitions : this.yPartEnd;

        for (var yParts = this.yPartStart; yParts <= this.yPartEnd; yParts++)
        {
            var points: Point[] = new Array();
            for (var xParts=0; xParts <= this.xPartitions; xParts++)
            {
                var theta: number = 2 * Math.PI * xParts/ this.xPartitions; 
                var z: number = origin.z - this.Radius + (2 * this.Radius * yParts / this.yPartitions);
                var r: number = 0;
                r = Math.sqrt(this.Radius * this.Radius - z * z);
                
                var x: number = origin.x + r * Math.cos(theta); 
                var y: number = origin.y + r * Math.sin(theta); 
                
                var pt : Point = new Point(x,y,z);

                points[points.length] = pt;
            }

            var plane: Plane = new Plane(points, this.Color, this.Id);

            planes[planes.length] = plane;

        }
        this.Planes = new Array();
        for (var plCnt=0; plCnt < planes.length; plCnt++)
        {

            
            for (var ptsCnt=0; ptsCnt < planes[plCnt].Points.length; ptsCnt++)
            {
                var pts: Point[] = new Array();
                 if (plCnt == planes.length-1)
                {
                    pts[pts.length] = planes[plCnt].Points[ptsCnt];
                    pts[pts.length] = planes[0].Points[ptsCnt];
                    if (ptsCnt == planes[plCnt].Points.length-1)
                    {
                        pts[pts.length] = planes[0].Points[0];
                        pts[pts.length] = planes[plCnt].Points[0];
                    }
                    else
                    {
                        pts[pts.length] = planes[0].Points[ptsCnt+1];
                        pts[pts.length] = planes[plCnt].Points[ptsCnt+1];
                    }
                }
                else
                {
                    pts[pts.length] = planes[plCnt].Points[ptsCnt];
                    pts[pts.length] = planes[plCnt+1].Points[ptsCnt];
                    if (ptsCnt == planes[plCnt].Points.length-1)
                    {
                        pts[pts.length] = planes[plCnt+1].Points[0];
                        pts[pts.length] = planes[plCnt].Points[0];
                    }
                    else
                    {
                        pts[pts.length] = planes[plCnt+1].Points[ptsCnt+1];
                        pts[pts.length] = planes[plCnt].Points[ptsCnt+1];

                    }

                }
                var pln: Plane = new Plane(pts, this.Color, this.Id);
                this.Planes[this.Planes.length] = pln;
            }

        }

        this.Planes[this.Planes.length] = planes[0];
        this.Planes[this.Planes.length] = planes[planes.length-1];

        //console.log(planes);
        //this.Planes = planes;
    }
}