"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type Control,
  type FieldValues,
  type FieldPath,
  type ControllerRenderProps,
  type ControllerFieldState,
  type UseFormStateReturn,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/utils";

// Re-export FormProvider to preserve generics compatibility
const Form = FormProvider;

const FormFieldContext = React.createContext<{ name: string } | undefined>(undefined);

function useFormFieldName() {
  const ctx = React.useContext(FormFieldContext);
  if (!ctx) return undefined;
  return ctx.name;
}

type FormFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  control: Control<TFieldValues>;
  name: TName;
  render: (props: {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => React.ReactElement;
};

function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: FormFieldProps<TFieldValues, TName>
) {
  return (
    <FormFieldContext.Provider value={{ name: String(props.name) }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

const FormItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <div className={cn("space-y-2", className)} {...props} />;
};

const FormLabel: React.FC<React.ComponentProps<typeof Label>> = ({ className, ...props }) => {
  return <Label className={cn("text-sm font-medium", className)} {...props} />;
};

const FormControl: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <div className={cn("", className)} {...props} />;
};

const FormMessage: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => {
  const name = useFormFieldName();
  const form = useFormContext();
  const message =
    children ??
    (name ? (form.getFieldState(name, form.formState)?.error?.message as React.ReactNode) : undefined);

  if (!message) return null;
  return (
    <p className={cn("text-xs text-red-600", className)} {...props}>
      {message}
    </p>
  );
};

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage };
