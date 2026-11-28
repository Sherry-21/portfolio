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
  cvUrl: "/assets/Resume_Antonio_Ryanlie.pdf",
  portraitCutout: "/assets/profile_cutout_hd.png",
};

export const HERO_METRICS: MetricItem[] = [
  {
    value: "91",
    suffix: "%",
    label: "Faster API Response via RBAC & UBAC Compression",
  },
  {
    value: "76",
    suffix: "%",
    label: "Query Time Reduction via Go & RabbitMQ",
  },
  {
    value: "3.94",
    suffix: "/ 4.00",
    label: "B.Sc. Computer Science at Binus University",
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
    context: "Indomobil Group • 76% Faster Queries",
    telemetry:
      "Go (Golang): Architected event driven aggregation and Mako reporting microservices, reducing query execution time by 76%.",
    particles: ["go func()", "chan", "76% faster", "Mako", "WaitGroup"],
  },
  {
    id: "python",
    code: "PY",
    name: "Python",
    simType: "python",
    description:
      "FastAPI microservices migration and end to end RBAC & UBAC access control cutting API latency by 91%.",
    context: "FastAPI • 99% Data Reduction",
    telemetry:
      "Python & FastAPI: Engineered end to end RBAC & UBAC systems, compressing 15M rows to 85K (99% reduction) and cutting API response time by 91%.",
    particles: ["FastAPI", "RBAC", "UBAC", "91% faster", "253 Menus"],
  },
  {
    id: "java",
    code: "JV",
    name: "Java",
    simType: "springboot",
    description:
      "Scalable ecommerce backend services, high availability APIs with Spring Boot, and unit & integration testing.",
    context: "Blibli.com • 100% On Scope",
    telemetry:
      "Java & Spring Boot: Developed and optimized backend services contributing to 100% on scope delivery at Blibli.com.",
    particles: ["@Service", "Spring Boot", "100% Scope", "JUnit", "REST API"],
  },
  {
    id: "next",
    code: "NX",
    name: "Next.js",
    simType: "nextjs",
    description:
      "TypeScript enterprise interfaces for the Indomobil Management System RBAC & UBAC portal across 253 menus.",
    context: "Indomobil • TypeScript & SSR",
    telemetry:
      "Next.js & TypeScript: Built the end to end RBAC & UBAC frontend for Indomobil Management System paired with Python APIs.",
    particles: ["Next.js", "TypeScript", "RBAC UI", "App Router", "UBAC"],
  },
  {
    id: "vue",
    code: "VU",
    name: "Vue.js",
    simType: "vuejs",
    description:
      "Translating Figma UI/UX designs into responsive, high performance storefronts that grow New Transaction Users.",
    context: "Blibli.com • ↑ New Tx Users",
    telemetry:
      "Vue.js & JavaScript: Translated Figma designs into responsive storefronts that grew Blibli.com's New Transaction Users.",
    particles: ["Vue.js", "Figma → UI", "Reactive", "Storefront", "60fps"],
  },
  {
    id: "rabbitmq",
    code: "RM",
    name: "RabbitMQ",
    simType: "rabbitmq",
    description:
      "Asynchronous message broker, event driven service synchronization, and reliable background processing.",
    context: "Indomobil Microservices Sync",
    telemetry:
      "RabbitMQ: Event driven messaging pipeline synchronizing multi service updates and background jobs at Indomobil Group.",
    particles: ["RabbitMQ", "AMQP", "ACK", "Event Queue", "Exchange"],
  },
  {
    id: "kafka",
    code: "KF",
    name: "Apache Kafka",
    simType: "kafka",
    description:
      "High throughput distributed event streaming, partitioned topics, and decoupled service scalability.",
    context: "Blibli.com Event Streaming",
    telemetry:
      "Apache Kafka: Event driven messaging platform enhancing application scalability across Blibli.com services.",
    particles: ["Kafka", "Topics", "Consumer Group", "Partition", "PubSub"],
  },
  {
    id: "redis",
    code: "RD",
    name: "Redis",
    simType: "redis",
    description:
      "Sub millisecond distributed data caching to reduce database pressure and accelerate service response latency.",
    context: "In Memory Distributed Cache",
    telemetry:
      "Redis: Integrated distributed caching layers at both Indomobil Group and Blibli.com to maximize system throughput.",
    particles: ["CACHE HIT", "0.2ms", "Redis", "SETEX", "Low Latency"],
  },
  {
    id: "sql",
    code: "SQL",
    name: "SQL",
    simType: "sql",
    description:
      "Relational schema modeling, query optimization, and compressing 15M legacy records down to 85K rows.",
    context: "15M → 85K Rows Compressed",
    telemetry:
      "SQL: Compressed legacy database records from 15M to 85K rows (99% reduction in redundant data) and optimized complex queries.",
    particles: ["SQL", "INDEX", "15M → 85K", "ACID", "Query Plan"],
  },
];

