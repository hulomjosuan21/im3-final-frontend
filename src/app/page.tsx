"use client";

import { useFixViewportHeight } from "@/hooks/useFixViewportHeight";
import dynamic from "next/dynamic";
import LoadingComponent from "@/components/loading-component";

const Onboarding = dynamic(() => import("@/components/onBoarding"), {
  ssr: false,
  loading: () => <LoadingComponent />,
});

export default function PredictPage() {
  useFixViewportHeight();
  return <Onboarding />;
}
