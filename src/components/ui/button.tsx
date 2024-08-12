import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  type?: "primary" | "success" | "error";
  htmlType?: "button" | "submit" | "reset";
  disabled?: boolean;
  shadow?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  type = "primary",
  htmlType = "button",
  disabled = false,
  shadow = false,
  onClick,
}: IProps) => {
  return (
    <button
      className={`button -${type} ${shadow ? "-shadow" : ""}`}
      onClick={onClick}
      type={htmlType}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
