import React, { useEffect, useState } from "react";
import { AddPostNav } from "../../components/Admin/AddPostNav";
import { InfoPost } from "./InforPost";
import { PayPost } from "./PayPost";

const CreatePost = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    category: "",
    city: "",
    district: "",
    ward: "",
    street: "",
    streetNumber: "",
    address: "",
    title: "",
    description: "",
    price: "",
    priceUnit: "0",
    area: "",
    features: [],
    images: [],
    videoLink: "",
    videoFiles: [],
    username: "",
    phone: "",
  });
  console.log("formData", formData);

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
  useEffect(() => {
    // Reset scroll position khi step thay đổi
    window.scrollTo(0, 0);
  }, [step]);

  return (
    <div>
      {step === 1 ? (
        <InfoPost
          formData={formData}
          setFormData={setFormData}
          handleNext={handleNext}
        />
      ) : (
        <PayPost
          formData={formData}
          setFormData={setFormData}
          setStep={setStep}
        />
      )}
    </div>
  );
};

export default CreatePost;
