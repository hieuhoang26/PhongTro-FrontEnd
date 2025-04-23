import { useRef } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

const ImageUploadSection = ({ formData, setFormData }) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files
      .filter((file) => file.size <= 10 * 1024 * 1024) // <= 10MB
      .map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 20),
    }));
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages.splice(indexToRemove, 1);
      return { ...prev, images: updatedImages };
    });
  };

  return (
    <div className="bg-white shadow-sm rounded p-4 mb-4">
      <div className="text-lg font-medium mb-3">Hình ảnh</div>
      <div>
        <div className="mb-3">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
            onClick={handleUploadClick}
          >
            <i className="icon-upload-image text-3xl text-gray-400 mb-2"></i>
            <span className="block text-sm text-gray-600">
              Tải ảnh từ thiết bị
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={handleFilesChange}
          />
        </div>

        <div className="text-sm text-gray-500 mb-3">
          <ul className="list-disc pl-5 space-y-1">
            <li>Tải lên tối đa 20 ảnh trong một bài đăng</li>
            <li>Dung lượng ảnh tối đa 10MB</li>
            <li>Hình ảnh phải liên quan đến phòng trọ, nhà cho thuê</li>
            <li>Không chèn văn bản, số điện thoại lên ảnh</li>
          </ul>
        </div>

        {/* Preview ảnh đã chọn */}
        <div className="grid grid-cols-3 gap-3">
          {formData.images?.map((img, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-md overflow-hidden shadow-sm"
            >
              <img
                src={img.url}
                alt={`upload-${index}`}
                className="w-full h-32 object-cover"
              />
              <div className="bg-white text-center py-2">
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center justify-center gap-1 mx-auto"
                >
                  <FaRegTrashCan />
                  Xoá
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSection;
