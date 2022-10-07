class Fish
{
    constructor(type)
    {
        this.dir = (Math.floor(Math.random() * 2) == 1 ? 1 : -1);
        this.w = Math.floor(Math.random() * 7 + 47.5 * 3.5);
        this.h = Math.floor(Math.random() * 5 + 47.5 * 1.25);
        this.x = (can.width / 2 + this.w) * -this.dir;
        this.y = Math.random() * (can.height * 0.4) + this.h * 1.5;
        this.colorr = Math.floor(Math.random() * maxr - minr);
        this.colorg = Math.floor(Math.random() * maxg - ming);
        this.colorb = Math.floor(Math.random() * maxb - minb);
        this.speed = Math.random() * 0.5 + 0.75;
        this.click = false;
        this.delete = false;
        this.type = type;
    }
    update()
    {
        this.x += this.dir * this.speed * fspeed;
        this.y += Math.sin(count * 25) * this.speed * fspeed / 10;
        if ((this.x - this.w > this.dir * can.width / 2 && this.dir == 1) ||
        (this.x + this.w / 2 < this.dir * can.width / 2 && this.dir == -1))
        {
            this.delete = true;
        }
    }
    render()
    {
        // Top fin
        ctx.fillStyle = `rgb(${this.colorr - 20}, ${this.colorg - 20}, ${this.colorb - 20})`;
        ctx.beginPath();
        ctx.moveTo(this.x - this.w / 2 + (this.dir * this.w / 4), this.y - this.h / 1.125);
        ctx.lineTo(this.x - this.w / 2 - (this.dir * this.w / 4), this.y - this.h - this.h / 3);
        ctx.lineTo(this.x - this.w / 2 - (this.dir * this.w / 3), this.y - this.h / 1.5);
        ctx.lineTo(this.x - this.w / 2 + (this.dir * this.w / 5), this.y - this.h / 1.125);
        ctx.fill();
        ctx.closePath();

        // Tail fin
        ctx.fillStyle = `rgb(${this.colorr - 20}, ${this.colorg - 20}, ${this.colorb - 20})`;
        ctx.beginPath();
        ctx.moveTo(this.x - this.w / 2 + (this.w / 4 - (Math.sin(count / 25 * this.speed * fspeed)) - 17.5) * 3.5 * this.dir - this.w / 2 * this.dir, this.y - this.h / 2);
        ctx.lineTo(this.x - this.w / 2 - (this.w / 8 - (Math.sin(count / 25 * this.speed * fspeed)) - 17.5) * 3.5 * this.dir - this.w / 2 * this.dir, this.y - this.h / 2 - this.h / 2);
        ctx.lineTo(this.x - this.w / 2 - (this.w / 8 - (Math.sin(count / 25 * this.speed * fspeed)) - 17.5) * 3.5 * this.dir - this.w / 2 * this.dir, this.y - this.h / 2 + this.h / 2);
        ctx.lineTo(this.x - this.w / 2 + (this.w / 4 - (Math.sin(count / 25 * this.speed * fspeed)) - 17.5) * 3.5 * this.dir - this.w / 2 * this.dir, this.y - this.h / 2);
        ctx.fill();
        ctx.closePath();

        // Body
        ctx.fillStyle = `rgb(${this.colorr}, ${this.colorg}, ${this.colorb})`;
        ctx.beginPath();
        ctx.ellipse(this.x - this.w / 2, this.y - this.h / 2, this.w / 2, this.h / 2, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        // Eyes
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.ellipse(this.x - this.w / 2 + (this.dir * this.w / 4), this.y - this.h / 2 - this.h / 12, 10, 10, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.ellipse(this.x - this.w / 2 + (this.dir * this.w / 4), this.y - this.h / 2 - this.h / 12, 8, 8, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        // Shading
        let tailShade = ctx.createLinearGradient(this.x - (this.w / 2 - this.w / 2 * -this.dir), 0, this.x - (this.w / 2 - this.w / 2 * this.dir), 0);
        tailShade.addColorStop(0, "#00000000");
        tailShade.addColorStop(0.25, "#00000020");
        ctx.fillStyle = tailShade;
        ctx.beginPath();
        ctx.ellipse(this.x - this.w / 2, this.y - this.h / 2, this.w / 2, this.h / 2, Math.PI / 2 - Math.PI / 2 * -this.dir, Math.PI * 1.75 - ((Math.sin(count / 10 * this.speed * fspeed / 5) / 2.5 - 0.25)), Math.PI * 0.25 + ((Math.sin(count / 10 * this.speed * fspeed / 5) / 2.5 - 0.25)));
        ctx.fill();
        ctx.closePath();

        // Shade body
        let shade = ctx.createLinearGradient(0, this.y - this.h / 2, 0, this.y + this.h);
        shade.addColorStop(0, "#00000010");
        shade.addColorStop(1, "#000000ff");
        ctx.fillStyle = shade;
        ctx.beginPath();
        ctx.ellipse(this.x - this.w / 2, this.y - this.h / 2, this.w / 2, this.h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        // Mid fin
        ctx.fillStyle = `rgb(${this.colorr - 20}, ${this.colorg - 20}, ${this.colorb - 20})`;
        ctx.beginPath();
        ctx.moveTo(this.x - this.w / 2 - this.dir * this.w / 1.5 - this.w / 1.33 * -this.dir, this.y - this.h / 2 + this.h / 8);
        ctx.lineTo(this.x - this.w / 2 - this.dir * this.w / 8 - this.dir * this.w / 1.5 - this.w / 1.33 * -this.dir, this.y - this.h / 2 + this.h / 3);
        ctx.lineTo(this.x - this.w / 2 - this.dir * this.w / 8 - this.dir * this.w / 1.5 - this.w / 1.33 * -this.dir, this.y - this.h / 2 - this.h / 3);
        ctx.lineTo(this.x - this.w / 2 - this.dir * this.w / 1.5 - this.w / 1.33 * -this.dir, this.y - this.h / 2 - this.h / 8);
        ctx.lineTo(this.x - this.w / 2 - this.dir * this.w / 1.5 - this.w / 1.33 * -this.dir, this.y - this.h / 2 + this.h / 8);
        ctx.fill();
        ctx.closePath();

        // Draw collision rectangle
        if (debug)
        {
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#fff";
            ctx.strokeRect(this.x - this.w / 2 - this.w / 2, this.y - this.h / 2 - this.h, this.w, this.h * 2);
        }
    }
}

class RainbowFish extends Fish
{
    constructor(type)
    {
        super();
        this.type = type;
    }
    render()
    {
        // Glow
        let glow = ctx.createRadialGradient(this.x - this.w / 2, this.y - this.h / 2, 50, this.x - this.w / 2, this.y - this.h / 2, 100);
        glow.addColorStop(0, "#00000080");
        glow.addColorStop(1, "#f00");
        ctx.fillStyle = glow;
        //ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

        // Top fin
        ctx.fillStyle = `hsl(${count * this.speed * fspeed / 1.5}, 50%, 45%)`;
        ctx.beginPath();
        ctx.moveTo(this.x - this.w / 2 + (this.dir * this.w / 4), this.y - this.h / 1.125);
        ctx.lineTo(this.x - this.w / 2 - (this.dir * this.w / 4), this.y - this.h - this.h / 3);
        ctx.lineTo(this.x - this.w / 2 - (this.dir * this.w / 3), this.y - this.h / 1.5);
        ctx.lineTo(this.x - this.w / 2 + (this.dir * this.w / 5), this.y - this.h / 1.125);
        ctx.fill();
        ctx.closePath();

        // Tail fin
        ctx.fillStyle = `hsl(${count * this.speed * fspeed / 1.5}, 50%, 45%)`;
        ctx.beginPath();
        ctx.moveTo(this.x - this.w / 2 + (this.w / 4 - (Math.sin(count / 25 * this.speed * fspeed)) - 17.5) * 3.5 * this.dir - this.w / 2 * this.dir, this.y - this.h / 2);
        ctx.lineTo(this.x - this.w / 2 - (this.w / 8 - (Math.sin(count / 25 * this.speed * fspeed)) - 17.5) * 3.5 * this.dir - this.w / 2 * this.dir, this.y - this.h / 2 - this.h / 2);
        ctx.lineTo(this.x - this.w / 2 - (this.w / 8 - (Math.sin(count / 25 * this.speed * fspeed)) - 17.5) * 3.5 * this.dir - this.w / 2 * this.dir, this.y - this.h / 2 + this.h / 2);
        ctx.lineTo(this.x - this.w / 2 + (this.w / 4 - (Math.sin(count / 25 * this.speed * fspeed)) - 17.5) * 3.5 * this.dir - this.w / 2 * this.dir, this.y - this.h / 2);
        ctx.fill();
        ctx.closePath();

        // Body
        ctx.fillStyle = `hsl(${count * this.speed * fspeed / 1.5}, 50%, 50%)`;
        ctx.beginPath();
        ctx.ellipse(this.x - this.w / 2, this.y - this.h / 2, this.w / 2, this.h / 2, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        // Eyes
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.ellipse(this.x - this.w / 2 + (this.dir * this.w / 4), this.y - this.h / 2 - this.h / 12, 10, 10, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.ellipse(this.x - this.w / 2 + (this.dir * this.w / 4), this.y - this.h / 2 - this.h / 12, 8, 8, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        // Shade tail
        let tailShade = ctx.createLinearGradient(this.x - (this.w / 2 - this.w / 2 * -this.dir), 0, this.x - (this.w / 2 - this.w / 2 * this.dir), 0);
        tailShade.addColorStop(0, "#00000000");
        tailShade.addColorStop(0.25, "#00000020");
        ctx.fillStyle = tailShade;
        ctx.beginPath();
        ctx.ellipse(this.x - this.w / 2, this.y - this.h / 2, this.w / 2, this.h / 2, Math.PI / 2 - Math.PI / 2 * -this.dir, Math.PI * 1.75 - ((Math.sin(count / 10 * this.speed * fspeed / 5) / 2.5 - 0.25)), Math.PI * 0.25 + ((Math.sin(count / 10 * this.speed * fspeed / 5) / 2.5 - 0.25)));
        ctx.fill();
        ctx.closePath();

        // Shade body
        let shade = ctx.createLinearGradient(0, this.y - this.h / 2, 0, this.y + this.h);
        shade.addColorStop(0, "#00000010");
        shade.addColorStop(1, "#000000ff");
        ctx.fillStyle = shade;
        ctx.beginPath();
        ctx.ellipse(this.x - this.w / 2, this.y - this.h / 2, this.w / 2, this.h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        // Mid fin
        ctx.fillStyle = `hsl(${count * this.speed * fspeed / 1.5}, 50%, 45%)`;
        ctx.beginPath();
        ctx.moveTo(this.x - this.w / 2 - this.dir * this.w / 1.5 - this.w / 1.33 * -this.dir, this.y - this.h / 2 + this.h / 8);
        ctx.lineTo(this.x - this.w / 2 - this.dir * this.w / 8 - this.dir * this.w / 1.5 - this.w / 1.33 * -this.dir, this.y - this.h / 2 + this.h / 3);
        ctx.lineTo(this.x - this.w / 2 - this.dir * this.w / 8 - this.dir * this.w / 1.5 - this.w / 1.33 * -this.dir, this.y - this.h / 2 - this.h / 3);
        ctx.lineTo(this.x - this.w / 2 - this.dir * this.w / 1.5 - this.w / 1.33 * -this.dir, this.y - this.h / 2 - this.h / 8);
        ctx.lineTo(this.x - this.w / 2 - this.dir * this.w / 1.5 - this.w / 1.33 * -this.dir, this.y - this.h / 2 + this.h / 8);
        ctx.fill();
        ctx.closePath();

        // Draw collision rectangle
        if (debug)
        {
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#fff";
            ctx.strokeRect(this.x - this.w / 2 - this.w / 2, this.y - this.h / 2 - this.h, this.w, this.h * 2);
        }
    }
}

function cfish()
{
    let val = Math.floor(Math.random() * 50);
    switch (val)
    {
        case 0:
            {
                return new RainbowFish("Rainbow");
            } 
        default:
            {
                return new Fish("Normal");
            }
    }
}