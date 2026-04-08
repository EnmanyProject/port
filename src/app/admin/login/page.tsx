"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      // 메인 포트폴리오로 이동 — 롱프레스로 직접 사진 업로드 가능
      router.push("/");
    } else {
      setError("비밀번호가 틀렸습니다");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[var(--bg-dark)] px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h1 className="font-display text-2xl text-white">Admin</h1>
        <p className="mt-2 text-sm text-white/40">포트폴리오 관리자 로그인</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="mt-8 w-full border-b border-white/20 bg-transparent px-0 py-3 text-white outline-none placeholder:text-white/30 focus:border-[var(--accent)]"
        />

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-6 w-full rounded-full bg-[var(--accent)] py-3 text-sm tracking-[0.1em] uppercase text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {loading ? "..." : "Login"}
        </button>
      </form>
    </div>
  );
}
