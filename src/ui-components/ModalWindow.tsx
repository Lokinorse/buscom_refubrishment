import React, { ReactNode } from "react";

interface IModalWindowProps {
  children?: ReactNode;
  onClose: () => void;
  title?: string;
}

export const ModalWindow = ({
  children,
  onClose,
  title,
}: IModalWindowProps) => {
  return (
    <div className={`modal_window_wrapper`}>
      <div className="modal_content">
        <div
          className="close_button"
          onClick={() => {
            onClose();
          }}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
            >
              <line
                x1="2"
                y1="2"
                x2="20"
                y2="20"
                stroke="black"
                strokeWidth="2"
              />
              <line
                x1="20"
                y1="2"
                x2="2"
                y2="20"
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
