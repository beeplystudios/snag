import { useTsController } from "@ts-react/form";
import clsx from "clsx";
import { Input } from "./input";

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
          type="number"
          value={field.value ?? "0"}
          onChange={(e) => {
            if (!isNaN(parseInt(e.target.value)))
              field.onChange(parseInt(e.target.value));
          }}
          placeholder={placeholder}
        />
        {error && <p className="text-rose-600">{error.errorMessage}</p>}
      </div>
    </div>
  );
};
