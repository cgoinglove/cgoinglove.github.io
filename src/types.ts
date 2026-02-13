import type { BlockData } from "@/components/data-block";

export type { BlockData };

export interface ContentStep {
  text: string;
  blocks?: BlockData[];
}

export type MessageState = "thinking" | "complete";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  steps?: ContentStep[];
  state: MessageState;
}

export interface QuestionConfig {
  id: string;
  label: string;
  shortLabel: string;
  steps: ContentStep[];
}
