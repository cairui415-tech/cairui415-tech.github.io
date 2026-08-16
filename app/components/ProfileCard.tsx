"use client";

import { useCallback, useEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import "./ProfileCard.css";

type ProfileCardProps = {
  avatarUrl: string;
  name: string;
  title: string;
  handle: string;
  status?: string;
  contactText?: string;
  contactHref?: string;
  onContactClick?: () => void;
};

type CardVariables = CSSProperties & Record<`--${string}`, string>;

const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);

export function ProfileCard({
  avatarUrl,
  name,
  title,
  handle,
  status = "Available for interviews",
  contactText = "联系我",
  contactHref,
  onContactClick,
}: ProfileCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const updateTilt = useCallback((clientX: number, clientY: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const x = clamp(((clientX - rect.left) / rect.width) * 100);
    const y = clamp(((clientY - rect.top) / rect.height) * 100);
    const distance = clamp(Math.hypot(x - 50, y - 50) / 50, 0, 1);
    wrapper.style.setProperty("--pointer-x", `${x}%`);
    wrapper.style.setProperty("--pointer-y", `${y}%`);
    wrapper.style.setProperty("--pointer-from-left", `${x / 100}`);
    wrapper.style.setProperty("--pointer-from-top", `${y / 100}`);
    wrapper.style.setProperty("--pointer-from-center", `${distance}`);
    wrapper.style.setProperty("--rotate-x", `${-(x - 50) / 7}deg`);
    wrapper.style.setProperty("--rotate-y", `${(y - 50) / 6}deg`);
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => updateTilt(event.clientX, event.clientY));
  };

  const resetTilt = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    wrapper.style.setProperty("--pointer-x", "50%");
    wrapper.style.setProperty("--pointer-y", "50%");
    wrapper.style.setProperty("--pointer-from-left", ".5");
    wrapper.style.setProperty("--pointer-from-top", ".5");
    wrapper.style.setProperty("--pointer-from-center", "0");
    wrapper.style.setProperty("--rotate-x", "0deg");
    wrapper.style.setProperty("--rotate-y", "0deg");
  };

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const style: CardVariables = {
    "--pointer-x": "50%",
    "--pointer-y": "50%",
    "--pointer-from-left": ".5",
    "--pointer-from-top": ".5",
    "--pointer-from-center": "0",
    "--rotate-x": "0deg",
    "--rotate-y": "0deg",
  };

  return (
    <div
      ref={wrapperRef}
      className="pc-card-wrapper"
      data-profile-card="cai-rui"
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="pc-behind" aria-hidden="true" />
      <article className="pc-card" aria-label={`${name}的个人名片`}>
        <div className="pc-inside">
          <div className="pc-shine" aria-hidden="true" />
          <div className="pc-glare" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="pc-avatar" src={avatarUrl} alt={`${name}个人照片`} loading="lazy" />
          <div className="pc-heading">
            <p>PROFILE / 2026</p>
            <h3>{name}</h3>
            <span>{title}</span>
          </div>
          <div className="pc-user-info">
            <div className="pc-mini-avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={avatarUrl} alt="" />
            </div>
            <div className="pc-user-text">
              <b>@{handle}</b>
              <span><i aria-hidden="true" />{status}</span>
            </div>
            <button type="button" onClick={() => {
              onContactClick?.();
              if (contactHref) window.location.href = contactHref;
            }}>{contactText}</button>
          </div>
        </div>
      </article>
    </div>
  );
}
