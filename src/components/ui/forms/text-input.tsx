import { useTsController } from "@ts-react/form";

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
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        className={`bg-bg-300 w-full rounded-lg px-3 py-[10px] outline-none ${
          className ?? ""
        }`}
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
