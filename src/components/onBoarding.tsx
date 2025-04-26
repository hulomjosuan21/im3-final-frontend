"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Step1, Step2, Step3 } from "./onboard-steps";

type Step = {
  id: string;
  Component: React.FC;
  condition?: () => boolean;
  callback?: () => void | Promise<void>;
};

export default function Onboarding() {
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [stepIndex, setStepIndex] = useState(0);

  const steps: Step[] = [
    { id: "step1", Component: Step1 },
    { id: "step2", Component: Step2 },
    { id: "step3", Component: Step3 },
  ];

  const visibleSteps = steps.filter((step) => step.condition?.() ?? true);
  const CurrentStep = visibleSteps[stepIndex]?.Component;
  const CurrentCallback = visibleSteps[stepIndex]?.callback;

  const handleNext = () => {
    if (stepIndex < visibleSteps.length - 1) {
      setDirection("forward");
      setStepIndex((prev) => prev + 1);
      if (CurrentCallback) {
        CurrentCallback();
      }
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setDirection("backward");
      setStepIndex((prev) => prev - 1);
    }
  };

  const handleDone = () => {
    console.log("Done");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={stepIndex}
          initial={{ x: direction === "forward" ? 100 : -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === "forward" ? -100 : 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <CurrentStep />
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 p-4 flex items-center justify-between max-w-2xl mx-auto w-full px-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className={stepIndex === 0 ? "invisible" : ""}
        >
          Back
        </Button>

        <div className="flex items-center gap-2">
          {visibleSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === stepIndex ? "bg-primary scale-110" : "bg-foreground"
                }`}
            />
          ))}
        </div>

        <Button
          size="sm"
          onClick={
            stepIndex != visibleSteps.length - 1 ? handleNext : handleDone
          }
        >
          {stepIndex === visibleSteps.length - 1 ? "Done" : "Next"}
        </Button>
      </div>
    </div>
  );
}
