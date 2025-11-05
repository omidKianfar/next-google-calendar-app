import { Control, FieldErrors } from "react-hook-form";

export interface DateInputFieldProps {
  control: Control<any>; 
  name: string;          
  label?: string;         
  errors?: FieldErrors<any>;
}