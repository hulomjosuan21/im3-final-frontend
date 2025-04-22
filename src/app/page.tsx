'use client'
import dynamic from "next/dynamic"

const Onboarding = dynamic(() => import("@/components/onBoarding"), { ssr: false })

export default function Home() {
  return <Onboarding />
}
