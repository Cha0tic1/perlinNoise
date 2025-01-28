new p5();

class Vector2D
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    dot(konstantVektor)
    {
        return this.x*konstantVektor.x + this.y*konstantVektor.y;
    }
}

function setup() 
{
	createCanvas(400, 400);
}

function draw()
{
    
}

function permutationsTabel()
{
    // Lav en tabel fra 0-255
    let P = [];
    for(let i = 0; i<256; i++)
    {
        P[i]=i;
    }
    // Bland tabellen tilfældigt
    return shuffle(P); 
}
let P = permutationsTabel()

function lavVektor(ptable)
{
    //Tildel vores k variable et tal mellem 0 og 3, v.ha bitwise AND
    let k = ptable & 3
    //Lav en vektor i en tilfældig retning afhængigt af k
    if(k == 0)
    {
        return new Vector2D(1.0,1.0);
    }
    else if(k == 1)
    {
        return new Vector2D(-1.0,1.0);
    }
    else if(k == 2)
    {
        return new Vector2D(1.0,-1.0);
    }
    else
    {
        return new Vector2D(-1.0,-1.0);
    }
}

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

    // Find en værdi for hvert hjørne, afhængigt af vores permutationsTabel
    const værdiTopHøjre = P[P[X+1]+Y+1]
    const værdiTopVenstre = P[P[X]+Y+1]
    const værdiBundHøjre = P[P[X+1]+Y]
    const værdiBundVenstre = P[P[X]+Y]

    // Tag dot produktet af vores konstante vektorer og vores tilfældige.
    const dotTopHøjre = topHøjre.dot(lavVektor(værdiTopHøjre));
    const dotTopVenstre = topVenstre.dot(lavVektor(værdiTopVenstre));
    const dotBundHøjre = bundHøjre.dot(lavVektor(værdiBundHøjre));
    const dotBundVenstre = bundVenstre.dot(lavVektor(værdiBundVenstre));
}