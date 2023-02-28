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
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="number"
        className={`w-full rounded-lg bg-bg-300 px-3 py-[10px] outline-none ${
          className ?? ""
        }`}
        value={field.value ? field.value : ""}
        onChange={(e) => {
          field.onChange(parseInt(e.target.value));
        }}
        placeholder={placeholder}
      />
      <p>{description}</p>

      {error && <p>{error.errorMessage}</p>}
    </div>
  );
};
