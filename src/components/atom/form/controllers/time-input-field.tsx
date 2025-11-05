import { Controller } from "react-hook-form";
import { DateInputFieldProps } from "./type";

const TimeInputField = ({
  control,
  name,
  label,
  errors,
}: DateInputFieldProps) => {
  const error = errors?.[name];

  return (
    <div className="w-full mb-3">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="relative">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <input
              type="time"
              value={field.value || ""}
              onChange={field.onChange}
              className="
                w-full border border-gray-300 rounded-xl p-3  
                text-gray-700 focus:ring-2 focus:ring-blue-400
              "
            />
          )}
        />
      </div>

      {error?.message && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default TimeInputField;
