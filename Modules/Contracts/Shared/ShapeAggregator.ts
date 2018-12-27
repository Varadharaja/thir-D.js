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
    ShapeRepeatTransformationHint: RepeatHint;

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
            var hiddenPlanes = shape.HiddenPlanes;
            var planes = this.Planes;

            shape.Planes.forEach(function(pl,idx)
            {
                
                if (hiddenPlanes != null && hiddenPlanes.length > 0 && hiddenPlanes.indexOf(idx) > -1)
                {
                    pl.ShouldHide = true;
                }
            });
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

    AddShapeWithRepeatTransformationHint = function(shape: IShape, repeatHint: RepeatHint): void
    {
        if (this.ShapeIds.length > 0)
        {
            throw new Error("Aggregator " + this.Name + " already has a shape associated. Please define a separate Shape Aggregator.");
        
        } 
        else
        {
            shape.SetPlanes();
            let planes: Plane[] = new Array();  

            if (shape.Transformation != null)
            {
                planes = shape.TransformedPlanes();
            }
            else
            {
                planes = shape.Planes;    
            }

            this.Planes = this.Planes.concat(planes);

            for (let repeatCnt=0; repeatCnt < repeatHint.RepeatTimes; repeatCnt++)
            {

                let txedPlanes: Plane[] = JSON.parse(JSON.stringify(GxUtils.ApplyTransform(planes, repeatHint.Transformation)));

                this.Planes = this.Planes.concat(txedPlanes);

                planes = txedPlanes;

            }
        }
    }

    AddShapeWithRepeatHints = function(shape: IShape, repeatHints: RepeatHint[]): void 
    {
        if (this.ShapeIds.length > 0)
        {
            throw new Error("Aggregator " + this.Name + " already has a shape associated. Please define a separate Shape Aggregator.");
        
        } 
        else
        {
            let xRepeatHint: RepeatHint = new RepeatHint();
            let yRepeatHint: RepeatHint = new RepeatHint();
            let zRepeatHint: RepeatHint = new RepeatHint();
            
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

              for (let xRepeater=0; xRepeater < xRepeatHint.RepeatTimes; xRepeater++)
              {
                for (let yRepeater=0; yRepeater < yRepeatHint.RepeatTimes; yRepeater++)
                {
                    for (let zRepeater=0; zRepeater < zRepeatHint.RepeatTimes; zRepeater++)
                    {
                        let repeatShape :IShape = shape.Clone();

                        let x = shape.Transformation.Translation.x +  (xRepeater * xRepeatHint.SpaceDistance);
                        let y = shape.Transformation.Translation.y +  (yRepeater * yRepeatHint.SpaceDistance);
                        let z = shape.Transformation.Translation.z +  (zRepeater * zRepeatHint.SpaceDistance);

                        repeatShape.Transformation = new Transformation(new Point(x,y,z),shape.Transformation.Rotation,shape.Transformation.Skewness,shape.Transformation.Zoom);

                        repeatShape.SetPlanes();

                        if (repeatShape.Transformation != null && repeatShape.Transformation.Rotation != null)
                        {
                            this.Planes = this.Planes.concat(repeatShape.TransformedPlanes());

                        }
                        else
                        {
                            this.Planes = this.Planes.concat(repeatShape.Planes);    

                        }

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