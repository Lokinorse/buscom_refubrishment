import React from "react";
const LoaderSvg = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {" "}
      <path
        d="M50 0C77.6151 0 100 22.2305 100 49.6552C100 77.0798 77.6151 99.3103 50 99.3103C22.3849 99.3103 0 77.0798 0 49.6552C0 22.2305 22.3849 0 50 0ZM50 5.50727C25.4479 5.50727 5.54551 25.2724 5.54551 49.6552C5.54551 74.0379 25.4479 93.8031 50 93.8031C74.5521 93.8031 94.4545 74.0379 94.4545 49.6552C94.4545 25.2724 74.5521 5.50727 50 5.50727V5.50727Z"
        fill="#12203E"
      />{" "}
      <path
        d="M50.1306 12.0281C50.1306 13.7734 50.1306 15.5167 50.1306 17.2621C32.0359 17.2621 17.3778 31.6536 17.3778 49.6574C15.6203 49.6574 13.8649 49.6574 12.1074 49.6574C12.1074 28.7653 29.1256 12.0281 50.1306 12.0281V12.0281ZM50.1306 82.0528C68.0928 81.983 82.6184 67.4957 82.6184 49.6574C84.3758 49.6574 86.1313 49.6574 87.8887 49.6574C87.8887 70.388 71.0051 87.2169 50.1306 87.2868C50.1306 85.5414 50.1306 83.7981 50.1306 82.0528V82.0528Z"
        fill="#55A8FD"
      />{" "}
    </svg>
  );
};

export const Loading = () => {
  return (
    <div className="loading">
      {" "}
      <span className="loading_icon">
        {" "}
        <LoaderSvg />{" "}
      </span>{" "}
    </div>
  );
};
