// components/SwipeStep.tsx
import { motion } from "framer-motion";
import React from "react";
import { Step } from "./onBoarding";

interface SwipeStepProps {
  children: React.ReactNode;
  stepIndex: number;
  visibleSteps: Step[];
  direction: "forward" | "backward";
  handleNext: () => void;
  handleBack: () => void;
}

export const SwipeStep: React.FC<SwipeStepProps> = ({
  children,
  stepIndex,
  visibleSteps,
  direction,
  handleNext,
  handleBack,
}) => {
  const swipeConfidenceThreshold = 100;

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(event, info) => {
        const swipePower = Math.abs(info.offset.x) * info.velocity.x;

        if (
          swipePower < -swipeConfidenceThreshold &&
          stepIndex < visibleSteps.length - 1
        ) {
          handleNext();
        } else if (swipePower > swipeConfidenceThreshold && stepIndex > 0) {
          handleBack();
        }
      }}
      key={stepIndex}
      initial={{ x: direction === "forward" ? 100 : -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: direction === "forward" ? -100 : 100, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="absolute top-0 left-0 w-full h-full"
    >
      {children}
    </motion.div>
  );
};
