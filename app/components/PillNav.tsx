"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./PillNav.css";

type PillNavItem = { label: string; href: string; ariaLabel?: string };
type PillNavProps = {
  logo: string;
  logoAlt: string;
  items: PillNavItem[];
  activeHref?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
};

type NavVars = CSSProperties & Record<`--${string}`, string>;

export function PillNav({
  logo,
  logoAlt,
  items,
  activeHref = "#top",
  baseColor = "#191a18",
  pillColor = "#faf8f1",
  hoveredPillTextColor = "#ffffff",
  pillTextColor = "#191a18",
}: PillNavProps) {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current, { y: -22, opacity: 0 }, { y: 0, opacity: 1, duration: .62, ease: "power3.out" });
  }, []);

  const vars: NavVars = {
    "--pill-base": baseColor,
    "--pill-bg": pillColor,
    "--pill-hover-text": hoveredPillTextColor,
    "--pill-text": pillTextColor,
  };

  const spinLogo = () => {
    if (logoRef.current) gsap.to(logoRef.current, { rotate: "+=360", duration: .45, ease: "power2.out" });
  };

  return (
    <header className="pill-nav-container" style={vars}>
      <nav className="pill-nav" aria-label="主要导航" ref={navRef}>
        <a className="pill-logo" href="#top" aria-label="返回首页" onMouseEnter={spinLogo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={logoRef} src={logo} alt={logoAlt} />
        </a>
        <ul className="pill-list">
          {items.map((item) => (
            <li key={item.href}>
              <a className={`pill${activeHref === item.href ? " is-active" : ""}`} href={item.href} aria-label={item.ariaLabel || item.label}>
                <span className="hover-circle" aria-hidden="true" />
                <span className="label-stack"><span>{item.label}</span><span aria-hidden="true">{item.label}</span></span>
              </a>
            </li>
          ))}
        </ul>
        <button className="pill-menu" type="button" aria-expanded={open} aria-controls="pill-mobile-menu" onClick={() => setOpen((value) => !value)}>
          <span /><span /><span className="sr-only">打开导航</span>
        </button>
      </nav>
      <div className={`pill-mobile${open ? " is-open" : ""}`} id="pill-mobile-menu">
        {items.map((item) => <a href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      </div>
    </header>
  );
}
