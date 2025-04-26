"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Step1, Step2, Step3 } from "./onboard-steps";
import { initialInputs } from "@/context/input";
import { useAtomValue } from "jotai";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { SwipeStep } from "./motion-div";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Terminal } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

export type Step = {
  id: string;
  Component: React.FC;
  condition?: () => boolean;
  callback?: () => void | Promise<void>;
};

export default function Onboarding() {
  const [dialogOpen, setOpen] = useState(false);
  const inputs = useAtomValue(initialInputs);

  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [stepIndex, setStepIndex] = useState(0);
  const handleDone = () => {
    setOpen(true);
  };

  const [visibleEntries, setVisibleEntries] = useState<
    { key: string; value: string | number }[]
  >([]);

  useEffect(() => {
    if (dialogOpen) {
      const entries = Object.entries(inputs);
      setVisibleEntries([]);

      entries.forEach(([key, value], index) => {
        setTimeout(() => {
          setVisibleEntries((prev) => [...prev, { key, value }]);
        }, index * 200);
      });
    }
  }, [dialogOpen, inputs]);

  const steps: Step[] = [
    { id: "step1", Component: Step1 },
    { id: "step2", Component: Step2 },
    {
      id: "step3",
      Component: Step3,
      callback: handleDone,
    },
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

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AlertDialog open={dialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle />
            <AlertDialogDescription />
          </AlertDialogHeader>

          <ScrollArea className="h-[400px] space-y-2 pr-4">
            {visibleEntries.map(({ key, value }, i) => (
              <div key={i} className="text-xs">
                <span>{key.replaceAll("_", " ")}</span>: {String(value)} ✅
              </div>
            ))}

            {visibleEntries.length === Object.keys(inputs).length && (
              <div className="py-4">
                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    You can add components to your app using the CLI.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </ScrollArea>

          <AlertDialogFooter>
            <Button onClick={() => setOpen(false)}>Okay</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AnimatePresence mode="sync">
        <SwipeStep
          stepIndex={stepIndex}
          visibleSteps={visibleSteps}
          direction={direction}
          handleNext={handleNext}
          handleBack={handleBack}
        >
          <CurrentStep />
        </SwipeStep>
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 p-4 flex items-center justify-between max-w-2xl mx-auto w-full px-8">
        <Button
          variant="secondary"
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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === stepIndex ? "bg-primary scale-110" : "bg-foreground"
              }`}
            />
          ))}
        </div>

        <Button
          size="sm"
          onClick={
            stepIndex !== visibleSteps.length - 1 ? handleNext : handleDone
          }
        >
          {stepIndex === visibleSteps.length - 1 ? "Predict" : "Next"}
        </Button>
      </div>
    </div>
  );
}
