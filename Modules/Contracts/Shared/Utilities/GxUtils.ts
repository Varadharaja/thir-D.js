import { Plane } from "../Plane";
import { Point } from "../Point";
import { Angle } from "../Angle";
import { Transformation } from "../Transformation";

export class GxUtils
{
    static NewGuid:()=> string = function():string
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static GetCentroid: (Planes:Plane[])=> Point = function(Planes: Plane[]): Point
    {
        var centroid:Point = new Point(0,0,0); 
        var planeCentroids: Point[] = new Array();

        Planes.forEach(function(plane: Plane)
        {
            var planeCentroid = new Point(0,0,0);
            plane.Points.forEach(function(pt: Point)
            {
                planeCentroid.x += pt.x;
                planeCentroid.y += pt.y;
                planeCentroid.z += pt.z;                

            });

            planeCentroid.x /= plane.Points.length;
            planeCentroid.y /= plane.Points.length;
            planeCentroid.z /= plane.Points.length;

            planeCentroids.push(planeCentroid);
        });

        
        planeCentroids.forEach(function(plCentroid: Point)
        {
            centroid.x += plCentroid.x;
            centroid.y += plCentroid.y;
            centroid.z += plCentroid.z;

        });
        
        centroid.x /= planeCentroids.length;
        centroid.y /= planeCentroids.length;
        centroid.z /= planeCentroids.length;
        
        return centroid;

    }

    static Rotate: (pt: Point, around: Point, angle: Angle)=> Point = function(pt:Point, around: Point, angle: Angle): Point
    {
        var rotatedPt:Point = new Point(pt.x,pt.y,pt.z);
        
        if (angle.alpha.Radian() > 0)
        {

            var coords = GxUtils.Rotate2DPoint(around.y,around.z, pt.y, pt.z, angle.alpha.Radian());
            rotatedPt.y = coords[0];
            rotatedPt.z = coords[1];
        }
        if (angle.beta.Radian() > 0)
        {

            var coords = GxUtils.Rotate2DPoint(around.z,around.x, pt.z, pt.x, angle.beta.Radian());
            rotatedPt.z = coords[0];
            rotatedPt.x = coords[1];
        }
        if (angle.gamma.Radian() > 0)
        {

            var coords = GxUtils.Rotate2DPoint(around.x,around.y, pt.x, pt.y, angle.gamma.Radian());
            rotatedPt.x = coords[0];
            rotatedPt.y = coords[1];
        }
        
        return rotatedPt;
    }

    static Rotate2DPoint:(x0:number,y0:number,x1: number, y1: number, theta: number)=>number[] = function(x0:number,y0:number,x1: number, y1: number, theta: number):number[]
    {

            var s = Math.sin(theta);
            var c = Math.cos(theta);

            // translate point back to origin:
            var x2: number = x1;
            var y2: number = y1;
    
            x2 -= x0;

            y2 -= y0;

            // rotate point
            var xnew = x2 * c - y2 * s;
            var ynew = x2 * s + y2 * c;

            // translate point back:
            x2 = Math.round((xnew + x0) * 1000)/1000;
            y2 = Math.round((ynew + y0) * 1000)/1000;

        
        return [x2,y2];
    }

    static TransformPlanes:(planes: Plane[], transformation: Transformation )=> Plane[] = function(planes: Plane[], transformation: Transformation ): Plane[] 
    {
        var centroid = GxUtils.GetCentroid(planes);
        
        var txedPlanes: Plane[] = new Array();
        for(var plCnt=0; plCnt < planes.length; plCnt++)
        {
            var pts: Point[] = new Array();

            for (var ptCnt=0; ptCnt < planes[plCnt].Points.length; ptCnt ++)
            {
                var pt = planes[plCnt].Points[ptCnt];

                if (transformation.Zoom != null)
                {
                     pts.push(new Point(pt.x * transformation.Zoom.xScale,
                                    pt.y* transformation.Zoom.yScale,
                                    pt.z*transformation.Zoom.zScale));
                }
                else if (transformation.Rotation != null)
                {
                    var rotatedPt : Point = GxUtils.Rotate(pt,centroid,transformation.Rotation);
                    pts.push(rotatedPt);
                }

            }
            
            txedPlanes.push(new Plane(pts,planes[plCnt].Color));
        }
        return txedPlanes;
    }
}