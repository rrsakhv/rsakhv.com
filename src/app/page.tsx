"use client";

import { useEffect, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { supabase } from "@/lib/supabase";
import ExperienceCard from "@/components/ExperienceCard";

/* ══ Swiss Style CSS ══════════════════════════════ */
const swissCSS = `
  /* ── Base ────────────────────────────────────── */

  .swiss {
    background: #000;
    color: #fff;
    min-height: 100svh;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .swiss a {
    color: #fff;
    transition: opacity 0.2s ease;
  }

  .swiss a:hover {
    opacity: 0.6;
  }

  /* ── Grid Container ─────────────────────────── */

  .swiss-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 4rem;
    position: relative;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* ── Creative Swiss Elements ────────────────── */
  
  .swiss-vertical-text {
    position: absolute;
    left: -1px;
    top: 6rem;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: #444;
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
  }

  .swiss-grid-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    pointer-events: none;
    z-index: 0;
    transform-origin: left;
    transform: scaleX(0);
    animation: drawGridX 2s cubic-bezier(0.85, 0, 0.15, 1) forwards;
  }

  .swiss-vertical-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(255, 255, 255, 0.1);
    pointer-events: none;
    z-index: 0;
    transform-origin: top;
    transform: scaleY(0);
    animation: drawGridY 2s cubic-bezier(0.85, 0, 0.15, 1) forwards;
  }

  .swiss-coord {
    position: absolute;
    font-family: var(--font-geist-mono), monospace;
    font-size: 0.6rem;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    pointer-events: none;
    user-select: none;
    z-index: 10;
  }
  .coord-1 { top: 2rem; left: 4.5rem; }
  .coord-2 { bottom: 2rem; right: 4.5rem; }

  /* ── Hero ────────────────────────────────────── */

  .hero {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 6rem 0;
    position: relative;
  }

  .hero-name-wrap {
    overflow: hidden;
    padding-bottom: 0.1em;
    margin-bottom: -0.1em;
  }

  .hero-name {
    font-size: clamp(3.5rem, 12vw, 10rem);
    font-weight: 700;
    line-height: 0.88;
    letter-spacing: -0.04em;
    text-transform: uppercase;
    margin: 0;
    transform: translateY(120%) skewY(5deg);
    clip-path: polygon(0 0, 100% 0, 100% 0%, 0% 0%);
    opacity: 0;
    animation: revealText 1.4s cubic-bezier(0.85, 0, 0.15, 1) 0.15s forwards;
  }

  .hero-name-first {
    font-weight: 200;
    display: block;
    letter-spacing: -0.02em;
  }

  .hero-name-last {
    font-weight: 800;
    display: block;
  }

  .hero-role {
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin: 1.5rem 0 0;
    color: #fff;
    opacity: 0;
    transform: translateY(20px);
    animation: swissFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .hero-role-line {
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    display: none;
  }

  @media (min-width: 768px) {
    .hero-role-line { display: block; }
  }

  .hero-divider {
    width: 80px;
    height: 2px;
    background: #fff;
    margin: 2.5rem 0;
    opacity: 0;
    animation: swissFadeUp 0.6s ease 0.5s forwards;
  }

  .hero-meta {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    opacity: 0;
    transform: translateY(15px);
    animation: swissFadeUp 1.2s cubic-bezier(0.85, 0, 0.15, 1) 0.6s forwards;
    margin-top: 1rem;
  }

  .hero-about-big {
    font-size: clamp(1.2rem, 2vw, 1.8rem);
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0.01em;
    color: #ccc;
    max-width: 800px;
  }

  .hero-meta-minimal {
    display: flex;
    gap: 3rem;
    font-family: var(--font-geist-mono), monospace;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #888;
  }

  .hero-meta-minimal span {
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }

  .hero-meta-value {
    font-size: 1.1rem;
    color: #eee;
    line-height: 1.65;
    font-weight: 300;
    max-width: 600px;
  }

  .hero-meta-value strong {
    color: #fff;
    font-weight: 600;
  }

  .hero-meta-row {
    display: flex;
    gap: 3rem;
  }

  .hero-meta-block {
    display: flex;
    flex-direction: column;
  }

  .hero-links {
    display: flex;
    gap: 1.5rem;
    margin-top: 2rem;
    opacity: 0;
    transform: translateY(15px);
    animation: swissFadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.75s forwards;
  }

  .hero-link {
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-weight: 500;
    color: #bbb;
    transition: color 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .hero-link:hover {
    color: #fff;
    opacity: 1;
  }

  /* ── Removed Scroll Indicator ────────────────── */

  .hero-scroll-line {
    width: 1px;
    height: 50px;
    background: linear-gradient(to bottom, #fff 0%, transparent 100%);
    animation: scrollPulse 2s ease-in-out infinite;
  }

  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
    50% { opacity: 1; transform: scaleY(1); }
  }

  /* ── Swiss Red Accent ──────────────────────── */

  .status-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #fff;
    margin-right: 8px;
    animation: statusPulse 2.5s ease-in-out infinite;
    vertical-align: middle;
  }

  .exp-logo {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    background: #fff;
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .exp-logo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @keyframes statusPulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
    50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(255, 255, 255, 0); }
  }

  /* ── Premium Animations ──────────────────────── */

  @keyframes drawGridX {
    0% { transform: scaleX(0); }
    100% { transform: scaleX(1); }
  }

  @keyframes drawGridY {
    0% { transform: scaleY(0); }
    100% { transform: scaleY(1); }
  }

  @keyframes revealText {
    0% { transform: translateY(120%) skewY(6deg); clip-path: polygon(0 0, 100% 0, 100% 0%, 0% 0%); opacity: 0; }
    100% { transform: translateY(0) skewY(0deg); clip-path: polygon(0 -20%, 100% -20%, 100% 120%, 0% 120%); opacity: 1; }
  }

  /* ── Year Watermark ────────────────────────── */

  .hero-year {
    position: absolute;
    right: -2rem;
    bottom: -4rem;
    font-size: clamp(12rem, 30vw, 24rem);
    font-weight: 700;
    color: rgba(255, 255, 255, 0.03);
    line-height: 0.8;
    letter-spacing: -0.06em;
    pointer-events: none;
    user-select: none;
    z-index: 0;
  }

  /* ── Skills Ticker ─────────────────────────── */

  .swiss-ticker {
    padding: 1.5rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    overflow: hidden;
    position: relative;
  }

  .swiss-ticker::before,
  .swiss-ticker::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 80px;
    z-index: 2;
    pointer-events: none;
  }

  .swiss-ticker::before {
    left: 0;
    background: linear-gradient(to right, #000, transparent);
  }

  .swiss-ticker::after {
    right: 0;
    background: linear-gradient(to left, #000, transparent);
  }

  .ticker-track {
    display: flex;
    gap: 3rem;
    white-space: nowrap;
    animation: ticker 30s linear infinite;
  }

  .ticker-item {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #555;
    font-weight: 500;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 3rem;
  }

  .ticker-shape {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #fff;
    transform: rotate(45deg);
  }

  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* ── Enhanced Card Accents ─────────────────── */

  .exp-card.is-open {
    background: rgba(255, 255, 255, 0.035);
    border-left-color: #fff;
  }

  /* ── Section ────────────────────────────────── */

  .swiss-section {
    padding: 7rem 0;
    border-top: 2px solid rgba(255, 255, 255, 0.12);
  }

  .swiss-section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 4rem;
    position: relative;
  }

  .swiss-section-header::after {
    display: none;
  }

  .swiss-section-title-wrap {
    position: relative;
    z-index: 2;
  }

  .swiss-section-title {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -0.03em;
    line-height: 1;
    margin: 0;
  }

  .swiss-section-number {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: clamp(8rem, 20vw, 14rem);
    font-weight: 800;
    letter-spacing: -0.05em;
    line-height: 0.75;
    color: rgba(255, 255, 255, 0.05);
    position: absolute;
    top: -3rem;
    left: -1rem;
    z-index: 0;
    pointer-events: none;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* When hovered, we can add a slight parallax shift to the number */
  .swiss-section:hover .swiss-section-number {
    transform: translateY(-15px) scale(1.02);
    color: rgba(255, 255, 255, 0.08);
  }

  .swiss-section-count {
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #666;
    font-family: var(--font-geist-mono), monospace;
  }

  /* ── Experience Cards (Dark Theme) ──────────── */

  .experience-grid {
    display: grid;
    gap: 0;
  }

  .exp-card {
    position: relative;
    padding: 1.75rem 2rem;
    background: #000;
    color: #fff;
    cursor: pointer;
    user-select: none;
    transition: background 0.3s ease, border-color 0.3s ease;
    overflow: hidden;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    border-left: 3px solid transparent;
  }

  .exp-card:first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  /* Reverted Premium Dark Hover */
  .exp-card:hover {
    background: rgba(255, 255, 255, 0.025);
    border-left-color: rgba(255, 255, 255, 0.5);
  }

  .exp-card.is-open {
    background: rgba(255, 255, 255, 0.035);
    border-left-color: #fff;
  }

  .exp-card-header {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
  }

  .exp-card-logo-wrap {
    flex-shrink: 0;
    width: 72px;
    height: 72px;
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: grid;
    place-items: center;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
  }

  .exp-card:hover .exp-card-logo-wrap,
  .exp-card.is-open .exp-card-logo-wrap {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .exp-card-logo {
    width: 52px;
    height: 52px;
    object-fit: contain;
  }

  .exp-card-logo-placeholder {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.3);
  }

  .exp-card-info {
    flex: 1;
    min-width: 0;
  }

  .exp-card-top-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .exp-card-company {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.25;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: -0.01em;
  }

  .exp-card-period {
    font-family: var(--font-geist-mono), monospace;
    font-size: 0.74rem;
    letter-spacing: 0.1em;
    color: #888;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .exp-card-role {
    margin: 0.3rem 0 0;
    font-size: 1rem;
    color: #ccc;
    font-weight: 400;
    letter-spacing: 0.01em;
  }

  .exp-card-desc {
    margin: 0.5rem 0 0;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #999;
  }

  .exp-card-chevron {
    flex-shrink: 0;
    margin-top: 6px;
    color: #444;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                color 0.1s ease;
  }

  .exp-card.is-open .exp-card-chevron {
    transform: rotate(180deg);
    color: #fff;
  }

  .exp-card:hover .exp-card-chevron {
    color: #888;
  }

  .exp-card-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .exp-card-body-inner {
    padding-top: 1.25rem;
    padding-left: calc(72px + 1.25rem);
  }

  .exp-card-highlights {
    margin: 0;
    padding: 0 0 0 1.25rem;
    display: grid;
    gap: 0.5rem;
    font-size: 0.94rem;
    line-height: 1.65;
    color: #ccc;
  }

  .exp-card-highlights li::marker {
    color: #666;
  }

  .exp-card-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: 1rem;
    font-family: var(--font-geist-mono), monospace;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    color: #999;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 4px;
    padding: 0.45rem 0.8rem;
    transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }

  .exp-card-link:hover {
    color: #fff;
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.05);
    opacity: 1;
  }

  /* ── Resume ─────────────────────────────────── */

  .resume-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  .resume-col h4 {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    color: #888;
    margin: 0 0 1.5rem;
    font-weight: 500;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  }

  .resume-col p,
  .resume-col li {
    font-size: 0.98rem;
    line-height: 1.75;
    color: #ddd;
    margin: 0;
  }

  .resume-col ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.5rem;
  }

  .resume-col li strong {
    color: #fff;
    font-weight: 600;
  }

  .resume-download {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.75rem 1.2rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-weight: 500;
    color: #fff;
    background: transparent;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .resume-download:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.4);
  }

  /* ── Education Cards ────────────────────────── */

  .edu-grid {
    display: grid;
    gap: 0;
  }

  .edu-card {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding: 1.25rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    transition: padding-left 0.3s ease;
  }

  .edu-card:first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .edu-card:hover {
    padding-left: 0.5rem;
  }

  .edu-logo-wrap {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    border-radius: 14px;
    overflow: hidden;
    background: #fff;
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: grid;
    place-items: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .edu-card:hover .edu-logo-wrap {
    transform: scale(1.05);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
  }

  .edu-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* ── Certifications & Recommendations ────────── */

  .cert-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    gap: 2rem;
    margin-top: 1.5rem;
  }

  .cert-card {
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: all 0.3s ease;
  }

  .cert-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .cert-image {
    width: 100%;
    height: auto;
    object-fit: contain;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .rec-card {
    border-left: 2px solid #fff;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.02);
    margin-bottom: 2rem;
  }

  .rec-text {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #ddd;
    font-style: italic;
    margin-bottom: 1.5rem;
  }

  .rec-author {
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #fff;
  }

  .rec-role {
    font-size: 0.8rem;
    color: #888;
    margin-top: 0.25rem;
  }

  .edu-logo-placeholder {
    font-size: 1.2rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.3);
  }

  .edu-info {
    flex: 1;
    min-width: 0;
  }

  .edu-title {
    font-size: 0.98rem;
    font-weight: 600;
    color: #eee;
    line-height: 1.4;
    margin: 0;
  }

  .edu-period {
    font-family: var(--font-geist-mono), monospace;
    font-size: 0.74rem;
    letter-spacing: 0.08em;
    color: #777;
    text-transform: uppercase;
    margin-top: 0.25rem;
  }

  /* ── Footer ─────────────────────────────────── */

  .swiss-footer {
    padding: 4rem 0;
    border-top: 2px solid rgba(255, 255, 255, 0.12);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: #777;
  }

  .swiss-footer a {
    color: #999;
  }

  .swiss-footer a:hover {
    color: #fff;
    opacity: 1;
  }

  .footer-links {
    display: flex;
    gap: 1.5rem;
  }

  /* ── Keyframes ──────────────────────────────── */

  @keyframes swissFadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ── Responsive ─────────────────────────────── */

  @media (max-width: 768px) {
    .swiss-container {
      padding: 0 1.25rem;
    }

    .hero {
      padding: 3rem 0;
    }

    .hero-year {
      display: none;
    }

    .swiss-section {
      padding: 4rem 0;
    }

    .resume-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .exp-card-body-inner {
      padding-left: 0;
    }

    .exp-card-top-row {
      flex-direction: column;
      gap: 0.15rem;
    }

    .swiss-footer {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-name, .hero-role, .hero-divider,
    .hero-meta, .hero-links {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
    }
  }
`;

export default function Home() {
  const [, setMounted] = useState(false);
  const github = portfolio.social.find((link) => link.label === "GitHub");
  const linkedIn = portfolio.social.find((link) => link.label === "LinkedIn");
  const email = portfolio.social.find((link) => link.label === "Email");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: swissCSS }} />
      <main className="swiss">
        <div className="swiss-container">
          <div className="swiss-vertical-text">PORTFOLIO SAKHANOV — QA ENGINEER</div>

          {/* Abstract Swiss Grid Coordinates */}
          <div className="swiss-coord coord-1" aria-hidden="true">X: 001.Y: 001.SYS</div>
          <div className="swiss-coord coord-2" aria-hidden="true">X: 089.Y: 924.END</div>

          {/* ── Hero ──────────────────────────── */}
          <section className="hero">
            <h1 className="hero-name">
              <span className="hero-name-first">Ruslan</span>
              <span className="hero-name-last">Sakhanov</span>
            </h1>
            <h2 className="hero-role">
              QA Engineer
              <div className="hero-role-line" aria-hidden="true" />
            </h2>

            <div className="hero-divider" />

            <div className="hero-meta">
              <div className="hero-about-big">
                {portfolio.intro}
              </div>
              <div className="hero-meta-minimal">
                <span>■ {portfolio.location}</span>
                <span><span className="status-dot" style={{ margin: '0 4px 0 0' }} />Open to opportunities</span>
              </div>
            </div>

            <div className="hero-links">
              {github && (
                <a href={github.href} target="_blank" rel="noreferrer" className="hero-link">
                  GitHub ↗
                </a>
              )}
              {linkedIn && (
                <a href={linkedIn.href} target="_blank" rel="noreferrer" className="hero-link">
                  LinkedIn ↗
                </a>
              )}
              {email && (
                <a href={email.href} className="hero-link">
                  Email ↗
                </a>
              )}
            </div>

            <span className="hero-year" aria-hidden="true">2025</span>
            <div className="swiss-grid-line" style={{ bottom: 0 }} />
          </section>

          {/* ── Experience ────────────────────── */}
          <section className="swiss-section" id="experience" style={{ paddingTop: '10rem' }}>
            <div className="swiss-section-header">
              <div className="swiss-section-title-wrap">
                <div className="swiss-section-number" aria-hidden="true">01</div>
                <h2 className="swiss-section-title">Experience</h2>
              </div>
              <span className="swiss-section-count">
                {portfolio.experience.length} roles
              </span>
            </div>
            <div className="experience-grid">
              {portfolio.experience.map((exp) => (
                <ExperienceCard key={`${exp.company}-${exp.period}`} exp={exp} />
              ))}
            </div>
          </section>

          {/* ── Skills Ticker ──────────────────── */}
          <div className="swiss-ticker">
            <div className="ticker-track">
              {[...Array(2)].map((_, i) => (
                <div key={i} style={{ display: 'flex', gap: '3rem' }}>
                  {['Playwright', 'Selenium', 'Cypress', 'Postman', 'Jira', 'Python', 'TypeScript', 'SQL', 'REST API', 'CI/CD', 'Git', 'Agile', 'Scrum'].map((skill) => (
                    <span className="ticker-item" key={`${skill}-${i}`}>
                      {skill} <span className="ticker-shape" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ── Resume ────────────────────────── */}
          <section className="swiss-section" id="resume" style={{ position: 'relative' }}>
            <div className="swiss-grid-line" style={{ top: 0 }} />
            <div className="swiss-section-header">
              <div className="swiss-section-title-wrap">
                <div className="swiss-section-number" aria-hidden="true">02</div>
                <h2 className="swiss-section-title">Resume</h2>
              </div>
            </div>

            <div style={{ marginBottom: "2.5rem" }}>
              <button
                type="button"
                className="resume-download"
                onClick={async () => {
                  const { data } = supabase.storage
                    .from("portfolio")
                    .getPublicUrl(portfolio.resume.href);
                  if (data?.publicUrl) {
                    window.open(data.publicUrl, "_blank");
                  }
                }}
              >
                Download PDF
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>
            </div>

            <div className="resume-grid">
              <div className="resume-col">
                <h4>Technical Skills</h4>
                <ul>
                  {portfolio.resumeFull.skills.map((skill) => (
                    <li key={skill.label}>
                      <strong>{skill.label}:</strong> {skill.items}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="resume-col">
                <h4>Education</h4>
                <div className="edu-grid">
                  {portfolio.resumeFull.education.map((item) => (
                    <div className="edu-card" key={`${item.title}-${item.period}`}>
                      <div className="edu-logo-wrap">
                        {item.logo ? (
                          <img
                            src={item.logo}
                            alt={item.title}
                            className="edu-logo"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <div className="edu-logo-placeholder">
                            {item.title.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="edu-info">
                        <p className="edu-title">{item.title}</p>
                        <p className="edu-period">{item.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="resume-col" style={{ marginTop: '5rem', width: '100%' }}>
              <h4>Certifications</h4>
              <div className="cert-grid">
                {portfolio.resumeFull.certifications.map((cert) => (
                  <div className="cert-card" key={cert.title}>
                    <img src={cert.image} alt={cert.title} className="cert-image" />
                    <div>
                      <p className="edu-title">{cert.title}</p>
                      <p className="edu-period">{cert.issuer} • {cert.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Recommendations ────────────────────── */}
          <section className="swiss-section" id="recommendations" style={{ position: 'relative' }}>
            <div className="swiss-grid-line" style={{ top: 0 }} />
            <div className="swiss-section-header">
              <div className="swiss-section-title-wrap">
                <div className="swiss-section-number" aria-hidden="true">03</div>
                <h2 className="swiss-section-title">Recommendations</h2>
              </div>
            </div>

            <div className="recommendations-grid">
              {portfolio.resumeFull.recommendations.map((rec, i) => (
                <div className="rec-card" key={i}>
                  <p className="rec-text">"{rec.text}"</p>
                  <div>
                    <div className="rec-author">
                      {rec.href ? (
                        <a href={rec.href} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                          {rec.name} ↗
                        </a>
                      ) : (
                        rec.name
                      )}
                    </div>
                    <div className="rec-role">{rec.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ── Footer ──────────────────────────── */}
        <footer className="swiss-footer" style={{ position: 'relative' }}>
          <div className="swiss-grid-line" style={{ top: 0 }} />
          <span>© {new Date().getFullYear()} Ruslan Sakhanov</span>
          <div className="footer-links">
            {github && (
              <a href={github.href} target="_blank" rel="noreferrer">GitHub</a>
            )}
            {linkedIn && (
              <a href={linkedIn.href} target="_blank" rel="noreferrer">LinkedIn</a>
            )}
            {email && (
              <a href={email.href}>Email</a>
            )}
          </div>
        </footer>
      </main>
    </>
  );
}
