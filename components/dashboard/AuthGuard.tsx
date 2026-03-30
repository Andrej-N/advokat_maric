"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("dashboard_auth");
    if (!auth) {
      router.push("/dashboard/login");
    } else {
      setAuthed(true);
    }
  }, [router]);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-muted">Učitavanje...</div>
      </div>
    );
  }

  return <>{children}</>;
}
