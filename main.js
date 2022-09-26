var fCount = 10;
var bCount = 10;
var tLight = 10;
var fSpeed = 100;
var bSpeed = 10;
var lScape = 1;
var maxR = 255;
var minR = 0;
var maxG = 255;
var minG = 0;
var maxB = 255;
var minB = 0;
var color = false;

var School = new Array();
var Bubbles = new Array();

var settings = false;
var menu = document.getElementById("menu");

var rmax = document.getElementById("rmax");
var rmin = document.getElementById("rmin");
var gmax = document.getElementById("gmax");
var gmin = document.getElementById("gmin");
var bmax = document.getElementById("bmax");
var bmin = document.getElementById("bmin");

var rgrad = document.getElementById("rgrad");
var ggrad = document.getElementById("ggrad");
var bgrad = document.getElementById("bgrad");

var speedf = document.getElementById("speedf");
var countf = document.getElementById("countf");

var speedb = document.getElementById("speedb");
var countb = document.getElementById("countb");

var dlt = 0;
var lst = performance.now();
var int = setInterval(tick, 0);

function tick() {
    var now = performance.now();
    dlt += now - lst;
    lst = now;
    while (dlt >= 1000 / 60) {
        dlt -= 1000 / 60;
        if (dlt > 10000) dlt = 0;
        update();
    }
    render();
}

function FishClick(e) {
    School[e.currentTarget.id].s = 10;
}

function Setting() {
    settings = !settings;
    menu.style.display = (settings ? "block" : "none");
}

function render() {
    for (var f = 0; f < School.length; f++) {
        School[f].e.style.left = `${window.innerWidth / 2 + School[f].d * window.innerWidth / 1.5 - School[f].x - 150}px`;
        School[f].e.style.top = `${School[f].y - 7.5}%`;

        School[f].t.style.display = (color ? "block" : "none");
    }

    for (var b = 0; b < Bubbles.length; b++) {
        Bubbles[b].e.style.top = `${Bubbles[b].y}px`;
        Bubbles[b].e.style.left = `${Bubbles[b].x}%`;
    }
    var body = document.querySelector("body");
    body.style.background = `linear-gradient(rgb(${154*tLight/10},${(188*tLight/10)},${(222*tLight/10)}),rgb(${(18*tLight/10)},${(52*tLight/10)},${(86*tLight/10)}))`;
    
    rgrad.style.backgroundImage = `linear-gradient(rgb(${maxR},0,0),rgb(${minR},0,0))`;
    ggrad.style.backgroundImage = `linear-gradient(rgb(0,${maxG},0),rgb(0,${minG},0))`;
    bgrad.style.backgroundImage = `linear-gradient(rgb(0,0,${maxB}),rgb(0,0,${minB}))`;
}

function update() {

    maxR = Number(rmax.value);
    minR = Number(rmin.value);
    maxG = Number(gmax.value);
    minG = Number(gmin.value);
    maxB = Number(bmax.value);
    minB = Number(bmin.value);

    fSpeed = Number(speedf.value);
    fCount = Number(countf.value);
    bSpeed = Number(speedb.value);
    bCount = Number(countb.value);

    if (School.length < fCount) School.push(new Fish());
    if (Bubbles.length < bCount) Bubbles.push(new Bubble());

    for (var b = 0; b < Bubbles.length; b++) {
        Bubbles[b].y -= 5 * bSpeed / 10;

        if (Bubbles[b].y < 0) {
            Bubbles[b].e.remove();
            if (Bubbles.length > bCount) {
                Bubbles.splice(b, 1);
            } else {
                Bubbles[b] = new Bubble();
                document.querySelector("body").appendChild(Bubbles[b].e);
                Bubbles[b].e.classList.add("bubble");
            }
        }
    }

    for (var f = 0; f < School.length; f++) {

        School[f].x += School[f].s * School[f].d * fSpeed / 10;
        
        if ((School[f].d == 1 && School[f].x >= window.innerWidth * 1.5) || 
        (School[f].d == -1 && School[f].x <= -window.innerWidth * 1.5)) {
            School[f].e.remove(); 
            if (School.length > fCount) {
                School.splice(f, 1);
            } else {
                School[f] = new Fish();
                School[f].e.appendChild(School[f].efm); 
                School[f].e.appendChild(School[f].efb); 
                School[f].e.appendChild(School[f].eft); 
                School[f].e.appendChild(School[f].ee); 
                School[f].e.appendChild(School[f].t);
                document.querySelector("body").appendChild(School[f].e);
                School[f].efm.classList.add("fin-mid"); 
                School[f].efb.classList.add("fin-end");
                School[f].eft.classList.add("fin-top");
                School[f].ee.classList.add("eye");
                School[f].e.classList.add("body");
                School[f].t.classList.add("text");
                School[f].efb.style.borderRight = `38px solid rgb(${School[f].r / 2},${School[f].g / 2},${School[f].b / 2})`;
                School[f].eft.style.background = `rgb(${School[f].r / 2},${School[f].g / 2},${School[f].b / 2})`;
                School[f].e.style.backgroundColor = `rgb(${School[f].r},${School[f].g},${School[f].b})`;
                School[f].efm.style.borderRight = `rgb(${School[f].r / 2},${School[f].g / 2},${School[f].b / 2}) solid 50px`;
                School[f].t.style.transform = `scaleX(${School[f].d})`;
                School[f].e.addEventListener("mousedown", FishClick);
                School[f].e.id = f;
                if (School[f].d != 1) School[f].e.style.transform = "scaleX(-1)";

                School[f].t.innerHTML = "<span style='color:" + (School[f].r == 255 || School[f].r == 0 ? "#ff0" : "#fff") + "'>" + (School[f].r).toString().padStart(3, '0') + 
                "</span>, <span style='color:" + (School[f].g == 255 || School[f].g == 0 ? "#ff0" : "#fff") + "'>" + (School[f].g).toString().padStart(3, '0') + 
                "</span>, <span style='color:" + (School[f].b == 255 || School[f].b == 0 ? "#ff0" : "#fff") + "'>" + (School[f].b).toString().padStart(3, '0') + "</span>";
            }
        }
    }
}

function Fish() {
    this.s = ((Math.random() * 2) + 1);
    this.d = (Math.floor(Math.random() * 2) == 1 ? -1 : 1);
    this.x = 0;
    this.y = Math.floor(Math.random() * 51) + 25;
    this.r = Math.floor(Math.random() * (maxR - minR)) + minR;
    this.g = Math.floor(Math.random() * (maxG - minG)) + minG;
    this.b = Math.floor(Math.random() * (maxB - minB)) + minB;
    this.e = document.createElement("div");
    this.efm = document.createElement("div");
    this.efb = document.createElement("div");
    this.eft = document.createElement("div");
    this.ee = document.createElement("div");
    this.t = document.createElement("div");
}

function Bubble() {
    this.y = Math.floor(Math.random() * 500) + window.innerHeight;
    this.x = Math.floor(Math.random() * 101);
    this.e = document.createElement("div");
}
