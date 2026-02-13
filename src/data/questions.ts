import { getPortfolio } from "@/data/portfolio";
import type { ContentStep, QuestionConfig } from "@/types";
import type { Locale } from "@/context/language";

// ─── Korean ─────────────────────────────────────────────────

function koGreeting(locale: Locale): ContentStep[] {
  const { profile } = getPortfolio(locale);
  return [
    {
      text: "반갑습니다! 👋 `cgoing`의 포트폴리오에 찾아와주시다니, 센스가 남다르시네요.",
    },
    {
      text: "저는 `cgoing`의 AI 비서예요. 요즘 AI 서비스 개발에 **완전히** 빠져있는 풀스택 엔지니어인데, 직접 만든 서비스를 운영까지 하고 있어요. 제가 대신 소개해드릴게요 😉",
      blocks: [{ type: "profile", data: profile }],
    },
    {
      text: "아래 **버튼** 중 하나를 골라보세요. 근데 솔직히 *전부* 누르게 될 거예요 😄",
    },
  ];
}

function koQuestions(locale: Locale): QuestionConfig[] {
  const {
    workExperience,
    openSourcePRs,
    runningServices,
    maintainedProjects,
  } = getPortfolio(locale);

  return [
    {
      id: "opensource",
      label: "오픈소스 활동은 어때요?",
      shortLabel: "오픈소스 기여",
      steps: [
        {
          text: "이것까지 궁금해하시는 거 보면 개발자를 제대로 볼 줄 아시는 분이네요 🔍 `cgoing`은 쓰다가 불편하면 직접 고치는 스타일이에요.",
          blocks: [{ type: "opensource" as const, data: openSourcePRs }],
        },
        {
          text: "AI에 빠지면서 `Vercel AI SDK`, `MCP`, `LangChain` 같은 프로젝트들에 직접 기여하게 됐어요. 특히 `MCP` 생태계에는 공식 예제까지 기여했고요. *관심 → 실행*이 빠른 사람이에요",
        },
      ],
    },
    {
      id: "career",
      label: "어떤 경력을 갖고 있나요?",
      shortLabel: "경력",
      steps: [
        {
          text: "좋은 질문이에요! 사람을 볼 줄 아시는 분이군요 👀 `cgoing`의 커리어, 한번 펼쳐볼게요.",
          blocks: workExperience.map((w) => ({
            type: "work" as const,
            data: w,
          })),
        },
        {
          text: "**삼성카드**부터 **대한항공**까지, 프론트엔드에서 풀스택 리드로 꾸준히 성장해온 **8년차**예요. 실시간 채팅을 자체 구현해서 **수천만원을 절감**시키고, 지금은 `Vertex AI` 기반 RAG 챗봇까지 주도하고 있어요 😎",
        },
      ],
    },
    {
      id: "service",
      label: "운영 중인 서비스가 있나요?",
      shortLabel: "서비스",
      steps: [
        {
          text: "오, 이걸 물어봐주시다니 감사해요! 직접 만들어서 운영 중인 서비스가 두 개나 있어요 🚀",
          blocks: runningServices.map((s) => ({
            type: "service" as const,
            data: s,
          })),
        },
        {
          text: "`better-chatbot`은 가입자 **3천 명**을 넘긴 `MCP` 기반 AI 챗봇 프레임워크이고, `Solves`는 AI가 맞춤 문제를 생성하는 *차원이 다른* 에듀케이션 서비스예요. 둘 다 혼자서 기획부터 운영까지, 이런 사람 흔치 않죠? 😏",
        },
      ],
    },
    {
      id: "projects",
      label: "관리 중인 프로젝트를 보고 싶어요",
      shortLabel: "프로젝트",
      steps: [
        {
          text: "꼼꼼하게 봐주시네요! 이런 분이랑 일하면 좋겠다 😊 AI 챗봇부터 워크플로우 엔진, `MCP` 서버 등 직접 만들고 관리하고 있어요.",
          blocks: maintainedProjects.map((p) => ({
            type: "project" as const,
            data: p,
          })),
        },
        {
          text: "전부 `TypeScript`로 만들었고, 필요한 도구가 없으면 직접 만드는 사람이에요. 이런 사람 옆에 있으면 든든하지 않나요? ⭐",
        },
      ],
    },
  ];
}

function koFarewell(): ContentStep[] {
  return [
    {
      text: "전부 다 봐주셨네요! 끝까지 관심 가져주신 분은 정말 드문데, 감사합니다 🙏",
    },
    {
      text: '```ts\nconst cgoing = {\n  role: "Fullstack Engineer",\n  passion: "AI Services",\n  services: ["better-chatbot", "Solves"],\n  motto: "없으면 만든다 🔨",\n} as const\n```\n한 줄로 요약하면 이런 사람이에요. 여기까지 본 분이라면 `cgoing`과 좋은 인연이 될 것 같은 느낌이 강하게 드네요 ✨',
    },
    {
      text: "같이 일하고 싶거나, 프로젝트 의뢰, 아니면 그냥 *커피 한 잔* 하면서 이야기해도 좋아요 ☕ 아래 이메일을 클릭하면 바로 복사됩니다!",
      blocks: [{ type: "email", data: "neo.cgoing@gmail.com" }],
    },
    {
      text: "`cgoing`도 분명 기뻐할 거예요. 좋은 하루 보내세요! 😊",
    },
  ];
}

