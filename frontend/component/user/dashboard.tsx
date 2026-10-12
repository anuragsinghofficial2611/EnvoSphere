
"use client";

import Link from "next/link";
import {
  Leaf,
  Zap,
  Droplets,
  Trees,
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  FileText,
  Plus,
  ClipboardList,
  GitCompare,
  Sparkles,
  Menu,
} from "lucide-react";
import { useState, useEffect } from 'react';





const actions = [
  {
    label: "New Calculation",
    description: "Calculate environmental impact",
    href: "/user/calculator",
    icon: Plus,
    primary: true,
  },
  {
    label: "View All Calculations",
    description: "Review your previous calculations",
    href: "/user/calculations",
    icon: ClipboardList,
  },
  {
    label: "Compare Results",
    description: "Compare facility performance",
    href: "/user/",
    icon: GitCompare,
  },
  {
    label: "Get AI Insights",
    description: "Explore sustainability recommendations",
    href: "/user/",
    icon: Sparkles,
  },
];

export default function DashboardPage() {

  const [co2emmission, setCo2emmission] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [waterusage, setWaterusage] = useState(0);
  const [heat, setHeat] = useState(0);

  const stats = [
    {
      title: "Total CO₂e Emissions",
      value: co2emmission,
      unit: "kg CO₂e",
      icon: Leaf,
    },
    {
      title: "Energy Consumption",
      value: energy,
      unit: "kWh",
      icon: Zap,
    },
    {
      title: "Water Usage",
      value: waterusage,
      unit: "L",
      icon: Droplets,
    },
    {
      title: "Total Heat Generated",
      value: heat,
      unit: "kWh",
      icon: Leaf,
    },
  ];

  // const calculations = [
  //   {
  //     id: "CAL-001",
  //     date: "Apr 28, 2025",
  //     facility: "Data Center A",
  //     emissions: "2.8",
  //     status: "Completed",
  //   },
  //   {
  //     id: "CAL-002",
  //     date: "Apr 25, 2025",
  //     facility: "Data Center B",
  //     emissions: "4.1",
  //     status: "Completed",
  //   },
  //   {
  //     id: "CAL-003",
  //     date: "Apr 20, 2025",
  //     facility: "Research Lab",
  //     emissions: "1.2",
  //     status: "Completed",
  //   },
  //   {
  //     id: "CAL-004",
  //     date: "Apr 15, 2025",
  //     facility: "Main Campus",
  //     emissions: "3.6",
  //     status: "Completed",
  //   },
  // ];
  const [calculations , setCalculations] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(`/api/user/dashboard`);
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }
      console.log(data);
      setCo2emmission(data?.data?.data?.totalEmissionsKgCO2e);
      setEnergy(data?.data.data?.totalEnergyKwh);
      setWaterusage(data?.data?.data?.totalWaterLiters);
      setHeat(data?.data?.data?.totalHeatKwh);

    } catch (error) {
      console.log(error);
    }
  }
  const getCalculations = async () => {
    try {
      const response = await fetch('/api/user/calculation/calculations');
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }
      console.log(data);
        setCalculations(
       data.data.data.map((item: any) => ({
        id: item._id,
        // date: new Date(item.createdAt).toLocaleDateString("en-IN"),
        date: item.updatedAt,
        facility: item.inputs.gpuModel,
        emissions: item.results.co2EmissionsKg.toFixed(2),
        status: "Completed",
      }))
    );
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
    getCalculations();
  }, [])
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
        {/* Header */}
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-emerald-700">
              ENVOSPHERE / OVERVIEW
            </p>

            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Good morning, Anurag
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              Track your environmental impact and make better, sustainable
              decisions.
            </p>
          </div>

          <button
            type="button"
            aria-label="Open navigation"
            className="rounded-lg border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50 lg:hidden"
          >
            <Menu size={21} />
          </button>
        </header>

        {/* Environmental statistics */}
        <section
          aria-label="Environmental statistics"
          className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.trend === "up";

            return (
              <article
                key={stat.title}
                className="rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-emerald-200 sm:p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                    <Icon size={23} strokeWidth={2.2} />
                  </div>
                </div>

                <p className="text-sm font-medium text-slate-600">
                  {stat.title}
                </p>

                <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-3xl font-semibold tracking-tight text-slate-900">
                    {stat.value}
                  </span>

                  {stat.unit && (
                    <span className="text-sm font-medium text-slate-600">
                      {stat.unit}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {isPositive ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}
                    {stat.change}
                  </span>

                  <span className="text-xs text-slate-400">
                    vs. previous 30 days
                  </span>
                </div>
              </article>
            );
          })}
        </section>

        {/* Recent calculations and quick actions */}
        <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
          {/* Calculations table */}
          <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white xl:col-span-2">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Recent Calculations
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your latest environmental assessments
                </p>
              </div>

              <Link
                href="/dashboard/calculations"
                className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-emerald-800 transition hover:text-emerald-600"
              >
                View all
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60">
                    <th className="px-5 py-3.5 text-xs font-medium text-slate-500 sm:px-6">
                      Date
                    </th>
                    <th className="px-4 py-3.5 text-xs font-medium text-slate-500">
                      Facility
                    </th>
                    <th className="px-4 py-3.5 text-xs font-medium text-slate-500">
                      Emissions (tCO₂e)
                    </th>
                    <th className="px-4 py-3.5 text-xs font-medium text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {calculations.map((calculation) => (
                    <tr
                      key={calculation.id}
                      className="transition-colors hover:bg-slate-50/70"
                    >
                      <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <FileText
                            size={18}
                            className="shrink-0 text-slate-500"
                          />
                          <span className="text-sm text-slate-600">
                            {calculation.date}
                          </span>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-700">
                        {calculation.facility}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium tabular-nums text-slate-700">
                        {calculation.emissions}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                          {calculation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-100 px-5 py-3.5 sm:px-6">
              <p className="text-xs text-slate-400">
                Showing your 4 most recent calculations
              </p>
            </div>
          </div>

          {/* Quick actions */}
          <aside className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-base font-semibold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your sustainability workflow
            </p>

            <div className="mt-5 space-y-3">
              {actions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className={`group flex items-center gap-3 rounded-lg border px-4 py-3.5 transition duration-200 ${action.primary
                        ? "border-emerald-800 bg-emerald-800 text-white hover:border-emerald-900 hover:bg-emerald-900"
                        : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/40"
                      }`}
                  >
                    <Icon
                      size={19}
                      className={
                        action.primary
                          ? "shrink-0 text-emerald-100"
                          : "shrink-0 text-emerald-800"
                      }
                    />

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">
                        {action.label}
                      </span>
                      <span
                        className={`mt-0.5 block text-xs ${action.primary
                            ? "text-emerald-100"
                            : "text-slate-400"
                          }`}
                      >
                        {action.description}
                      </span>
                    </span>

                    <ArrowRight
                      size={16}
                      className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${action.primary
                          ? "text-emerald-100"
                          : "text-slate-400"
                        }`}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 rounded-lg border border-emerald-100 bg-emerald-50/60 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-emerald-800">
                  <Leaf size={19} />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Keep improving
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Review your calculations regularly to identify
                    opportunities to reduce energy use and emissions.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Footer */}
        <footer className="mt-8 border-t border-slate-100 pt-5">
          <p className="text-xs text-slate-400">
            EnvoSphere · Environmental impact monitoring
          </p>
        </footer>
      </div>
    </main>
  );
}