import React, { useEffect, useState } from "react";
import { TopUp } from "./TopUp";
import { TopUpS2 } from "./TopUpS2";

const TopUpCon = () => {
  const [step, setStep] = useState(1);

  const [payMethod, setPayMethod] = useState(null); // Ví dụ: 'vnpay', 'atm', 'bank'
  // const [amount, setAmount] = useState(null); // Ví dụ: '50000'

  console.log(payMethod);
  const handleNext = (selectedPayMethod) => {
    // Validate step 1 fields before proceeding
    if (step === 1 && validateStep1()) {
      setPayMethod(selectedPayMethod);
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
        <TopUpS2
          setStep={setStep}
          payMethod={payMethod}
          // amount={amount}
          // setAmount={setAmount}
        />
      )}
    </div>
  );
};

export default TopUpCon;
