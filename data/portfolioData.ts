export interface MetricItem {
  value: string;
  suffix: string;
  label: string;
}

export interface SkillItem {
  id: string;
  code: string;
  name: string;
  simType:
    | "golang"
    | "python"
    | "springboot"
    | "nextjs"
    | "vuejs"
    | "rabbitmq"
    | "kafka"
    | "redis"
    | "sql";
  description: string;
  context: string;
  telemetry: string;
  particles: string[];
}

export interface JourneyMilestone {
  id: string;
  chapter: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: {
    title: string;
    detail: string;
  }[];
  metrics: {
    value: string;
    label: string;
  }[];
  stack: string[];
}

export interface AchievementItem {
  year: string;
  title: string;
  organization: string;
  description: string;
}

export const PROFILE_DATA = {
  name: "Antonio Ryanlie",
  handle: "antonio.ryanlie",
  role: "Fullstack Software Engineer",
  educationShort: "B.Sc. Computer Science • Binus University (3.94 / 4.00)",
  headlineTop: "Architecting",
  headlineAccent: "Resilient Systems",
  headlineBottom: "With Precision.",
  bio: "I am a passionate software engineer and enthusiastic fast learner, eager to explore new technologies and tackle complex problems through innovative, effective solutions. I can make anything happen.",
  email: "antonioryanlie21@gmail.com",
  phone: "085311169058",
  whatsappUrl: "https://wa.me/6285311169058",
  linkedinUrl: "https://www.linkedin.com/in/antonio-ryanlie/",
  linkedinDisplay: "linkedin.com/in/antonio-ryanlie",
  githubUrl: "https://github.com/sherry-21",
  githubDisplay: "github.com/sherry-21",
  cvUrl: "/assets/antonio_ryanlie_resume.pdf",
  portraitCutout: "/assets/profile_cutout_hd.png",
};

export const HERO_METRICS: MetricItem[] = [
  {
    value: "-76",
    suffix: "%",
    label: "Query Execution Time via Go & RabbitMQ",
  },
  {
    value: "3.94",
    suffix: "/ 4.00",
    label: "B.Sc. Computer Science — Binus University",
  },
  {
    value: "700",
    suffix: "+",
    label: "Students Mentored as Dacode Founder",
  },
];

