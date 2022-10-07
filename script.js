// Set up canvas
let ctx = can.getContext("2d");
let sf = 0.75;
can.width = window.innerWidth;
can.height = can.width * sf;
can.addEventListener("click", function(e)
{
    for (let i = 0; i < fishA.length; i++)
    {
        if (e.clientX - can.width / 2 >= fishA[i].x - fishA[i].w / 2 - fishA[i].w * 1.5 &&
        e.clientX - can.width / 2 <= fishA[i].x - fishA[i].w / 2 + fishA[i].w &&
        e.clientY >= fishA[i].y - fishA[i].h / 2 - fishA[i].h &&
        e.clientY <= fishA[i].y - fishA[i].h / 2 + fishA[i].h)
        {
            if (!fishA[i].click)
            {
                fishA[i].speed += 2.5;
                fishA[i].click = true;
            }
        }
    }
});

// Time variables
let delta = 0;
let last = 1;
let now = 1;
let count = 0;

// Fish color variables
let minr = 0;
let ming = 0;
let minb = 0;
let maxr = 256;
let maxg = 256;
let maxb = 256;

// Fish and bubble count and speed
let fspeed = 5;
let fcount = 10;
let bspeed = 5;
let bcount = 50;

// Fish and bubble containers
let fishA = [];
let bubbleA = [];

// Create background gradient
let back = ctx.createLinearGradient(0, 0, 0, can.height);
back = ctx.createLinearGradient(0, 0, 0, can.height);
back.addColorStop(0, "rgb(64, 192, 224)");
back.addColorStop(1, "rgb(0, 128, 160)");

// Initialize
delta = 10000;
draw();

function draw()
{
    // Delta time
    now = performance.now();
    delta += now - last;
    last = now;
    while (delta >= 1000 / 60)
    {
        delta -= 1000 / 60;
        count++;
        
        // Update fish and remove marked fish
        for(let i = 0; i < fishA.length; i++)
        {
            fishA[i].update();
            if (fishA[i].delete)
            {
                fishA.splice(i, 1);
                i--;
            }
        }

        // Update bubbles and remove marked bubbles
        for(let i = 0; i < bubbleA.length; i++)
        {
            bubbleA[i].update();
            if (bubbleA[i].delete)
            {
                bubbleA.splice(i, 1);
                i--;
            }
        }
    }

    // Enable display
    if (debug)
    {
        counter.style.display = "block";
        tcounter.innerHTML 
        = String(fishA.length).padStart(3, '0') + "&nbsp;&nbsp;" 
        + String(bubbleA.length).padStart(3, '0') + "&nbsp;&nbsp;" 
        + String(maxr).padStart(3, '0') + "&nbsp;&nbsp;" 
        + String(maxg).padStart(3, '0') + "&nbsp;&nbsp;"
        + String(maxb).padStart(3, '0');

        bcounter.innerHTML 
        = String(fspeed).padStart(3, '0') + "&nbsp;&nbsp;" 
        + String(bspeed).padStart(3, '0') + "&nbsp;&nbsp;" 
        + String(minr).padStart(3, '0') + "&nbsp;&nbsp;" 
        + String(ming).padStart(3, '0') + "&nbsp;&nbsp;"
        + String(minb).padStart(3, '0');
    }
    else
    {
        counter.style.display = "none";
    }

    // Create new fish if needed
    if (fcount > fishA.length) 
    {
        fishA.push(cfish());
    }

    // Create new bubble if needed
    if (bcount > bubbleA.length) 
    {
        bubbleA.push(cbubble());
    }
    
    // Position context and resize canvas
    ctx.save();
    ctx.clearRect(-can.width * 2, -can.height * 2, can.width * 4, can.height * 4);

    // Resize if size is different
    if (can.width != window.innerWidth || can.height != Math.round(can.width * sf))
    {
        can.width = window.innerWidth;
        can.height = can.width * sf;
    }

    // Move context to half width
    ctx.translate(can.width / 2, 0);

    // Draw background
    ctx.fillStyle = back;
    ctx.fillRect(-can.width / 2, 0, can.width, can.height);

    // Draw fish
    for(let i = 0; i < fishA.length; i++)
    {
        fishA[i].render();
    }

    // Draw bubbles
    for(let i = 0; i < bubbleA.length; i++)
    {
        bubbleA[i].render();
    }

    ctx.restore();
    window.requestAnimationFrame(draw);
}