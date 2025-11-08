import { Controller, FieldValues } from "react-hook-form";
import { TextareaControllerProps } from "./type";

function TextareaController<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  errors,
  rows = 3,
  className,
}: TextareaControllerProps<T>) {
  return (
    <div className={className}>
      {label && <label className="text-sm  text-blue-400">{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            placeholder={placeholder}
            rows={rows}
            className="w-full my-1 border p-2 rounded-lg focus:outline-blue-400"
          />
        )}
      />

      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message as any}</p>
      )}
    </div>
  );
}

export default TextareaController;
