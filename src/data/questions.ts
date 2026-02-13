import { portfolio } from "@/data/portfolio";
import type { ContentStep, QuestionConfig } from "@/types";

const {
  profile,
  workExperience,
  openSourcePRs,
  runningServices,
  maintainedProjects,
} = portfolio;

// ─── Greeting ───────────────────────────────────────────────
// 심리: 첫인상 효과 + 방문 자체를 칭찬 → "여기 온 내가 센스있네" 느낌

export const greetingSteps: ContentStep[] = [
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

// ─── Questions ──────────────────────────────────────────────
// 심리: 호기심 유발 → 카드로 증거 제시 → 마무리 코멘트로 신뢰 + 여운

export const questions: QuestionConfig[] = [
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
        blocks: workExperience.map((w) => ({ type: "work" as const, data: w })),
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

// ─── Farewell ───────────────────────────────────────────────
// 심리: 피크-엔드 법칙 → 마지막 인상을 따뜻하고 인상 깊게

export const farewellSteps: ContentStep[] = [
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
