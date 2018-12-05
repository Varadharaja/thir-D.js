import { IShape } from "../Interfaces/IShape";
import { Plane } from "../Shared/Plane";
import { Transformation } from "../Shared/Transformation";
import { Color } from "../Shared/Color";
import { GxUtils } from "../Shared/Utilities/GxUtils";

export class Shape implements IShape
{
    Id: string;
    Name: string;
    Planes: Plane[];
    Transformation: Transformation;
    Color: Color;
    SetPlanes:()=> void;


    constructor()
    {

        this.Id =    GxUtils.NewGuid();
        
    }

    Clone: ()=> IShape = function():IShape
    {

        var clonedShape: IShape = JSON.parse(JSON.stringify(this));

        return clonedShape;
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

}