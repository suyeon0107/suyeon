import type { Metadata } from "next";
import QuizGame from "@/components/QuizGame";

export const metadata: Metadata = {
  title: "역사 퀴즈 🎮 - 수연쌤의 아카데미",
  description: "조선 시대 역사 퀴즈 게임! 조선 전기와 후기의 역사를 흥미로운 퀴즈로 풀고 리더보드에 도전해보세요.",
};

export default function QuizPage() {
  return (
    <div className="flex-1 py-6 px-4 bg-slate-50/50">
      <div className="mx-auto max-w-4xl">
        <QuizGame />
      </div>
    </div>
  );
}
