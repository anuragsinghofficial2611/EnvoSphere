
"use client";

import {
  UserRound,
  Mail,
  CalendarDays,
  Leaf,
  Zap,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export default function ProfilePage() {
  // Static demo data — replace with backend data later
  const user = {
    name: "Anurag Singh",
    email: "anurag@example.com",
    createdAt: "October 11, 2026",
  };

  const stats = [
    {
      title: "Environmental Impact",
      value: "Ready to begin",
      description: "Start tracking your environmental footprint.",
      icon: Leaf,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Energy Insights",
      value: "Explore insights",
      description: "Understand your facility's energy usage.",
      icon: Zap,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Account Security",
      value: "Account active",
      description: "Your profile is ready to use.",
      icon: ShieldCheck,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8faf9] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-8">
          <p className="text-sm font-medium text-emerald-700">
            ENVOSPHERE / ACCOUNT
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your profile and view your account information.
          </p>
        </div>

        {/* Profile card */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
              <UserRound size={38} strokeWidth={1.6} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {user.name}
                </h2>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  Active account
                </span>
              </div>

              <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <Mail size={16} />
                <span className="break-all">{user.email}</span>
              </p>

              <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays size={16} />
                Joined {user.createdAt}
              </p>
            </div>
          </div>
        </section>

        {/* Account details */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Account Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Your basic account details.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 p-2.5 text-gray-600">
                  <UserRound size={19} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full name</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {user.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 p-2.5 text-gray-600">
                  <Mail size={19} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Email address</p>
                  <p className="mt-1 break-all font-medium text-gray-900">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Static information cards */}
        <section className="mt-9">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Workspace
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              A quick overview of what you can explore.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
                >
                  <div
                    className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-gray-900">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-8 flex items-center gap-2 border-t border-gray-200 pt-5 text-xs text-gray-400">
          <Clock3 size={14} />
          <span>
            Profile overview · EnvoSphere
          </span>
        </div>
      </div>
    </main>
  );
}