import React, { useContext, useEffect, useState } from "react";
import { AddPostNav } from "../../components/Admin/AddPostNav";
import { InfoPost } from "./InforPost";
import { PayPost } from "./PayPost";
import { AuthContext } from "../../context/AuthContext";
import { postApi } from "../../api/post";
import axios from "axios";
import { paymentApi } from "../../api/payment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const { userId, isVerify } = useContext(AuthContext);

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
    status: "",
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
  const [totalAmount, setTotalAmount] = useState(0);

  const [payMethod, setPayMethod] = useState(0);

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
    // formDataToSend.append("isVip", Number(formData.isVip));
    formDataToSend.append("isVip", Number(getVipIdFromValue(formData.isVip)));

    if (formData.vipExpiryDate) {
      const formattedVipDate = new Date(formData.vipExpiryDate)
        .toISOString()
        .slice(0, 19);
      formDataToSend.append("vipExpiryDate", formattedVipDate);
    }

    // formDataToSend.append("status", formData.status);
    if (payMethod == 0 || payMethod == null) {
      formDataToSend.append("status", "PENDING");
    } else {
      formDataToSend.append("status", "PAYING");
    }

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
    if (formData.isVip != "6" && !payMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán!");
      return;
    }
    try {
      const postResponse = await postApi.createPost(formDataToSend);
      if (postResponse.data.status == 200) {
        toast.success("Tạo bài đăng thành công");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error(postResponse.data.message || "Tạo bài đăng bại!");
      }
      const postId = postResponse.data.data;
      console.log("Post created:", postId);

      setTimeout(() => {
        navigate("/admin");
      }, 3000);
      // Gọi tạo thanh toán VNPay
      if (payMethod === 0 || payMethod == null) {
        toast.success("Chờ duyệt bài đăng");
      } else if (payMethod === 1) {
        // Gọi API thanh toán bằng ví tài khoản

        const data = {
          amount: Number(totalAmount), // phải là số
          userId: formData.userId,
          postId: postId,
        };

        const walletResponse = await paymentApi.payWithWallet(data);
        // console.log("wallet", walletResponse);
        if (walletResponse.data.status == 200) {
          toast.success("Thanh toán bằng ví thành công!");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          toast.error(walletResponse.data.message || "Thanh toán ví thất bại!");
        }
      } else if (payMethod === 2) {
        // Gọi API thanh toán bằng VNPay
        const paymentResponse = await paymentApi.createVnPayPayment(
          totalAmount,
          "PAYMENT",
          formData.userId,
          postId
        );

        const { paymentUrl } = paymentResponse.data;
        console.log(paymentUrl);
        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          alert("Không lấy được link thanh toán VNPay!");
        }
      } else {
        alert("Vui lòng chọn phương thức thanh toán hợp lệ.");
      }
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
      {isVerify == false ? (
        <>chưa xác thực tài khoản</>
      ) : (
        <>
          {step === 1 ? (
            <InfoPost
              formData={formData}
              setFormData={setFormData}
              handleNext={handleNext}
              isVerify={isVerify}
            />
          ) : (
            <PayPost
              formData={formData}
              setFormData={setFormData}
              setStep={setStep}
              handleSubmit={handleSubmit}
              setTotalAmount={setTotalAmount}
              totalAmount={totalAmount}
              setPayMethod={setPayMethod}
              payMethod={payMethod}
            />
          )}
        </>
      )}
    </div>
  );
};
export const vipIdMapping = {
  6: 0, // Tin miễn phí
  5: 0, // Tin thường
  4: 2, // Tin VIP 3
  3: 3, // Tin VIP 2
  2: 4, // Tin VIP 1
  1: 5, // Tin VIP nổi bật
};
export const getVipIdFromValue = (value) => {
  return vipIdMapping[value] || null;
};
export default CreatePost;
