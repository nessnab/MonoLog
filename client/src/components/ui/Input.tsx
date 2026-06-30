interface InputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

function Input({
  value,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="
        text-sm
        my-1
        w-full
        rounded-md
        border
        border-border
        bg-white
        px-4
        py-2
        focus:border-primary
        focus:outline-none
      "
    />
  );
}

export default Input;