type ButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  text: string;
  disabled?: boolean;
};
const Button = ({ text, className, onClick, type, disabled }: ButtonProps) => {
  return (
    <button
      type={type}
      className={className + ` bg-white ${!disabled?'hover:bg-black hover:text-white':''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
