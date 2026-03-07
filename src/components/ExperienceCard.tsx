"use client";

import { useState, useRef, useEffect } from "react";
import type { Experience } from "@/data/portfolio";

export default function ExperienceCard({ exp }: { exp: Experience }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [isOpen]);

    return (
        <div
            className={`exp-card ${isOpen ? "is-open" : ""}`}
            onClick={() => setIsOpen((prev) => !prev)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsOpen((prev) => !prev);
                }
            }}
            aria-expanded={isOpen}
        >
            <div className="exp-card-header">
                <div className="exp-card-logo-wrap">
                    {exp.logo ? (
                        <img
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            className="exp-card-logo"
                            width={44}
                            height={44}
                        />
                    ) : (
                        <div className="exp-card-logo-placeholder">
                            {exp.company.charAt(0)}
                        </div>
                    )}
                </div>

                <div className="exp-card-info">
                    <div className="exp-card-top-row">
                        <h3 className="exp-card-company">{exp.company}</h3>
                        <span className="exp-card-period">{exp.period}</span>
                    </div>
                    <p className="exp-card-role">{exp.role}</p>
                    {exp.description && (
                        <p className="exp-card-desc">{exp.description}</p>
                    )}
                </div>

                <div className="exp-card-chevron" aria-hidden="true">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 8l4 4 4-4" />
                    </svg>
                </div>
            </div>

            <div
                className="exp-card-body"
                style={{
                    maxHeight: isOpen ? `${contentHeight}px` : "0px",
                }}
            >
                <div ref={contentRef} className="exp-card-body-inner">
                    <ul className="exp-card-highlights">
                        {exp.highlights.map((hl, idx) => (
                            <li key={idx}>{hl}</li>
                        ))}
                    </ul>
                    {exp.href && (
                        <a
                            href={exp.href}
                            target="_blank"
                            rel="noreferrer"
                            className="exp-card-link"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Visit website
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
