import { useRef } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

const VideoUploadSection = ({ formData, setFormData }) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const newVideos = files
      .filter((file) => file.size <= 100 * 1024 * 1024) // <= 100MB
      .map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

    setFormData((prev) => ({
      ...prev,
      videoFiles: [...prev.videoFiles, ...newVideos].slice(0, 5), // Limit to 5 videos
    }));
  };

  const handleRemoveVideo = (indexToRemove) => {
    setFormData((prev) => {
      const updatedVideos = [...prev.videoFiles];
      updatedVideos.splice(indexToRemove, 1);
      return { ...prev, videoFiles: updatedVideos };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white shadow-sm rounded p-4 mb-4">
      <div className="text-lg font-medium mb-3">Video</div>

      {/* Video URL Input */}
      <div className="mt-3 mb-3">
        <label htmlFor="youtube_url" className="block text-sm font-medium mb-1">
          Video Link (Youtube/Tiktok)
        </label>
        <input
          id="youtube_url"
          type="text"
          name="videoLink"
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.videoLink}
          onChange={handleChange}
        />
        <div className="mt-3 text-sm text-gray-600">
          <strong>Lưu ý:</strong> Bạn có thể chọn video từ Youtube hoặc Tiktok
          để hiển thị trên bài viết của mình.
          <p className="mt-1">
            <strong>https://www.youtube.com/watch?v=xxxxxxxxxxx</strong>
            <br />
            <strong>https://www.tiktok.com/@username/video</strong>
          </p>
        </div>
      </div>

      {/* <p className="text-sm text-center mb-3">Hoặc</p> */}

      {/* Upload Video from Device */}
      <div>
        {/* <div className="mb-3">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
            onClick={handleUploadClick}
          >
            <i className="icon-upload-video text-3xl text-gray-400 mb-2"></i>
            <span className="block text-sm text-gray-600">
              Tải Video từ thiết bị
            </span>
          </div>
        </div>
        <input
          type="file"
          accept="video/*"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleFilesChange}
        /> */}

        {/* Preview uploaded videos */}
        {/* <div className="grid grid-cols-3 gap-3">
          {formData.videoFiles?.map((video, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-md overflow-hidden shadow-sm"
            >
              <video controls className="w-full h-32 object-cover">
                <source src={video.url} />
                Your browser does not support the video tag.
              </video>
              <div className="bg-white text-center py-2">
                <button
                  type="button"
                  onClick={() => handleRemoveVideo(index)}
                  className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center justify-center gap-1 mx-auto"
                >
                  <FaRegTrashCan />
                  Xoá
                </button>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default VideoUploadSection;
