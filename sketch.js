class Vector2D
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
    permutationsTabel()
}

function permutationsTabel()
{
    // Lav en tabel fra 0-255
    const P = [];
    for(let i = 0; i<256; i++)
    {
        P[i]=i;
    }
    // Bland tabellen tilfældigt
    shuffle(P, true);
    return P;
}
P = permutationsTabel()
function noise2D()
{
    // Vi bruger bitwise AND til at sikre at vores værdi ikke overstiger
    // 256, da det indeks ikke eksisterer i vores permutationsTabel
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    const xf = x-Math.floor(x);
    const yf = y-Math.floor(y);

    // Lav 4 vektorer i hvert hjørne der rammer samme sted
    const topHøjre = new Vector2D(xf-1.0,yf-1.0);
    const topVenstre = new Vector2D(xf,yf-1.0);
    const bundHøjre = new Vector2D(xf-1.0,yf);
    const bundVenstre = new Vector2D(xf,yf);

    const værdiTopHøjre = P[P[X+1]+Y+1]
    const værdiTopVenstre = P[P[X]+Y+1]
    const værdiBundHøjre = P[P[X+1]+Y]
    const værdiBundVenstre = P[P[X]+Y]
}