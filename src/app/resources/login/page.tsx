"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { login } from "../actions";
import { Button } from "@/components/ui/button";

const initialState = { error: "" };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="rounded-full border border-border p-3">
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Resources</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              パスワードを入力してください
            </p>
          </div>
        </div>

        <form action={formAction} className="space-y-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            autoFocus
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
          {state.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "確認中..." : "ログイン"}
          </Button>
        </form>
      </div>
    </div>
  );
}
