export class Degree
{
    Value: number;

    constructor(d: number)
    {
        this.Value = d;
    }

    Radian: ()=> number = function():number
    {
        return this.Value * Math.PI/180;
    }
}