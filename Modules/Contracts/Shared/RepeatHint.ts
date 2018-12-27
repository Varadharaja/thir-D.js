import { Transformation } from "./Transformation";

export class RepeatHint
{
    Axis: string;
    RepeatTimes: number;
    SpaceDistance: number;
    Transformation: Transformation;

    constructor()
    {
        this.RepeatTimes = 1;
        this.SpaceDistance = 0;
    }
    
}