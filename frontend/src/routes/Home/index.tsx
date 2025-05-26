import { useEffect, useRef, useState } from 'react';
import './style.css'
import { getRndInteger } from '../../utils';
import { useLocation } from 'wouter';
import Transition from '../../components/Transition';

export default function Home() {
  const [, setLocation] = useLocation();
  const [op, setOp] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasWidthHeightRef = useRef({ width: 0, height: 0 });
  const animatablesRef = useRef<{
    x: number; y: number; size: number;
    curve: number, speed: number
  }[]>([]);

  useEffect(() => {
    const canvas = document.getElementById("smiley-canvas") as HTMLCanvasElement;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const dprMultiplier = dpr * 1.5;
    canvas.width = rect.width * dprMultiplier;
    canvas.height = rect.height * dprMultiplier;

    canvasWidthHeightRef.current.width = canvas.width;
    canvasWidthHeightRef.current.height = canvas.height;

    let ctx: null | CanvasRenderingContext2D = canvas.getContext('2d');

    let animationId;
    function animateEmoji() {
      // console.log("node count:", animatablesRef.current.length, isAnimating)

      if (!isAnimating) {
        // console.log("loop yes render no");

        ctx = null;
        return;
      }

      generateEmojis();

      if (!(ctx == null)) {
        console.log("loop yes render yes");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        animatablesRef.current.forEach((e, i) => {
          if (e.y < 0 || e.x < 10) {
            animatablesRef.current.splice(i, 1);
          }
          else {
            if (!(ctx == null)) {
              ctx.font = `${e.size}px Arial`;
              e.x += e.curve;
              e.y -= e.speed;
              ctx.fillText("🫡", e.x, e.y);
            }
          }
        })

      }

      animationId = requestAnimationFrame(animateEmoji);
    }

    animateEmoji();

    return () => {
      animatablesRef.current = [];
      cancelAnimationFrame(animationId!);
    }
  }, [isAnimating]);

  function handleHover() {
    setIsAnimating((_prevState) => true);
  }

  function handleLeave() {
    setIsAnimating((_prevState) => false);
  }

  function generateEmojis() {
    if (animatablesRef.current.length >= 10) return;

    let x = getRndInteger(10, canvasWidthHeightRef.current.width - 10)
    let y = getRndInteger(canvasWidthHeightRef.current.height + 300, canvasWidthHeightRef.current.height) * 1.1
    let size = getRndInteger(30, 50);
    const dx = getRndInteger(-1, 1); // curve path
    const dy = getRndInteger(1, 2); // speed

    animatablesRef.current.push({
      x: x,
      y: y,
      size: size,
      curve: dx,
      speed: dy
    });
  }



  return (
    <div id="home-root">
      <img src="/assets/renew-kanji-min.svg" alt="renew kanji" id="hero-kanji-image" />
      <div id="noise"></div>
      <main>
        <div>
          <h2 onMouseOver={handleHover} onMouseLeave={handleLeave}>for all the software
            that are rewritten in x</h2>
          <button onClick={() => {
            setOp(1);
            setTimeout(() => {
              setOp(0);
              setLocation("/explore");
            }, 1400);
          }}>explore</button>
        </div>
        <img src="/assets/tree_recurse.jpg" alt="new sapling growing from dead rooted tree log" />
      </main>
      <canvas id="smiley-canvas"></canvas>
      {
        op != 0 ? <Transition opacity={op}></Transition> : <></>
      }
    </div>
  )
}

