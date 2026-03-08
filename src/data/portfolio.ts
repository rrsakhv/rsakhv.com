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
  logo?: string;
  description?: string;
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
  logo?: string;
};

export type CertificationItem = {
  title: string;
  issuer: string;
  date: string;
  image: string;
};

export type RecommendationItem = {
  name: string;
  role: string;
  text: string;
  href?: string;
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
    education: [
      {
        title: "Karaganda State Technical University - BE in Mathematical and Computer Modeling",
        period: "2018 - 2022",
        logo: "/logos/kstu.png",
      },
      {
        title: "Tech Orda – iOS & Swift",
        period: "2024",
        logo: "/logos/techorda.png",
      },
      {
        title: "CompTIA Security+",
        period: "2025",
        logo: "/logos/comptia.png",
      },
    ],
    certifications: [
      {
        title: "Tech Orda Program Completion",
        issuer: "Astana Hub / Alabs Academy",
        date: "17.06.2024",
        image: "/certificates/techorda.jpg",
      },
      {
        title: "DevOps Foundations",
        issuer: "LinkedIn Learning",
        date: "Sep 30, 2025",
        image: "/certificates/linkedin_devops.jpg",
      },
    ],
    recommendations: [
      {
        name: "Anelya Tleulina, MSc",
        role: "Project Manager, Digital Communications & PR @ AIX",
        text: "I had the pleasure of working with Ruslan at Astana International Exchange (AIX), where he proved himself as an outstanding QA Engineer. Ruslan consistently demonstrated strong technical expertise, a detail-oriented mindset, and a proactive approach to ensuring product quality. His ability to design comprehensive test cases, detect issues early, and collaborate effectively with developers and product managers significantly improved the reliability and performance of our systems. Beyond his technical skills, Ruslan was a great team player — approachable, supportive, and always willing to share knowledge. His professionalism and positive attitude made working with him a rewarding experience.",
        href: "https://www.linkedin.com/in/anelyatl/"
      },
      {
        name: "Igor Strelchenya",
        role: "Backend Software Engineer @ FinTech",
        text: "I had the chance to work with Ruslan Sakhanov on fintech projects and what stood out to me is his ability to spot not just bugs but also potential risks for the product. He pays close attention to details, asks the right questions, and helps the team find solutions that genuinely improve quality. Working with Ruslan is always a positive experience — he is reliable, professional, and easy to collaborate with.",
        href: "https://www.linkedin.com/in/igor-strelchenya/"
      },
      {
        name: "Anel Shokimova",
        role: "QA Engineer",
        text: "I had the experience of working with Ruslan, and I can highlight him as a truly strong specialist. He is a full-stack tester: he works confidently with both manual testing and automation, knows how to write autotests and build the testing process. He always strives to learn new things and expand his skills, which makes him a versatile and valuable team member. It is easy and pleasant to work with him — a responsible, attentive, and professional colleague.",
        href: "https://www.linkedin.com/in/anel-shokimova-57a077237/"
      },
      {
        name: "Timur Zhumadilov",
        role: "Java Developer @ AIX",
        text: "Ruslan is the kind of QA Engineer who makes the whole team better. He's thorough in testing, quick to share insights, and great at keeping communication clear and easy. On top of that, he's just a genuinely good teammate to work with.",
        href: "https://www.linkedin.com/in/timur-zhumadilov-185a61229/"
      },
      {
        name: "Alexandr Osipov",
        role: "QA Engineer @ Solva",
        text: "I was glad to work together with Ruslan at Solva. He brought innovations to our team in load testing and the application of AI in analyzing specification requirements and creating test documentation. I highly recommend Ruslan to any team looking for a team player with a high level of technical training.",
        href: "https://www.linkedin.com/in/alexandr-osipov-qa2022/"
      }
    ]
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
      logo: "/logos/tothemoon.png",
      description: "Crypto exchange platform handling $34M+ daily trading volume.",
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
      logo: "/logos/solva.png",
      description: "Fintech company with Tier 2 banking infrastructure & AI-powered QA.",
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
      logo: "/logos/halykbank.png",
      description: "Kazakhstan's largest bank — 250K+ customers, 10+ payment services.",
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
      logo: "/logos/aix.png",
      description: "Central Asian stock exchange — IPO platform & KYC/AML compliance.",
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
      logo: "/logos/inessoft.png",
      description: "Software company — mobile, CRM & web platform QA across 3+ products.",
      highlights: [
        "Triaged 368+ bugs across mobile, CRM, and web platforms.",
        "Helped improve Google Play app rating from 3.2 to 4.1 through release-quality validation.",
      ],
    },
  ] as Experience[],
};
