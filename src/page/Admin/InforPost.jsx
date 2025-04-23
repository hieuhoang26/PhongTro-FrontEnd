import { useEffect, useState } from "react";
import { amenitiesList } from "../../utils/contant";
import { locationApi } from "../../api/location";
import { formatNumber, parseNumber } from "../../utils/other";
import ImageUploadSection from "../../components/Admin/ImageUploadSection";
import VideoUploadSection from "../../components/Admin/VideoUploadSection";
import { AddPostNav } from "../../components/Admin/AddPostNav";

export const InfoPost = () => {
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
  });

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Lấy danh sách tỉnh/thành phố khi component mount
  useEffect(() => {
    locationApi.getCities().then((res) => {
      setCities(res.data);
    });
  }, []);

  // Khi chọn tỉnh => gọi danh sách quận/huyện
  useEffect(() => {
    if (formData.city) {
      locationApi.getDistricts(formData.city).then((res) => {
        setDistricts(res.data);
        setWards([]); // reset phường
      });
    }
  }, [formData.city]);

  // Khi chọn quận => gọi danh sách phường
  useEffect(() => {
    if (formData.district) {
      locationApi.getWards(formData.district).then((res) => {
        setWards(res.data);
      });
    }
  }, [formData.district]);

  // Hàm này sẽ chạy mỗi khi các trường liên quan thay đổi
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
      address: fullAddress,
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const checkboxValue = Number(value); // hoặc parseInt(value)
      setFormData((prev) => {
        if (checked) {
          return { ...prev, features: [...prev.features, checkboxValue] };
        } else {
          return {
            ...prev,
            features: prev.features.filter((item) => item !== checkboxValue),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="relative ">
      {/* Navigation Bar cố định */}

      <AddPostNav />

      <div className="flex justify-center">
        <div className="w-full lg:w-4/6 mt-5">
          <form onSubmit={handleSubmit} className="form-horizontal">
            {/* Category Section */}
            <div className="bg-white shadow-sm rounded p-4 mb-4">
              <div className="text-lg font-medium mb-3">Loại chuyên mục</div>
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2">
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">
                      Loại chuyên mục <span className="text-red-500">(*)</span>
                    </label>
                    <select
                      name="category"
                      className="w-full p-2 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Chọn loại chuyên mục --</option>
                      {categories.map((cat) => (
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
            <div
              id="scrollspy_khuvuc"
              className="bg-white shadow-sm rounded p-4 mb-4"
            >
              <div className="text-lg font-medium mb-3">Khu vực</div>
              <div className="flex flex-wrap -mx-2">
                {/* Tỉnh/Thành phố */}
                <div className="w-full sm:w-1/2 px-2 mb-3">
                  <label className="block text-sm font-medium mb-1">
                    Tỉnh/Thành phố <span className="text-red-500">(*)</span>
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
                    name="address"
                    className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
                    readOnly
                    value={formData.address}
                    placeholder="Địa chỉ"
                  />
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div
              id="scrollspy_thongtinmota"
              className="bg-white shadow-sm rounded p-4 mb-4"
            >
              <div className="text-lg font-medium mb-3">Thông tin mô tả</div>
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
                      minLength="30"
                      maxLength="100"
                      value={formData.title}
                      onChange={handleChange}
                    ></textarea>
                    <p className="mt-2 mb-0 text-gray-500 text-sm">
                      <span>{formData.title.length}</span> (Tối thiểu 30 ký tự,
                      tối đa 100 ký tự)
                    </p>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">
                      Nội dung mô tả <span className="text-red-500">(*)</span>
                    </label>
                    <textarea
                      name="description"
                      className="form-textarea w-full p-2 border border-secondary-subtle rounded-lg border-gray-300"
                      rows="5"
                      required
                      minLength="50"
                      maxLength="1000"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                    <p className="mt-2 mb-0 text-gray-500 text-sm">
                      <span>{formData.description.length}</span> (Tối thiểu 50
                      ký tự, tối đa 5000 ký tự)
                    </p>
                  </div>
                </div>
                <div className="md:w-7/12">
                  <div className="mb-3">
                    <label className="block mb-1 text-sm font-medium">
                      Giá cho thuê <span className="text-red-500">(*)</span>
                    </label>
                    <div className="flex">
                      <input
                        id="giachothue"
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
                        className="form-select p-2 border border-secondary-subtle rounded-r-lg border-gray-300 "
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
                      Diện tích <span className="text-red-500">(*)</span>
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
              <div className="text-lg font-medium mb-3">Đặc điểm nổi bật</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {amenitiesList.map((feature) => (
                  <div key={feature.id} className="flex items-center space-x-2">
                    <input
                      className="form-checkbox h-5 w-5 text-blue-600"
                      name="features"
                      type="checkbox"
                      id={`feature-${feature.id}`}
                      value={feature.id}
                      checked={formData.features.includes(feature.id)}
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
            <div id="scrollspy_hinhanh">
              <ImageUploadSection
                formData={formData}
                setFormData={setFormData}
              />
            </div>

            {/* Video Section */}
            <div id="scrollspy_video">
              <VideoUploadSection
                formData={formData}
                setFormData={setFormData}
              />
            </div>

            {/* Contact Information */}
            <div
              id="scrollspy_thongtinlienhe"
              className="bg-white shadow-sm rounded p-4 mb-4"
            >
              <div className="text-lg font-medium mb-3">Thông tin liên hệ</div>
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
                      value="Nguyễn Văn A"
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
                      value="0901234567"
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
                Tiếp tục
                <i className="icon arrow-right-long text-white text-xl ml-2"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const categories = [
  { value: "1", label: "Phòng trọ, nhà trọ" },
  { value: "2", label: "Nhà thuê nguyên căn" },
  { value: "3", label: "Cho thuê căn hộ" },
  { value: "4", label: "Cho thuê căn hộ mini" },
  { value: "5", label: "Cho thuê căn hộ dịch vụ" },
  { value: "6", label: "Tìm người ở ghép" },
  { value: "7", label: "Cho thuê mặt bằng + Văn phòng" },
];

// <div className="bg-white shadow-sm rounded p-4 mb-4">
//   <div className="fs-5 fw-medium">Bản đồ</div>
//   <div className="w-full h-64 mt-3">
//     <iframe
//       width="100%"
//       height="100%"
//       style={{ border: 0 }}
//       loading="lazy"
//       allowFullScreen
//       src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD6Coia3ssHYuRKJ2nDysWBdSlVlBCzKAw&q=Hồ Chí Minh"
//     ></iframe>
//   </div>
// </div>
