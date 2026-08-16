"use client";

import { useEffect, useMemo, useRef, type PointerEvent as ReactPointerEvent, type WheelEvent } from "react";
import "./PortfolioInfiniteGallery.css";

export type GalleryItem = { src: string; alt: string; label: string };

export function PortfolioInfiniteGallery({ items }: { items: GalleryItem[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ x: -640, velocity: -.32, dragging: false, pointerX: 0, lastX: 0 });
  const repeated = useMemo(() => [...items, ...items, ...items], [items]);

  useEffect(() => {
    let raf = 0;
    const animate = () => {
      const state = stateRef.current;
      const stage = stageRef.current;
      const track = trackRef.current;
      if (stage && track) {
        const setWidth = track.scrollWidth / 3;
        if (!state.dragging) {
          state.velocity += (-.34 - state.velocity) * .025;
          state.x += state.velocity;
        }
        if (setWidth > 0) {
          while (state.x < -setWidth * 2) state.x += setWidth;
          while (state.x > -setWidth) state.x -= setWidth;
        }
        track.style.transform = `translate3d(${state.x}px,0,0)`;
        const center = stage.getBoundingClientRect().width / 2;
        track.querySelectorAll<HTMLElement>(".infinite-gallery__card").forEach((card) => {
          const rect = card.getBoundingClientRect();
          const normalized = Math.max(-1, Math.min(1, (rect.left + rect.width / 2 - center) / Math.max(center, 1)));
          card.style.setProperty("--gallery-shift", `${normalized * -18}px`);
          card.style.setProperty("--gallery-rotate", `${normalized * -8}deg`);
          card.style.setProperty("--gallery-scale", `${1 - Math.abs(normalized) * .08}`);
        });
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    Object.assign(stateRef.current, { dragging: true, pointerX: event.clientX, lastX: event.clientX, velocity: 0 });
  };
  const pointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (!state.dragging) return;
    const delta = event.clientX - state.pointerX;
    state.x += delta;
    state.velocity = event.clientX - state.lastX;
    state.pointerX = event.clientX;
    state.lastX = event.clientX;
  };
  const pointerUp = () => { stateRef.current.dragging = false; };
  const wheel = (event: WheelEvent<HTMLDivElement>) => {
    stateRef.current.x -= event.deltaY * .38 + event.deltaX * .5;
    stateRef.current.velocity = Math.max(-8, Math.min(8, -(event.deltaY + event.deltaX) * .04));
  };

  return (
    <div
      className="infinite-gallery"
      data-gallery="infinite"
      ref={stageRef}
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerCancel={pointerUp}
      onWheel={wheel}
      role="region"
      aria-label="作品图片无限画廊，支持拖动浏览"
    >
      <div className="infinite-gallery__top"><span>SELECTED VISUALS</span><span>拖动探索作品 ↔</span></div>
      <div className="infinite-gallery__track" ref={trackRef}>
        {repeated.map((item, index) => (
          <figure className="infinite-gallery__card" key={`${item.src}-${index}`} aria-hidden={index >= items.length}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt={index < items.length ? item.alt : ""} draggable={false} />
            <figcaption><span>0{(index % items.length) + 1}</span>{item.label}</figcaption>
          </figure>
        ))}
      </div>
      <div className="infinite-gallery__fade infinite-gallery__fade--left" aria-hidden="true" />
      <div className="infinite-gallery__fade infinite-gallery__fade--right" aria-hidden="true" />
    </div>
  );
}
