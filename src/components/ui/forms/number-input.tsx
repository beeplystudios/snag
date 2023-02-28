import { useTsController } from "@ts-react/form";

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
    <div>
      <label htmlFor={name} className="font-[500]">
        {label}
      </label>
      <input
        id={name}
        type="number"
        className={`w-full rounded-lg bg-bg-100 px-3 py-[10px] outline-none ${
          className ?? ""
        }`}
        value={field.value ? field.value : ""}
        onChange={(e) => {
          field.onChange(parseInt(e.target.value));
        }}
        placeholder={placeholder}
      />
      <p className="ml-1 mt-1 text-white/70">{description}</p>

      {error && <p>{error.errorMessage}</p>}
    </div>
  );
};
