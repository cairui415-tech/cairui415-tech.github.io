"use client";

import { useEffect, useState } from "react";

const glyphs = "01<>/[]{}*+";

export function DecryptedText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const timer = window.setInterval(() => {
      const resolved = Math.min(text.length, Math.floor(frame / 2));
      setDisplay(
        text
          .split("")
          .map((character, index) => {
            if (character === " " || index < resolved) return character;
            return glyphs[(frame + index * 3) % glyphs.length];
          })
          .join(""),
      );
      frame += 1;
      if (resolved >= text.length) window.clearInterval(timer);
    }, 46);
    return () => window.clearInterval(timer);
  }, [text]);

  return <span aria-label={text}>{display}</span>;
}

type Point = { x: number; y: number; id: number };

export function PixelTrail() {
  const [points, setPoints] = useState<Point[]>([]);

  return (
    <div
      className="pixel-trail"
      data-motion="pixel-trail"
      aria-hidden="true"
      onPointerMove={(event) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const next = { x: event.clientX - bounds.left, y: event.clientY - bounds.top, id: performance.now() };
        setPoints((current) => [...current.slice(-7), next]);
      }}
      onPointerLeave={() => setPoints([])}
    >
      {points.map((point, index) => (
        <i
          key={point.id}
          style={{ left: point.x, top: point.y, opacity: (index + 1) / points.length }}
        />
      ))}
    </div>
  );
}
