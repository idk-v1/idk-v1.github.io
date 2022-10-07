class Bubble
{
    constructor()
    {
        this.x = can.width / 2 - (Math.random() * can.width * 0.9 + can.width * 0.05);
        this.y = can.height * (Math.random() / 2 + 1);
        this.speed = 2;
        this.r = 25;
        this.delete = false;
    }
    update()
    {
        this.y -= this.speed * bspeed;
        this.x += Math.sin(count / 10) * this.speed * bspeed / 10;
        if (this.y <= -this.r)
        {
            this.delete = true;
        }
    }
    render()
    {
        // Color inside
        ctx.fillStyle = "#ccddee20";
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        // Draw outline
        ctx.strokeStyle = "#ddeeff40";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();

        // Draw collision rectangle
        if (debug)
        {
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#fff";
            ctx.strokeRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
        }
    }
}

function cbubble()
{
    return new Bubble();
}