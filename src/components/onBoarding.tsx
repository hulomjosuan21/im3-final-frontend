"use client";

import workingAnimation1 from "@/assets/lotties/Animation - 1745333040567.json";
import workingAnimation2 from "@/assets/lotties/Animation - 1745320599234.json";
import workingAnimation3 from "@/assets/lotties/Animation - 1745333177240.json";
import { useLottie } from "lottie-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { TypingAnimation } from "./magicui/typing-animation";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const WelcomeStep: React.FC = () => {
  const style = {
    height: 300,
  };
  const options = {
    animationData: workingAnimation1,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  const fields = [
    "Aerospace Engineering",
    "Agricultural Engineering",
    "Biomedical Engineering",
    "Civil Engineering",
    "Water Resources Engineering",
    "Mining Engineering",
    "Ocean Engineering",
    "Medicine",
    "Neurology",
    "Dermatology",
    "Graphic Design",
    "Fashion Design",
    "Industrial Design",
  ];

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col pb-8">
      {View}
      <div className="h-12">
        <TypingAnimation duration={25} className="text-sm font-lg font-normal">
          What is your primary field of study?
        </TypingAnimation>
      </div>
      <div className="flex justify-center gap-2 flex-wrap mx-4 max-w-2xl">
        {fields.map((field, index) => (
          <Badge
            key={index}
            variant={"outline"}
            className="p-2 rounded-full cursor-pointer hover:scale-105 hover:opacity-90 transition ease-in-out"
          >
            {field}
          </Badge>
        ))}
      </div>
    </div>
  );
};

const ProfileStep: React.FC = () => {
  const style = {
    height: 300,
  };
  const options = {
    animationData: workingAnimation2,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  const [gender, setGender] = useState("");

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <div className="">{View}</div>

      <div className="flex flex-col gap-4">
        <div className="space-y-3">
          <Label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </Label>
          <RadioGroup
            id="gender"
            value={gender}
            onValueChange={setGender}
            className="flex flex-col space-y-1"
          >
            {[
              ["Male", "male"],
              ["Female", "female"],
            ].map(([label, value], index) => (
              <div className="flex items-center space-x-3" key={index}>
                <RadioGroupItem id={value} value={value} />
                <Label htmlFor={value} className="font-normal">
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <p className="text-sm text-muted-foreground">Select your gender</p>
        </div>
        <div className="">
          <Input type="number" />
        </div>
      </div>
    </div>
  );
};

const PreferencesStep: React.FC = () => {
  const style = {
    height: 250,
  };
  const options = {
    animationData: workingAnimation3,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {View}
    </div>
  );
};

const FinishStep: React.FC = () => (
  <div className="w-screen h-screen grid place-content-center text-4xl font-bold">
    Wapa homan
  </div>
);

type Step = {
  id: string;
  Component: React.FC;
  condition?: () => boolean;
  callback?: () => void;
};

export default function Onboarding() {
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [stepIndex, setStepIndex] = useState(0);

  const check = async () => {
    console.log("Hello, world");
  };

  const steps: Step[] = [
    { id: "welcome", Component: WelcomeStep },
    { id: "profile", Component: ProfileStep, callback: check },
    { id: "preferences", Component: PreferencesStep, condition: () => true },
    { id: "finish", Component: FinishStep },
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

      <div className="fixed bottom-0 left-0 right-0 p-4 flex items-center justify-between max-w-2xl mx-auto w-full">
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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === stepIndex ? "bg-primary scale-110" : "bg-foreground"
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
