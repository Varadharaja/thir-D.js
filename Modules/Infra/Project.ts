import { IShape } from "../Contracts/Interfaces/IShape";
import { ShapeAggregator } from "../Contracts/Shared/ShapeAggregator";

export class Project
{
    Name: string;
    Shapes : IShape[];
    Aggregators: ShapeAggregator[];
    

}