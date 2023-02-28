import clsx from "clsx";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={clsx(
        "text-highlight rounded-lg bg-bg-200 px-3 py-[0.4rem] disabled:opacity-50",
        "active:bg-bg-400 scale-100 transform transition-all hover:bg-bg-300 active:scale-95",
        className ?? ""
      )}
    >
      {children}
    </button>
  );
};

export default Button;
