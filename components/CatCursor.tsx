"use client";

import { useEffect, useRef } from "react";
import styles from "./CatCursor.module.css";

const CAT_ASSETS = {
  idle: "/cat/idle.svg",
  walk: "/cat/walk.svg",
  run: "/cat/run.svg",
} as const;

type CatState = keyof typeof CAT_ASSETS;

const FOLLOW_SPEED = 0.08;
const CURSOR_DISTANCE = 24;
const CAT_SIZE = 26;

export default function CatCursor() {
  const catRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const cat = catRef.current;
    const sprite = spriteRef.current;
    const supportsPointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!cat || !sprite || !supportsPointer.matches || reducedMotion.matches) return;

    let targetX = -CAT_SIZE * 2;
    let targetY = -CAT_SIZE * 2;
    let catX = targetX;
    let catY = targetY;
    let direction = 1;
    let currentState: CatState = "idle";
    let frameId = 0;

    const setState = (state: CatState) => {
      if (state === currentState) return;
      currentState = state;
      cat.dataset.state = state;
      sprite.src = CAT_ASSETS[state];
    };

    const updateTarget = (event: PointerEvent) => {
      const isMovingRight = event.clientX >= targetX;
      direction = isMovingRight ? 1 : -1;
      targetX = event.clientX - direction * CURSOR_DISTANCE;
      targetY = event.clientY + CURSOR_DISTANCE * 0.55;
      cat.style.opacity = "1";
    };

    const animate = () => {
      const deltaX = targetX - catX;
      const deltaY = targetY - catY;
      const distance = Math.hypot(deltaX, deltaY);

      catX += deltaX * FOLLOW_SPEED;
      catY += deltaY * FOLLOW_SPEED;
      cat.style.transform = `translate3d(${catX}px, ${catY}px, 0) scaleX(${direction})`;

      if (distance > 100) setState("run");
      else if (distance > 10) setState("walk");
      else setState("idle");

      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", updateTarget, { passive: true });
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", updateTarget);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return <div className={styles.cat} ref={catRef} data-state="idle" aria-hidden="true"><img className={styles.sprite} ref={spriteRef} src={CAT_ASSETS.idle} alt="" /></div>;
}
