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
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const CreatePost = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const { userId, isVerify, role } = useContext(AuthContext);
  console.log("isVerify:", role);

  const [totalAmount, setTotalAmount] = useState(0);
  const [payMethod, setPayMethod] = useState(0);

  const infoSchema = yup.object().shape({
    typeId: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .required("Loại chuyên mục là bắt buộc"),
    city: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .required("Tỉnh/Thành phố là bắt buộc"),
    district: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .required("Quận/Huyện là bắt buộc"),
    ward: yup.number().nullable(),
    street: yup.string().nullable(),
    streetNumber: yup.string().nullable(),
    title: yup.string().required("Tiêu đề là bắt buộc"),
    description: yup.string().required("Mô tả là bắt buộc"),
    price: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .required("Giá là bắt buộc"),
    area: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .required("Diện tích là bắt buộc")
      .positive("Diện tích phải là số dương"),
    categories: yup.array().min(1, "Chọn ít nhất 1 danh mục"),
    images: yup.array().min(3, "Cần ít nhất 3 hình ảnh"),
    username: yup.string().required("Tên liên hệ là bắt buộc"),
    phone: yup
      .string()
      .required("Số điện thoại là bắt buộc")
      .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
    latitude: yup.number().nonNullable(),
    longitude: yup.number().nonNullable(),
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(infoSchema),
    defaultValues: {
      userId: userId,
      title: null,
      description: null,
      price: null,
      area: null,
      fullAddress: null,
      typeId: null,
      isVip: null,
      vipExpiryDate: null,
      status: null,
      images: [],
      videoFiles: [],
      videoLink: null,
      city: null,
      district: null,
      ward: null,
      street: null,
      streetNumber: null,
      categories: [],
      username: null,
      phone: null,
      latitude: null,
      longitude: null,
    },
  });
  useEffect(() => {
    if (userId) {
      setValue("userId", userId);
    }
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    const detailAddress = `${data.streetNumber} ${data.street}`.trim();

    const formDataToSend = new FormData();
    formDataToSend.append("userId", data.userId);
    formDataToSend.append("title", data.title);
    formDataToSend.append("description", data.description);
    formDataToSend.append("price", Number(data.price));
    formDataToSend.append("area", Number(data.area));
    formDataToSend.append("fullAddress", data.fullAddress);
    formDataToSend.append("typeId", Number(data.typeId));
    formDataToSend.append("isVip", Number(getVipIdFromValue(data.isVip)));

    if (data.vipExpiryDate) {
      const formattedVipDate = new Date(data.vipExpiryDate)
        .toISOString()
        .slice(0, 19);
      formDataToSend.append("vipExpiryDate", formattedVipDate);
    }
    if (role === "ROLE_ADMIN") {
      formDataToSend.append("status", "APPROVED");
    } else {
      if (payMethod == 0 || payMethod == null) {
        formDataToSend.append("status", "PENDING");
      } else {
        formDataToSend.append("status", "PAYING");
      }
    }

    formDataToSend.append("wardId", Number(data.ward));
    formDataToSend.append("detailAddress", detailAddress);
    formDataToSend.append("videoLink", data.videoLink || "");
    formDataToSend.append("latitude", data.latitude ?? "");
    formDataToSend.append("longitude", data.longitude ?? "");
    formDataToSend.append("nameContact", data.username ?? "");
    formDataToSend.append("phoneContact", data.phone ?? "");

    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => {
        formDataToSend.append("images", file);
      });
    }

    if (data.videoFiles && data.videoFiles.length > 0) {
      formDataToSend.append("video", data.videoFiles[0].file);
    }

    if (data.categories && data.categories.length > 0) {
      data.categories.forEach((cat) => {
        formDataToSend.append("categories", cat);
      });
    }

    if (data.isVip != "6" && !payMethod && role !== "ROLE_ADMIN") {
      toast.error("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    try {
      const postResponse = await postApi.createPost(formDataToSend);
      if (postResponse.data.status === 200) {
        toast.success("Tạo bài đăng thành công");
        const postId = postResponse.data.data;
        console.log("Post created:", postId);

        if (role !== "ROLE_ADMIN") {
          // Handle payment based on selected method
          if (payMethod === 0 || payMethod == null) {
            toast.success("Chờ duyệt bài đăng");
            setTimeout(() => {
              navigate("/admin");
            }, 1000);
          } else if (payMethod === 1) {
            // Pay with wallet
            const walletData = {
              amount: Number(totalAmount),
              userId: data.userId,
              postId: postId,
            };

            const walletResponse = await paymentApi.payWithWallet(walletData);

            if (walletResponse.data.status === 200) {
              toast.success("Thanh toán bằng ví thành công!");
              const timer = setTimeout(() => {
                navigate("/admin");
              }, 1000);

              return () => clearTimeout(timer);
            } else {
              toast.error(
                walletResponse.data.message || "Thanh toán ví thất bại!"
              );
            }
          } else if (payMethod === 2) {
            // Pay with VNPay
            const paymentResponse = await paymentApi.createVnPayPayment(
              totalAmount,
              "PAYMENT",
              data.userId,
              postId
            );

            const { paymentUrl } = paymentResponse.data;
            if (paymentUrl) {
              window.location.href = paymentUrl;
            } else {
              toast.error("Không lấy được link thanh toán VNPay!");
            }
          } else {
            toast.error("Vui lòng chọn phương thức thanh toán hợp lệ.");
          }
        }
      } else {
        toast.error(postResponse.data.message || "Tạo bài đăng thất bại!");
      }
    } catch (error) {
      // Handle error
      console.error("Error creating post:", error);
      toast.error("Đã xảy ra lỗi khi tạo bài đăng");
    }
  };

  const handleNext = async () => {
    // Validate step 1 fields before proceeding
    const valid = await trigger();
    if (step === 1 && valid) {
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
      {/* {isVerify == false ? (
        <>chưa xác thực tài khoản</>
      ) : ( */}
      <>
        {step === 1 ? (
          <InfoPost
            handleNext={handleNext}
            isVerify={isVerify}
            //
            register={register}
            control={control}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        ) : (
          <PayPost
            setStep={setStep}
            setValue={setValue}
            setTotalAmount={setTotalAmount}
            totalAmount={totalAmount}
            setPayMethod={setPayMethod}
            payMethod={payMethod}
            handleSubmit={handleSubmit(onSubmit)}
          />
        )}
      </>
      {/* )} */}
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
