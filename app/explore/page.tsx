import type { Metadata } from "next";
import { ExploreApp } from "@/components/PhoneApps";

export const metadata: Metadata = {
  title: "학습 백과 📚 - 수연쌤의 아카데미",
  description: "조선 시대를 뒤흔든 주요 사건과 인물을 한눈에 정리한 역사 학습 백과",
};

export default function ExplorePage() {
  return (
    <div className="flex-1 py-6 px-4 bg-slate-50/50">
      <div className="mx-auto max-w-4xl">
        <ExploreApp />
      </div>
    </div>
  );
}
