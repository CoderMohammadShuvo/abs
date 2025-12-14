import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const HouseIcon: React.FC<IconProps> = ({
  size = 48,
  color = "white",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={(size * 48) / 59}
      viewBox="0 0 59 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M29.3333 48L10.6667 37.8667V21.8667L0 16L29.3333 0L58.6667 16V37.3333H53.3333V18.9333L48 21.8667V37.8667L29.3333 48ZM29.3333 25.8667L47.6 16L29.3333 6.13333L11.0667 16L29.3333 25.8667ZM29.3333 41.9333L42.6667 34.7333V24.6667L29.3333 32L16 24.6667V34.7333L29.3333 41.9333Z"
        fill={color}
      />
    </svg>
  );
};

export default HouseIcon;