export const SKILLS_DATA: SkillItem[] = [
  {
    id: "go",
    code: "GO",
    name: "Go (Golang)",
    simType: "golang",
    description:
      "High throughput microservices, multi service data aggregation, and structured Mako template reporting.",
    context: "Indomobil Group •  76% Query Time",
    telemetry:
      "Go (Golang) Architected event driven aggregation and reporting microservices, reducing query execution time by 76%.",
    particles: ["go func()", "chan< ", " 76% latency", "Mako", "WaitGroup"],
  },
  {
    id: "python",
    code: "PY",
    name: "Python",
    simType: "python",
    description:
      "Monolith to microservices migration and end to end Role Based (RBAC) & User Based (UBAC) access control.",
    context: "Indomobil Management • 253 Menus",
    telemetry:
      "Python — Engineered end to end RBAC & UBAC authorization systems protecting 253 application menus across microservices.",
    particles: ["RBAC", "UBAC", "253 Menus", "Auth OK", "Microservice"],
  },
  {
    id: "java",
    code: "JV",
    name: "Java",
    simType: "springboot",
    description:
      "Scalable e-commerce backend services, high availability APIs with Spring Boot, and unit & integration testing.",
    context: "Blibli.com • 100% On Scope",
    telemetry:
      "Java & Spring Boot — Delivered optimized backend services with 100% on scope delivery and full test coverage at Blibli.com.",
    particles: ["@Service", "Spring Boot", "100% Scope", "JUnit", "REST API"],
  },
  {
    id: "next",
    code: "NX",
    name: "Next.js",
    simType: "nextjs",
    description:
      "Interactive enterprise interfaces for Indomobil's iMove vehicle manufacturing platform and RBAC/UBAC portals.",
    context: "iMove Platform • Type Safe SSR",
    telemetry:
      "Next.js & TypeScript — Built interactive workflows for iMove vehicle manufacturing and unified access control dashboards.",
    particles: ["Next.js", "TypeScript", "<iMove />", "App Router", "RBAC UI"],
  },
  {
    id: "vue",
    code: "VU",
    name: "Vue.js",
    simType: "vuejs",
    description:
      "Translating complex Figma designs into responsive, high performance storefronts that drive user conversion.",
    context: "Blibli.com • ↑ New Tx Users",
    telemetry:
      "Vue.js & JavaScript — Translated Figma UI/UX into responsive storefronts that grew Blibli.com's New Transaction Users.",
    particles: ["Vue.js", "Figma → UI", "Reactive", "Storefront", "60fps"],
  },
  {
    id: "rabbitmq",
    code: "RM",
    name: "RabbitMQ",
    simType: "rabbitmq",
    description:
      "Asynchronous message broker, event driven service synchronization, and background job queues.",
    context: "Indomobil Microservices Sync",
    telemetry:
      "RabbitMQ Event driven messaging pipeline synchronizing data updates across distributed services.",
    particles: ["RabbitMQ", "AMQP", "ACK", "Event Queue", "Exchange"],
  },
  {
    id: "kafka",
    code: "KF",
    name: "Apache Kafka",
    simType: "kafka",
    description:
      "High throughput distributed event streaming, log streaming, and decoupled pub/sub architecture.",
    context: "Blibli.com Event Streaming",
    telemetry:
      "Apache Kafka Distributed streaming platform powering real time event topics and decoupled services.",
    particles: ["Kafka", "Topics", "Consumer Group", "Partition", "PubSub"],
  },
  {
    id: "redis",
    code: "RD",
    name: "Redis",
    simType: "redis",
    description:
      "Sub millisecond distributed data caching to reduce database pressure and accelerate service response latency.",
    context: "Sub millisecond In Memory Cache",
    telemetry:
      "Redis Integrated distributed caching layers at both Indomobil Group and Blibli.com to maximize throughput.",
    particles: ["CACHE HIT", "0.2ms", "Redis", "SETEX", "Low Latency"],
  },
  {
    id: "sql",
    code: "SQL",
    name: "SQL",
    simType: "sql",
    description:
      "Relational database schema modeling, query indexing & optimization, and ACID transaction reliability.",
    context: "Database Architecture & Optimization",
    telemetry:
      "SQL Optimized complex queries and designed robust relational database architectures across distributed services.",
    particles: ["SQL", "INDEX", "JOIN", "ACID", "Query Plan"],
  },
];

