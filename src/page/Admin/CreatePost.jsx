import React, { useState } from "react";
import { AddPostNav } from "../../components/Admin/AddPostNav";
import { InfoPost } from "./InforPost";

const CreatePost = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    // Validate step 1 fields before proceeding
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (step === 2 && validateStep2()) {
    // }
  };
  const validateStep1 = () => {
    // Add validation logic for step 1
    return true;
  };

  const validateStep2 = () => {
    // Add validation logic for step 2
    return true;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <InfoPost />
    </div>
  );
};

export default CreatePost;
