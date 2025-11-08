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
  return (
    <div className={className}>
      {label && <label className="text-sm  text-blue-400">{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className="w-full border p-2 my-1 rounded-lg focus:outline-blue-400"
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
