import { useEffect, useState } from "react";
import { IoClose, IoStorefrontOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { BsHouseDoor, BsHouses } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { PiBuildingApartment } from "react-icons/pi";

import { useFilter } from "../../context/FilterContext";
import {
  amenitiesList,
  areaRanges,
  categories,
  priceRanges,
} from "../../utils/contant";

const FilterModal = ({ isOpen, onClose }) => {
  const {
    type,
    setType,
    area,
    setArea,
    amenities,
    setAmenities,
    price,
    setPrice,
    city,
    district,
    ward,
    listCity,
    listDistrict,
    listWard,
    setCity,
    setDistrict,
    setWard,
    fetchPosts,
  } = useFilter();

  const handleToggleAmenity = (id) => {
    setAmenities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    fetchPosts();
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="inset-0 fixed z-[999] grid h-screen w-screen place-items-center"
          onClick={onClose}
        >
          <div
            className="relative m-4 p-4 w-1/3 min-w-[35%] max-w-[40%] max-h-[60vh] rounded-lg bg-white shadow-md flex flex-col "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">
              Bộ lọc
              <button
                onClick={onClose}
                className="ml-auto text-slate-600 text-2xl"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="border-b border-t border-gray-200 mb-4 overflow-y-auto">
              {/* Category Filter */}
              <div className="mb-4 pb-2">
                <div className="text-lg font-medium mb-3">
                  Danh mục cho thuê
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => setType(cat.id)}
                      className={`relative shadow-sm rounded-2xl text-center p-2 border flex flex-col items-center justify-center gap-1 ${
                        type === cat.id ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-sm whitespace-nowrap">
                        {cat.label}
                      </span>
                      {type === cat.id && (
                        <FaCheck
                          className="absolute text-white bg-red-500 rounded-full p-0.5 size-4"
                          style={{ top: "-8px", right: "-4px" }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Address Filter */}
              <div className="mb-4 pb-2">
                <div className="text-lg font-normal mb-3">Lọc theo khu vực</div>
                <div className="grid grid-cols-3 gap-1 text-sm">
                  {/* Tỉnh thành */}
                  <div className="flex flex-col">
                    <label className="form-label mb-1 ">Tỉnh thành</label>
                    <select
                      className="form-select form-select-lg shadow-sm rounded-2xl text-sm px-2 py-2 border border-gray-300"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">Toàn quốc</option>
                      {listCity.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quận huyện */}
                  <div className="flex flex-col">
                    <label className="form-label mb-1 ">Quận huyện</label>
                    <select
                      className="form-select form-select-lg shadow-sm rounded-2xl text-sm px-2 py-2 border border-gray-300"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      disabled={!city}
                    >
                      <option value="">Tất cả</option>
                      {listDistrict.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Phường xã */}
                  <div className="flex flex-col">
                    <label className="form-label mb-1">Phường xã</label>
                    <select
                      className="form-select form-select-lg shadow-sm rounded-2xl text-sm px-2 py-2 border border-gray-300"
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      disabled={!district}
                    >
                      <option value="">Tất cả</option>
                      {listWard.map((ward) => (
                        <option key={ward.id} value={ward.id}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-4 pb-2">
                <div className="text-lg font-medium mb-3">Khoảng giá</div>
                <div className="grid grid-cols-6 gap-2 text-sm">
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => setPrice(range.value)}
                      className={`relative shadow-sm rounded-2xl text-center p-2 border flex flex-col items-center justify-center gap-1 ${
                        price === range.value
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      {range.label}
                      {price === range.value && (
                        <FaCheck
                          className="absolute text-white bg-red-500 rounded-full p-0.5 size-4"
                          style={{ top: "-8px", right: "-4px" }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Range */}
              <div className="mb-4 pb-2">
                <div className="text-lg font-medium mb-3">Khoảng diện tích</div>
                <div className="grid grid-cols-5 gap-1 text-sm">
                  {areaRanges.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => setArea(range.value)}
                      className={`relative shadow-sm rounded-2xl text-center p-2 border flex flex-col items-center justify-center gap-1 ${
                        area === range.value
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      {range.label}
                      {area === range.value && (
                        <FaCheck
                          className="absolute text-white bg-red-500 rounded-full p-0.5 size-4"
                          style={{ top: "-8px", right: "-4px" }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Đặc điểm */}
              <div className="mb-4 pb-2">
                <div className="text-lg font-medium mb-3">Đặc điểm nổi bật</div>
                <div className="grid grid-cols-6 gap-1 text-xs">
                  {amenitiesList.map((i, index) => (
                    <button
                      key={index}
                      onClick={() => handleToggleAmenity(i.id)}
                      className={`relative shadow-sm rounded-2xl text-center p-2 border flex flex-col items-center justify-center gap-1 ${
                        amenities.includes(i.id)
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      {i.label}
                      {amenities.includes(i.id) && (
                        <FaCheck
                          className="absolute text-white bg-red-500 rounded-full p-0.5 size-4"
                          style={{ top: "-8px", right: "-4px" }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex justify-center">
              <button
                onClick={handleApply}
                className="bg-red-500 hover:bg-red-600 text-white text-base w-full p-2 rounded-2xl"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterModal;
