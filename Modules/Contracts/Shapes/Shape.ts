import { IShape, PlaneColor } from "../Interfaces/IShape";
import { Plane } from "../Shared/Plane";
import { Transformation } from "../Shared/Transformation";
import { Color } from "../Shared/Color";
import { GxUtils } from "../Shared/Utilities/GxUtils";
import { ShapeTypes } from "./ShapeTypes";
import { NumRange } from "../Shared/Range";

export class Shape implements IShape
{
    Id: string;
    Name: string;
    Planes: Plane[];
    Transformation: Transformation;
    Color: Color;
    SetPlanes:()=> void;
    Type: ShapeTypes;
    Clone: ()=> IShape;
    ShouldHide: boolean = false;
    HiddenPlanes: number[];
    PlaneColors: PlaneColor[];
    HiddenRanges: NumRange[];
    VisibleRanges: NumRange[];

    constructor(Name: string)
    {

        this.Id =    GxUtils.NewGuid();
        this.Name = Name;
        this.Type = ShapeTypes.CUSTOM;
    }

    Move:()=> void = function()
    {

    }

    Rotate:()=> void = function()
    {
        
    }

    
    Zoom:()=> void = function()
    {
        
    }
    TransformedPlanes = function(): Plane[]
    {
        return GxUtils.TransformPlanes(this.Planes, this.Transformation);

    }

    ApplyPlaneColors:()=> void = function():void
    {
        if (this.PlaneColors != null && this.PlaneColors.length > 0)
        {
            let planes = this.Planes;

            this.PlaneColors.forEach(function(plColor:PlaneColor,i: number){

                let pColor: Color = plColor.Color;

                if (plColor.Range != null)
                {
                    for (var cnt=plColor.Range.from; cnt<= plColor.Range.to; cnt++)
                    {
                        planes[cnt].Color = pColor;
                    }
                }
                else
                {
                    plColor.Planes.forEach(function(plIdx: number)
                    {
                        planes[plIdx].Color = pColor;
    
                    });
                }
                
            });
        }
        let planes = this.Planes;

        if (this.HiddenRanges != null)
        {
            this.HiddenRanges.forEach(function(range: NumRange)
            {
                for (var cnt=range.from; cnt <= range.to; cnt++ )
                {
                    planes[cnt].ShouldHide = true;
                }
            });
        }

        if (this.VisibleRanges != null)
        {
            for (var cnt=0; cnt < planes.length; cnt++ )
            {
                planes[cnt].ShouldHide = true;
            }

            this.VisibleRanges.forEach(function(range: NumRange)
            {
                for (var cnt=range.from; cnt <= range.to; cnt++ )
                {
                    planes[cnt].ShouldHide = false;
                }
            });
        }
    }   

}