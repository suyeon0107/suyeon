import type { Metadata } from "next";
import SocialPresentationPicker from "@/components/SocialPresentationPicker";

export const metadata: Metadata = {
  title: "즐거운 사회 수업 발표자 추첨기 🎯 - 수연쌤의 아카데미",
  description: "중학교 사회 수업용 발표자 랜덤 추첨기. 학년/반 자동 명렬표 연동, 결석자 제외, 발표 순서 클립보드 복사 기능 지원.",
};

export default function SocialPickerPage() {
  return (
    <div className="flex-1 bg-slate-50/50">
      <SocialPresentationPicker />
    </div>
  );
}
