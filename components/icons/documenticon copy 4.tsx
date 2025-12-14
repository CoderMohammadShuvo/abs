"use client";

import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const DocumentIcon: React.FC<IconProps> = ({
  size = 48,
  color = "white",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.33333 48C3.86667 48 2.61111 47.4778 1.56667 46.4333C0.522222 45.3889 0 44.1333 0 42.6667V5.33333C0 3.86667 0.522222 2.61111 1.56667 1.56667C2.61111 0.522222 3.86667 0 5.33333 0H34.6667L48 13.3333V42.6667C48 44.1333 47.4778 45.3889 46.4333 46.4333C45.3889 47.4778 44.1333 48 42.6667 48H5.33333ZM5.33333 42.6667H42.6667V16H32V5.33333H5.33333V42.6667ZM10.6667 37.3333H37.3333V32H10.6667V37.3333ZM10.6667 16H24V10.6667H10.6667V16ZM10.6667 26.6667H37.3333V21.3333H10.6667V26.6667Z"
        fill={color}
      />
    </svg>
  );
};

export default DocumentIcon;
