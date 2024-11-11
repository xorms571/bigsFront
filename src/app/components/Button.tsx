type ButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  text: string;
};
const Button = ({ text, className, onClick, type }: ButtonProps) => {
  return (
    <button
      type={type}
      className={className + " bg-white hover:bg-black hover:text-white"}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
