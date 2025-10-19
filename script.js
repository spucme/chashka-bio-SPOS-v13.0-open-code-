class Rain {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.drops = [];
    this.init();
  }

  init() {
    this.resize();
    this.createDrops();
    this.animate();

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.width = this.canvas.width = this.canvas.offsetWidth;
    this.height = this.canvas.height = this.canvas.offsetHeight;
    this.createDrops();
  }

  createDrops() {
    this.drops = [];
    const count =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--rain-count"
        )
      ) || 150;

    for (let i = 0; i < count; i++) {
      this.drops.push({
        x: Math.random() * this.width,
        y: Math.random() * -this.height,
        speed:
          (Math.random() * 2 + 1) *
          (parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--rain-speed"
            )
          ) || 3),
        length:
          (Math.random() * 3 + 1) *
          (parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--rain-length"
            )
          ) || 2),
        size: Math.random() * 1.5 + 0.5,
        trail: [],
      });
    }
  }

  animate() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.ctx.fillRect(0, 0, this.width, this.height);

    const rainColor =
      getComputedStyle(document.documentElement).getPropertyValue(
        "--rain-color"
      ) || "rgba(255, 255, 255, 0.8)";

    for (let drop of this.drops) {
      drop.trail.push({ x: drop.x, y: drop.y });

      const maxTrail =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--trail-length"
          )
        ) || 20;
      if (drop.trail.length > maxTrail) {
        drop.trail.shift();
      }

      for (let i = 0; i < drop.trail.length; i++) {
        const point = drop.trail[i];
        const alpha = (i / drop.trail.length) * 0.3;

        this.ctx.beginPath();
        this.ctx.arc(
          point.x,
          point.y,
          drop.size * (i / drop.trail.length),
          0,
          Math.PI * 2
        );
        this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        this.ctx.fill();
      }

      this.ctx.beginPath();
      this.ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
      this.ctx.fillStyle = rainColor;
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.moveTo(drop.x, drop.y);
      this.ctx.lineTo(drop.x, drop.y - drop.length);
      this.ctx.strokeStyle = rainColor;
      this.ctx.lineWidth = drop.size / 2;
      this.ctx.stroke();

      drop.y += drop.speed;
      drop.x += Math.sin(drop.y * 0.01) * 0.5;

      if (drop.y > this.height + 50) {
        drop.y = -20;
        drop.x = Math.random() * this.width;
        drop.trail = [];
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("rain-canvas");
  new Rain(canvas);
});




const main = document.getElementById("main");
const bots2 = document.getElementById("bots2");
const maindiv = document.getElementById("maindiv");
const mainh2 = document.getElementById("mainh2");
const mh = document.getElementById("mh");

setTimeout(() => {
  maindiv.style.opacity = "1";
  setTimeout(() => {
    mainh2.style.opacity = "0";
    setTimeout(() => {
      mh.style.opacity = "1";
      maindiv.style.height = "auto";
      main.style.opacity = "1";
    }, 1000);
  }, 1500);
},500);


function bots() {
  main.style.opacity = "0";
  setTimeout(() => {
    bots2.style.opacity = "1";
    setTimeout(() => {
      main.style.display = "none";
      bots2.style.display = "block";
    },500);
  },1200);
};
