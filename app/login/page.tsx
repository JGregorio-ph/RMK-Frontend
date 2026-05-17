// app/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // TEMPORARY DEMO LOGIN
    // Replace with database authentication later

    if (
      email === "guest@rmk.com" &&
      password === "guest123"
    ) {
      router.push("/");
      return;
    }

    alert("Invalid credentials");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        backgroundColor: "#F5F1E8",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      <div
        className="w-full max-w-md p-10 rounded-2xl shadow-lg border"
        style={{
          backgroundColor: "#FFFDF8",
          borderColor: "#B8860B",
        }}
      >
        {/* Logo / Title */}
        <div className="text-center mb-10">
          <h1
            className="text-5xl mb-2"
            style={{
              color: "#B8860B",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            RMK
          </h1>

          <p
            className="tracking-[0.3em] text-sm uppercase"
            style={{ color: "#8B7355" }}
          >
            Hotel & Resort
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >
          {/* Email */}
          <div>
            <label
              className="block mb-2 text-sm uppercase tracking-wider"
              style={{ color: "#8B7355" }}
            >
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full px-4 py-3 border rounded-lg outline-none"
              style={{
                borderColor: "#D4B16A",
                backgroundColor: "#FAF7F0",
                color: "#000000",
              }}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block mb-2 text-sm uppercase tracking-wider"
              style={{ color: "#8B7355" }}
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full px-4 py-3 border rounded-lg outline-none"
              style={{
                borderColor: "#D4B16A",
                backgroundColor: "#FAF7F0",
                color: "#000000",
              }}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-lg uppercase tracking-widest text-sm transition-all"
            style={{
              backgroundColor: "#B8860B",
              color: "#F5F1E8",
            }}
          >
            Login
          </button>
        </form>

        {/* Demo Accounts */}
        <div
          className="mt-8 text-sm text-center"
          style={{ color: "#8B7355" }}
        >
          <p className="mb-2 font-semibold">
            Demo Accounts
          </p>

          <div className="space-y-1">
            <p>Guest: guest@rmk.com / guest123</p>
          </div>
        </div>
      </div>
    </div>
  );
}