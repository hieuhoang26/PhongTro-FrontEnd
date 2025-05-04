import { useEffect, useState } from "react";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa";
import { useFilter } from "../../context/FilterContext";

export default function LocationModal({ isOpen, onClose, setAddInfo }) {
  const [step, setStep] = useState("city"); // city -> district -> ward

  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedWardName, setSelectedWardName] = useState("");

  useEffect(() => {
    const parts = [];
    if (selectedWardName) parts.push(selectedWardName);
    if (selectedDistrictName) parts.push(selectedDistrictName);
    if (selectedCityName) parts.push(selectedCityName);
    setAddInfo(parts.length > 0 ? parts.join(", ") : "All locations");
  }, [selectedCityName, selectedDistrictName, selectedWardName]);

  const {
    city,
    district,
    ward,
    listCity,
    listDistrict,
    listWard,
    setCity,
    setDistrict,
    setWard,
  } = useFilter();

  useEffect(() => {
    if (isOpen) {
      setStep("city");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setStep("city");
    }
  }, [isOpen]);

  const handleSelectCity = (city) => {
    setCity(city.id);
    setSelectedCityName(city.name);
    setStep("district");
  };

  const handleSelectDistrict = (district) => {
    setDistrict(district.id);
    setSelectedDistrictName(district.name);
    setStep("ward");
  };

  const handleSelectWard = (ward) => {
    setWard(ward.id);
    setSelectedWardName(ward.name);
    onClose();
  };

  const handleBack = () => {
    if (step === "ward") setStep("district");
    else if (step === "district") setStep("city");
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  const renderList = () => {
    if (step === "city") {
      return (
        <ul className="flex flex-col gap-2">
          <li
            onClick={() => {
              setSelectedCityName("Toàn quốc");
              setSelectedDistrictName("");
              setSelectedWardName("");
              setCity("");
              setDistrict("");
              setWard("");
              onClose();
            }}
            className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={!city} readOnly />
              <span>Tất cả</span>
            </div>
            <FaAngleRight className="text-gray-400" />
          </li>
          {listCity.map((i) => (
            <li
              key={i.id}
              onClick={() => handleSelectCity(i)}
              className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={i?.id === city} readOnly />
                <span>{i.name}</span>
              </div>
              <FaAngleRight className="text-gray-400" />
            </li>
          ))}
        </ul>
      );
    } else if (step === "district") {
      return (
        <ul className="flex flex-col gap-2">
          <li
            onClick={() => {
              setSelectedWardName("");
              setDistrict("");
              setWard("");
              onClose();
            }}
            className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={!district} readOnly />
              <span>Tất cả</span>
            </div>
            <FaAngleRight className="text-gray-400" />
          </li>
          {listDistrict.map((i) => (
            <li
              key={i.id}
              onClick={() => handleSelectDistrict(i)}
              className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={i?.id === district} readOnly />
                <span>{i.name}</span>
              </div>
              <FaAngleRight className="text-gray-400" />
            </li>
          ))}
        </ul>
      );
    } else if (step === "ward") {
      return (
        <ul className="flex flex-col gap-2">
          <li
            onClick={() => {
              // setSelectedWard(null);
              setWard("");
              onClose();
            }}
            className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={!ward} readOnly />
              <span>Tất cả</span>
            </div>
          </li>
          {listWard.map((i) => (
            <li
              key={i.id}
              onClick={() => handleSelectWard(i)}
              className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={i?.id === ward} readOnly />
                <span>{i.name}</span>
              </div>
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <>
      {isOpen && (
        <div
          id="modal-overlay"
          onClick={handleOverlayClick}
          className="inset-0 fixed z-[999] grid h-screen w-screen place-items-center"
        >
          <div
            className="relative m-4 p-4 w-1/3 min-w-[30%] max-w-[30%] max-h-[60vh] rounded-lg bg-white shadow-md flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nút đóng */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <IoClose size={24} />
            </button>

            <div className="flex items-center gap-2 pb-4 text-xl font-medium text-slate-800">
              {step !== "city" && (
                <button
                  onClick={handleBack}
                  className="text-blue-600 hover:text-blue-800 text-lg flex items-center"
                >
                  <IoArrowBack className="text-black text-xl" />
                </button>
              )}
              <span>
                {step === "city"
                  ? "Chọn tỉnh / thành phố"
                  : step === "district"
                  ? `Quận / huyện - ${selectedCityName}`
                  : `Phường / xã - ${selectedDistrictName}`}
              </span>
            </div>

            {/* Danh sách có scroll */}
            <div className="border-t border-slate-200 py-4 text-slate-600 font-light overflow-y-auto flex-1">
              {renderList()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
