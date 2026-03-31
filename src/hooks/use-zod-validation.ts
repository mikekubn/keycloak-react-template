import type { ParsePayload } from "zod/v4/core";

import { useTranslation } from "@/providers/translation-context";

import { z } from "zod/v4";

const useZodValidation = () => {
  const { msgStr } = useTranslation();
  const createSchemaValidator =
    (ctx: ParsePayload) =>
    <T>(
      schema: z.ZodType<T>,
      value: unknown,
      path: (string | number)[],
      defaultMessage = msgStr("invalidValue")
    ): void => {
      const result = schema.safeParse(value);
      if (!result.success) {
        const message = result.error.issues[0].message || defaultMessage;
        ctx.issues.push({
          code: "custom",
          input: value,
          path: path,
          message
        });
      }
    };

  const schemas = {
    /**
     * Creates a Zod schema for a required string.
     * @param message The error message to display if validation fails.
     * @returns A Zod schema that trims the input and ensures it's not empty.
     * Succeeds: When the input is a non-empty string after trimming.
     * Fails: When the input is an empty string or whitespace only.
     */
    requiredString: (requiredMessage = msgStr("required")) =>
      z
        .string({ error: msgStr("invalidValue") })
        .trim()
        .min(1, { error: requiredMessage }),
    /**
     * Creates a Zod schema for a required email.
     * @param message The error message to display if validation fails.
     * @returns A Zod schema that trims the input and ensures it's not empty and is a valid email.
     * Succeeds: When the input is a non-empty string after trimming and is a valid email.
     * Fails: When the input is an empty string or whitespace only or is not a valid email.
     */
    requiredEmail: (requiredMessage = msgStr("required")) =>
      z
        .string()
        .min(1, { error: requiredMessage })
        .check(z.trim(), z.email({ error: msgStr("invalidEmail") }), z.toLowerCase()),
    /**
     * Creates a Zod schema for a required string.
     * @param minValue The minimum value of the string.
     * @param requiredMessage The error message to display if validation fails.
     * @returns A Zod schema that trims the input, ensures it's not empty and has the correct value length
     * Succeeds: If the input is non-empty and contains more than minValue characters
     * Fails: If the input is an empty string or contains less than minValue characters
     */
    requiredStringMinValue: (minValue = 1, requiredMessage = msgStr("required")) =>
      z
        .string({ error: msgStr("invalidValue") })
        .trim()
        .min(1, { error: msgStr("required") })
        .min(minValue, { error: requiredMessage })
  };

  return { createSchemaValidator, schemas };
};

export { useZodValidation };
