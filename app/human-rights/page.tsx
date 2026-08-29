import type { Metadata } from "next";
import HumanRightsGuide from "@/components/HumanRightsGuide";

export const metadata: Metadata = {
  title: "인권 침해 구제 가이드 & 시뮬레이터 - 수연쌤의 아카데미",
  description: "중학교 3학년 사회 1단원 인권과 헌법 연계. 침해 사례별 구제 기관 진단 마법사, 구제 기관 사전, 자가진단 퀴즈",
};

export default function HumanRightsPage() {
  return (
    <div className="flex-1 bg-slate-50/50">
      <HumanRightsGuide />
    </div>
  );
}
