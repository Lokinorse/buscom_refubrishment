import React, { useRef, useEffect } from "react";

export const ClickOutside = ({ children, callback }) => {
  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, wrapperRef]);
  return <div ref={wrapperRef}>{children}</div>;
};
