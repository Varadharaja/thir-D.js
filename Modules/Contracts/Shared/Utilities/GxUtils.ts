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
        let planes:Plane[] = GxUtils.Copy(Planes);
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

    static Translate(planes: Plane[], translation: Point, centroid: Point=null): Plane[] 
    {
        if (centroid == null)
        {
            centroid = GxUtils.GetCentroid(planes);
        }
        let txedPlanes: Plane[] = new Array();
        for(let plCnt=0; plCnt < planes.length; plCnt++)
        {
            let pts: Point[] = new Array();

            for (let ptCnt=0; ptCnt < planes[plCnt].Points.length; ptCnt++)
            {
                let pt = planes[plCnt].Points[ptCnt];
                let newPt: Point = pt;
              
              
                if (translation != null)
                {
                    newPt.x -= centroid.x;
                    newPt.y -= centroid.y;
                    newPt.z -= centroid.z;

                    newPt.x += translation.x;
                    newPt.y += translation.y;
                    newPt.z += translation.z;

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

    static Zoom(planes: Plane[], zoom: Scale): Plane[] 
    {
        let centroid = GxUtils.GetCentroid(planes);
        
        let txedPlanes: Plane[] = new Array();
        for(let plCnt=0; plCnt < planes.length; plCnt++)
        {
            let pts: Point[] = new Array();

            for (let ptCnt=0; ptCnt < planes[plCnt].Points.length; ptCnt++)
            {
                let pt = planes[plCnt].Points[ptCnt];
                let newPt: Point = pt;
              
              
                if (zoom != null)
                {
                    newPt.x -= centroid.x;
                    newPt.y -= centroid.y;
                    newPt.z -= centroid.z;

                    newPt.x *= zoom.xScale;
                    newPt.y *= zoom.yScale;
                    newPt.z *= zoom.zScale;
                    
                    newPt.x += centroid.x;
                    newPt.y += centroid.y;
                    newPt.z += centroid.z;
        

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


    static RotatePlanes(Planes: Plane[], angle: Angle): Plane[] 
    {
        let planes: Plane[] = GxUtils.Copy(Planes);
        let centroid = GxUtils.GetCentroid(planes);
        
        let txedPlanes: Plane[] = new Array();
        for(let plCnt=0; plCnt < planes.length; plCnt++)
        {
            let pts: Point[] = new Array();

            for (let ptCnt=0; ptCnt < planes[plCnt].Points.length; ptCnt++)
            {
                let pt = planes[plCnt].Points[ptCnt];
                let newPt: Point;
                if (angle != null)
                {
                    newPt = GxUtils.Rotate(pt, centroid, angle);
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

    static Copy(object: any): any
    {
        return JSON.parse(JSON.stringify(object));
    }


    static GetPlaneEquationCoefficients(plane: Plane): number[]
    {
        let A: Point = plane.Points[0];
        let B: Point = plane.Points[1];
        let C: Point = plane.Points[2];
        
        let A1 = B.x - A.x;
        let A2 = B.y - A.y;
        let A3 = B.z - A.z;

        let B1 = C.x - A.x;
        let B2 = C.y - A.y;
        let B3 = C.z - A.z;

        let s1 = A2 * B3 - A3 * B2;
        let s2 = A3 * B1 - A1 * B3;
        let s3 = A1 * B2 - A2 * B1;
        let s4 = -s1 * A.x - s2 * A.y - s3 * A.z;


        return [s1,s2,s3,s4];
    } 

    static GetInclinationWithXZPlane(plane: Plane): number
    {
        let planeCoeffts = GxUtils.GetPlaneEquationCoefficients(plane);
        let a1 = planeCoeffts[0];
        let b1 = planeCoeffts[1];
        let c1 = planeCoeffts[2];

        let a2 = 0;
        let b2 = 1;
        let c2 = 0;

        let cosAlpha = Math.abs((a1 * a2) + (b1 * b2) + (c1 * c2))/ (Math.sqrt((a1 * a1) + (b1 * b1) + (c1* c1) * Math.sqrt((a2 * a2) + (b2 * b2) + (c2* c2) )));
        let alpha = Math.acos(cosAlpha);

        //cosα = |a1a2+b1b2+c1c2|a21+b21+c21√a22+b22+c22√

        return 180 * alpha/Math.PI;
    }

}