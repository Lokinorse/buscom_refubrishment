import React from "react";

export const ModalWindow = ({ children, onClose, title }) => {
  return (
    <div className="modal_window_wrapper">
      <div className="modal_content">
        <div className="close_button" onClick={onClose}>
          <div
            style={{
              width: "15px",
              height: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
            >
              <line
                x1="3"
                y1="3"
                x2="12"
                y2="12"
                stroke="black"
                strokeWidth="2"
              />
              <line
                x1="12"
                y1="3"
                x2="3"
                y2="12"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <div className="modal_title">{title}</div>
        {children}
      </div>
    </div>
  );
};
