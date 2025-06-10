import { useEffect, useState } from "react";
import { InfoPost } from "../../../page/Dash/InforPost";
import { locationApi } from "../../../api/location";
import { formatNumber, parseNumber } from "../../../utils/other";
import { amenitiesList } from "../../../utils/contant";
import ImageUploadSection from "../ImageUploadSection";
import { postApi } from "../../../api/post";
import { ImageUploadModal } from "./ImageUploadModal";
import { AddPostNav } from "../AddPostNav";
import { IoClose } from "react-icons/io5";

export const PostModal = ({ postId, isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [formData, setFormData] = useState({
    city: "",
    district: "",
    ward: "",
    street: "",
    streetNumber: "",
    fullAddress: "",
    title: "",
    description: "",
    price: "",
    priceUnit: "0",
    area: "",
    categories: [],
    images: [],
    newImages: [],
    typeId: "",
    contactName: "",
    contactPhone: "",
  });
  console.log("formData", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const detailAddress =
        `${formData.streetNumber} ${formData.street}`.trim();
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", Number(formData.price));
      formDataToSend.append("area", Number(formData.area));
      formDataToSend.append("fullAddress", formData.fullAddress);
      formDataToSend.append("typeId", Number(formData.typeId));
      formDataToSend.append("wardId", formData.ward);
      formDataToSend.append("detailAddress", detailAddress);

      // Nếu có các categoryIds
      formData.categories.forEach((id) => {
        formDataToSend.append("categoryIds", id);
      });

      // Kiểm tra nếu newImages tồn tại và có phần tử
      if (formData.newImages && formData.newImages.length > 0) {
        formData.newImages.forEach((image) => {
          formDataToSend.append("newImages", image);
        });
      }

      // Nếu có video (bạn có thể check nếu cần)
      if (formData.video) {
        formDataToSend.append("video", formData.video);
      }

      // Nếu muốn giữ lại imageUrls cũ
      if (formData.imageUrlsToKeep) {
        formData.imageUrlsToKeep.forEach((url) => {
          formDataToSend.append("imageUrlsToKeep", url);
        });
      }
      await postApi.updatePost(postId, formDataToSend);

      // setIsOpen(false);
    } catch (err) {
      console.error("Update post failed:", err);
      setError("Cập nhật bài đăng thất bại");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId && isOpen) {
      fetchPostDetails();
    }
  }, [postId, isOpen]);

  const fetchPostDetails = async () => {
    try {
      setLoading(true);
      const response = await postApi.detail(postId);

      const postData = response.data.data;
      console.log("postData", postData);

      // Update form data with API response
      setFormData({
        city: postData.cityId,
        district: postData.districtId,
        ward: postData.wardId,
        street: extractStreet(postData.address),
        streetNumber: extractStreetNumber(postData.address),
        fullAddress: postData.address,
        title: postData.title,
        description: postData.description,
        price: postData.price,
        area: postData.area,
        categories: postData.categories.map(Number),
        images: postData.images,
        typeId: postData.type, // Adjust based on your types
        contactName: postData.username,
        contactPhone: postData.phone || "0901234567", // Default if null
      });

      // Fetch location data
      await fetchLocationData(postData.cityId, postData.districtId);
    } catch (err) {
      setError(err.message || "Failed to fetch post details");
      console.error("Error fetching post details:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocationData = async (cityId, districtId) => {
    try {
      // Fetch cities if not already loaded
      if (cities.length === 0) {
        const citiesRes = await locationApi.getCities();
        setCities(citiesRes.data);
      }

      // Fetch districts for the city
      if (cityId) {
        const districtsRes = await locationApi.getDistricts(cityId);
        setDistricts(districtsRes.data);
      }

      // Fetch wards for the district
      if (districtId) {
        const wardsRes = await locationApi.getWards(districtId);
        setWards(wardsRes.data);
      }
    } catch (err) {
      console.error("Error fetching location data:", err);
    }
  };
  const extractStreetNumber = (address) => {
    // const match = address.match(/^(\d+)/);
    // return match ? match[0] : "";
    const parts = address.split(",");
    if (parts.length > 0) {
      return parts[0].replace(/^\d+\s*/, "").trim();
    }
    return "";
  };

  const extractStreet = (address) => {
    // This is a simple implementation - you might need to adjust based on your address format
    const parts = address.split(",");
    if (parts.length > 0) {
      return parts[1].replace(/^\d+\s*/, "").trim();
    }
    return "";
  };
  // ... rest of your existing code (useEffects for location, handleChange, handleSubmit, etc.)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const checkboxValue = Number(value); // hoặc parseInt(value)
      setFormData((prev) => {
        if (checked) {
          return { ...prev, categories: [...prev.categories, checkboxValue] };
        } else {
          return {
            ...prev,
            categories: prev.categories.filter(
              (item) => item !== checkboxValue
            ),
          };
        }
      });
    } else {
      // Ép kiểu các trường city, district, ward về number
      const isNumberField = ["city", "district", "ward"].includes(name);
      setFormData((prev) => ({
        ...prev,
        [name]: isNumberField ? Number(value) : value,
      }));
    }
  };
  useEffect(() => {
    const parts = [];

    if (formData.streetNumber) parts.push(formData.streetNumber);
    if (formData.street) parts.push(formData.street);

    // Tìm tên phường/xã tương ứng với ID
    const selectedWard = wards.find((w) => w.id === Number(formData.ward));
    if (selectedWard) parts.push(selectedWard.name);

    // Tìm tên quận/huyện tương ứng với ID
    const selectedDistrict = districts.find(
      (d) => d.id === Number(formData.district)
    );
    if (selectedDistrict) parts.push(selectedDistrict.name);

    // Tìm tên tỉnh/thành phố tương ứng với ID
    const selectedCity = cities.find((c) => c.id === Number(formData.city));
    if (selectedCity) parts.push(selectedCity.name);

    // Ghép các phần lại với nhau
    const fullAddress = parts.join(", ");

    setFormData((prev) => ({
      ...prev,
      fullAddress: fullAddress,
    }));
  }, [
    formData.streetNumber,
    formData.street,
    formData.ward,
    formData.district,
    formData.city,
    wards,
    districts,
    cities,
  ]);
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setError(null);
  };

  return (
    <div>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl  overflow-y-auto max-h-[90vh] relative">
            {/* Header cố định */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-300">
              <div className="flex items-center justify-between p-4">
                <h1 className="text-2xl font-semibold whitespace-nowrap">
                  Chỉnh sửa thông tin bài đăng
                </h1>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  <IoClose />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 p-4 text-center">{error}</div>
            ) : (
              <div className="flex justify-center p-5">
                <div className="w-full mt-5">
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    {/* Category Section */}
                    <div className="bg-white shadow-sm rounded p-4 mb-4">
                      <div className="text-lg font-medium mb-3">
                        Loại chuyên mục
                      </div>
                      <div className="flex flex-wrap -mx-2">
                        <div className="w-full md:w-1/2 px-2">
                          <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">
                              Loại chuyên mục{" "}
                              <span className="text-red-500">(*)</span>
                            </label>
                            <select
                              name="typeId"
                              className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={formData.typeId}
                              onChange={handleChange}
                              required
                            >
                              <option value="">
                                -- Chọn loại chuyên mục --
                              </option>
                              {types.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                  {cat.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Location Section */}
                    <div className="bg-white shadow-sm rounded p-4 mb-4">
                      <div className="text-lg font-medium mb-3">Khu vực</div>
                      <div className="flex flex-wrap -mx-2">
                        {/* Tỉnh/Thành phốỉ */}
                        <div className="w-full sm:w-1/2 px-2 mb-3">
                          <label className="block text-sm font-medium mb-1">
                            Tỉnh/Thành phốỉ{" "}
                            <span className="text-red-500">(*)</span>
                          </label>
                          <select
                            name="city"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          >
                            <option value="">-- Chọn Tỉnh/TP --</option>
                            {cities.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Quận/Huyện */}
                        <div className="w-full sm:w-1/2 px-2 mb-3">
                          <label className="block text-sm font-medium mb-1">
                            Quận/Huyện <span className="text-red-500">(*)</span>
                          </label>
                          <select
                            name="district"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.district}
                            onChange={handleChange}
                            required
                          >
                            <option value="">-- Chọn quận huyện --</option>
                            {districts.map((d) => (
                              <option key={d.id} value={d.id}>
                                {d.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Phường/Xã */}
                        <div className="w-full sm:w-1/2 px-2 mb-3">
                          <label className="block text-sm font-medium mb-1">
                            Phường/Xã
                          </label>
                          <select
                            name="ward"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.ward}
                            onChange={handleChange}
                          >
                            <option value="">-- Chọn phường xã --</option>
                            {wards.map((w) => (
                              <option key={w.id} value={w.id}>
                                {w.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Đường/Phố */}
                        <div className="w-full sm:w-1/2 px-2 mb-3">
                          <label className="block text-sm font-medium mb-1">
                            Đường/Phố
                          </label>
                          <input
                            type="text"
                            name="street"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.street}
                            onChange={handleChange}
                            placeholder="Nhập Đường/Phố"
                          />
                        </div>

                        {/* Số nhà */}
                        <div className="w-full sm:w-1/2 px-2 mb-3">
                          <label className="block text-sm font-medium mb-1">
                            Số nhà
                          </label>
                          <input
                            type="text"
                            name="streetNumber"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.streetNumber}
                            onChange={handleChange}
                            placeholder="Nhập số nhà"
                          />
                        </div>

                        {/* Địa chỉ */}
                        <div className="w-full sm:w-1/2 px-2 mb-3">
                          <label className="block text-sm font-medium mb-1">
                            Địa chỉ
                          </label>
                          <input
                            type="text"
                            name="fullAddress"
                            className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
                            readOnly
                            value={formData.fullAddress}
                            placeholder="Địa chỉ"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description Section */}
                    <div className="bg-white shadow-sm rounded p-4 mb-4">
                      <div className="text-lg font-medium mb-3">
                        Thông tin mô tả
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="col-span-1">
                          <div className="mb-3">
                            <label className="block mb-1 text-sm font-medium">
                              Tiêu đề <span className="text-red-500">(*)</span>
                            </label>
                            <textarea
                              name="title"
                              className="form-textarea w-full p-2 border border-secondary-subtle rounded-lg border-gray-300"
                              rows="2"
                              required
                              minLength="20"
                              maxLength="100"
                              value={formData.title}
                              onChange={handleChange}
                            ></textarea>
                            <p className="mt-2 mb-0 text-gray-500 text-sm">
                              <span>{formData.title.length}</span> (Tối thiểu 20
                              ký tự, tối đa 100 ký tự)
                            </p>
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium">
                              Nội dung mô tả{" "}
                              <span className="text-red-500">(*)</span>
                            </label>
                            <textarea
                              name="description"
                              className="form-textarea w-full p-2 border border-secondary-subtle rounded-lg border-gray-300"
                              rows="5"
                              required
                              minLength="20"
                              maxLength="1000"
                              value={formData.description}
                              onChange={handleChange}
                            ></textarea>
                            <p className="mt-2 mb-0 text-gray-500 text-sm">
                              <span>{formData.description.length}</span> (Tối
                              thiểu 20 ký tự, tối đa 5000 ký tự)
                            </p>
                          </div>
                        </div>
                        <div className="md:w-7/12">
                          <div className="mb-3">
                            <label className="block mb-1 text-sm font-medium">
                              Giá cho thuê{" "}
                              <span className="text-red-500">(*)</span>
                            </label>
                            <div className="flex">
                              <input
                                name="price"
                                pattern="[0-9.]+"
                                type="text"
                                className="form-input w-full p-2 border border-secondary-subtle rounded-l-lg border-gray-300 border-gray-300"
                                required
                                value={formatNumber(formData.price)}
                                onChange={(e) => {
                                  const rawValue = parseNumber(e.target.value);
                                  handleChange({
                                    target: {
                                      name: e.target.name,
                                      value: rawValue,
                                    },
                                  });
                                }}
                              />
                              <select
                                name="priceUnit"
                                className="form-select p-2 border border-secondary-subtle rounded-r-lg border-gray-300"
                                value={formData.priceUnit}
                                onChange={handleChange}
                              >
                                <option value="0">đồng/tháng</option>
                                <option value="1">đồng/m2/tháng</option>
                              </select>
                            </div>
                            <p className="text-muted mb-0 text-sm">
                              Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000
                            </p>
                          </div>
                        </div>
                        <div className="md:w-7/12">
                          <div className="mb-3">
                            <label className="block mb-1 text-sm font-medium">
                              Diện tích{" "}
                              <span className="text-red-500">(*)</span>
                            </label>
                            <div className="flex">
                              <input
                                name="area"
                                type="number"
                                pattern="[0-9.]+"
                                max="1000"
                                className="form-input w-full p-2 border border-secondary-subtle rounded-l-lg border-gray-300"
                                required
                                value={formData.area}
                                onChange={handleChange}
                              />
                              <span className="input-group-text border-secondary-subtle bg-white px-3 border rounded-r flex items-center border-gray-300">
                                m<sup>2</sup>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features Section */}
                    <div className="bg-white shadow-sm rounded p-4 mb-4">
                      <div className="text-lg font-medium mb-3">
                        Đặc điểm nổi bật
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {amenitiesList.map((feature) => (
                          <div
                            key={feature.id}
                            className="flex items-center space-x-2"
                          >
                            <input
                              className="form-checkbox h-5 w-5 text-blue-600"
                              name="categories"
                              type="checkbox"
                              id={`feature-${feature.id}`}
                              value={feature.id}
                              checked={formData.categories.includes(feature.id)}
                              onChange={handleChange}
                            />
                            <label
                              className="text-sm text-gray-700 cursor-pointer"
                              htmlFor={`feature-${feature.id}`}
                            >
                              {feature.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Images Section */}
                    <div>
                      <ImageUploadModal
                        formData={formData}
                        setFormData={setFormData}
                        isViewMode={!!postId}
                        images={formData.images}
                      />
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white shadow-sm rounded p-4 mb-4">
                      <div className="text-lg font-medium mb-3">
                        Thông tin liên hệ
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="mb-3">
                            <label
                              htmlFor="contactName"
                              className="block text-sm font-medium mb-1"
                            >
                              Họ Tên
                            </label>
                            <input
                              id="contactName"
                              type="text"
                              name="contactName"
                              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-sm"
                              readOnly
                              value={formData.contactName}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="mb-3">
                            <label
                              htmlFor="contactPhone"
                              className="block text-sm font-medium mb-1"
                            >
                              Số điện thoại
                            </label>
                            <input
                              id="contactPhone"
                              type="number"
                              name="contactPhone"
                              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-sm"
                              readOnly
                              value={formData.contactPhone}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="my-5">
                      <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg w-full flex justify-center items-center transition"
                      >
                        Cập nhật
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const types = [
  { value: "1", label: "Phòng trọ, nhà trọ" },
  { value: "2", label: "Nhà thuê nguyên căn" },
  { value: "3", label: "Cho thuê căn hộ" },
  { value: "4", label: "Cho thuê căn hộ mini" },
  { value: "5", label: "Cho thuê căn hộ dịch vụ" },
  { value: "6", label: "Tìm người ở ghép" },
  { value: "7", label: "Cho thuê mặt bằng + Văn phòng" },
];
