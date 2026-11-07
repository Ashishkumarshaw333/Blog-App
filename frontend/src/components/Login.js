import React, { useState } from "react";
import api from "../api";

function Login({ onLogin, switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  }

  return (
    <section className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          required
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <p className="mt-5 text-sm text-slate-600">
        Don't have an account?{" "}
        <button type="button" className="font-medium text-blue-600 underline hover:text-blue-700" onClick={switchToRegister}>
          Sign up
        </button>
      </p>
    </section>
  );
}

export default Login;
