export type Project = {
  name: string;
  description: string;
  stack: string[];
  href?: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};

export type SocialLink = {
  label: string;
  href: string;
};

export const portfolio = {
  name: "Ruslan Sakhanov",
  role: "QA Engineer",
  location: "Brooklyn, NY",
  intro:
    "I am a QA Engineer with 3+ years of experience automating and scaling quality processes for banking, crypto, and payment platforms.",
  about:
    "I focus on API/E2E automation, performance testing, and compliance-heavy QA in regulated fintech domains. I have worked on platforms handling $34M+ daily volume and 250K+ customers, and led initiatives that reduced QA effort by 20% through AI-assisted testing.",
  social: [
    {
      label: "GitHub",
      href: "https://github.com/rrsakhv",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ruslansakhanov/",
    },
    {
      label: "Email",
      href: "mailto:ruslan.sakhanov@protonmail.com",
    },
  ] as SocialLink[],
  projects: [
    {
      name: "Crypto Exchange QA Redesign",
      description:
        "Led E2E quality coverage for a crypto exchange redesign handling $34M+ daily volume, including trading engine, wallet, and payment workflows.",
      stack: [
        "Reflect AI",
        "REST API Testing",
        "Mobile QA",
        "KYC/AML Compliance",
      ],
    },
    {
      name: "Performance QA Enablement",
      description:
        "Built performance testing capability with Python/Locust, trained 5 engineers, and integrated load testing into CI/CD pipelines.",
      stack: ["Python", "Locust", "CI/CD", "Jenkins"],
    },
  ] as Project[],
  experience: [
    {
      role: "QA Engineer (Contract)",
      company: "ToTheMoon",
      period: "Feb 2025 - Dec 2025",
      highlights: [
        "Led E2E testing for a crypto exchange redesign handling $34M+ daily volume.",
        "Built 25+ automated regression tests for trading, wallet, and withdrawal flows.",
        "Designed 35+ Notabene Travel Rule scenarios for AML/KYC reporting validation.",
      ],
    },
    {
      role: "QA Engineer",
      company: "Solva LTD",
      period: "Dec 2023 - Jan 2025",
      highlights: [
        "Led QA for migration to Tier 2 banking infrastructure with API and integration test suites.",
        "Launched AI-based QA pilot that reduced QA effort by 20% and saved $15,000 in 3 months.",
        "Trained 5 engineers in performance testing and added load tests to CI/CD.",
      ],
    },
    {
      role: "QA Engineer",
      company: "Halyk Bank of Kazakhstan JSC",
      period: "Aug 2023 - Dec 2023",
      highlights: [
        "Designed test automation framework for 10+ payment services serving 250K+ customers.",
        "Integrated API and UI testing into CI/CD pipelines.",
      ],
    },
    {
      role: "QA Engineer (Contract)",
      company: "Astana International Exchange",
      period: "May 2023 - Aug 2023",
      highlights: [
        "Executed E2E QA for IPO platform and Refinitiv World-Check KYC/AML integration.",
        "Validated REST API workflows, sanctions/PEP checks, and compliance scenarios.",
      ],
    },
    {
      role: "QA Engineer",
      company: "InesSoft",
      period: "Aug 2022 - May 2023",
      highlights: [
        "Triaged 368+ bugs across mobile, CRM, and web platforms.",
        "Helped improve Google Play app rating from 3.2 to 4.1 through release-quality validation.",
      ],
    },
  ] as Experience[],
};
