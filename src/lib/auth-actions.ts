"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth, signIn, signOut } from "@/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { loginSchema } from "@/lib/validations/auth";

export type LoginState = { error?: string };

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    "unknown";

  const rate = checkRateLimit(`login:${ip}`);
  if (!rate.allowed) {
    return { error: "Terlalu banyak percobaan. Coba lagi nanti." };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Input tidak valid." };
  }

  try {
    const result = await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });

    if (result?.error) {
      return { error: "Email atau password salah." };
    }

    redirect("/admin");
  } catch {
    return { error: "Email atau password salah." };
  }
  return {};
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}

export async function getSessionUser() {
  const session = await auth();
  return session?.user ?? null;
}
