'use client';

import { useCallback, useState } from 'react';

/** Una regla devuelve el mensaje de error o `null` si el valor es válido. */
export type ValidationRule = (value: string) => string | null;

export type ValidationRules<TField extends string> = Partial<
  Record<TField, ValidationRule>
>;

type ValidationErrors<TField extends string> = Partial<
  Record<TField, string | null>
>;

/**
 * Validación de formularios: por campo (al salir del input) y completa
 * (al enviar). Portado del prototipo de Bolt con tipos por campo.
 */
export const useFormValidation = <TField extends string>(
  rules: ValidationRules<TField>
) => {
  const [errors, setErrors] = useState<ValidationErrors<TField>>({});
  const [touched, setTouched] = useState<Partial<Record<TField, boolean>>>(
    {}
  );

  const validateField = useCallback(
    (field: TField, value: string) => {
      const rule = rules[field];
      if (!rule) return null;

      const error = rule(value);
      setErrors((prev) => ({ ...prev, [field]: error }));
      return error;
    },
    [rules]
  );

  const validateAllFields = useCallback(
    (data: Record<TField, string>) => {
      const newErrors: ValidationErrors<TField> = {};
      let isValid = true;

      (Object.keys(rules) as TField[]).forEach((field) => {
        const error = rules[field]?.(data[field] ?? '') ?? null;
        newErrors[field] = error;
        if (error) isValid = false;
      });

      setErrors(newErrors);
      return isValid;
    },
    [rules]
  );

  const markFieldAsTouched = useCallback((field: TField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const resetValidation = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    validateField,
    validateAllFields,
    markFieldAsTouched,
    resetValidation,
  };
};

/** Combina varias reglas; devuelve el primer error encontrado. */
export const combineRules =
  (...rules: ValidationRule[]): ValidationRule =>
  (value) => {
    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return null;
  };

// Reglas de validación comunes
export const commonValidationRules = {
  required: (value: string) =>
    !value.trim() ? 'Este campo es requerido' : null,
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return value && !emailRegex.test(value) ? 'Email inválido' : null;
  },
  phone: (value: string) => {
    const phoneRegex = /^\+?[\d\s\-()]+$/;
    return value && !phoneRegex.test(value) ? 'Teléfono inválido' : null;
  },
  minLength: (min: number) => (value: string) =>
    value && value.trim().length < min ? `Mínimo ${min} caracteres` : null,
  maxLength: (max: number) => (value: string) =>
    value && value.length > max ? `Máximo ${max} caracteres` : null,
};
