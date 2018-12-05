import { Project } from "./Project";
import { Point } from "../Shared/Point";

export class Studio
{

    Project: Project;

    AddProject:()=> void;
    LoadProject:()=> void;
    AddShape:()=> void;
    AggregateShapes:()=> void;
    SelectShape:()=> void;
    DeleteShape:()=> void;
    DeleteAggregateShapes:()=> void;
    CameraPosition: Point;

}