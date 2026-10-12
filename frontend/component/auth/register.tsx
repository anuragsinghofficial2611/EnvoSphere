"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Eye,
  EyeOff,
  Leaf,
  LockKeyhole,
  Mail,
  UserRound,
  ShieldCheck,
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (username.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try{

      const response = await fetch('/api/auth/register', {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: {
          "Content-type": "application/json"
        }
    });
    const data = await response.json();
    if (!response.ok) {
      console.log("error occured in response");
      setError(data.message);
      console.log(data);
      return;
    }
    console.log(data);
    router.push('/auth/login');
  } catch(error){
    console.log(error);
  }
  }

  return (
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
            <span className="hidden sm:inline">Already have an account?</span>
            <Link
              href="/auth/login"
              className="font-semibold text-emerald-700 transition hover:text-emerald-800"
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* Registration */}
      <section className="flex min-h-[calc(100vh-77px)] items-center justify-center px-5 py-10 sm:px-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
          {/* Brand panel */}
          <div className="flex flex-col justify-between bg-emerald-950 p-8 text-white sm:p-12 lg:min-h-[650px]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-800 bg-emerald-900/60 px-3 py-1.5 text-xs font-medium text-emerald-100">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Environmental intelligence
              </span>

              <h1 className="mt-10 max-w-sm text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Start measuring what matters.
                <span className="mt-2 block text-emerald-300">
                  Build a more efficient future.
                </span>
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-emerald-100/75 sm:text-base">
                Create your workspace to calculate environmental impact,
                understand resource consumption, and identify opportunities
                for more efficient operations.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  "Calculate energy consumption and emissions",
                  "Track water usage and heat output",
                  "Keep your calculations organized",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-emerald-200">
                      <ShieldCheck size={13} />
                    </span>
                    <p className="text-sm leading-6 text-emerald-50/90">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 border-t border-emerald-800 pt-6">
              <p className="text-sm font-medium text-white">
                One workspace. Clearer environmental insights.
              </p>
              <p className="mt-1 text-xs leading-5 text-emerald-100/65">
                Make informed decisions using your facility data.
              </p>
            </div>
          </div>

          {/* Form panel */}
          <div className="flex items-center justify-center p-7 sm:p-12 lg:p-14">
            <div className="w-full max-w-md">
              <div className="mb-7">
                <p className="text-sm font-medium text-emerald-700">
                  Get started for free
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  Create your account
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Enter your details to set up your EnvoSphere workspace.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      required
                      minLength={2}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                    />
                  </div>
                </div>

                {/* Email */}
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
                      className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="At least 8 characters"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
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

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                    />
                    <button
                      type="button"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      onClick={() =>
                        setShowConfirmPassword((current) => !current)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-slate-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
                  >
                    {error}
                  </p>
                )}

                {success && (
                  <p
                    role="status"
                    className="rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm text-emerald-800"
                  >
                    {success}
                  </p>
                )}

                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-600/20"
                >
                  Create account
                  <ArrowRight size={17} />
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-emerald-700 transition hover:text-emerald-800"
                >
                  Sign in
                </Link>
              </p>

              <p className="mt-6 text-center text-xs leading-5 text-slate-400">
                By creating an account, you agree to our terms and privacy
                policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}