import { useTsController } from "@ts-react/form";
import clsx from "clsx";

interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
}

// if you put React.FC here it will break!
export const TextInput = ({
  name,
  label,
  placeholder,
  description,
  className,
}: TextInputProps) => {
  const { field, error } = useTsController<string>();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-[500]">
        {label}
      </label>
      <input
        id={name}
        className={clsx(
          "w-full rounded-lg bg-bg-100 px-3 py-[10px] outline-none",
          "focus:ring",
          className
        )}
        autoComplete="off"
        value={field.value ? field.value : ""}
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
        placeholder={placeholder}
      />
      <p className="ml-1 text-white/70">{description}</p>

      {error && <p className="text-rose-500">{error.errorMessage}</p>}
    </div>
  );
};
