import { useTsController } from "@ts-react/form";

interface NumberInputProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
}

// if you put React.FC here it will break!
export const NumberInput = ({
  name,
  label,
  placeholder,
  description,
}: NumberInputProps) => {
  const { field, error } = useTsController<number>();

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="number"
        className="border border-slate-400"
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
