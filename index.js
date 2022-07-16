const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


function draw(x,y,size,color){
    ctx.fillStyle = color;
    ctx.beginPath()
    ctx.arc(x,y,size,0,Math.PI*2)
    ctx.fill()
    ctx.closePath()
}
class Particle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.velocity = {
            x: (Math.random()-0.5)*1,
            y: (Math.random()-0.5)*1
        }
        this.size = Math.random()*2+2
        this.color = 'hsl('+hue+',100%,50%)'
    }
    update(){
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        // if (this.size > 0.2 ) this.size -= 0.01;
        draw(this.x,this.y,this.size,this.color);
    }
}
particleList = []
let hue = 100
// canvas.addEventListener('mousemove', (e) => {
//     for (let i = 0; i < 1; i++) {
//         particleList.push(new Particle(e.clientX,e.clientY))
//     }
// });
function init(){
    for (let i = 0; i < 250; i++) {
        x = Math.random()*canvas.width+2
        y = Math.random()*canvas.height+2
        hue+=10
        particleList.push(new Particle(x,y))
    }
}
init()
// canvas.addEventListener('click', (e) => {
//     init()
// })
function update(){
    for (let i = 0; i < particleList.length; i++) {
        for (let j = 0; j< particleList.length; j++){
            dx = Math.abs(particleList[i].x - particleList[j].x)
            dy = Math.abs(particleList[i].y - particleList[j].y)
            distance = Math.sqrt(dx*dx+dy*dy)
            if(distance<200){
                ctx.beginPath()
                ctx.strokeStyle = particleList[i].color
                ctx.lineWidth = 0.2
                ctx.moveTo(particleList[i].x,particleList[i].y)
                ctx.lineTo(particleList[j].x,particleList[j].y)
                ctx.stroke()
                ctx.closePath()
            }
            if(distance<100){
                particleList[i].velocity.x *= -1
                particleList[i].velocity.y *= -1
                particleList[j].velocity.x *= -1
                particleList[j].velocity.y *= -1
            }
        }
        particleList[i].update();
        // if(particleList[i].x > canvas.width || particleList[i].x < 0 || particleList[i].y > window.innerHeight || particleList[i].y < 0 || particleList[i].size< 0.2){
        //     particleList.splice(i,1)
        //     i--
        // }
        if (particleList[i].x > canvas.width) particleList[i].velocity.x *= -1;
        if (particleList[i].x < 0) particleList[i].velocity.x *= -1;
        if (particleList[i].y > canvas.height) particleList[i].velocity.y *= -1;
        if (particleList[i].y < 0) particleList[i].velocity.y *= -1;
    }
}

function animate(){
    ctx.fillStyle = "rgba(0,0,0,0.3)"
    ctx.fillRect(0,0,canvas.width,canvas.height)
    update()
    
    requestAnimationFrame(animate)
}
animate()