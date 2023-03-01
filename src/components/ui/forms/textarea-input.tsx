import * as React from "react";

import { cn } from "@/utils/cn";
import { useTsController } from "@ts-react/form";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean; 
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-20 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
          error && "border-rose-600",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";


interface TextAreaInputProps {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  className?: string;
}

// if you put React.FC here it will break!
export const TextAreaInput = ({
  name,
  label,
  placeholder,
  description,
  required = false,
}: TextAreaInputProps) => {
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
        <Textarea
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
