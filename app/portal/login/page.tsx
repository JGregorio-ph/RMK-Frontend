"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PortalLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Invalid credentials");
        return;
      }

      if (data.user.role === "admin") {
        router.push("/portal/admin");
      } else if (data.user.role === "staff") {
        router.push("/portal/staff");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
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
            Staff Portal Login
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              className="block mb-2 text-sm uppercase tracking-wider"
              style={{ color: "#8B7355" }}
            >
              Email
            </label>

            <input
              type="email"
              className="w-full px-4 py-3 border rounded-lg outline-none text-black"
              placeholder="Enter your email"
              style={{
                borderColor: "#D4B16A",
                backgroundColor: "#FAF7F0",
              }}
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label
              className="block mb-2 text-sm uppercase tracking-wider"
              style={{ color: "#8B7355" }}
            >
              Password
            </label>

            <input
              type="password"
              className="w-full px-4 py-3 border rounded-lg outline-none text-black"
              placeholder="Enter your password"
              style={{
                borderColor: "#D4B16A",
                backgroundColor: "#FAF7F0",
              }}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

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

        <p
          className="text-center mt-6 text-sm"
          style={{ color: "#8B7355" }}
        >
          Authorized staff only
        </p>
        <div
          className="mt-8 text-sm text-center"
          style={{ color: "#8B7355" }}
        >
          <p className="mb-2 font-semibold">
            Demo Accounts
          </p>

          <div className="space-y-1">
            <p>Staff: staff@rmk.com / staff123</p>
            <p>Admin: admin@rmk.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}