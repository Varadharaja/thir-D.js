export class Color
{
    red: number;
    blue: number;
    green: number;
    alpha: number;    

    constructor(r: number, g: number, b: number, a: number = 1)
    {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = a;        
    }
}