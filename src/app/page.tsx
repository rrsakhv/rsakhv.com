"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { portfolio } from "@/data/portfolio";
import { supabase } from "@/lib/supabase";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/* ── Interactive Magnetic GlowLink ─────────────── */
function GlowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic pull state
  const magnetic = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
  const rafId = useRef<number>(0);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    const m = magnetic.current;
    m.currentX = lerp(m.currentX, m.targetX, 0.15);
    m.currentY = lerp(m.currentY, m.targetY, 0.15);

    if (ref.current) {
      ref.current.style.transform = `translate(${m.currentX}px, ${m.currentY}px)`;
    }

    if (
      Math.abs(m.currentX - m.targetX) > 0.05 ||
      Math.abs(m.currentY - m.targetY) > 0.05
    ) {
      rafId.current = requestAnimationFrame(animate);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Glow position
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      setPos({ x: px, y: py });

      // Magnetic pull toward cursor (max ±10px)
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const MAX_PULL = 10;
      magnetic.current.targetX = clamp((e.clientX - centerX) * 0.35, -MAX_PULL, MAX_PULL);
      magnetic.current.targetY = clamp((e.clientY - centerY) * 0.5, -MAX_PULL, MAX_PULL);
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(animate);
    },
    [animate],
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    magnetic.current.targetX = 0;
    magnetic.current.targetY = 0;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(animate);
  }, [animate]);

  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`glow-link ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        // @ts-expect-error CSS custom properties
        "--glow-x": `${pos.x}%`,
        "--glow-y": `${pos.y}%`,
        "--glow-opacity": isHovered ? 1 : 0,
        willChange: "transform",
      }}
    >
      <span className="glow-link-text">{children}</span>
      <svg
        className="glow-link-arrow"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
      </svg>
      <span className="glow-link-shine" aria-hidden="true" />
      <span className="glow-link-underline" aria-hidden="true" />
    </a>
  );
}

const heroCSS = `
  /* ── GlowLink ─────────────────────────────────── */
  .glow-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    text-decoration: none;
    font-weight: 700;
    color: inherit;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 4px;
    transition: color 0.3s ease;
    overflow: hidden;
  }

  .glow-link-text {
    position: relative;
    z-index: 1;
  }

  .glow-link-arrow {
    position: relative;
    z-index: 1;
    opacity: 0.5;
    transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    flex-shrink: 0;
  }

  .glow-link:hover .glow-link-arrow {
    opacity: 1;
    transform: translate(1px, -1px);
  }

  .glow-link-shine {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    background: radial-gradient(
      circle 80px at var(--glow-x, 50%) var(--glow-y, 50%),
      rgba(255, 255, 255, 0.18) 0%,
      transparent 70%
    );
    opacity: var(--glow-opacity, 0);
    transition: opacity 0.25s ease;
    pointer-events: none;
  }

  .glow-link:hover .glow-link-shine {
    background: radial-gradient(
      circle 80px at var(--glow-x, 50%) var(--glow-y, 50%),
      rgba(255, 255, 255, 0.25) 0%,
      transparent 70%
    );
  }

  .glow-link-underline {
    position: absolute;
    left: 4px;
    right: 4px;
    bottom: 1px;
    height: 2px;
    z-index: 1;
    background: currentColor;
    border-radius: 1px;
    opacity: 0.35;
    transform: scaleX(0.3);
    transform-origin: left;
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
                opacity 0.3s ease;
    pointer-events: none;
  }

  .glow-link:hover .glow-link-underline {
    transform: scaleX(1);
    opacity: 0.7;
  }

  .glow-link::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    background: rgba(255, 255, 255, 0.06);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .glow-link:hover::before {
    opacity: 1;
  }

  .boot-overlay {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: grid;
    place-items: start center;
    padding: 1.2rem;
    padding-top: clamp(2.2rem, 8vh, 5rem);
    background: #ffffff;
    transition: opacity 420ms ease, visibility 420ms ease;
  }

  .boot-overlay.is-hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .boot-shell {
    width: min(760px, 100%);
    border: 1px solid rgba(0, 0, 0, 0.22);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.97), rgba(248, 248, 248, 0.99));
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.05) inset,
      0 0 16px rgba(0, 0, 0, 0.06);
    border-radius: 12px;
    padding: 1rem;
    font-family: var(--font-geist-mono), monospace;
    cursor: default;
  }

  .boot-log {
    border: 1px solid rgba(0, 0, 0, 0.22);
    border-radius: 8px;
    padding: 0.95rem;
    min-height: 120px;
    color: #111827;
    font-size: clamp(0.86rem, 2vw, 1rem);
    letter-spacing: 0.05em;
    background: rgba(255, 255, 255, 0.8);
    white-space: pre-wrap;
  }

  .boot-caret {
    display: inline-block;
    width: 9px;
    height: 1.05em;
    margin-left: 4px;
    vertical-align: -2px;
    background: #111827;
    animation: blinkFast 0.85s steps(2, end) infinite;
  }

  .boot-row {
    margin-top: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    color: rgba(17, 24, 39, 0.82);
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .boot-action {
    border: 1px solid rgba(0, 0, 0, 0.38);
    background: rgba(255, 255, 255, 0.96);
    color: #111827;
    border-radius: 6px;
    padding: 0.68rem 0.92rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: 0.76rem;
    font-family: var(--font-geist-mono), monospace;
    opacity: 0;
    transform: translateY(8px);
    pointer-events: none;
    transition: opacity 260ms ease, transform 260ms ease, box-shadow 180ms ease;
  }

  .boot-action.is-visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .boot-action:hover {
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
  }

  .launch-sigil {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    pointer-events: none;
    opacity: 0;
    background: rgba(255, 255, 255, 0.92);
  }

  .launch-sigil.is-active {
    opacity: 1;
  }

  .launch-word {
    position: relative;
    margin: 0;
    font-family: var(--font-geist-mono), monospace;
    text-transform: uppercase;
    color: #111827;
    font-size: clamp(2.2rem, 14vw, 9rem);
    letter-spacing: 0.08em;
    text-shadow:
      0 0 18px rgba(0, 0, 0, 0.08),
      0 0 40px rgba(0, 0, 0, 0.06);
    animation: sigilEntry 1400ms cubic-bezier(0.11, 0.84, 0.2, 1) forwards;
  }

  .launch-word::before,
  .launch-word::after {
    content: "rsakhv_";
    position: absolute;
    inset: 0;
    opacity: 0.8;
    mix-blend-mode: screen;
  }

  .launch-word::before {
    color: rgba(17, 24, 39, 0.5);
    transform: translate(-3px, 0);
    animation: sigilGlitchA 420ms steps(2, end) infinite;
  }

  .launch-word::after {
    color: rgba(17, 24, 39, 0.7);
    transform: translate(3px, 0);
    animation: sigilGlitchB 540ms steps(2, end) infinite;
  }

  .terminal-main {
    background: #ffffff;
    color: #111827;
    min-height: 100svh;
  }

  .terminal-main a {
    color: #111827;
  }

  .terminal-main a:hover {
    color: #000000;
  }

  .terminal-main::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 40;
    background:
      repeating-linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.05) 0px,
        rgba(0, 0, 0, 0.05) 1px,
        transparent 1px,
        transparent 3px
      );
    mix-blend-mode: soft-light;
  }

  .terminal-main::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 41;
    background: none;
  }

  .terminal-panel {
    border: 1px solid rgba(0, 0, 0, 0.18);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(248, 248, 248, 0.98));
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.05) inset,
      0 0 14px rgba(0, 0, 0, 0.07);
    border-radius: 14px;
  }

  .terminal-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-geist-mono), monospace;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: rgba(17, 24, 39, 0.85);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    padding: 0.8rem 1rem;
  }

  .terminal-leds {
    display: flex;
    gap: 0.42rem;
  }

  .terminal-led {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: #111827;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }

  .hero {
    position: relative;
    min-height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: #ffffff;
  }

  .hero-inner {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    will-change: transform, opacity;
  }

  /* ── Brand ──────────────────────────────────── */

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.04em;
    margin: 0;
    overflow: hidden;
  }

  .brand-cell {
    display: inline-block;
    will-change: transform, opacity, filter;
  }

  .brand-letter {
    display: inline-block;
    font-size: clamp(3rem, 15vw, 9.5rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.05em;
    color: #111827;
    text-shadow:
      0 0 8px rgba(0, 0, 0, 0.12),
      0 0 26px rgba(0, 0, 0, 0.08);
    opacity: 0;
    transform: translateY(100%);
  }

  .hero.is-active .brand-letter {
    animation: letterSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .hero.is-active .brand-letter:nth-child(1) { animation-delay: 0.1s; }
  .hero.is-active .brand-letter:nth-child(2) { animation-delay: 0.18s; }
  .hero.is-active .brand-letter:nth-child(3) { animation-delay: 0.26s; }
  .hero.is-active .brand-letter:nth-child(4) { animation-delay: 0.34s; }
  .hero.is-active .brand-letter:nth-child(5) { animation-delay: 0.42s; }
  .hero.is-active .brand-letter:nth-child(6) { animation-delay: 0.50s; }

  /* ── Underline accent ───────────────────────── */

  .brand-line {
    width: 0;
    height: 2px;
    margin-top: 0.6rem;
    background: linear-gradient(90deg, #111827, #374151);
    border-radius: 2px;
  }

  .hero.is-active .brand-line {
    animation: lineGrow 0.5s ease-out 0.9s forwards;
  }

  /* ── Scroll CTA ─────────────────────────────── */

  .scroll-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2.5rem;
    text-decoration: none;
    color: rgba(17, 24, 39, 0.64);
    opacity: 0;
    transition: color 200ms ease;
  }
  .hero.is-active .scroll-cta { animation: fadeUp 600ms ease-out 1.2s forwards; }
  .scroll-cta:hover { color: #000; }

  .scroll-label {
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .scroll-mouse {
    position: relative;
    width: 18px;
    height: 28px;
    border: 1.5px solid currentColor;
    border-radius: 10px;
  }

  .scroll-dot {
    position: absolute;
    top: 5px;
    left: 50%;
    width: 1.5px;
    height: 6px;
    margin-left: -0.75px;
    background: currentColor;
    border-radius: 1px;
    animation: scrollDot 1.6s ease-in-out infinite;
  }

  /* ── Content fade ───────────────────────────── */

  .section-fade {
    opacity: 0;
    transform: translateY(12px);
    animation: fadeUp 700ms ease-out forwards;
  }
  .section-fade-1 { animation-delay: 100ms; }
  .section-fade-2 { animation-delay: 220ms; }
  .section-fade-3 { animation-delay: 340ms; }
  .section-fade-4 { animation-delay: 460ms; }
  .section-fade-5 { animation-delay: 580ms; }

  .hero-vortex {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    transform: scale(0.9);
    will-change: opacity, transform, filter;
  }

  .hero-vortex::before,
  .hero-vortex::after {
    content: "";
    position: absolute;
    inset: 12%;
    border-radius: 999px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .hero-vortex::before {
    animation: vortexSpin 8s linear infinite;
  }

  .hero-vortex::after {
    inset: 22%;
    border-color: rgba(0, 0, 0, 0.14);
    animation: vortexSpinReverse 6.8s linear infinite;
  }

  .about-copy {
    font-family: Helvetica, Arial, sans-serif;
    color: #111827;
  }

  .about-copy h2,
  .about-copy p {
    text-shadow: none;
  }

  .about-copy strong {
    color: #111827;
  }

  .about-copy.muted {
    color: rgba(55, 65, 81, 0.86);
  }

  .resume-block {
    margin: 2rem auto 0;
    width: min(880px, 100%);
    border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 12px;
    padding: 1.4rem;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(245, 245, 245, 0.92));
  }

  .resume-title {
    margin: 0;
    font-size: clamp(1.4rem, 3vw, 1.9rem);
    font-weight: 600;
  }

  .resume-meta {
    margin: 0.45rem 0 0;
    font-family: var(--font-geist-mono), monospace;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(55, 65, 81, 0.8);
  }

  .resume-actions {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
  }

  .resume-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 0.95rem;
    border: 1px solid rgba(0, 0, 0, 0.32);
    border-radius: 8px;
    font-family: var(--font-geist-mono), monospace;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    color: #111827;
    background: #fff;
    transition: transform 120ms ease, box-shadow 120ms ease;
  }

  .resume-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.08);
  }

  .resume-preview {
    margin-top: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.86);
  }

  .resume-preview-grid {
    display: grid;
    gap: 0.85rem;
  }

  .resume-item {
    border-left: 2px solid rgba(0, 0, 0, 0.2);
    padding-left: 0.7rem;
  }

  .resume-item h4 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
  }

  .resume-item p {
    margin: 0.2rem 0 0;
    font-size: 0.86rem;
    color: rgba(55, 65, 81, 0.92);
    line-height: 1.5;
  }

  .resume-full {
    margin-top: 1.2rem;
    display: grid;
    gap: 1rem;
  }

  .resume-section {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 0.9rem;
  }

  .resume-section h4 {
    margin: 0 0 0.5rem;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
  }

  .resume-text {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.65;
    color: rgba(31, 41, 55, 0.95);
  }

  .resume-skill-list,
  .resume-job-list,
  .resume-edu-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.75rem;
  }

  .resume-job {
    border-left: 2px solid rgba(0, 0, 0, 0.16);
    padding-left: 0.7rem;
  }

  .resume-job-head {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
  }

  .resume-job-meta {
    margin: 0.15rem 0 0.45rem;
    font-size: 0.84rem;
    color: rgba(75, 85, 99, 0.9);
  }

  .resume-job-bullets {
    margin: 0;
    padding-left: 1.1rem;
    color: rgba(31, 41, 55, 0.95);
    line-height: 1.5;
    display: grid;
    gap: 0.3rem;
  }


  /* ═══ Keyframes ═════════════════════════════════ */

  @keyframes letterSlideUp {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes lineGrow {
    from { width: 0; }
    to   { width: 48px; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes scrollDot {
    0%   { transform: translateY(0); opacity: 0.8; }
    60%  { transform: translateY(10px); opacity: 0; }
    100% { transform: translateY(0); opacity: 0.8; }
  }

  @keyframes vortexSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes vortexSpinReverse {
    from { transform: rotate(360deg); }
    to   { transform: rotate(0deg); }
  }

  @keyframes terminalFlicker {
    0%, 100% { opacity: 1; }
    48% { opacity: 0.985; }
    52% { opacity: 0.975; }
    68% { opacity: 0.992; }
  }

  @keyframes blinkFast {
    0%, 45% { opacity: 1; }
    46%, 100% { opacity: 0; }
  }

  @keyframes sigilEntry {
    0% {
      opacity: 0;
      transform: scale(1.35) rotate(-7deg);
      filter: blur(8px);
      letter-spacing: 0.45em;
    }
    45% {
      opacity: 1;
      transform: scale(1.02) rotate(1deg);
      filter: blur(0);
      letter-spacing: 0.18em;
    }
    100% {
      opacity: 0;
      transform: scale(0.84) rotate(0deg);
      filter: blur(4px);
      letter-spacing: 0.08em;
    }
  }

  @keyframes sigilGlitchA {
    0%, 100% { clip-path: inset(0 0 65% 0); }
    40% { clip-path: inset(34% 0 38% 0); }
    70% { clip-path: inset(72% 0 6% 0); }
  }

  @keyframes sigilGlitchB {
    0%, 100% { clip-path: inset(62% 0 5% 0); }
    32% { clip-path: inset(15% 0 52% 0); }
    68% { clip-path: inset(45% 0 30% 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .brand-letter, .brand-line, .scroll-cta,
    .scroll-dot, .section-fade, .hero-vortex::before, .hero-vortex::after,
    .boot-caret, .launch-word, .launch-word::before, .launch-word::after {
      opacity: 1 !important;
      animation: none !important;
      transform: none !important;
    }
    .brand-line { width: 48px; }
  }
`;

const letters = ["R", "S", "A", "K", "H", "V"];
const bootCommand = "load Ruslan Sakhanov Portfolio \n₍^. .^₎⟆";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bootPhase, setBootPhase] = useState<"typing" | "ready" | "launching" | "done">("typing");
  const [bootText, setBootText] = useState("");
  const [firstName] = portfolio.name.split(" ");
  const currentRole = portfolio.experience[0];
  const previousRoles = portfolio.experience.slice(1);
  const uniqueCompaniesMap = new Map<string, { name: string; href?: string }>();
  previousRoles.forEach((role) => {
    if (!uniqueCompaniesMap.has(role.company)) {
      uniqueCompaniesMap.set(role.company, {
        name: role.company,
        href: role.href,
      });
    }
  });
  const previousCompanies = Array.from(uniqueCompaniesMap.values());
  const github = portfolio.social.find((link) => link.label === "GitHub");
  const linkedIn = portfolio.social.find((link) => link.label === "LinkedIn");
  const email = portfolio.social.find((link) => link.label === "Email");
  const fade = Math.min(scrollProgress * 2.4, 1);
  const heroPhase1 = clamp(scrollProgress / 0.35, 0, 1);
  const heroPhase2 = clamp((scrollProgress - 0.35) / 0.35, 0, 1);
  const heroPhase3 = clamp((scrollProgress - 0.7) / 0.3, 0, 1);
  const heroLift = fade * 36 + heroPhase2 * 40 + heroPhase3 * 96;
  const heroScale = 1 - heroPhase2 * 0.07 - heroPhase3 * 0.18;
  const heroRotate = -heroPhase3 * 4.5;
  const vortexOpacity = clamp((heroPhase2 + heroPhase3) * 0.75, 0, 0.92);
  const vortexScale = 0.84 + heroPhase2 * 0.24 + heroPhase3 * 0.34;

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 1;
      setScrollProgress(Math.min(window.scrollY / vh, 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (bootPhase !== "typing") {
      return;
    }
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setBootText(bootCommand.slice(0, index));
      if (index >= bootCommand.length) {
        window.clearInterval(timer);
        window.setTimeout(() => setBootPhase("ready"), 380);
      }
    }, 55);
    return () => window.clearInterval(timer);
  }, [bootPhase]);

  useEffect(() => {
    document.body.style.overflow = bootPhase === "done" ? "" : "hidden";
    if (bootPhase !== "done") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [bootPhase]);

  const handleBootLaunch = () => {
    if (bootPhase !== "ready") {
      return;
    }
    setBootPhase("launching");
    window.setTimeout(() => {
      setBootPhase("done");
    }, 1450);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: heroCSS }} />
      <main className="terminal-main">
        <div className={`boot-overlay ${bootPhase === "done" ? "is-hidden" : ""} `}>
          <div
            className="boot-shell"
          >
            <div className="terminal-head">
              <span>super terminal // v2.0</span>
              <span className="terminal-leds" aria-hidden="true">
                <span className="terminal-led" />
                <span className="terminal-led" />
                <span className="terminal-led" />
              </span>
            </div>
            <div className="boot-log mt-3">
              <div>&gt; {bootText}</div>
              <span className="boot-caret" aria-hidden="true" />
            </div>
            <div className="boot-row">
              <span>awaiting something...</span>
              <button
                type="button"
                className={`boot-action ${bootPhase === "ready" ? "is-visible" : ""} `}
                onClick={handleBootLaunch}
              >
                click me
              </button>
            </div>
            <div className={`launch-sigil ${bootPhase === "launching" ? "is-active" : ""} `}>
              <h2 className="launch-word">rsakhv_</h2>
            </div>
          </div>
        </div>

        <section className={`hero ${bootPhase === "done" ? "is-active" : ""} `}>
          <div className="terminal-panel w-full max-w-4xl" style={{ animation: "terminalFlicker 3.4s linear infinite" }}>
            <div className="terminal-head">
              <span>rsakhv.dmg // boot sequence</span>
              <span className="terminal-leds" aria-hidden="true">
                <span className="terminal-led" />
                <span className="terminal-led" />
                <span className="terminal-led" />
              </span>
            </div>
            <div className="relative px-6 py-14 sm:px-10 sm:py-18">
              <div
                className="hero-vortex"
                aria-hidden="true"
                style={{
                  opacity: vortexOpacity,
                  transform: `scale(${vortexScale})`,
                  filter: `blur(${heroPhase3 * 2.2}px)`,
                }}
              />
              <div
                className="hero-inner"
                style={{
                  opacity: 1 - fade,
                  transform: `translateY(${heroLift}px) scale(${heroScale}) rotate(${heroRotate}deg)`,
                }}
              >
                <h1 className="brand">
                  {letters.map((letter, idx) => (
                    <span
                      key={`${letter}-${idx}`}
                      className="brand-cell"
                      style={{
                        transform: (() => {
                          const offset = idx - (letters.length - 1) / 2;
                          const spreadX =
                            offset * (heroPhase1 * 20 + heroPhase2 * 46 + heroPhase3 * 16);
                          const travelY =
                            Math.abs(offset) * -heroPhase1 * 7 +
                            heroPhase2 * 26 +
                            heroPhase3 * (68 + Math.abs(offset) * 8);
                          const rotate =
                            offset * (heroPhase1 * 5.5 + heroPhase2 * 15) +
                            heroPhase3 * 9;
                          const scale =
                            1 -
                            heroPhase2 * (0.12 + Math.abs(offset) * 0.015) -
                            heroPhase3 * (0.2 + Math.abs(offset) * 0.02);
                          return `translate(${spreadX}px, ${travelY}px) rotate(${rotate}deg) scale(${Math.max(0.55, scale)})`;
                        })(),
                        opacity: clamp(1 - heroPhase3 * 1.08, 0, 1),
                        filter: `blur(${heroPhase2 * 1.2 + heroPhase3 * 5.5}px)`,
                      }}
                    >
                      <span className="brand-letter">{letter}</span>
                    </span>
                  ))}
                </h1>
                <div className="brand-line" />
                <a href="#about" className="scroll-cta">
                  <span className="scroll-label">scroll down</span>
                  <span className="scroll-mouse" aria-hidden="true">
                    <span className="scroll-dot" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-20 sm:px-10"
        >
          <div className="about-copy mx-auto w-full max-w-2xl p-7 text-center">
            <h2 className="section-fade section-fade-1 text-5xl font-medium tracking-tight sm:text-6xl">
              Hi There!
            </h2>

            <p className="section-fade section-fade-2 mt-5 text-3xl leading-tight sm:text-4xl">
              My name is <strong>{firstName}</strong>, and I&apos;m a{" "}
              <strong>{portfolio.role}</strong>.
            </p>
            <p className="section-fade section-fade-4 mt-7 text-xl leading-relaxed">
              I&apos;m currently open to new QA opportunities :)
            </p>
            {currentRole ? (
              <p className="section-fade section-fade-3 mt-8 text-2xl leading-snug">
                I most recently worked at{" "}
                {currentRole.href ? (
                  <GlowLink href={currentRole.href}>
                    {currentRole.company}
                  </GlowLink>
                ) : (
                  <strong>{currentRole.company}</strong>
                )}{" "}
                as <strong>{currentRole.role}</strong>.
              </p>
            ) : null}

            {previousCompanies.length > 0 ? (
              <p className="section-fade section-fade-4 muted mt-7 text-lg leading-relaxed">
                Previously at{" "}
                <span className="font-medium">
                  {new Intl.ListFormat("en", {
                    style: "long",
                    type: "conjunction",
                  })
                    .formatToParts(previousCompanies.map((c) => c.name))
                    .map((part, index) => {
                      if (part.type === "element") {
                        const company = previousCompanies.find(
                          (c) => c.name === part.value,
                        );
                        if (company?.href) {
                          return (
                            <GlowLink
                              key={index}
                              href={company.href}
                            >
                              {part.value}
                            </GlowLink>
                          );
                        }
                        return <span key={index}>{part.value}</span>;
                      }
                      return <span key={index}>{part.value}</span>;
                    })}
                </span>
                .
              </p>
            ) : null}


            <div className="section-fade section-fade-5 mx-auto my-10 h-px w-56 bg-white/30" />

            <div className="section-fade section-fade-5 space-y-6 text-xl leading-relaxed">
              <p>
                Check out what I&apos;m up to on{" "}
                {github ? (
                  <GlowLink href={github.href}>
                    GitHub
                  </GlowLink>
                ) : (
                  "GitHub"
                )}
              </p>

              <p>
                Want to get in contact?
                <br />
                {linkedIn ? (
                  <>
                    Connect with me on{" "}
                    <GlowLink href={linkedIn.href}>
                      LinkedIn
                    </GlowLink>
                    <br />
                  </>
                ) : null}
                {email ? (
                  <>
                    Email me at{" "}
                    <GlowLink href={email.href}>
                      {email.href.replace("mailto:", "")}
                    </GlowLink>
                  </>
                ) : null}
              </p>
            </div>

            <div className="section-fade section-fade-5 resume-block text-left">
              <h3 className="resume-title">Resume</h3>
              <p className="resume-meta">
                {portfolio.resume.label} · updated {portfolio.resume.updatedAt}
              </p>
              <div className="mt-4 mb-6">
                <button
                  type="button"
                  className="resume-btn"
                  onClick={async () => {
                    const { data } = supabase.storage
                      .from("portfolio")
                      .getPublicUrl(portfolio.resume.href);
                    if (data?.publicUrl) {
                      window.open(data.publicUrl, "_blank");
                    }
                  }}
                >
                  Download Resume
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
              </div>

              <div className="resume-full">
                <div className="resume-section">
                  <h4>Contact</h4>
                  <p className="resume-text">{portfolio.resumeFull.contact}</p>
                  <p className="resume-text">{portfolio.resumeFull.workAuthorization}</p>
                </div>

                <div className="resume-section">
                  <h4>Professional Summary</h4>
                  <p className="resume-text">{portfolio.resumeFull.summary}</p>
                </div>

                <div className="resume-section">
                  <h4>Technical Skills</h4>
                  <ul className="resume-skill-list">
                    {portfolio.resumeFull.skills.map((skill) => (
                      <li key={skill.label} className="resume-text">
                        <strong>{skill.label}:</strong> {skill.items}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="resume-section">
                  <h4>Professional Experience</h4>
                  <ul className="resume-job-list">
                    {portfolio.resumeFull.experience.map((job) => (
                      <li key={`${job.company}-${job.period}`} className="resume-job">
                        <p className="resume-job-head">
                          {job.href ? (
                            <GlowLink href={job.href}>
                              {job.company}
                            </GlowLink>
                          ) : (
                            job.company
                          )}{" "}
                          · {job.role}
                        </p>
                        <p className="resume-job-meta">{job.period}</p>
                        <ul className="resume-job-bullets">
                          {job.bullets.map((bullet, idx) => (
                            <li key={`${job.company}-bullet-${idx}`}>{bullet}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="resume-section">
                  <h4>Education & Certifications</h4>
                  <ul className="resume-edu-list">
                    {portfolio.resumeFull.educationAndCertifications.map((item) => (
                      <li key={`${item.title}-${item.period}`} className="resume-text">
                        <strong>{item.title}</strong> - {item.period}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
