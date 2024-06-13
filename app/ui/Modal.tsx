import React from "react";
import clsx from "clsx";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageSrc }) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center",
        isOpen ? "block" : "hidden"
      )}
    >
      <div
        className="bg-inverse fixed inset-0 bg-paper-light opacity-80"
        onClick={onClose}
      ></div>

      <div className="relative mx-auto h-[93vh] w-full max-w-prose p-4 ">
        <Image
          src={imageSrc || ""}
          alt="caption for image"
          layout="fill"
          objectFit="cover"
          className="h-full w-full"
        />
      </div>

      <button
        onClick={onClose}
        className="fixed right-24 top-3 text-5xl text-primary"
      >
        X
      </button>
    </div>
  );
};

export default Modal;
