import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ChartIcon: React.FC<IconProps> = ({
  size = 43,
  color = "white",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={(size * 43) / 54}
      viewBox="0 0 54 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 42.6667V37.3333H53.3333V42.6667H0ZM5.33333 32V10.6667H10.6667V32H5.33333ZM16 32V0H21.3333V32H16ZM26.6667 32V0H32V32H26.6667ZM45.3333 32L34.6667 13.3333L39.3333 10.6667L50 29.3333L45.3333 32Z"
        fill={color}
      />
    </svg>
  );
};

export default ChartIcon;
