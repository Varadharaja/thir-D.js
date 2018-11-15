export class Degree
{
    Value: number;
    Radian: ()=> number = function():number
    {
        return this.Value * Math.PI/180;
    }
}