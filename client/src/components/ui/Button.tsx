interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

function Button({
  children,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        cursor-pointer
        mt-2
        rounded-md
        bg-primary
        px-4
        py-2
        font-medium
        text-white
        transition-all
        duration-200
        hover:bg-primary-hover
      "
    >
      {children}
    </button>
  );
}

export default Button;