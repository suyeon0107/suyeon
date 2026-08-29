import type { Metadata } from "next";
import { ReviewApp } from "@/components/PhoneApps";

export const metadata: Metadata = {
  title: "복습 노트 📝 - 수연쌤의 아카데미",
  description: "핵심 낱말 카드 정리 및 나만의 요점 정리 메모 기능",
};

export default function ReviewPage() {
  return (
    <div className="flex-1 py-6 px-4 bg-slate-50/50">
      <div className="mx-auto max-w-4xl">
        <ReviewApp />
      </div>
    </div>
  );
}
