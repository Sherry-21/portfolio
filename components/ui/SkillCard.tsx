"use client";

import { useEffect, useRef } from "react";
import type { SkillItem } from "@/data/portfolioData";

interface SkillCardProps {
  skill: SkillItem;
  index: number;
  isSpawned: boolean;
  onActivate: (telemetry: string) => void;
}

interface SpawnedEntity {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  decay: number;
  label: string | null;
}

export function SkillCard({
  skill,
  index,
  isSpawned,
  onActivate,
}: SkillCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHoveredRef = useRef(false);
  const mousePosRef = useRef({ x: 150, y: 120 });
  const entitiesRef = useRef<SpawnedEntity[]>([]);
  const wakeLoopRef = useRef<(() => void) | null>(null);

  const spawnBurst = (originX: number, originY: number, count = 8) => {
    const pool = skill.particles;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 0.9 + Math.random() * 1.9;
      entitiesRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        size: 2.5 + Math.random() * 3,
        life: 1.0,
        decay: 0.016 + Math.random() * 0.014,
        label:
          i % 2 === 0 ? pool[Math.floor(Math.random() * pool.length)] : null,
      });
    }
    if (entitiesRef.current.length > 36) {
      entitiesRef.current.splice(0, entitiesRef.current.length - 36);
    }
    wakeLoopRef.current?.();
  };

  useEffect(() => {
    const card = cardRef.current;
    const canvas = canvasRef.current;
    if (!card || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 300;
    let height = 240;
    let tick = (index + 1) * 14;
    let frameId = 0;
    let loopActive = false;
    const goldColor = "#D4AF37";
    const paleGold = "#F3E5AB";

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      const isHovered = isHoveredRef.current;
      tick += isHovered ? 0.055 : 0.015;

      const simType = skill.simType;
      if (simType === "golang") {
        for (let lane = 0; lane < 4; lane++) {
          const y = 44 + lane * 46;
          ctx.strokeStyle = goldColor;
          ctx.globalAlpha = isHovered ? 0.2 : 0.06;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();

          const packetX =
            ((tick * (72 + lane * 20) + lane * 85) % (width + 60)) - 30;
          ctx.globalAlpha = isHovered ? 0.72 : 0.2;
          ctx.fillStyle = paleGold;
          ctx.beginPath();
          ctx.roundRect(packetX, y - 2.5, 26, 5, 2.5);
          ctx.fill();
        }
      } else if (simType === "python") {
        const cols = 5;
        const rows = 3;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const nx = 38 + c * ((width - 76) / (cols - 1));
            const ny = 54 + r * 56;
            const pulse = Math.sin(tick * 2 + r + c) * 0.5 + 0.5;
            ctx.globalAlpha = isHovered ? 0.22 + pulse * 0.42 : 0.08;
            ctx.strokeStyle = goldColor;
            ctx.strokeRect(nx - 7, ny - 7, 14, 14);
            if (isHovered && pulse > 0.65) {
              ctx.fillStyle = paleGold;
              ctx.fillRect(nx - 3.5, ny - 3.5, 7, 7);
            }
          }
        }
      } else if (simType === "springboot") {
        for (let i = 0; i < 5; i++) {
          const bx = 42 + i * ((width - 84) / 4);
          const by = height - ((tick * 34 + i * 44) % (height - 32));
          ctx.globalAlpha = isHovered ? 0.42 : 0.1;
          ctx.strokeStyle = goldColor;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(bx, by, 9, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (simType === "rabbitmq") {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 12) {
          const y = height / 2 + Math.sin(x * 0.035 - tick * 2.2) * 26;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = goldColor;
        ctx.globalAlpha = isHovered ? 0.4 : 0.1;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      } else if (simType === "kafka") {
        for (let i = 0; i < 4; i++) {
          const x = 30 + i * ((width - 60) / 3);
          ctx.strokeStyle = goldColor;
          ctx.globalAlpha = isHovered ? 0.25 : 0.08;
          ctx.beginPath();
          ctx.moveTo(x, 20);
          ctx.lineTo(x, height - 20);
          ctx.stroke();
          const markerY = ((tick * 40 + i * 50) % (height - 40)) + 20;
          ctx.fillStyle = paleGold;
          ctx.globalAlpha = isHovered ? 0.7 : 0.2;
          ctx.fillRect(x - 3, markerY, 6, 12);
        }
      } else if (simType === "redis") {
        const cx = isHovered ? mousePosRef.current.x : width * 0.72;
        const cy = isHovered ? mousePosRef.current.y : height * 0.36;
        for (let r = 1; r <= 3; r++) {
          const rad = (tick * 40 + r * 28) % 90;
          ctx.beginPath();
          ctx.arc(cx, cy, rad, 0, Math.PI * 2);
          ctx.strokeStyle = goldColor;
          ctx.globalAlpha = (isHovered ? 0.5 : 0.13) * (1 - rad / 90);
          ctx.stroke();
        }
      } else if (simType === "nextjs" || simType === "vuejs") {
        for (let i = 0; i < 3; i++) {
          const offset = Math.sin(tick * 1.8 + i) * (isHovered ? 7 : 2);
          ctx.strokeStyle = goldColor;
          ctx.globalAlpha = isHovered ? 0.34 : 0.09;
          ctx.strokeRect(width - 115 + i * 12, 36 + i * 16 + offset, 68, 40);
        }
      } else if (simType === "sql") {
        const pts = [
          [width * 0.24, height * 0.35],
          [width * 0.54, height * 0.24],
          [width * 0.78, height * 0.48],
          [width * 0.45, height * 0.66],
        ];
        ctx.strokeStyle = goldColor;
        ctx.globalAlpha = isHovered ? 0.38 : 0.1;
        ctx.beginPath();
        pts.forEach(([px, py], idx) => {
          const next = pts[(idx + 1) % pts.length];
          ctx.moveTo(px, py);
          ctx.lineTo(next[0], next[1]);
        });
        ctx.stroke();
      }

      if (isHovered && Math.random() < 0.14) {
        spawnBurst(
          width * (0.2 + Math.random() * 0.6),
          height * (0.3 + Math.random() * 0.5),
          1
        );
      }

      const entities = entitiesRef.current;
      for (let i = entities.length - 1; i >= 0; i--) {
        const p = entities[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          entities.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = paleGold;

        if (p.label) {
          ctx.font = '600 10px "JetBrains Mono", monospace';
          ctx.fillText(p.label, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    };

    const stepLoop = () => {
      drawFrame();
      if (isHoveredRef.current || entitiesRef.current.length > 0) {
        frameId = requestAnimationFrame(stepLoop);
      } else {
        loopActive = false;
      }
    };

    const wakeLoop = () => {
      if (!loopActive) {
        loopActive = true;
        frameId = requestAnimationFrame(stepLoop);
      }
    };

    wakeLoopRef.current = wakeLoop;

    const resize = () => {
      const w = card.clientWidth;
      const h = card.clientHeight;
      if (w > 0 && h > 0) {
        width = canvas.width = w;
        height = canvas.height = h;
        drawFrame();
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      wakeLoopRef.current = null;
      window.removeEventListener("resize", resize);
    };
  }, [skill, index]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    isHoveredRef.current = true;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePosRef.current = { x, y };
    spawnBurst(x, y, 8);
    onActivate(skill.telemetry);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePosRef.current = { x, y };
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    if (Math.random() < 0.22) {
      spawnBurst(x, y, 2);
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  const handleFocus = () => {
    isHoveredRef.current = true;
    spawnBurst(150, 120, 8);
    onActivate(skill.telemetry);
  };

  return (
    <article
      ref={cardRef}
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleMouseLeave}
      style={
        {
          "--spawn-delay": `${index * 75}ms`,
        } as React.CSSProperties
      }
      className={`skill-card spawn-item ${isSpawned ? "is-spawned" : ""}`}
    >
      <canvas
        ref={canvasRef}
        className="skill-spawn-canvas"
        aria-hidden="true"
      />
      <div className="skill-card-top">
        <div className="skill-code-monogram">{skill.code}</div>
      </div>
      <div className="skill-card-body">
        <h3 className="skill-card-title">{skill.name}</h3>
        <p className="skill-card-desc">{skill.description}</p>
      </div>
      <div className="skill-card-footer">
        <span>{skill.context}</span>
      </div>
    </article>
  );
}
