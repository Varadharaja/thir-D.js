import { IShape } from "../Interfaces/IShape";
import { Plane } from "../Shared/Plane";
import { Transformation } from "../Shared/Transformation";
import { Color } from "../Shared/Color";
import { GxUtils } from "../Shared/Utilities/GxUtils";
import { ShapeTypes } from "./ShapeTypes";

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


}