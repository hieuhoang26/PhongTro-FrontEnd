import { useEffect, useState } from "react";
import { amenitiesList } from "../../utils/contant";
import { locationApi } from "../../api/location";
import { formatNumber, parseNumber } from "../../utils/other";
import { AddPostNav } from "../../components/Admin/AddPostNav";
import { IoWarningOutline } from "react-icons/io5";
import { Controller } from "react-hook-form";
import { ImageUploadSectionV2 } from "../../components/Admin/ImageUploadSectionV2";
import { MAPBOX_TOKEN } from "../../utils/mapbox";
import AddressMap from "../../components/Map/AddressMap";

export const InfoPost = ({
  register,
  control,
  errors,
  setValue,
  watch,
  handleNext,
  isVerify,
  handleSubmit,
}) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  // Watch form values
  const streetNumber = watch("streetNumber");
  const street = watch("street");
  const ward = watch("ward");
  const district = watch("district");
  const city = watch("city");

  // Lấy danh sách tỉnh/thành phố khi component mount
  useEffect(() => {
    locationApi.getCities().then((res) => {
      setCities(res.data);
    });
  }, []);

  // Khi chọn tỉnh => gọi danh sách quận/huyện
  useEffect(() => {
    if (city) {
      // city
      locationApi.getDistricts(city).then((res) => {
        setDistricts(res.data);
        setWards([]);
        setValue("district", "");
        setValue("ward", "");
      });
    }
  }, [city, setValue]);

  // Khi chọn quận => gọi danh sách phường
  useEffect(() => {
    if (district) {
      // district
      locationApi.getWards(district).then((res) => {
        setWards(res.data);
        setValue("ward", "");
      });
    }
  }, [district, setValue]);

  // Update full address when location fields change
  useEffect(() => {
    const parts = [];

    if (streetNumber) parts.push(streetNumber);
    if (street) parts.push(street);

    const selectedWard = wards.find((w) => w.id === Number(ward));
    if (selectedWard) parts.push(selectedWard.name);

    const selectedDistrict = districts.find((d) => d.id === Number(district));
    if (selectedDistrict) parts.push(selectedDistrict.name);

    const selectedCity = cities.find((c) => c.id === Number(city));
    if (selectedCity) parts.push(selectedCity.name);

    const fullAddress = parts.join(", ");
    setValue("fullAddress", fullAddress);
  }, [
    streetNumber,
    street,
    ward,
    district,
    city,
    wards,
    districts,
    cities,
    setValue,
  ]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const checkboxValue = Number(value);

    const currentCategories = watch("categories") || [];

    if (checked) {
      setValue("categories", [...currentCategories, checkboxValue]);
    } else {
      setValue(
        "categories",
        currentCategories.filter((item) => item !== checkboxValue)
      );
    }
  };

  return (
    <div className="relative ">
      {/* Navigation Bar cố định */}

      <AddPostNav />

      <div className="flex justify-center">
        <div className="w-full lg:w-4/6 mt-5">
          <form onSubmit={handleSubmit} className="form-horizontal">
            {isVerify == false && (
              <div class="bg-orange-200 px-6 py-4 my-2 rounded-md text-lg flex items-center mx-auto w-full">
                <svg
                  viewBox="0 0 24 24"
                  class="text-yellow-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                >
                  <IoWarningOutline size={24} />
                </svg>
                <span class="text-yellow-800">
                  Cần xác thực tài khoản trước khi đăng tin. Vui lòng kiểm tra
                </span>
              </div>
            )}
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
                      {...register("typeId")}
                      className={`w-full p-2 text-base border ${
                        errors.typeId ? "border-red-500" : "border-gray-300"
                      } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">-- Chọn loại chuyên mục --</option>
                      {types.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    {errors.typeId && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.typeId.message}
                      </p>
                    )}
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
                    {...register("city")}
                    className={`w-full p-2 border ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">-- Chọn Tỉnh/TP --</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* Quận/Huyện */}
                <div className="w-full sm:w-1/2 px-2 mb-3">
                  <label className="block text-sm font-medium mb-1">
                    Quận/Huyện <span className="text-red-500">(*)</span>
                  </label>
                  <select
                    {...register("district")}
                    className={`w-full p-2 border ${
                      errors.district ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    disabled={!watch("city")}
                  >
                    <option value="">-- Chọn quận huyện --</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.district.message}
                    </p>
                  )}
                </div>

                {/* Phường/Xã */}
                <div className="w-full sm:w-1/2 px-2 mb-3">
                  <label className="block text-sm font-medium mb-1">
                    Phường/Xã
                  </label>
                  <select
                    {...register("ward")}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!watch("district")}
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
                    {...register("street")}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    {...register("streetNumber")}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    {...register("fullAddress")}
                    className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
                    readOnly
                    placeholder="Địa chỉ"
                  />
                </div>
              </div>
            </div>
            {/* Map */}
            <div className="bg-white shadow-sm rounded p-4 mb-4">
              {watch("fullAddress") && (
                <div className="mb-6">
                  <div className="text-base font-semibold text-gray-700 mb-2">
                    Xem vị trí trên bản đồ
                  </div>
                  <AddressMap
                    fullAddress={watch("fullAddress")}
                    setValue={setValue}
                  />
                </div>
              )}
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
                      {...register("title", {
                        minLength: {
                          value: 10,
                          message: "Tối thiểu 30 ký tự",
                        },
                        maxLength: {
                          value: 100,
                          message: "Tối đa 100 ký tự",
                        },
                      })}
                      className={`form-textarea w-full p-2 border ${
                        errors.title ? "border-red-500" : "border-gray-300"
                      } rounded-lg`}
                      rows="2"
                    ></textarea>
                    <div className="flex justify-between">
                      {errors.title ? (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.title.message}
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-gray-500">
                          {watch("title")?.length || 0}/100 ký tự
                        </p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        Tối thiểu 30 ký tự, tối đa 100 ký tự
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">
                      Nội dung mô tả <span className="text-red-500">(*)</span>
                    </label>
                    <textarea
                      {...register("description", {
                        minLength: {
                          value: 10,
                          message: "Tối thiểu 50 ký tự",
                        },
                        maxLength: {
                          value: 5000,
                          message: "Tối đa 5000 ký tự",
                        },
                      })}
                      className={`form-textarea w-full p-2 border ${
                        errors.description
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg`}
                      rows="5"
                    ></textarea>
                    <div className="flex justify-between">
                      {errors.description ? (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.description.message}
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-gray-500">
                          {watch("description")?.length || 0}/5000 ký tự
                        </p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        Tối thiểu 50 ký tự, tối đa 5000 ký tự
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:w-7/12">
                  <div className="mb-3">
                    <label className="block mb-1 text-sm font-medium">
                      Giá cho thuê <span className="text-red-500">(*)</span>
                    </label>
                    <div className="flex">
                      <input
                        {...register("price")}
                        className={`form-input w-full p-2 border ${
                          errors.price ? "border-red-500" : "border-gray-300"
                        } rounded-l-lg`}
                        onChange={(e) => {
                          // const rawValue = parseNumber(e.target.value);
                          const rawValue = e.target.value;
                          if (!isNaN(rawValue)) {
                            setValue("price", rawValue, {
                              shouldValidate: true,
                            });
                          }
                        }}
                        value={watch("price") || ""}
                      />

                      <select
                        name="priceUnit"
                        className="form-select p-2 border border-secondary-subtle rounded-r-lg border-gray-300 "
                      >
                        <option value="0">đồng/tháng</option>
                        <option value="1">đồng/m2/tháng</option>
                      </select>
                    </div>
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.price.message}
                      </p>
                    )}
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
                        {...register("area", {
                          min: {
                            value: 1,
                            message: "Diện tích phải lớn hơn 0",
                          },
                          max: {
                            value: 1000,
                            message: "Diện tích tối đa 1000m²",
                          },
                        })}
                        type="number"
                        className={`form-input w-full p-2 border ${
                          errors.area ? "border-red-500" : "border-gray-300"
                        } rounded-l-lg`}
                      />
                      <span className="input-group-text border-secondary-subtle bg-white px-3 border rounded-r flex items-center border-gray-300">
                        m<sup>2</sup>
                      </span>
                    </div>
                    {errors.area && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.area.message}
                      </p>
                    )}
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
                      type="checkbox"
                      id={`feature-${feature.id}`}
                      value={feature.id}
                      checked={
                        watch("categories")?.includes(feature.id) || false
                      }
                      onChange={(e) => {
                        const currentCategories = watch("categories") || [];
                        if (e.target.checked) {
                          setValue(
                            "categories",
                            [...currentCategories, feature.id],
                            {
                              shouldValidate: true,
                            }
                          );
                        } else {
                          setValue(
                            "categories",
                            currentCategories.filter((id) => id !== feature.id),
                            { shouldValidate: true }
                          );
                        }
                      }}
                      className="form-checkbox h-5 w-5 text-blue-600"
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
              {errors.categories && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.categories.message}
                </p>
              )}
            </div>

            {/* Images Section */}
            <div id="scrollspy_hinhanh">
              <Controller
                name="images"
                control={control}
                rules={{
                  validate: (value) =>
                    value?.length > 0 || "Cần ít nhất 1 hình ảnh",
                }}
                render={({ field }) => (
                  <ImageUploadSectionV2
                    value={field.value}
                    onChange={(files) => {
                      field.onChange(files);
                    }}
                    error={errors.images}
                  />
                )}
              />
            </div>

            {/* Video Section */}
            <div id="scrollspy_video"></div>

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
                      {...register("username", {
                        required: "Vui lòng nhập họ tên",
                      })}
                      className={`w-full p-3 border ${
                        errors.username ? "border-red-500" : "border-gray-300"
                      } rounded-lg text-sm`}
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
                      {...register("phone", {
                        required: "Vui lòng nhập số điện thoại",
                        pattern: {
                          value: /^[0-9]{10,11}$/,
                          message: "Số điện thoại không hợp lệ",
                        },
                      })}
                      className={`w-full p-3 border ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } rounded-lg text-sm`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <input type="hidden" {...register("latitude")} />
            <input type="hidden" {...register("longitude")} />

            {/* Submit Button */}
            <div className="my-5">
              <button
                type="button"
                onClick={handleNext}
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
const types = [
  { value: "1", label: "Phòng trọ, nhà trọ" },
  { value: "2", label: "Nhà thuê nguyên căn" },
  { value: "3", label: "Cho thuê căn hộ" },
  { value: "4", label: "Cho thuê căn hộ mini" },
  { value: "5", label: "Cho thuê căn hộ dịch vụ" },
  { value: "6", label: "Tìm người ở ghép" },
  { value: "7", label: "Cho thuê mặt bằng + Văn phòng" },
];
