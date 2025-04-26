"use client";

import { useFixViewportHeight } from "@/hooks/useFixViewportHeight";
import dynamic from "next/dynamic";
import { Progress } from "@/components/ui/progress"; // Shadcn Progress

const Onboarding = dynamic(() => import("@/components/onBoarding"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-background">
      <div className="text-xl font-semibold mb-4">Loading...</div>
      <Progress value={80} className="w-1/2" />
    </div>
  ),
});

export default function PredictPage() {
  useFixViewportHeight();
  return <Onboarding />;
}
