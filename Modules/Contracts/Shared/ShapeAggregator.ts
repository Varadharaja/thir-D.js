import { IShape } from "../Interfaces/IShape";
import { Plane } from "./Plane";
import { Transformation } from "./Transformation";
import { Point } from "./Point";
import { GxUtils } from "./Utilities/GxUtils";
import { RepeatHint } from "./RepeatHint";

export class ShapeAggregator
{
    Id: string;
    Name: string;
    Transformation: Transformation;
    ShapeIds : string[]  = new Array();  ;
    ShapeRepeatHints: RepeatHint[];
    AggregateRepeatHints: RepeatHint[];

    constructor(transformation: Transformation)
    {
        this.Transformation = transformation;
        this.Id = GxUtils.NewGuid();    
    }

    Planes: Plane[]  = new Array();
    AddShape = function(shape: IShape): void 
    {
        if (this.ShapeRepeatHints != null )
        {
            throw new Error("Aggregator " + this.Name + " already has a shape associated with Repeat Hints. Please define a separate Shape Aggregator.");
        }
        else
        {
            this.ShapeIds[this.ShapeIds.length] = shape.Id;
            shape.SetPlanes();

            if (shape.Transformation != null && shape.Transformation.Rotation != null)
            {
                this.Planes = this.Planes.concat(shape.TransformedPlanes());

            }
            else
            {
                this.Planes = this.Planes.concat(shape.Planes);

            }
        }

    };

    AddShapeWithRepeatHints = function(shape: IShape, repeatHints: RepeatHint[]): void 
    {
        if (this.ShapeIds.length > 0)
        {
            throw new Error("Aggregator " + this.Name + " already has a shape associated. Please define a separate Shape Aggregator.");
        
        } 
        else
        {
            var xRepeatHint: RepeatHint = new RepeatHint();
            var yRepeatHint: RepeatHint = new RepeatHint();
            var zRepeatHint: RepeatHint = new RepeatHint();
            
            repeatHints.forEach(function (hint) {

                switch(hint.Axis)
                {
                    case "X":
                    xRepeatHint = hint;
                    break;
                    case "Y":
                    yRepeatHint = hint;
                    break;
                    case "Z":
                    zRepeatHint = hint;
                    break;

                }

              });

              for (var xRepeater=0; xRepeater < xRepeatHint.RepeatTimes; xRepeater++)
              {
                for (var yRepeater=0; yRepeater < yRepeatHint.RepeatTimes; yRepeater++)
                {
                    for (var zRepeater=0; zRepeater < zRepeatHint.RepeatTimes; zRepeater++)
                    {
                        var repeatShape :IShape = shape.Clone();

                        var x = shape.Transformation.Translation.x +  (xRepeater * xRepeatHint.SpaceDistance);
                        var y = shape.Transformation.Translation.y +  (yRepeater * yRepeatHint.SpaceDistance);
                        var z = shape.Transformation.Translation.z +  (zRepeater * zRepeatHint.SpaceDistance);
                        repeatShape.Transformation = new Transformation(new Point(x,y,z),null,null,null);

                        repeatShape.SetPlanes();
                        this.Planes = this.Planes.concat(repeatShape.Planes);    

                    }
                }    
              }

        }

    }

    AddPlanes = function(planes:Plane[]): void 
    {
        
        this.Planes = this.Planes.concat(planes);
    }

    TransformedPlanes = function(): Plane[]
    {
        return GxUtils.TransformPlanes(this.Planes, this.Transformation);

    }
}