import React, { useState } from "react";
import { ModalWindow } from "./ModalWindow";

export function ImageModal({ image }) {
  const [showModal, setShowModal] = useState(false);
  const imageModalWrapperStyle = {
    backgroundImage: `url(https://bus-com.ru/image/${image})`,
    maxWidth: "80vh",
    maxHeight: "80vh",
    minWidth: "80vh",
    minHeight: "80vh",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
  const imageStyle = {
    backgroundImage: `url(https://bus-com.ru/image/${image})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    border: "2px solid black",
    backgroundRepeat: "no-repeat",
  };
  if (!image) return null;
  return (
    <>
      <div
        className="img"
        style={imageStyle}
        onClick={() => setShowModal(true)}
      ></div>
      {showModal && (
        <ModalWindow onClose={() => setShowModal(false)}>
          <div style={imageModalWrapperStyle}></div>
        </ModalWindow>
      )}
    </>
  );
}
