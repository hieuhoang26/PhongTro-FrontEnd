import React, { useEffect, useState } from "react";
import { TopUp } from "./TopUp";
import { TopUpS2 } from "./TopUpS2";

const TopUpCon = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    // Validate step 1 fields before proceeding
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };
  const validateStep1 = () => {
    // Add validation logic for step 1
    return true;
  };

  const validateStep2 = () => {
    // Add validation logic for step 2
    return true;
  };

  useEffect(() => {
    // Reset scroll position khi step thay đổi
    window.scrollTo(0, 0);
  }, [step]);
  return (
    <div>
      {step === 1 ? (
        <TopUp handleNext={handleNext} />
      ) : (
        <TopUpS2 setStep={setStep} />
      )}
    </div>
  );
};

export default TopUpCon;
