"use client";

import { useEffect, useState } from "react";
import { portfolio } from "@/data/portfolio";

const heroCSS = `
  .hero {
    position: relative;
    min-height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: #fff;
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

  .brand-letter {
    display: inline-block;
    font-size: clamp(3rem, 15vw, 9.5rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.05em;
    color: #111;
    opacity: 0;
    transform: translateY(100%);
    animation: letterSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .brand-letter:nth-child(1) { animation-delay: 0.1s; }
  .brand-letter:nth-child(2) { animation-delay: 0.18s; }
  .brand-letter:nth-child(3) { animation-delay: 0.26s; }
  .brand-letter:nth-child(4) { animation-delay: 0.34s; }
  .brand-letter:nth-child(5) { animation-delay: 0.42s; }
  .brand-letter:nth-child(6) { animation-delay: 0.50s; }

  /* ── Underline accent ───────────────────────── */

  .brand-line {
    width: 0;
    height: 2px;
    margin-top: 0.6rem;
    background: #10b981;
    border-radius: 2px;
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
    color: #999;
    opacity: 0;
    animation: fadeUp 600ms ease-out 1.2s forwards;
    transition: color 200ms ease;
  }
  .scroll-cta:hover { color: #10b981; }

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

  @media (prefers-reduced-motion: reduce) {
    .brand-letter, .brand-line, .scroll-cta,
    .scroll-dot, .section-fade {
      opacity: 1 !important;
      animation: none !important;
      transform: none !important;
    }
    .brand-line { width: 48px; }
  }
`;

const letters = ["R", "S", "A", "K", "H", "V"];

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [firstName] = portfolio.name.split(" ");
  const currentRole = portfolio.experience[0];
  const previousRoles = portfolio.experience.slice(1);
  const previousCompanies = Array.from(
    new Set(previousRoles.map((item) => item.company)),
  );
  const previousCompaniesText =
    previousCompanies.length > 0
      ? new Intl.ListFormat("en", {
          style: "long",
          type: "conjunction",
        }).format(previousCompanies)
      : "";
  const github = portfolio.social.find((link) => link.label === "GitHub");
  const linkedIn = portfolio.social.find((link) => link.label === "LinkedIn");
  const email = portfolio.social.find((link) => link.label === "Email");
  const fade = Math.min(scrollProgress * 2.4, 1);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 1;
      setScrollProgress(Math.min(window.scrollY / vh, 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: heroCSS }} />
      <main>
        <section className="hero">
          <div
            className="hero-inner"
            style={{
              opacity: 1 - fade,
              transform: `translateY(${fade * 40}px)`,
            }}
          >
            <h1 className="brand">
              {letters.map((letter, idx) => (
                <span key={`${letter}-${idx}`} className="brand-letter">
                  {letter}
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
        </section>

        <section
          id="about"
          className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-20 sm:px-10"
        >
          <div className="mx-auto w-full max-w-2xl text-center text-neutral-900">
            <h2 className="section-fade section-fade-1 text-5xl font-medium tracking-tight text-neutral-950 sm:text-6xl">
              Hi There!
            </h2>

            <p className="section-fade section-fade-2 mt-5 text-3xl leading-tight text-neutral-900 sm:text-4xl">
              My name is <strong>{firstName}</strong>, and I&apos;m a{" "}
              <strong>{portfolio.role}</strong>.
            </p>

            {currentRole ? (
              <p className="section-fade section-fade-3 mt-8 text-2xl leading-snug text-neutral-900">
                I most recently worked at{" "}
                <strong>{currentRole.company}</strong> as{" "}
                <strong>{currentRole.role}</strong>.
              </p>
            ) : null}

            {previousCompaniesText ? (
              <p className="section-fade section-fade-4 mt-7 text-lg leading-relaxed text-neutral-700">
                Previously at{" "}
                <span className="font-medium">{previousCompaniesText}</span>.
              </p>
            ) : null}

            <p className="section-fade section-fade-4 mt-7 text-xl leading-relaxed text-neutral-900">
              I&apos;m currently open to new QA opportunities :)
            </p>

            <div className="section-fade section-fade-5 mx-auto my-10 h-px w-56 bg-emerald-200" />

            <div className="section-fade section-fade-5 space-y-6 text-xl leading-relaxed text-neutral-900">
              <p>
                Check out what I&apos;m up to on{" "}
                {github ? (
                  <a
                    href={github.href}
                    className="font-medium text-emerald-700 hover:text-emerald-800"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
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
                    <a
                      href={linkedIn.href}
                      className="font-medium text-emerald-700 hover:text-emerald-800"
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                    <br />
                  </>
                ) : null}
                {email ? (
                  <>
                    Email me at{" "}
                    <a
                      href={email.href}
                      className="font-medium text-emerald-700 hover:text-emerald-800"
                    >
                      {email.href.replace("mailto:", "")}
                    </a>
                  </>
                ) : null}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
