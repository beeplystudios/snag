import { useTsController } from "@ts-react/form";

interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
}

// if you put React.FC here it will break!
export const TextInput = ({
  name,
  label,
  placeholder,
  description,
}: TextInputProps) => {
  const { field, error } = useTsController<string>();

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        className="border border-slate-400"
        value={field.value ? field.value : ""}
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
        placeholder={placeholder}
      />
      <p>{description}</p>

      {error && <p>{error.errorMessage}</p>}
    </div>
  );
};
