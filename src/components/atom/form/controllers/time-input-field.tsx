import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { TimeInputFieldProps } from "./type";

const TimeInputField = <T extends FieldValues>({
  name,
  label,
}: TimeInputFieldProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm  text-blue-400">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type="time"
            className="w-full my-1 border p-2 rounded-lg focus:outline-blue-400 px-2 text-sm"
          />
        )}
      />

      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message as any}</p>
      )}
    </div>
  );
};

export default TimeInputField;
