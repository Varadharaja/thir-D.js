import { Degree } from "./Degree";

export class Angle
{
    alpha : Degree;
    beta : Degree;
    gamma : Degree;

    constructor(a: number, b: number, g:number)
    {
        this.alpha = new Degree(a);
        this.beta = new Degree(b);
        this.gamma = new Degree(g);
    }

}

