import { useEffect } from "react";
import './style.css'

export default function Transition({ opacity }: { opacity: number }) {
  useEffect(() => {
    const transitionCanvas = document.getElementById("transition-canvas") as HTMLCanvasElement;
    const ctx = transitionCanvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const rect = transitionCanvas.getBoundingClientRect();
    const dprMultiplier = dpr;
    transitionCanvas.width = rect.width * dprMultiplier;
    transitionCanvas.height = rect.height * dprMultiplier;

    const d360 = Math.PI * 2;

    const centerX = transitionCanvas.width / 2;
    const centerY = transitionCanvas.height;
    const radius = Math.max(centerX, centerY) + 400;
    ctx.lineWidth = 2;

    let shift = 0;
    const sectionNum = 60;
    const stepAngle = d360 / sectionNum;

    let animationId;
    function draw() {
      let paintAngle = d360;
      ctx.clearRect(0, 0, transitionCanvas.width, transitionCanvas.height);

      for (let i = 0; i < sectionNum; i++) {
        // console.log("iteration count:", i + 1);

        const startAngle = 0 + shift;
        const endAngle = paintAngle + shift;

        ctx.fillStyle = i % 2 == 0 ? "#efefef" : "#ffffff";//"#9db177";
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.fill();

        paintAngle -= stepAngle;
      }

      ctx.fillStyle = "#9cb176";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 108, 0, d360);
      ctx.closePath();
      ctx.fill()

      shift += d360 / 2160;

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId!);
    }
  }, []);

  return (
    <div id="transition-root" style={{ opacity: opacity }}>
      <canvas id="transition-canvas"></canvas>
      <img src="/assets/circle.png" alt="circle" id="transition-circle" />
      <div id="noise"></div>
      <h2 id="transition-text"> &nbsp; loading…</h2>
    </div>
  )
}
