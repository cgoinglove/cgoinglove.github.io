import { useState, useEffect, useRef, useCallback } from "react";
import { AudioWaveform, Plus } from "lucide-react";
import { MessageBubble } from "@/components/chat/message-bubble";

import { greetingSteps, questions, farewellSteps } from "@/data/questions";
import type { Message, QuestionConfig } from "@/types";
import { Button } from "./components/ui/button";
import { toast } from "sonner";

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
    new Set(),
  );
  const [isProcessing, setIsProcessing] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const processingRef = useRef(true);

  const scrollToBottom = useCallback(() => {
    const container = chatContainerRef.current;
    if (container) {
      // container.scrollTop = container.scrollHeight
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  // Auto-scroll while processing
  useEffect(() => {
    if (!isProcessing) return;
    const iv = setInterval(scrollToBottom, 200);
    return () => clearInterval(iv);
  }, [isProcessing, scrollToBottom]);

  const farewellAddedRef = useRef(false);

  const handleAllDone = useCallback(() => {
    setAnsweredQuestions((prev) => {
      const allAnswered = questions.every((q) => prev.has(q.id));
      if (allAnswered && !farewellAddedRef.current) {
        farewellAddedRef.current = true;
        setTimeout(() => {
          setMessages((msgs) => [
            ...msgs,
            {
              id: "farewell",
              role: "assistant",
              content: "",
              steps: farewellSteps,
              state: "complete",
            },
          ]);
        }, 600);
      } else {
        processingRef.current = false;
        setIsProcessing(false);
      }
      return prev;
    });
  }, []);

  // Initial greeting
  useEffect(() => {
    setMessages([
      {
        id: "user-init",
        role: "user",
        content: "cgoing 궁금해서 이곳에 왔어요",
        state: "complete",
      },
      {
        id: "greeting",
        role: "assistant",
        content: "",
        steps: greetingSteps,
        state: "complete",
      },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleQuestionClick = useCallback((question: QuestionConfig) => {
    if (processingRef.current) return;
    processingRef.current = true;
    setIsProcessing(true);

    const userMsgId = `user-${question.id}`;
    const assistantMsgId = `assistant-${question.id}`;

    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        role: "user",
        content: question.label,
        state: "complete",
      },
    ]);

    setAnsweredQuestions((prev) => new Set(prev).add(question.id));

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMsgId,
          role: "assistant",
          content: "",
          steps: question.steps,
          state: "thinking",
        },
      ]);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId ? { ...m, state: "complete" as const } : m,
          ),
        );
      }, 800);
    }, 400);
  }, []);

  const availableQuestions = questions.filter(
    (q) => !answeredQuestions.has(q.id),
  );

  return (
    <div className="h-dvh flex flex-col bg-background/40 relative overflow-hidden">
      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto py-4 md:py-12"
      >
        <div className="max-w-2xl mx-auto p-6 space-y-8">
          {messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              isLast={index === messages.length - 1}
              message={message}
              onSelectQuestion={handleQuestionClick}
              availableQuestions={availableQuestions}
              isProcessing={isProcessing}
              onAllDone={handleAllDone}
              onScroll={scrollToBottom}
            />
          ))}

          <div className="h-4" />
        </div>
      </div>

      {/* Bottom — decorative input */}
      <div className="shrink-0 absolute bottom-0 left-0 right-0 pointer-events-auto">
        <div
          className="max-w-2xl mx-auto p-6"
          onClick={() => {
            toast.promise(
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve(true);
                }, 5000);
              }),
              {
                loading: (
                  <div className="flex items-center gap-1">
                    잠시만 기다려주세요... AI 연결중입니다...
                  </div>
                ),
                success: (
                  <span className="fade-in animate-in duration-1000">
                    응 뻥이야 😘
                  </span>
                ),
              },
            );
          }}
        >
          <div className="flex items-center gap-2 border rounded-full p-1.5 bg-card">
            <Button className="rounded-full" size="icon" variant="ghost">
              <Plus />
            </Button>
            <input
              type="text"
              placeholder="위 버튼을 눌러 질문해 보세요"
              disabled
              className="flex-1 text-xs bg-transparent outline-none placeholder:text-muted-foreground/50 cursor-default"
            />
            <Button className="rounded-full" size="icon">
              <AudioWaveform />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
