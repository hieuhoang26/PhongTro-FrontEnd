import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ModalConfirmDelete = ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (!reason.trim()) {
      toast.error("Vui lòng nhập lý do xoá!");
      return;
    }
    onConfirm(reason);
    setReason("");
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  // Reset reason mỗi khi mở modal
  useEffect(() => {
    if (isOpen) setReason("");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative z-50">
        <h2 className="text-xl font-semibold mb-4">Xác nhận xoá bài đăng</h2>
        <textarea
          className="w-full border rounded p-2 resize-none"
          rows="4"
          placeholder="Nhập lý do xoá bài đăng..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Huỷ
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
