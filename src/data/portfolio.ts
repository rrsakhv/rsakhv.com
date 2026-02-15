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
  href?: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type ResumeAsset = {
  label: string;
  href: string;
  updatedAt: string;
  isPublished: boolean;
};

export type ResumeSkillGroup = {
  label: string;
  items: string;
};

export type ResumeExperienceItem = {
  company: string;
  period: string;
  role: string;
  bullets: string[];
  href?: string;
};

export type ResumeEducationItem = {
  title: string;
  period: string;
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
  resume: {
    label: "Ruslan Sakhanov Resume",
    href: "resume.pdf",
    updatedAt: "2026-02",
    isPublished: true,
  } as ResumeAsset,
  resumeFull: {
    contact:
      "Brooklyn, NY • ruslan.sakhanov@protonmail.com • (646) 527-1773 • linkedin.com/in/ruslansakhanov",
    workAuthorization:
      "U.S. Permanent Resident (Green Card) • No Visa Sponsorship Required",
    summary:
      "Fintech QA Engineer with 3+ years automating and scaling quality processes for banking, crypto, and payment platforms ($34M+ daily volume, 250K+ customers). Drove 20% QA cost reduction through AI-powered testing and built team-wide performance testing capabilities (Python/Locust). Deep expertise in KYC/AML compliance, regulatory validation, and CI/CD quality gates within Agile/Scrum environments.",
    skills: [
      {
        label: "Testing",
        items:
          "Test Automation, Manual Testing, API Testing (REST), E2E, Integration, Regression, Smoke, Performance, Load Testing, UAT, Test Planning, Test Strategy, Test Case Design, Defect Management, Mobile Testing (iOS/Android)",
      },
      {
        label: "Languages & Databases",
        items:
          "Python, TypeScript, JavaScript, SQL, PostgreSQL, MySQL, MongoDB, Playwright, Selenium, Appium, Locust",
      },
      {
        label: "Tools",
        items:
          "Postman, Swagger/OpenAPI, Proxyman, Jira, Confluence, Jenkins, Git, GitHub, Allure TestOps, BrowserStack, Grafana, Kibana, CI/CD Pipelines",
      },
      {
        label: "Methods & Domains",
        items:
          "Agile, Scrum, SDLC, Fintech, Banking, Cryptocurrency, Payment Systems, KYC/AML Compliance, Cross-border Payments",
      },
    ] as ResumeSkillGroup[],
    experience: [
      {
        company: "ToTheMoon Crypto Exchange",
        period: "Feb 2025 - Dec 2025",
        role: "QA Engineer",
        href: "https://tothemoon.com",
        bullets: [
          "Led E2E test coverage for crypto exchange redesign handling $34M+ daily volume; validated trading engine, wallet, and payment features across web and mobile.",
          "Developed 25+ automated regression tests using Reflect AI, reducing manual effort and covering critical trading, wallet, and withdrawal workflows.",
          "Authored QA workflow guides and integrated AI tools for test case generation and defect triage, standardizing QA processes.",
          "Designed and executed 35+ Notabene Travel Rule compliance scenarios, validating AML/KYC reporting accuracy.",
        ],
      },
      {
        company: "Solva LTD",
        period: "Dec 2023 - Jan 2025",
        role: "QA Engineer",
        href: "https://solvaglobal.com/",
        bullets: [
          "Led QA for backend migration to Tier 2 banking infrastructure; designed API and integration test suites from scratch, ensuring regulatory compliance.",
          "Built performance testing capability: trained 5 engineers on Python/Locust and integrated load tests into CI/CD pipelines.",
          "Spearheaded AI pilot for test case generation and defect analysis, cutting QA effort by 20% and saving $15,000 in 3 months.",
          "Owned QA for cross-platform releases across web and mobile; managed test planning, defect triage, and production release sign-offs.",
        ],
      },
      {
        company: "Halyk Bank of Kazakhstan JSC",
        period: "Aug 2023 - Dec 2023",
        role: "QA Engineer",
        href: "https://halykbank.com/",
        bullets: [
          "Architected test automation framework (Appium/Java) for 10+ payment services serving 250K+ customers; integrated API/UI tests into CI/CD.",
          "Achieved 2x faster test development through modular design, shared libraries, and parallel execution.",
        ],
      },
      {
        company: "Astana International Exchange",
        period: "May 2023 - Aug 2023",
        role: "QA Engineer (Contract)",
        href: "https://aix.kz/",
        bullets: [
          "Executed E2E testing for IPO platform and Refinitiv World-Check KYC/AML system; validated REST API integrations, sanctions/PEP workflows, and regulatory compliance.",
          "Authored test cases and defect reports; coordinated with business analysts to define acceptance criteria and track issues through resolution.",
        ],
      },
      {
        company: "InesSoft",
        period: "Aug 2022 - May 2023",
        role: "QA Engineer",
        href: "https://iserv.kz/en",
        bullets: [
          "Triaged 368+ bugs across 3 platforms (mobile, CRM, web) in Agile sprints; drove release validation, raising Google Play rating from 3.2 to 4.1.",
          "Maintained regression test suites across iOS, Android, and web; collaborated with developers to prioritize and resolve defects within sprint cycles.",
          "Created test plans and authored test cases for new features; performed smoke, regression, and acceptance testing for each release.",
        ],
      },
    ] as ResumeExperienceItem[],
    educationAndCertifications: [
      {
        title:
          "Karaganda State Technical University - BE in Mathematical and Computer Modeling, GPA: 3.5/4",
        period: "June 2022",
      },
      {
        title: "DevOps Foundations - CompTIA",
        period: "Sep 2025",
      },
      {
        title: "iOS and Swift - Certificate of Completion, The Tech Orda Program",
        period: "Jun 2024",
      },
    ] as ResumeEducationItem[],
  },
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
      role: "QA Engineer",
      company: "ToTheMoon",
      period: "Feb 2025 - Dec 2025",
      href: "https://tothemoon.com",
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
      href: "https://solvaglobal.com/",
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
      href: "https://halykbank.com/",
      highlights: [
        "Designed test automation framework for 10+ payment services serving 250K+ customers.",
        "Integrated API and UI testing into CI/CD pipelines.",
      ],
    },
    {
      role: "QA Engineer (Contract)",
      company: "Astana International Exchange",
      period: "May 2023 - Aug 2023",
      href: "https://aix.kz/",
      highlights: [
        "Executed E2E QA for IPO platform and Refinitiv World-Check KYC/AML integration.",
        "Validated REST API workflows, sanctions/PEP checks, and compliance scenarios.",
      ],
    },
    {
      role: "QA Engineer",
      company: "InesSoft",
      period: "Aug 2022 - May 2023",
      href: "https://iserv.kz/en",
      highlights: [
        "Triaged 368+ bugs across mobile, CRM, and web platforms.",
        "Helped improve Google Play app rating from 3.2 to 4.1 through release-quality validation.",
      ],
    },
  ] as Experience[],
};
