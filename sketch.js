class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
    

}

function setup() 
{
	createCanvas(400, 400);
}

function draw()
{
    for(let w = 0; w <= 10; w++)
    {
        let nMap = [];
        for(let h = 0; h <= 10; h++)
        {
            
        }
    }
    console.log(noiseGrid());
}

function noiseGrid()
{
    const nMap = [];
    for(let x = 0; x <= 10; x++)
    {
        nMap[x] = [];
        for(let y = 0; y <= 10; y++)
        {
            const angle = random(2*Math.PI);

            const nytGrid = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            };
            nMap[x][y] = nytGrid; 
        }
        
    }
    return nMap;
}
