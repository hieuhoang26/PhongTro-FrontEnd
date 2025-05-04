import React, { useContext, useEffect, useState } from "react";
import { AddPostNav } from "../../components/Admin/AddPostNav";
import { InfoPost } from "./InforPost";
import { PayPost } from "./PayPost";
import { AuthContext } from "../../context/AuthContext";
import { postApi } from "../../api/post";
import axios from "axios";

const CreatePost = () => {
  const [step, setStep] = useState(1);

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    if (userId) {
      setFormData((prev) => ({
        ...prev,
        userId: userId,
      }));
    }
  }, [userId]);

  const [formData, setFormData] = useState({
    userId: userId,
    title: "",
    description: "",
    price: "",
    area: "",
    fullAddress: "",
    typeId: "",
    isVip: "",
    vipExpiryDate: "",
    status: "PENDING",
    images: [],
    videoFiles: [],
    videoLink: "",

    city: "",
    district: "",
    ward: "",
    street: "",
    streetNumber: "",

    categories: [],
    username: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const detailAddress = `${formData.streetNumber} ${formData.street}`.trim();

    const formDataToSend = new FormData();
    formDataToSend.append("userId", formData.userId);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", Number(formData.price));
    formDataToSend.append("area", Number(formData.area));
    formDataToSend.append("fullAddress", formData.fullAddress);
    formDataToSend.append("typeId", Number(formData.typeId));
    formDataToSend.append("isVip", Number(formData.isVip));

    if (formData.vipExpiryDate) {
      const formattedVipDate = new Date(formData.vipExpiryDate)
        .toISOString()
        .slice(0, 19);
      formDataToSend.append("vipExpiryDate", formattedVipDate);
    }

    formDataToSend.append("status", formData.status);
    formDataToSend.append("wardId", Number(formData.ward)); // Đảm bảo ward là số
    formDataToSend.append("detailAddress", detailAddress);
    formDataToSend.append("videoLink", formData.videoLink || "");

    // Hình ảnh
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((imgObj) => {
        formDataToSend.append("images", imgObj.file); // lấy .file thay vì truyền object
      });
    }

    // Video
    if (formData.videoFiles && formData.videoFiles.length > 0) {
      formDataToSend.append("video", formData.videoFiles[0].file);
    }

    // Danh mục
    if (formData.categories && formData.categories.length > 0) {
      formData.categories.forEach((cat) => {
        formDataToSend.append("categories", cat);
      });
    }

    // try {
    //   const response = await postApi.createPost(formDataToSend);
    //   console.log("Post created:", response.data.data);
    // } catch (error) {
    //   const errMsg =
    //     error?.response?.data?.message ||
    //     error?.message ||
    //     "Có lỗi xảy ra khi tạo bài viết.";
    //   console.error("Lỗi tạo bài viết:", error);
    // }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/post",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post created:", response.data.data);
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Có lỗi xảy ra khi tạo bài viết.";
      console.error("Lỗi tạo bài viết:", errMsg);
    }
  };

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
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CreatePost;
