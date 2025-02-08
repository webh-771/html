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

let highestZ = 1;

class Paper {
    constructor() {
        this.holdingPaper = false;
        this.prevMouseX = 0;
        this.prevMouseY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.currentPaperX = 0;
        this.currentPaperY = 0;
    }

    init(paper) {
        const startDrag = (e) => {
            this.holdingPaper = true;
            paper.style.zIndex = highestZ;
            highestZ += 1;

            let touch = e.touches ? e.touches[0] : e;
            this.prevMouseX = touch.clientX;
            this.prevMouseY = touch.clientY;

            e.preventDefault(); // Prevent unintended scrolling
        };

        const moveDrag = (e) => {
            if (!this.holdingPaper) return;

            let touch = e.touches ? e.touches[0] : e;
            this.mouseX = touch.clientX;
            this.mouseY = touch.clientY;

            this.velocityX = this.mouseX - this.prevMouseX;
            this.velocityY = this.mouseY - this.prevMouseY;

            this.currentPaperX += this.velocityX;
            this.currentPaperY += this.velocityY;

            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseY;

            paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
        };

        const endDrag = () => {
            this.holdingPaper = false;
        };

        // Mouse events
        paper.addEventListener("mousedown", startDrag);
        document.addEventListener("mousemove", moveDrag);
        window.addEventListener("mouseup", endDrag);

        // Touch events
        paper.addEventListener("touchstart", startDrag, { passive: false });
        document.addEventListener("touchmove", moveDrag, { passive: false });
        window.addEventListener("touchend", endDrag);
    }
}

// Initialize drag functionality for each paper
const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
    const p = new Paper();
    p.init(paper);
});

// Randomize rotation for every other element
document.querySelectorAll(".paper").forEach((el, index) => {
    if (index % 2 === 0) {
        const randomAngle = (Math.random() * 10 - 5).toFixed(2); // Between -5° and 5°
        el.style.transform += ` rotateZ(${randomAngle}deg)`;
    }
});

// Play background music on first click/touch
document.addEventListener("click", () => {
    const audio = document.getElementById("bg-music");
    if (audio.paused) {
        audio.play();
    }
});
document.addEventListener("touchstart", () => {
    const audio = document.getElementById("bg-music");
    if (audio.paused) {
        audio.play();
    }
}, { once: true }); // Ensures it plays only on the first touch
