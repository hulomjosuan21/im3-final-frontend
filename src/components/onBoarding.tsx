"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Step1, Step2, Step3 } from "./onboard-steps";
import { initialInputs, isAllInputsFilled } from "@/context/input";
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
import { CircleCheck } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { getData } from "@/actions/predict-actions";
import { toast } from "sonner";

export type Step = {
  id: string;
  Component: React.FC;
  condition?: () => boolean;
  callback?: () => void | Promise<void>;
};

export default function Onboarding() {
  const inputs = useAtomValue(initialInputs);
  const [dialogOpen, setOpen] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [stepIndex, setStepIndex] = useState(0);
  const [visibleEntries, setVisibleEntries] = useState<
    { key: string; value: string | number }[]
  >([]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["predictResult"],
    queryFn: () => getData(inputs),
    enabled: false,
  });

  const handleDone = async () => {
    try {
      if (isAllInputsFilled(inputs)) {
        setOpen(true);
        await refetch();
      } else {
        toast.error(
          "Please fill in all required fields correctly before continuing!"
        );
        return;
      }
    } catch {
      toast.error(
        "An error occurred while fetching the prediction result. Please try again later."
      );
    }
  };

  const [showPrediction, setShowPrediction] = useState(false);

  useEffect(() => {
    if (dialogOpen) {
      const entries = Object.entries(inputs);
      setVisibleEntries([]);

      entries.forEach(([key, value], index) => {
        setTimeout(() => {
          setVisibleEntries((prev) => [...prev, { key, value }]);
        }, index * 150);
      });

      const totalDelay = entries.length * 150;
      setTimeout(() => {
        setShowPrediction(true);
      }, totalDelay + 200);
    } else {
      setShowPrediction(false);
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
            <AlertDialogTitle className="text-lg">
              Prediction Result
            </AlertDialogTitle>
            <AlertDialogDescription>
              Here&apos;s your filled info and prediction result.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <ScrollArea className="h-[400px] space-y-2 pr-4">
            {visibleEntries.map(({ key, value }, i) => (
              <div
                key={i}
                className="text-xs flex justify-between items-center animate-fade-in-up"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationFillMode: "both",
                }}
              >
                <span className="capitalize">{key.replaceAll("_", " ")}:</span>
                <span className="font-medium">{String(value)}</span>
              </div>
            ))}

            {showPrediction && (
              <div
                className="mt-6 animate-fade-in-up"
                style={{
                  animationDelay: `${visibleEntries.length * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                {isLoading && (
                  <div className="text-sm text-muted-foreground">
                    Predicting... please wait 🔄
                  </div>
                )}
                {error && (
                  <div className="text-sm text-red-500">
                    Something went wrong. Please try again.
                  </div>
                )}
                {data && (
                  <Alert className="mt-4">
                    <CircleCheck className="h-4 w-4" />
                    <AlertTitle>Prediction result!</AlertTitle>
                    <AlertDescription className="text-sm space-y-2">
                      <div>{data.payload}</div>

                      <div className="space-y-1">
                        {data.prediction?.length > 0 &&
                          Object.entries(data.prediction[0]).map(
                            ([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span>{key}: </span>
                                <span className="font-semibold">
                                  {String(value)}%
                                </span>
                              </div>
                            )
                          )}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </ScrollArea>

          <AlertDialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
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
