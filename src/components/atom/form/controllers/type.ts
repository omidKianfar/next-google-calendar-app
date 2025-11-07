import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export interface BaseControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  errors?: FieldErrors<T>;
  className?: string;
}

export interface InputControllerProps<T extends FieldValues>
  extends BaseControllerProps<T> {
  type?: string;
}

export type TextareaControllerProps<T extends FieldValues> =
  BaseControllerProps<T> & {
    rows?: number;
  };

export type TimeInputFieldProps<T extends FieldValues> = BaseControllerProps<T>;
