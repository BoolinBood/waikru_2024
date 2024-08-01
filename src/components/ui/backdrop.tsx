import { motion } from "framer-motion";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  onClick: () => void;
}

const Backdrop = ({ children, onClick }: IProps) => {
  return (
    <motion.div
      onClick={onClick}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
