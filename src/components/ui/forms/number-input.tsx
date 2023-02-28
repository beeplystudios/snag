import { useTsController } from "@ts-react/form";
import clsx from "clsx";

interface NumberInputProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
}

// if you put React.FC here it will break!
export const NumberInput = ({
  name,
  label,
  placeholder,
  description,
  className,
}: NumberInputProps) => {
  const { field, error } = useTsController<number>();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-[500]">
        {label}
      </label>
      <input
        id={name}
        type="number"
        className={clsx(
          "w-full rounded-lg bg-bg-100 px-3 py-[10px] outline-none",
          "focus:ring",
          className
        )}
        value={field.value ? field.value : "0"}
        onChange={(e) => {
          if (!isNaN(parseInt(e.target.value)))
            field.onChange(parseInt(e.target.value));
        }}
        placeholder={placeholder}
      />
      <p className="ml-1 text-white/70">{description}</p>

      {error && <p>{error.errorMessage}</p>}
    </div>
  );
};
