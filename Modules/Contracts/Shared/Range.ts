export class NumRange
{
    from: number;
    to: number;

    static Import(rng:any):NumRange
    {
        var opRng = new NumRange();
        if (rng != null)
        {
            opRng.from = rng.from;
            opRng.to = rng.to;
        
        }
        return opRng;
    }

}

export class NumRanges
{
    
    static  Import(rngs:any):NumRange[]
    {
        var outputRngs = new Array();

        if (rngs != null)
        {
            rngs.forEach(function(rng:any)
            {
                outputRngs.push(NumRange.Import(rng));
            }
            );
        }
        return outputRngs;
    }
}