// ─── English ────────────────────────────────────────────────

function enGreeting(locale: Locale): ContentStep[] {
  const { profile } = getPortfolio(locale);
  return [
    {
      text: "Welcome! 👋 You found `cgoing`'s portfolio — great taste.",
    },
    {
      text: "I'm `cgoing`'s AI assistant. He's a fullstack engineer who's **all in** on AI service development, and he even runs his own services. Let me introduce him 😉",
      blocks: [{ type: "profile", data: profile }],
    },
    {
      text: "Pick one of the **buttons** below. Honestly, you'll end up clicking *all of them* 😄",
    },
  ];
}

function enQuestions(locale: Locale): QuestionConfig[] {
  const {
    workExperience,
    openSourcePRs,
    runningServices,
    maintainedProjects,
  } = getPortfolio(locale);

  return [
    {
      id: "opensource",
      label: "How's the open-source activity?",
      shortLabel: "Open Source",
      steps: [
        {
          text: "You're asking about this? You clearly know how to evaluate a developer 🔍 `cgoing` is the type who fixes things himself when something bugs him.",
          blocks: [{ type: "opensource" as const, data: openSourcePRs }],
        },
        {
          text: "Since diving into AI, he's been contributing directly to projects like `Vercel AI SDK`, `MCP`, and `LangChain`. He even contributed an official example to the `MCP` ecosystem. *Curiosity → Action*, that's his style.",
        },
      ],
    },
    {
      id: "career",
      label: "What's the career background?",
      shortLabel: "Career",
      steps: [
        {
          text: "Great question! You've got a good eye for talent 👀 Let me unfold `cgoing`'s career for you.",
          blocks: workExperience.map((w) => ({
            type: "work" as const,
            data: w,
          })),
        },
        {
          text: "From **Samsung Card** to **Korean Air**, he's grown steadily from frontend to fullstack lead over **8 years**. He built an in-house real-time chat system that **saved tens of thousands of dollars**, and now he's leading a `Vertex AI`-based RAG chatbot 😎",
        },
      ],
    },
    {
      id: "service",
      label: "Any live services running?",
      shortLabel: "Services",
      steps: [
        {
          text: "Oh, thanks for asking! He's actually running two services on his own 🚀",
          blocks: runningServices.map((s) => ({
            type: "service" as const,
            data: s,
          })),
        },
        {
          text: "`better-chatbot` is an `MCP`-based AI chatbot framework with over **3,000 users**, and `Solves` is a *next-level* AI education service that generates personalized problems. He handles everything from planning to operations, solo. Not many people like that, right? 😏",
        },
      ],
    },
    {
      id: "projects",
      label: "Show me the maintained projects",
      shortLabel: "Projects",
      steps: [
        {
          text: "You're being thorough! I'd love to work with someone like you 😊 From AI chatbots to workflow engines and `MCP` servers — he builds and maintains them all.",
          blocks: maintainedProjects.map((p) => ({
            type: "project" as const,
            data: p,
          })),
        },
        {
          text: "All built with `TypeScript`. If the tool doesn't exist, he builds it. Wouldn't you feel confident having someone like that on your team? ⭐",
        },
      ],
    },
  ];
}

function enFarewell(): ContentStep[] {
  return [
    {
      text: "You've seen it all! It's rare for someone to stay till the end — thank you 🙏",
    },
    {
      text: '```ts\nconst cgoing = {\n  role: "Fullstack Engineer",\n  passion: "AI Services",\n  services: ["better-chatbot", "Solves"],\n  motto: "If it doesn\'t exist, build it 🔨",\n} as const\n```\nThat\'s him in a nutshell. If you\'ve made it this far, I have a strong feeling you and `cgoing` are meant to connect ✨',
    },
    {
      text: "Whether you want to work together, commission a project, or just grab a *cup of coffee* and chat ☕ Click the email below to copy it!",
      blocks: [{ type: "email", data: "neo.cgoing@gmail.com" }],
    },
    {
      text: "`cgoing` would definitely be happy to hear from you. Have a great day! 😊",
    },
  ];
}

// ─── Public API ──────────────────────────────────────────────

export function getGreetingSteps(locale: Locale): ContentStep[] {
  return locale === "en" ? enGreeting(locale) : koGreeting(locale);
}

export function getQuestions(locale: Locale): QuestionConfig[] {
  return locale === "en" ? enQuestions(locale) : koQuestions(locale);
}

export function getFarewellSteps(locale: Locale): ContentStep[] {
  return locale === "en" ? enFarewell() : koFarewell();
}
