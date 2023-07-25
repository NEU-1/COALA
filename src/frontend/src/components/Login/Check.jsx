import React from "react";

export const Check = ({ className }) => {
  return (
    <svg
      className={`check ${className}`}
      fill="none"
      height="15"
      viewBox="0 0 15 15"
      width="15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="rect" fill="#D7B4FF" height="15" rx="4" width="15" />
      <rect className="rect" fill="#D7B4FF" height="12" transform="translate(1.5 1.5)" width="12" />
      <path
        className="path"
        d="M6.335 10.975L3.5 8.145L4.31 7.335L6.335 9.355L6.335 9.355L11.19 4.5L12 5.31L7.145 10.165L6.335 10.975L6.335 10.975Z"
        fill="white"
      />
    </svg>
  );
};

export default Check