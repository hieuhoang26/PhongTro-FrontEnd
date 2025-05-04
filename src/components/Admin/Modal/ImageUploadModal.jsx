import { useRef } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

export const ImageUploadModal = ({ formData, setFormData }) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // const handleFilesChange = (e) => {
  //   if (isViewMode) return;

  //   const files = Array.from(e.target.files);
  //   const newImages = files
  //     .filter((file) => file.size <= 10 * 1024 * 1024) // <= 10MB
  //     .map((file) => ({
  //       file,
  //       url: URL.createObjectURL(file),
  //       isNew: true, // Mark as new upload
  //     }));

  //   setFormData((prev) => ({
  //     ...prev,
  //     images: [...prev.images, ...newImages].slice(0, 20),
  //   }));
  // };
  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const newUploads = files.filter((file) => file.size <= 10 * 1024 * 1024); // <= 10MB

    setFormData((prev) => ({
      ...prev,
      newImages: [...(prev.newImages || []), ...newUploads].slice(0, 20),
    }));
  };

  // const handleRemoveImage = (indexToRemove) => {
  //   if (isViewMode) return;

  //   setFormData((prev) => {
  //     const updatedImages = [...prev.images];
  //     // If removing an existing image (from API), mark it for deletion
  //     if (!updatedImages[indexToRemove].isNew) {
  //       updatedImages[indexToRemove].toBeDeleted = true;
  //     } else {
  //       // If removing a new image, just remove it
  //       updatedImages.splice(indexToRemove, 1);
  //     }
  //     return { ...prev, images: updatedImages };
  //   });
  // };
  const handleRemoveImage = (type, index) => {
    setFormData((prev) => {
      if (type === "old") {
        const updatedImages = [...(prev.images || [])];
        updatedImages.splice(index, 1);
        return { ...prev, images: updatedImages };
      } else if (type === "new") {
        const updatedNewImages = [...(prev.newImages || [])];
        updatedNewImages.splice(index, 1);
        return { ...prev, newImages: updatedNewImages };
      }
    });
  };
  const indexOfType = (type, displayIndex) => {
    if (type === "old") {
      return displayIndex;
    } else if (type === "new") {
      return displayIndex - (formData.images?.length || 0);
    }
  };

  // Combine API images and new uploads, filter out marked for deletion
  // const displayImages =
  //   formData.images?.filter((img) => !img.toBeDeleted) || [];
  const displayImages = [
    ...(formData.images?.map((url) => ({ type: "old", data: url })) || []),
    ...(formData.newImages?.map((file) => ({ type: "new", data: file })) || []),
  ];

  return (
    <div className="bg-white shadow-sm rounded p-4 mb-4">
      <div className="text-lg font-medium mb-3">Hình ảnh</div>
      <div>
        <div className="mb-3">
          <div
            className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition`}
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

        {/* Preview images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {displayImages.map((img, index) => (
            <div
              key={index}
              className={`border border-gray-300 rounded-md overflow-hidden shadow-sm relative`}
            >
              <img
                src={
                  img.type === "old" ? img.data : URL.createObjectURL(img.data)
                }
                alt={`upload-${index}`}
                className="w-full h-32 object-cover"
              />

              <div className="bg-white text-center py-2">
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveImage(img.type, indexOfType(img.type, index))
                  }
                  className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center justify-center gap-1 mx-auto"
                >
                  <FaRegTrashCan />
                  Xoá
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {displayImages.map((img, index) => (
            <div
              key={index}
              className={`border border-gray-300 rounded-md overflow-hidden shadow-sm relative ${
                img.toBeDeleted ? "opacity-50" : ""
              }`}
            >
              <img
                src={img.url || img} // Handle both object URLs and direct URLs
                alt={`upload-${index}`}
                className="w-full h-32 object-cover"
              />
              {!isViewMode && (
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
              )}
              {img.toBeDeleted && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-bold">Đã xóa</span>
                </div>
              )}
            </div>
          ))}
        </div> */}

        {displayImages.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            "Chưa có hình ảnh nào được tải lên"
          </div>
        )}
      </div>
    </div>
  );
};
