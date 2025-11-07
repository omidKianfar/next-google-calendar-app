import { Controller, FieldValues } from "react-hook-form";
import { InputControllerProps } from "./type";

const InputField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  errors,
  type = "text",
  className,
}: InputControllerProps<T>) => {
  {
    label && <label className="text-sm font-medium">{label}</label>;
  }

  return (
    <div className={className}>
      {label && <label className="text-sm font-medium">{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className="w-full border p-2 rounded-lg"
          />
        )}
      />

      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message as any}</p>
      )}
    </div>
  );
};

export default InputField;
