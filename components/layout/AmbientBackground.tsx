"use client";

import { useEffect, useRef } from "react";

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cw = (canvas.width = window.innerWidth);
    let ch = (canvas.height = window.innerHeight);

    const handleResize = () => {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const particles = Array.from({ length: 22 }, () => ({
      x: Math.random() * cw,
      y: Math.random() * ch,
      r: Math.random() * 1.4 + 0.5,
      vx: (Math.random() - 0.5) * 0.14,
      vy: -Math.random() * 0.18 - 0.04,
      alpha: Math.random() * 0.28 + 0.08,
      tone: Math.random() > 0.35 ? "#D4AF37" : "#F3E5AB",
    }));

    let frameId: number;
    const render = () => {
      ctx.clearRect(0, 0, cw, ch);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) p.y = ch + 10;
        if (p.x < -10) p.x = cw + 10;
        if (p.x > cw + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.tone;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="luxury-backdrop" aria-hidden="true">
      <div className="luxury-radial-glow" />
      <div className="luxury-grid-overlay" />
      <canvas ref={canvasRef} className="luxury-dust-canvas" />
    </div>
  );
}