export const EXPERIENCE_JOURNEY: JourneyMilestone[] = [
  {
    id: "indomobil",
    chapter: "CHAPTER III",
    company: "Indomobil Group",
    role: "Fullstack Engineer",
    period: "Aug 2025 – Present",
    location: "Jakarta, Indonesia",
    summary:
      "Spearheading the migration of a legacy monolithic management system into a scalable Python & Go microservices architecture, while engineering interactive Next.js platforms for vehicle manufacturing.",
    highlights: [
      {
        title: "76% Faster Data Aggregation",
        detail:
          "Architected a Go aggregation service synchronizing multi service updates via RabbitMQ, cutting query execution time by 76%, alongside a Go & Mako reporting service.",
      },
      {
        title: "End to End RBAC & UBAC Security",
        detail:
          "Designed Role Based (RBAC) and User Based Access Control (UBAC) pairing a Python backend with a Next.js frontend, securing and optimizing 253 menus across two services.",
      },
      {
        title: "iMove Manufacturing Platform",
        detail:
          "Developed interactive Next.js frontend workflows connected to distributed Python/Go microservices, Redis caching, and RabbitMQ queues.",
      },
    ],
    metrics: [
      { value: "-76%", label: "Query Execution Time" },
      { value: "253", label: "Menus Optimized" },
      { value: "RBAC+UBAC", label: "Access Control" },
    ],
    stack: [
      "Go (Golang)",
      "Python",
      "Next.js",
      "Redis",
      "RabbitMQ",
      "Mako Templates",
    ],
  },
  {
    id: "blibli",
    chapter: "CHAPTER II",
    company: "Blibli.com",
    role: "Fullstack Engineer",
    period: "Feb 2024 – Feb 2025",
    location: "Jakarta, Indonesia",
    summary:
      "Collaborated with a world class engineering team to ship high traffic e commerce features that directly increased Blibli.com’s New Transaction Users with 100% on scope delivery.",
    highlights: [
      {
        title: "High Performance Storefronts & APIs",
        detail:
          "Translated Figma UI/UX designs into responsive Vue.js features and engineered Java Spring Boot backend services with 100% on scope delivery.",
      },
      {
        title: "Event Driven Scalability",
        detail:
          "Integrated Redis for low latency data caching and Apache Kafka for resilient event driven messaging across services.",
      },
      {
        title: "Code Quality & Reliability",
        detail:
          "Refactored legacy codebases, partnered with QA for cross stack bug resolution, and authored comprehensive unit and integration test suites.",
      },
    ],
    metrics: [
      { value: "100%", label: "On Scope Delivery" },
      { value: "↑ NTU", label: "New Transaction Users" },
      { value: "E2E", label: "Unit & Integ. Tests" },
    ],
    stack: [
      "Java",
      "Spring Boot",
      "Vue.js",
      "Redis",
      "Apache Kafka",
      "Unit Testing",
    ],
  },
  {
    id: "dacode",
    chapter: "CHAPTER I",
    company: "Dacode & Binus University",
    role: "Founder & Technical Mentor",
    period: "Sep 2022 – Jan 2025",
    location: "Tangerang, Indonesia",
    summary:
      "Founded and led an intensive software engineering bootcamp while serving as a Binus University Scholarship Mentor and graduating with a 3.94 / 4.00 GPA in Computer Science.",
    highlights: [
      {
        title: "700+ Students Mentored at Dacode",
        detail:
          "Founded and led a technical bootcamp delivering comprehensive lectures and handson mentorship across more than 6 computer science subjects.",
      },
      {
        title: "Binus University Scholarship Mentor",
        detail:
          "Mentored dedicated student cohorts (groups of 1–6 scholars) from Sep 2022 to Feb 2024 to elevate their academic performance.",
      },
    ],
    metrics: [
      { value: "700+", label: "Students Taught" },
      { value: "6+", label: "CS Subjects Led" },
      { value: "3.94", label: "Binus CS GPA" },
    ],
    stack: [
      "Leadership",
      "Teaching",
      "Curriculum Design",
      "Problem Solving",
      "Time Management",
    ],
  },
];

export const EDUCATION_DATA = {
  institution: "Universitas Bina Nusantara — Alam Sutera",
  degree: "Bachelor of Computer Science",
  gpa: "3.94 / 4.00",
  period: "Sep 2021 – Feb 2025",
  organisationalRole: "Scholarship Mentor (Sep 2022 – Feb 2024)",
  organisationalDesc:
    "Mentored groups of 1–6 students with the goal of enhancing their academic achievement and software engineering foundations.",
};

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    year: "2023",
    title: "3rd Place — IT Business Case Competition",
    organization: "Satya Wacana Christian University",
    description:
      "Collaborated with two partners to architect an ITbased business solution addressing complex realworld operational challenges.",
  },
  {
    year: "2022",
    title: "2nd Place — UI/UX Competition",
    organization: "HIMASISKO Sriwijaya University",
    description:
      "Partnered with two teammates to craft highusability interface designs and conduct user experience research.",
  },
  {
    year: "2021",
    title: "Graduate — School of Public Speaking",
    organization: "Merry Riana School of Public Speaking",
    description:
      "Honed executive communication and presentation skills through structured speaking engagements.",
  },
];
