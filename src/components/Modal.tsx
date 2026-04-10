import type { ReactNode } from "react";
type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}


export default function Modal({isOpen, onClose, children}) {
    if (!isOpen) return null;
     return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalStyle: React.CSSProperties = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
};
