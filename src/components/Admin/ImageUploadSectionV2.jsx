import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiX, FiImage } from "react-icons/fi";

export const ImageUploadSectionV2 = ({ value = [], onChange, error }) => {
  const [previewImages, setPreviewImages] = useState([]);

  // Cập nhật preview khi value thay đổi từ bên ngoài
  useEffect(() => {
    const newPreviews = value.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setPreviewImages(newPreviews);

    // Cleanup function để tránh rò rỉ bộ nhớ
    return () => {
      newPreviews.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = [...value, ...acceptedFiles];

      onChange(newFiles); // Gửi lại toàn bộ danh sách file lên react-hook-form
    },
    [value, onChange]
  );

  const removeImage = (index) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: 10,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div className="bg-white shadow-sm rounded p-4 mb-4">
      <div className="text-lg font-medium mb-3">Hình ảnh</div>

      <div className="mb-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-2">
            <FiUpload className="text-3xl text-gray-400" />
            <p className="text-sm text-gray-600">
              {isDragActive
                ? "Thả ảnh vào đây..."
                : "Kéo thả ảnh vào đây hoặc click để chọn ảnh"}
            </p>
            <p className="text-xs text-gray-500">
              Hỗ trợ: JPEG, PNG, WEBP (tối đa 5MB/ảnh)
            </p>
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
      </div>

      {previewImages.length > 0 ? (
        <div className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {previewImages.map((preview, index) => (
              <div
                key={index}
                className="relative group rounded-md overflow-hidden border border-gray-200"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <img
                    src={preview.preview}
                    alt={`Preview ${index}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FiX size={14} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                  {preview.file.name}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Đã chọn {previewImages.length} ảnh (tối đa 10 ảnh)
          </p>
        </div>
      ) : (
        <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
          <FiImage className="mx-auto text-2xl text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">Chưa có ảnh nào được chọn</p>
        </div>
      )}
    </div>
  );
};
