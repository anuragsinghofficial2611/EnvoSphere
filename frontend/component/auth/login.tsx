"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Leaf,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Connect your existing login API here.
    // Do not redirect until the server confirms authentication.
    setError("Login API is not connected yet.");
  }

  return (
    <>
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-100">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <Leaf size={22} strokeWidth={2} />
            </span>
            <span className="text-xl font-semibold tracking-tight">
              Envo<span className="text-emerald-700">Sphere</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="hidden sm:inline">New to EnvoSphere?</span>
            <Link
              href="/auth/register"
              className="font-semibold text-emerald-700 transition hover:text-emerald-800"
            >
              Create account
            </Link>
          </div>
        </div>
      </header>

      {/* Login section */}
      <section className="flex min-h-[calc(100vh-77px)] items-center justify-center px-5 py-12 sm:px-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
          {/* Left panel */}
          <div className="flex flex-col justify-between bg-emerald-950 p-8 text-white sm:p-12 lg:min-h-[590px]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-800 bg-emerald-900/60 px-3 py-1.5 text-xs font-medium text-emerald-100">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Environmental intelligence
              </span>

              <h1 className="mt-10 max-w-sm text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Understand your impact.
                <span className="mt-1 block text-emerald-300">
                  Make better decisions.
                </span>
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-emerald-100/75 sm:text-base">
                Access your environmental calculations, review resource
                consumption, and discover practical opportunities to improve
                operational efficiency.
              </p>
            </div>

            <div className="mt-12 border-t border-emerald-800 pt-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-900 text-emerald-300">
                  <ShieldCheck size={21} />
                </span>
                <div>
                  <p className="text-sm font-medium text-white">
                    Your workspace, securely
                  </p>
                  <p className="mt-1 text-xs leading-5 text-emerald-100/65">
                    Sign in to access your account and saved calculations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex items-center justify-center p-7 sm:p-12 lg:p-14">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <p className="text-sm font-medium text-emerald-700">
                  Welcome back
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  Sign in to your account
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Enter your credentials to continue to EnvoSphere.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Password
                    </label>
                    {/* <Link
                      href="/forgot-password"
                      className="text-xs font-medium text-emerald-700 transition hover:text-emerald-800"
                    >
                      Forgot password?
                    </Link> */}
                  </div>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-3 text-sm text-amber-800"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-600/20"
                >
                  Sign in
                  <ArrowRight size={17} />
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-emerald-700 transition hover:text-emerald-800"
                >
                  Create an account
                </Link>
              </p>

              <div className="mt-8 border-t border-slate-100 pt-5 text-center">
                <p className="text-xs leading-5 text-slate-400">
                  By continuing, you agree to use EnvoSphere responsibly and
                  in accordance with our terms and privacy policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}