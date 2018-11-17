import { Degree } from "./Degree";

export class Angle
{
    alpha : Degree;
    beta : Degree;
    gamma : Degree;

    constructor(a: Degree, b: Degree, g:Degree)
    {
        this.alpha = a;
        this.beta = b;
        this.gamma = g;
    }

}

