import type { ReactNode } from "react";
type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}
export default function Modal({isOpen, onClose, children}: ModalProps) {
    if (!isOpen) return null;
     return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">X</button>
        {children}
      </div>
    </div>
  );
}


