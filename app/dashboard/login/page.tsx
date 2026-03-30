"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Scale, LogIn, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Mock auth - replace with NextAuth in production
    if (username === "admin" && password === "admin123") {
      localStorage.setItem(
        "dashboard_auth",
        JSON.stringify({ user: "admin", loggedIn: true })
      );
      router.push("/dashboard");
    } else {
      setError("Pogrešno korisničko ime ili lozinka");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Scale className="w-10 h-10 text-accent mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-text-primary">
            Dashboard
          </h1>
          <p className="text-text-muted text-sm mt-1">
            Marić Advokatura
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-border rounded-[var(--radius-lg)] p-6 space-y-4"
        >
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-[var(--radius-md)] px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-text-muted text-sm mb-1.5"
            >
              Korisničko ime
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-primary border border-border rounded-[var(--radius-md)] px-4 py-2.5 text-text-primary placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-text-muted text-sm mb-1.5"
            >
              Lozinka
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-primary border border-border rounded-[var(--radius-md)] px-4 py-2.5 text-text-primary placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-dim text-white py-2.5 rounded-[var(--radius-md)] font-medium transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            {loading ? "Prijavljivanje..." : "Prijavi se"}
          </button>
        </form>

        <p className="text-text-dim text-xs text-center mt-4">
          Mock kredencijali: admin / admin123
        </p>
      </div>
    </div>
  );
}
