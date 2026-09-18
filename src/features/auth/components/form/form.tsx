"use client";

import { Box, Text } from "@chakra-ui/react";
import NextForm from "next/form";
import { createContext, ElementType, useCallback, useContext, useEffect, useRef } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

import { toaster } from "@/shared/components/toaster/toaster";
import { ActionResult } from "@/shared/types/action-result";

const FormSubmitContext = createContext<(() => Promise<void>) | null>(null);

export function useFormSubmit() {
  const submit = useContext(FormSubmitContext);

  if (!submit) {
    throw new Error("useFormSubmit must be used within a Form");
  }

  return submit;
}

type FormBaseProps<TFieldValues extends FieldValues, TData> = {
  children: React.ReactNode;
  form: UseFormReturn<TFieldValues>;
  onSuccess?: (data: TData) => void;
  onError?: (error: string) => void;
  asChild?: boolean;
};

type DefaultFormProps<TFieldValues extends FieldValues, TData> = FormBaseProps<
  TFieldValues,
  TData
> & {
  type?: "defaultForm";
  onSubmit: (input: TFieldValues) => ActionResult<TData> | Promise<ActionResult<TData>>;
  action?: never;
};

type NextFormProps<TFieldValues extends FieldValues, TData> = FormBaseProps<TFieldValues, TData> & {
  type: "nextForm";
  action: (input: TFieldValues) => ActionResult<TData> | Promise<ActionResult<TData>>;
  onSubmit?: never;
};

type FormProps<TFieldValues extends FieldValues, TData> =
  | DefaultFormProps<TFieldValues, TData>
  | NextFormProps<TFieldValues, TData>;

export function Form<TFieldValues extends FieldValues, TData>({
  children,
  form,
  onSuccess,
  onError,
  asChild,
  type = "defaultForm",
  ...props
}: FormProps<TFieldValues, TData>) {
  const submitFn =
    type === "nextForm"
      ? (props as NextFormProps<TFieldValues, TData>).action
      : (props as DefaultFormProps<TFieldValues, TData>).onSubmit;

  const handleSubmit = async (data: TFieldValues) => {
    let result: ActionResult<TData>;

    try {
      result = await submitFn(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error inesperado";

      result = { success: false, error: message };
    }

    if (result.success) {
      onSuccess?.(result.data);
    } else {
      if (onError) {
        onError(result.error);
      }

      if (!onError) {
        toaster.error({
          description: <Text textStyle="body.2.semibold">{result.error}</Text>,
          closable: true,
        });
      }
    }

    return result;
  };

  const handleSubmitRef = useRef(handleSubmit);

  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  });

  const triggerSubmit = useCallback(async () => {
    await form.handleSubmit((data) => handleSubmitRef.current(data))();
  }, [form]);

  if (asChild) {
    return (
      <FormProvider {...form}>
        <FormSubmitContext.Provider value={triggerSubmit}>{children}</FormSubmitContext.Provider>
      </FormProvider>
    );
  }

  const Component: ElementType = type === "nextForm" ? NextForm : "form";

  return (
    <FormProvider {...form}>
      <FormSubmitContext.Provider value={triggerSubmit}>
        <Box w="full">
          <Component
            action={
              type === "nextForm"
                ? (submitFn as unknown as (formData: FormData) => Promise<void>)
                : undefined
            }
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {children}
          </Component>
        </Box>
      </FormSubmitContext.Provider>
    </FormProvider>
  );
}
