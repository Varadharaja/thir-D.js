import { IShape } from "../Interfaces/IShape";
import { Point } from "../Shared/Point";
import { Transformation } from "../Shared/Transformation";
import { Degree } from "../Shared/Degree";
import { Plane } from "../Shared/Plane";
import { Angle } from "../Shared/Angle";
import { Color } from "../Shared/Color";
import { Shape } from "./Shape";


export class Cube extends Shape
{

    W: number;
    L: number;
    H: number;
    
    SetPlanes: ()=>void = function(): void
    {
        var planes: Plane[] = new Array();
       
        var topFacePoints:Point[] = new Array();
        var bottomFacePoints: Point[] = new Array();
        var origin = this.Transformation != null && this.Transformation.Translation != null ? this.Transformation.Translation :  new Point(0,0,0);

        topFacePoints =  [
            new Point(origin.x , origin.y,origin.z),
            new Point(origin.x + this.L, origin.y,origin.z),
            new Point(origin.x + this.L, origin.y,origin.z+ this.W),
            new Point(origin.x , origin.y,origin.z+ this.W)
        ];

        bottomFacePoints =  [
            new Point(origin.x , origin.y + this.H,origin.z),
            new Point(origin.x + this.L, origin.y+ this.H,origin.z),
            new Point(origin.x + this.L, origin.y+ this.H,origin.z+ this.W),
            new Point(origin.x , origin.y+ this.H,origin.z+ this.W)
        ];

        planes[planes.length] = new Plane(topFacePoints, this.Color);
        planes[planes.length] = new Plane(bottomFacePoints, this.Color);


        for (var sideIdx = 0; sideIdx < 4; sideIdx++)
        {
            var facePoints:Point[] = new Array();
            var idx1 = sideIdx;
            var idx2 = ((sideIdx+1) == 4) ? 0 : sideIdx+1;
            facePoints = 
            [
                topFacePoints[idx1],
                topFacePoints[idx2],
                bottomFacePoints[idx2],
                bottomFacePoints[idx1]
            ];

            
            planes[planes.length] = new Plane(facePoints,this.Color);

        }

        this.Planes =  planes;
    }

    constructor(l:number, w:number, h:number, clr: Color)
    {
        super();
        this.L =l;
        this.W = w;
        this.H = h;         
        this.Color = clr;

        this.SetPlanes();
    }


}
