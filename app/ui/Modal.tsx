import React from "react";
import clsx from "clsx";
import Image from "next/image";
import CloseIcon from "@/public/icons/close.svg";

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

      <div className="relative mx-auto h-4/5 w-full p-4 md:h-[93vh] ">
        <Image
          src={imageSrc || ""}
          alt="caption for image"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <button
        onClick={onClose}
        className="fixed right-4 top-3 rounded-full bg-white p-2 text-primary dark:bg-black md:right-24"
      >
        <CloseIcon width={24} height={24} />
      </button>
    </div>
  );
};

export default Modal;