export const EXPERIENCE_JOURNEY: JourneyMilestone[] = [
  {
    id: "indomobil",
    chapter: "CHAPTER III",
    company: "Indomobil Group",
    role: "Fullstack Engineer",
    period: "Aug 2025 to Present",
    location: "Jakarta, Indonesia",
    summary:
      "Migrating a legacy monolithic management system into scalable Python, FastAPI, and Go microservices with Redis caching and RabbitMQ messaging, while accelerating delivery by 64% using AI powered engineering workflows.",
    highlights: [
      {
        title: "RBAC & UBAC Compression (99% Data, 91% API)",
        detail:
          "Architected an end to end RBAC and UBAC system using Python and Next.js, compressing legacy database records from 15M to 85K rows (99% reduction in redundant data) and cutting API response time by 91%.",
      },
      {
        title: "76% Faster Go Aggregation & Mako Reporting",
        detail:
          "Built a Go based aggregation service synchronizing multi service updates through RabbitMQ (reducing query execution time by 76%), alongside a Go reporting service using Mako templates.",
      },
      {
        title: "64% Faster AI Assisted Delivery & 253 Menus",
        detail:
          "Leveraged Cursor and Google Antigravity across implementation and test creation to cut task completion time by 64%, while maintaining and optimizing 253 menus across two services.",
      },
    ],
    metrics: [
      { value: "91%", label: "Faster API Response" },
      { value: "99%", label: "Redundant Data Cut" },
      { value: "76%", label: "Faster Query Time" },
      { value: "64%", label: "Faster Delivery" },
    ],
    stack: [
      "Go (Golang)",
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "Redis",
      "RabbitMQ",
      "Mako",
      "Cursor",
      "Google Antigravity",
    ],
  },
  {
    id: "blibli",
    chapter: "CHAPTER II",
    company: "Blibli.com",
    role: "Fullstack Engineer Intern",
    period: "Feb 2024 to Feb 2025",
    location: "Jakarta, Indonesia",
    summary:
      "Collaborated with a world class engineering team to deliver ecommerce features that increased Blibli.com’s New Transaction Users while contributing to 100% on scope backend delivery.",
    highlights: [
      {
        title: "High Performance Storefronts & Spring Boot APIs",
        detail:
          "Translated Figma UI/UX designs into responsive Vue.js features and developed optimized Java Spring Boot backend services contributing to 100% on scope delivery.",
      },
      {
        title: "Redis Caching & Kafka Event Streaming",
        detail:
          "Integrated Redis for low latency data caching and Apache Kafka for event driven messaging to enhance application scalability.",
      },
      {
        title: "Code Quality & Comprehensive Testing",
        detail:
          "Refactored and patched codebases for maintainability, partnered with QA on cross stack bug resolution, and authored comprehensive unit and integration test suites.",
      },
    ],
    metrics: [
      { value: "100%", label: "On Scope Delivery" },
      { value: "↑ NTU", label: "New Transaction Users" },
      { value: "Full", label: "Unit & Integ. Tests" },
    ],
    stack: ["Java", "Spring Boot", "Vue.js", "Redis", "Kafka"],
  },
  {
    id: "dacode",
    chapter: "CHAPTER I",
    company: "Dacode",
    role: "Founder and Mentor",
    period: "Sep 2022 to Jan 2025",
    location: "Tangerang, Indonesia",
    summary:
      "Founded and led an intensive bootcamp teaching over 700 students across more than 6 subjects while serving as a Binus University Scholarship Mentor and graduating with a 3.94 / 4.00 GPA.",
    highlights: [
      {
        title: "700+ Students Mentored at Dacode",
        detail:
          "Founded and led a bootcamp delivering comprehensive lectures and hands on mentorship across more than 6 computer science subjects.",
      },
      {
        title: "Binus University Scholarship Mentor",
        detail:
          "Mentored groups of 1 to 6 students from Sep 2022 to Feb 2024 with the goal of enhancing their academic achievement.",
      },
    ],
    metrics: [
      { value: "700+", label: "Students Taught" },
      { value: "6+", label: "Subjects Taught" },
      { value: "3.94", label: "Binus CS GPA" },
    ],
    stack: [
      "Leadership",
      "Time Management",
      "Mentoring",
      "Problem Solving",
      "Critical Thinking",
    ],
  },
];

export const EDUCATION_DATA = {
  institution: "Binus University, Alam Sutera",
  degree: "Bachelor of Computer Science",
  gpa: "3.94 / 4.00",
  period: "Sep 2021 to Feb 2025",
  organisationalRole: "Scholarship Mentor (Sep 2022 to Feb 2024)",
  organisationalDesc:
    "Mentored groups of 1 to 6 students with the goal of enhancing their academic achievement.",
};

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    year: "2023",
    title: "3rd Place, IT Business Case Competition",
    organization: "Satya Wacana Christian University",
    description:
      "Collaborated with two partners to build an IT based business solution aimed at addressing real world challenges.",
  },
  {
    year: "2022",
    title: "2nd Place, UI/UX Competition",
    organization: "HIMASISKO Sriwijaya University",
    description:
      "Collaborated with two teammates to create UI designs and conduct UX research based on the proposed design concepts.",
  },
  {
    year: "2021",
    title: "Graduated from School of Public Speaking",
    organization: "Merry Riana School of Public Speaking",
    description:
      "Practiced and improved public speaking skills through regular presentations and speaking engagements.",
  },
];
