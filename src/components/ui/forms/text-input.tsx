import { useTsController } from "@ts-react/form";
import { Input } from "./input";

interface TextInputProps {
  name: string;
  label: string;
  required?: boolean;
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
  required = false,
}: TextInputProps) => {
  const { field, error } = useTsController<string>();

  return (
    <div className="flex flex-col gap-2">
      <div>
        <label htmlFor={name} className="font-medium">
          {label}
        </label>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <div>
        <Input
          id={name}
          error={!!error}
          required={required}
          autoComplete="off"
          value={field.value ?? ""}
          onChange={(e) => field.onChange(e.target.value)}
          placeholder={placeholder}
        />

        {error && (
          <p className="font-medium text-rose-600">{error.errorMessage}</p>
        )}
      </div>
    </div>
  );
};
