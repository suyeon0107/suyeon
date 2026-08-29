import type { Metadata } from "next";
import SocialQuizGame from "@/components/SocialQuizGame";

export const metadata: Metadata = {
  title: "중3 사회 단원별 개념 퀴즈 🏛️ - 수연쌤의 아카데미",
  description: "2015 개정 교육과정 중3 사회 1단원 인권과 헌법, 2단원 헌법과 국가기관, 3단원 경제생활과 선택 핵심 개념 퀴즈",
};

export default function SocialQuizPage() {
  return (
    <div className="flex-1 bg-slate-50/50">
      <SocialQuizGame />
    </div>
  );
}
