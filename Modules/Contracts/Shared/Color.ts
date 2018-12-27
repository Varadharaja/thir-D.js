export class Color
{
    red: number;
    blue: number;
    green: number;
    alpha: number;    

    constructor(r: number, g: number, b: number, a: number = 1)
    {
        this.red = r/255;
        this.green = g/255;
        this.blue = b/255;
        this.alpha = a;        
    }

    static Import(clr: any): Color
    {
        let color = new Color(clr.red,clr.green,clr.blue);
        return color;
    }
}