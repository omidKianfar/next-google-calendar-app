import { FieldValues, Path } from "react-hook-form";

export interface BaseControllerProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
}

export interface InputControllerProps<T extends FieldValues>
  extends BaseControllerProps<T> {
  type?: string;
  autoFocus?: boolean;
}

export type TextareaControllerProps<T extends FieldValues> =
  BaseControllerProps<T> & {
    rows?: number;
  };

export type TimeInputFieldProps<T extends FieldValues> = BaseControllerProps<T>;
