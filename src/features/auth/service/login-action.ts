"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/app/auth";
import { ActionResult } from "@/shared/types/action-result";

import { loginFormSchema } from "../squemas/login-form.squema";

interface LoginFormData {
  email: string;
  password: string;
}

export const doLogin = async (data: LoginFormData): Promise<ActionResult<null>> => {
  const parsed = loginFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data",
    };
  }

  try {
    const redirectUrl = await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });

    if (
      typeof redirectUrl === "string" &&
      (redirectUrl.includes("error=") || redirectUrl.includes("code=credentials"))
    ) {
      return {
        success: false,
        error: "Email o contraseña incorrectos",
      };
    }

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        error: "Email o contraseña incorrectos",
      };
    }

    throw error;
  }
};
