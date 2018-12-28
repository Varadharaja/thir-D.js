import { Plane } from "../Plane";
import { Point } from "../Point";
import { Angle } from "../Angle";
import { Transformation } from "../Transformation";
import { Scale } from "../Scale";
import { Color } from "../Color";
import { NumRange } from "../Range";

import { Shape } from "../../Shapes/Shape";
//import { PlaneColor } from "../../Interfaces/IShape";
import { Cube } from "../../Shapes/Cube";
import { Sphere } from "../../Shapes/Sphere";
import { Polygon } from "../../Shapes/Polygon";
import { IShape } from "../../Interfaces/IShape";

export class GxUtils
{
    static NewGuid:()=> string = function():string
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static GetCentroid: (Planes:Plane[])=> Point = function(Planes: Plane[]): Point
    {
        let centroid:Point = new Point(0,0,0); 
        let planeCentroids: Point[] = new Array();

        Planes.forEach(function(plane: Plane)
        {
            let planeCentroid = new Point(0,0,0);
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
        let rotatedPt:Point = new Point(pt.x,pt.y,pt.z);
        
        if (angle.alpha.Radian() > 0)
        {

            let coords = GxUtils.Rotate2DPoint(around.y,around.z, pt.y, pt.z, angle.alpha.Radian());
            rotatedPt.y = coords[0];
            rotatedPt.z = coords[1];
        }
        if (angle.beta.Radian() > 0)
        {

            let coords = GxUtils.Rotate2DPoint(around.z,around.x, pt.z, pt.x, angle.beta.Radian());
            rotatedPt.z = coords[0];
            rotatedPt.x = coords[1];
        }
        if (angle.gamma.Radian() > 0)
        {

            let coords = GxUtils.Rotate2DPoint(around.x,around.y, pt.x, pt.y, angle.gamma.Radian());
            rotatedPt.x = coords[0];
            rotatedPt.y = coords[1];
        }
        
        return rotatedPt;
    }

    static Rotate2DPoint:(x0:number,y0:number,x1: number, y1: number, theta: number)=>number[] = function(x0:number,y0:number,x1: number, y1: number, theta: number):number[]
    {

            let s = Math.sin(theta);
            let c = Math.cos(theta);

            // translate point back to origin:
            let x2: number = x1;
            let y2: number = y1;
    
            x2 -= x0;

            y2 -= y0;

            // rotate point
            let xnew = x2 * c - y2 * s;
            let ynew = x2 * s + y2 * c;

            // translate point back:
            x2 = Math.round((xnew + x0) * 1000)/1000;
            y2 = Math.round((ynew + y0) * 1000)/1000;

        
        return [x2,y2];
    }

    static TransformPlanes:(planes: Plane[], transformation: Transformation)=> Plane[] = function(planes: Plane[], transformation: Transformation): Plane[] 
    {
        let centroid = GxUtils.GetCentroid(planes);
        
        let txedPlanes: Plane[] = new Array();
        for(let plCnt=0; plCnt < planes.length; plCnt++)
        {
            

            let pts: Point[] = new Array();

            for (let ptCnt=0; ptCnt < planes[plCnt].Points.length; ptCnt++)
            {
                let pt = planes[plCnt].Points[ptCnt];
                let newPt: Point =pt;
              
                if (transformation.Rotation != null)
                {
                    newPt  = GxUtils.Rotate(pt,centroid,transformation.Rotation);
                }
                
                if (transformation.Zoom != null && transformation.Translation != null)
                {
                    newPt.x -= transformation.Translation.x;
                    newPt.y -= transformation.Translation.y;
                    newPt.z -= transformation.Translation.z;

                    newPt.x *= transformation.Zoom.xScale;
                    newPt.y *= transformation.Zoom.yScale;
                    newPt.z *= transformation.Zoom.zScale;
                    
                    newPt.x += transformation.Translation.x;
                    newPt.y += transformation.Translation.y;
                    newPt.z += transformation.Translation.z;
                }
                
                pts.push(newPt);

            }
            var newPl = new Plane(pts,planes[plCnt].Color);
            newPl.ShapeId = planes[plCnt].ShapeId;
            newPl.ShouldHide = planes[plCnt].ShouldHide;
            newPl.Color = planes[plCnt].Color;
            txedPlanes.push(newPl);
        }
        return txedPlanes;
    }

    static ApplyRepeatTransform:(Planes: Plane[], transformation: Transformation)=> Plane[] = function(Planes: Plane[], transformation: Transformation): Plane[] 
    {
        let planes:Plane[] = JSON.parse(JSON.stringify(Planes));
        let txedPlanes: Plane[] = new Array();
        for(let plCnt=0; plCnt < planes.length; plCnt++)
        {
            let pts: Point[] = new Array();

            for (let ptCnt=0; ptCnt < planes[plCnt].Points.length; ptCnt++)
            {
                let pt = planes[plCnt].Points[ptCnt];
                let newPt: Point = pt;
              
              
                if (transformation.Translation != null)
                {
                    newPt.x += transformation.Translation.x;
                    newPt.y += transformation.Translation.y;
                    newPt.z += transformation.Translation.z;

                }
                pts.push(newPt);

            }
            var newPl = new Plane(pts,planes[plCnt].Color);
            newPl.ShapeId = planes[plCnt].ShapeId;
            newPl.ShouldHide = planes[plCnt].ShouldHide;
            newPl.Color = planes[plCnt].Color;
            txedPlanes.push(newPl);
        }
        return txedPlanes;
    }

    static ComputeDistance:(pointA: Point, pointB: Point)=> number  = function(pointA: Point, pointB:Point):number
    {

        return Math.sqrt(Math.pow(pointA.x -pointB.x,2) + Math.pow(pointA.y -pointB.y,2) + Math.pow(pointA.z -pointB.z,2));
    }

}