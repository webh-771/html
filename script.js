document.addEventListener("DOMContentLoaded", function () {
    const papers = document.querySelectorAll(".paper.image");

    papers.forEach((paper) => {
        if (!paper.dataset.scattered) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const paperWidth = paper.clientWidth / 2;
            const paperHeight = paper.clientHeight / 2;

            const offsetX = (Math.random() - 0.5) * 600; // Spread up to ±300px from center
            const offsetY = (Math.random() - 0.5) * 500; // Spread up to ±250px from center
            const randomRotation = Math.random() * 30 - 15; // Rotate between -15° to 15°

            paper.style.position = "absolute";
            paper.style.left = `${centerX + offsetX - paperWidth}px`;
            paper.style.top = `${centerY + offsetY - paperHeight}px`;
            paper.style.transform = `rotate(${randomRotation}deg)`;

            paper.dataset.scattered = "true";
        }
    });
});


let highestZ=1;

class Paper{
    holdingpaper=false;
    prevMouseX=0;
    prevMouseY=0;
    mouseX=0;
    mouseY=0;
    VelocityX=0;
    VelocityY=0;
    currentPaperX=0;
    currentPaperY=0;

    init(paper){
        paper.addEventListener('mousedown',(e)=>{
            this.holdingpaper=true;
            paper.style.zIndex = highestZ;
            highestZ+=1;
            if(e.button===0){
                this.prevMouseX=this.mouseX;
                this.prevMouseY=this.mouseY;
            }
        })
        document.addEventListener('mousemove',(e)=>{
            this.mouseX=e.clientX;
            this.mouseY=e.clientY;  
            this.VelocityX=this.mouseX-this.prevMouseX;
            this.VelocityY=this.mouseY-this.prevMouseY;
            if(this.holdingpaper){
                this.currentPaperX+=this.VelocityX;
                this.currentPaperY+=this.VelocityY;
                this.prevMouseX=this.mouseX;
                this.prevMouseY=this.mouseY;
                paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
        }
        })
        window.addEventListener('mouseup',(e)=>{
            console.log('mouse button released ')
            this.holdingpaper=false;
        })
    }
}
const papers=Array.from(document.querySelectorAll('.paper'))
papers.forEach(paper =>{
    const p=new Paper();
    p.init(paper);
}
)
document.querySelectorAll('.paper').forEach((el, index) => {
    if (index % 2 === 0) { // Every other item
      const randomAngle = (Math.random() * 10 - 5).toFixed(2); // Random angle between -5 and 5 degrees
      el.style.transform = `rotateZ(${randomAngle}deg)`;
    }
  });
document.addEventListener("click", () => {
    const audio = document.getElementById("bg-music");
    if (audio.paused) {
        audio.play();
    }
});