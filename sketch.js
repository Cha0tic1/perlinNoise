new p5();

class Vector2D
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    // Funktion for dotprodukt af vores vektorer.
    dot(konstantVektor)
    {
        return this.x*konstantVektor.x + this.y*konstantVektor.y;
    }
}

function setup() 
{
	createCanvas(100,100);
    loadPixels();
    let d = pixelDensity();
    let w = d * width;
    let h = d * height;
    let skala = 0.0005;

    for(let x = 0; x<w; x++)
    {
        for(let y = 0; y<h; y++)
        {
            let index = 4*(x+y*width);
            let frek = skala;
            let n = 0.0;
            let amp = 1.0;
            for (let oct = 0; oct < 8; oct++)
            {
                let v = amp*noise2D(x*frek,y*frek)
                n += v;
                amp *= 0.5;
                frek *=2.0;
            }

            n+=1.0;
            n*=0.5;

            let rgb = Math.round(255*n);
            if(n < 0.5)
            {
            pixels[index]=0;
            pixels[index+1]=0;
            pixels[index+2]=rgb*2;
            pixels[index+3]=255;
            }
            else if(n < 0.9)
            {
            pixels[index]=0;
            pixels[index+1]=rgb;
            pixels[index+2]=rgb*0.5;
            pixels[index+3]=255;
            }
            else
            {
            pixels[index]=rgb;
            pixels[index+1]=rgb;
            pixels[index+2]=rgb;
            pixels[index+3]=255;
            }
        }
    }
       
}

function draw()
{
    updatePixels()
}

function permutationsTabel()
{
    // Lav en tabel fra 0-255
    let pTabel = [];
    for(let i = 0; i<256; i++)
    {
        pTabel[i]=i;
    }
    // Bland tabellen tilfældigt vha p5 indbygget shuffle funktion
    return shuffle(pTabel); 
}
let pTabel = permutationsTabel()

function lavVektor(ptable)
{
    //Tildel vores k variable et tal mellem 0 og 3
    let k = ptable % 4
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

// En funktion til at interpolere to værdier med hinanden.
// Interpolere er at finde en middelværdi mellem to værdier
function interpol(t,v1,v2)
{
    return v1+t*(v2-v1);
} 

// Vi laver en smooth overgang mellem vores værdier, således at vi kan få
// smooth overgange i stedet for bratte skift i vores værdier, og noget der
// minder om tv-støj.
function trans(t)
{
    return 6*t*t*t*t*t - 15*t*t*t*t + 10*t*t*t
}

function noise2D(x,y)
{
    // Vi bruger bitwise AND til at sikre at vores værdi ikke overstiger
    // 256, da det indeks ikke eksisterer i vores permutationsTabel
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    // Vi minuser x med floor(x) sådan så vi får et decimal tal, afhængigt af
    // x og y koordinatet de skal tegnes til, således at alle vektorer, har
    // samme længde.
    const xf = x-Math.floor(x);
    const yf = y-Math.floor(y);

    // Lav 4 vektorer i hvert hjørne der rammer samme sted
    const topHøjre = new Vector2D(xf-1.0,yf-1.0);
    const topVenstre = new Vector2D(xf,yf-1.0);
    const bundHøjre = new Vector2D(xf-1.0,yf);
    const bundVenstre = new Vector2D(xf,yf);

    // Find en værdi for hvert hjørne, afhængigt af vores permutationsTabel
    const værdiTopHøjre = pTabel[pTabel[X+1]+Y+1]
    const værdiTopVenstre = pTabel[pTabel[X]+Y+1]
    const værdiBundHøjre = pTabel[pTabel[X+1]+Y]
    const værdiBundVenstre = pTabel[pTabel[X]+Y]

    // Tag dot produktet af vores konstante vektorer og vores tilfældige.
    const dotTopHøjre = topHøjre.dot(lavVektor(værdiTopHøjre));
    const dotTopVenstre = topVenstre.dot(lavVektor(værdiTopVenstre));
    const dotBundHøjre = bundHøjre.dot(lavVektor(værdiBundHøjre));
    const dotBundVenstre = bundVenstre.dot(lavVektor(værdiBundVenstre));

    // Lav 2 værdier som bliver vores t værdi i interpol funktionen.
    // u er t værdien for interpolation langs x-aksen
    // v er t værdien for interpolation langs y-aksen
    let u = trans(xf)
    let v = trans(yf)
    return interpol(u,interpol(v,dotTopHøjre,dotBundHøjre),interpol(v,dotTopVenstre,dotBundVenstre))
}