export interface SocialLink {
  platform: string;
  url: string;
  icon: "Github" | "Mail" | "Discord";
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  headline: string;
  location: string;
  experience: string;
  stack: string[];
  avatarUrl: string;
  socialLinks: SocialLink[];
}

export interface WorkProject {
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  logoUrl?: string;
  url?: string;
}

export interface OpenSourcePR {
  repo: string;
  title: string;
  prNumber: number;
  url: string;
  status: "merged" | "open";
}

export interface RunningServiceData {
  name: string;
  description: string;
  url: string;
  stats: string;
  tags: string[];
  logoUrl?: string;
}

export interface MaintainedProject {
  name: string;
  description: string;
  url: string;
  language: string;
  logoUrl?: string;
}

export interface PortfolioData {
  profile: ProfileData;
  workExperience: WorkProject[];
  openSourcePRs: OpenSourcePR[];
  runningServices: RunningServiceData[];
  maintainedProjects: MaintainedProject[];
}

import type { Locale } from "@/context/language";

// ============================================================
// YOUR DATA — Replace with your actual information
// ============================================================

const portfolioKo: PortfolioData = {
  profile: {
    name: "cgoing",
    title: "Fullstack Engineer",
    headline: "AI 서비스, 같이 만들어볼까요?",
    tagline:
      "TypeScript와 AI를 사랑하는 풀스택 개발자. 직접 만든 서비스를 운영하고, 오픈소스에 기여하며, 필요한 도구가 없으면 직접 만듭니다.",
    location: "Seoul, Korea",
    experience: "8년차",
    stack: [
      "Next.js",
      "Spring",
      "AI SDK",
      "AWS",
      "PostgreSQL",
      "MCP",
      "TypeScript",
      "React",
    ],
    avatarUrl: "https://avatars.githubusercontent.com/u/86150470?v=4",
    socialLinks: [
      {
        platform: "GitHub",
        url: "https://github.com/cgoinglove",
        icon: "Github",
      },

      { platform: "Email", url: "mailto:neo.cgoing@gmail.com", icon: "Mail" },
      {
        platform: "Discord",
        url: "https://discord.gg/atzkTfUA",
        icon: "Discord",
      },
    ],
  },

  workExperience: [
    {
      company: "대한항공",
      role: "Lead Frontend Engineer (Freelancer)",
      period: "2023 — Present",
      description:
        "1등급 핵심 시스템 OpsCore(운항통제) 프론트엔드 리드 및 풀스택 개발. 외부 채팅 솔루션 도입 대비 약 6~8천만원의 프로젝트 비용을 절감한 실시간 채팅 시스템을 자체 설계·구현. 현재 Vertex AI 기반으로 항공 DB에 직접 접근하는 RAG 챗봇 도입을 주도하며, 대한항공 AI 서비스를 구축 중.",
      tags: [
        "React",
        "TypeScript",
        "Spring Boot",
        "PostgreSQL",
        "Vertex AI",
        "AWS",
      ],
      logoUrl: "https://www.koreanair.com",
    },
    {
      company: "이수시스템",
      role: "Lead Fullstack Engineer (Freelancer)",
      period: "2020 — 2023",
      description:
        "채용솔루션 시스템을 AS-IS(Java SSR/JSP)에서 Vue + Spring Boot로 전면 마이그레이션하여 개발 및 운영. 코어 HR 솔루션 마이그레이션 초기 프론트엔드 패키지 셋업과 TUS 프로토콜 기반 대용량 파일 업로드 모듈을 구축. 이 과정에서 Uppy(⭐30k) 오픈소스에 첫 PR 기여.",
      tags: ["Vue", "Spring Boot", "MySQL", "TypeScript", "AWS"],
      logoUrl: "https://www.isusystem.com/kor/index.do",
    },
    {
      company: "나이스평가정보",
      role: "Fullstack Engineer (Freelancer)",
      period: "2019 — 2020",
      description:
        "NICE BizLINE 기업정보 요약 및 API 판매 플랫폼 풀스택 개발. 인증/인가 시스템 구축과 파일 업·다운로드 모듈 개발을 담당.",
      tags: ["Vue", "Spring Boot", "Oracle"],
      logoUrl: "https://www.nicebizline.com",
    },
    {
      company: "삼성카드",
      role: "Frontend Engineer (Freelancer)",
      period: "2018 — 2019",
      description:
        "삼성카드 모바일 앱 서비스를 Nuxt + PWA로 구축. 네이티브에 준하는 사용자 경험을 웹 기술로 구현하여 크로스 플랫폼 서비스 제공.",
      tags: ["Nuxt", "Vue", "PWA", "TypeScript"],
      logoUrl: "https://www.samsung.com/sec",
    },
  ],

  openSourcePRs: [
 
    {
      repo: "vercel/ai",
      title:
        "fix(react): integrate addToolResult into UseChatHelpers type without intersection",
      prNumber: 6059,
      url: "https://github.com/vercel/ai/pull/6059",
      status: "merged",
    },
    {
      repo: "vercel/ai",
      title: "fix(ai/mcp): prevent mutation of customEnv",
      prNumber: 5583,
      url: "https://github.com/vercel/ai/pull/5583",
      status: "merged",
    },
    {
      repo: "vercel/turborepo",
      title: "feat(examples): add example-with-typeorm",
      prNumber: 8143,
      url: "https://github.com/vercel/turborepo/pull/8143",
      status: "merged",
    },
    {
      repo: "modelcontextprotocol/modelcontextprotocol",
      title:
        "docs: re-submit mcp-client-chatbot example based on latest main branch",
      prNumber: 900,
      url: "https://github.com/modelcontextprotocol/modelcontextprotocol/pull/900",
      status: "merged",
    },
    {
      repo: "modelcontextprotocol/inspector",
      title: "feat: Add JSON View Component",
      prNumber: 211,
      url: "https://github.com/modelcontextprotocol/inspector/pull/211",
      status: "merged",
    },
    {
      repo: "langchain-ai/agent-chat-ui",
      title: "fix: improve chat UI behavior and message display",
      prNumber: 76,
      url: "https://github.com/langchain-ai/agent-chat-ui/pull/76",
      status: "merged",
    },
    {
      repo: "jakobhoeg/nextjs-ollama-llm-ui",
      title: "fix: handle IME composition to prevent unintended submissions",
      prNumber: 94,
      url: "https://github.com/jakobhoeg/nextjs-ollama-llm-ui/pull/94",
      status: "merged",
    },
    {
      repo: "transloadit/uppy",
      title:
        "fix: utilize user-defined onSuccess, onError, and onProgress callbacks in @uppy/tus",
      prNumber: 4674,
      url: "https://github.com/transloadit/uppy/pull/4674",
      status: "merged",
    },
  ],

  runningServices: [
    {
      name: "better-chatbot",
      description:
        "MCP 기반 AI 챗봇 프레임워크를 실제 서비스로 운영 중. Dify·n8n 스타일 워크플로우, 음성 에이전트 + MCP 바인딩까지 지원하는 풀스택 AI 챗봇 플랫폼.",
      url: "https://better-chatbot-demo.vercel.app",
      stats: "3k+ users",
      tags: ["Agent", "MCP", "AI SDK", "Workflow", "Speech"],
      logoUrl:
        "https://api.dicebear.com/9.x/initials/svg?seed=BC&backgroundColor=111&textColor=fff&radius=12",
    },
    {
      name: "Solves",
      description:
        "차원이 다른 에듀케이션 AI 서비스. AI가 맞춤형 문제를 생성하고, 틀린 문제 기반 리포트로 지도학습을 제공. 사용자끼리 문제집을 만들고 공유하는 커뮤니티 학습이 핵심 차별점.",
      url: "https://solves-ai.com",
      stats: "beta",
      tags: ["Next.js", "TypeScript", "Claude", "GPT", "Gemini"],
      logoUrl: "https://solves-ai.com/image/og-image.png",
    },
  ],

  maintainedProjects: [
    {
      name: "better-chatbot",
      description:
        "MCP Chatbot, Dify·n8n 스타일 워크플로우, 음성 에이전트 + MCP 바인딩까지 직접 구현한 풀스택 AI 챗봇 프레임워크. 음성 에이전트에 MCP를 연동한 건 GitHub 최초 사례.",
      url: "https://github.com/cgoinglove/better-chatbot",
      language: "TypeScript",
    },
    {
      name: "ts-edge",
      description:
        "경량 타입 세이프 워크플로우 엔진. 노드 기반 파이프라인을 TypeScript로 안전하게 구성할 수 있는 라이브러리.",
      url: "https://github.com/cgoinglove/ts-edge",
      language: "TypeScript",
    },
    {
      name: "mcp-server-kakao-map",
      description:
        "카카오맵 API를 MCP 서버로 래핑하여 AI 에이전트가 지도 검색·길찾기를 바로 활용할 수 있도록 구현.",
      url: "https://github.com/cgoinglove/mcp-server-kakao-map",
      language: "TypeScript",
    },
    {
      name: "ts-safe",
      description:
        "최소주의 함수형 유틸리티 라이브러리. Result/Option 패턴으로 타입 세이프한 에러 핸들링을 제공.",
      url: "https://github.com/cgoinglove/ts-safe",
      language: "TypeScript",
    },
  ],
};

