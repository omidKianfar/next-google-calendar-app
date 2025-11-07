import { Controller, FieldValues } from "react-hook-form";
import { TimeInputFieldProps } from "./type";

const TimeInputField = <T extends FieldValues>({
  control,
  name,
  label,
  errors,
}: TimeInputFieldProps<T>) => {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="time"
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

export default TimeInputField;
