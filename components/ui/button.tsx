import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  type?: "primary" | "success" | "error";
  onClick?: () => void;
}

const Button = ({ children, type = "primary", onClick }: IProps) => {
  return (
    <div className={`button -${type}`} onClick={onClick}>
      {children}
    </div>
  );
};
export default Button;