const portfolioEn: PortfolioData = {
  profile: {
    ...portfolioKo.profile,
    headline: "Let's build AI services together!",
    tagline:
      "A fullstack developer who loves TypeScript and AI. I run my own services, contribute to open source, and build the tools I need from scratch.",
    experience: "8 yrs",
  },

  workExperience: [
    {
      company: "Korean Air",
      role: "Lead Frontend Engineer (Freelancer)",
      period: "2023 — Present",
      description:
        "Frontend lead & fullstack dev for the Tier-1 OpsCore flight-ops system. Designed and built an in-house real-time chat system, saving ~$50-60K vs. external solutions. Currently leading a Vertex AI-based RAG chatbot that queries airline databases directly.",
      tags: portfolioKo.workExperience[0].tags,
      logoUrl: portfolioKo.workExperience[0].logoUrl,
    },
    {
      company: "ISU System",
      role: "Lead Fullstack Engineer (Freelancer)",
      period: "2020 — 2023",
      description:
        "Migrated a recruitment solution from legacy Java SSR/JSP to Vue + Spring Boot. Set up initial frontend packages for core HR solution migration and built a TUS-protocol large file upload module. Made my first OSS contribution to Uppy (30k stars) in the process.",
      tags: portfolioKo.workExperience[1].tags,
      logoUrl: portfolioKo.workExperience[1].logoUrl,
    },
    {
      company: "NICE Info",
      role: "Fullstack Engineer (Freelancer)",
      period: "2019 — 2020",
      description:
        "Fullstack development of NICE BizLINE, a corporate data summary & API marketplace. Responsible for auth systems and file upload/download modules.",
      tags: portfolioKo.workExperience[2].tags,
      logoUrl: portfolioKo.workExperience[2].logoUrl,
    },
    {
      company: "Samsung Card",
      role: "Frontend Engineer (Freelancer)",
      period: "2018 — 2019",
      description:
        "Built Samsung Card's mobile app service with Nuxt + PWA, delivering a near-native user experience via web technologies for cross-platform service.",
      tags: portfolioKo.workExperience[3].tags,
      logoUrl: portfolioKo.workExperience[3].logoUrl,
    },
  ],

  openSourcePRs: portfolioKo.openSourcePRs,

  runningServices: [
    {
      ...portfolioKo.runningServices[0],
      description:
        "Running an MCP-based AI chatbot framework as a live service. A fullstack AI chatbot platform supporting Dify/n8n-style workflows, voice agents, and MCP bindings.",
    },
    {
      ...portfolioKo.runningServices[1],
      description:
        "A next-level AI education service. AI generates personalized problems and provides guided learning through wrong-answer-based reports. Community-driven workbook sharing is the key differentiator.",
    },
  ],

  maintainedProjects: [
    {
      ...portfolioKo.maintainedProjects[0],
      description:
        "MCP Chatbot — a fullstack AI chatbot framework with Dify/n8n-style workflows, voice agents, and MCP bindings. First known GitHub project to connect voice agents with MCP.",
    },
    {
      ...portfolioKo.maintainedProjects[1],
      description:
        "A lightweight type-safe workflow engine. Build node-based pipelines safely in TypeScript.",
    },
    {
      ...portfolioKo.maintainedProjects[2],
      description:
        "Wraps the Kakao Map API as an MCP server so AI agents can instantly use map search and route finding.",
    },
    {
      ...portfolioKo.maintainedProjects[3],
      description:
        "A minimalist functional utility library. Provides type-safe error handling with Result/Option patterns.",
    },
  ],
};

export function getPortfolio(locale: Locale): PortfolioData {
  return locale === "en" ? portfolioEn : portfolioKo;
}
