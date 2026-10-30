import { redirect } from "next/navigation";

import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./login-form";

export const instant = false;

export const metadata = { title: "Login" };

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Masuk ke Admin
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Akses dashboard CMS hanya untuk administrator.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Gunakan email dan password administrator.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter className="justify-center text-xs text-muted-foreground">
            Akses tanpa otorisasi akan ditolak.
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
