import React from "react";

import { MinaModalProps } from "@/components/types";

const MinaModal: React.FC<MinaModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-xl mb-4">{title}</h2>
        <p>{message}</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
        <button className="mt-4 text-red-500" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MinaModal;
