"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Leaf,
  Zap,
  FileText,
  Trees,
  Droplets,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Activity,
  LoaderCircle,
} from "lucide-react";

const gpuModels = [
  { label: "NVIDIA A100", value: "NVIDIA A100", watts: 400 },
  { label: "NVIDIA A100 40GB", value: "NVIDIA A100 40GB", watts: 400 },
  { label: "NVIDIA A100 80GB", value: "NVIDIA A100 80GB", watts: 400 },
  { label: "NVIDIA H100", value: "NVIDIA H100", watts: 700 },
  { label: "NVIDIA H100 SXM", value: "NVIDIA H100 SXM", watts: 700 },
  { label: "NVIDIA H100 PCIe", value: "NVIDIA H100 PCIe", watts: 700 },
  { label: "NVIDIA H200 SXM", value: "NVIDIA H200 SXM", watts: 700 },
  { label: "NVIDIA H200 PCIe", value: "NVIDIA H200 PCIe", watts: 600 },
  { label: "NVIDIA L40S", value: "NVIDIA L40S", watts: 350 },
  { label: "NVIDIA L40", value: "NVIDIA L40", watts: 350 },
  { label: "NVIDIA A40", value: "NVIDIA A40", watts: 300 },
  { label: "NVIDIA RTX A6000", value: "NVIDIA RTX A6000", watts: 300 },
  { label: "NVIDIA RTX 6000 Ada", value: "NVIDIA RTX 6000 Ada", watts: 300 },
  { label: "NVIDIA B100", value: "NVIDIA B100", watts: 700 },
  { label: "NVIDIA B200", value: "NVIDIA B200", watts: 1000 },
  { label: "NVIDIA GB200 NVL72", value: "NVIDIA GB200 NVL72", watts: 1200 },
  { label: "NVIDIA RTX 4090", value: "NVIDIA RTX 4090", watts: 450 },
  { label: "NVIDIA RTX 4080", value: "NVIDIA RTX 4080", watts: 320 },
  { label: "NVIDIA RTX 4080 SUPER", value: "NVIDIA RTX 4080 SUPER", watts: 320 },
  { label: "NVIDIA T4", value: "NVIDIA T4", watts: 70 },

  // AMD Instinct accelerators
  { label: "AMD MI100", value: "AMD MI100", watts: 300 },
  { label: "AMD MI210", value: "AMD MI210", watts: 700 },
  { label: "AMD MI250X", value: "AMD MI250X", watts: 560 },
  { label: "AMD MI300X", value: "AMD MI300X", watts: 750 },
  { label: "AMD MI300A", value: "AMD MI300A", watts: 760 },
  { label: "AMD MI325X", value: "AMD MI325X", watts: 1000 },
  { label: "AMD MI350X", value: "AMD MI350X", watts: 1000 },

  // Cloud ASICs
  { label: "GOOGLE TPU V5E", value: "GOOGLE TPU V5E", watts: 220 },
  { label: "GOOGLE TPU V5P", value: "GOOGLE TPU V5P", watts: 280 },
  { label: "AWS INFERENTIA2", value: "AWS INFERENTIA2", watts: 250 },
  { label: "AWS INFERENTIA", value: "AWS INFERENTIA", watts: 90 },
  { label: "AWS TRAINIUM", value: "AWS TRAINIUM", watts: 300 },
  { label: "AWS TRAINIUM2", value: "AWS TRAINIUM2", watts: 245 },
];

const initialForm = {
  facilityArea: "1000",
  gpuModel: "NVIDIA H100",
  gpuCount: "8",
  hoursUsed: "24",
  renewableEnergyPercent: "60",
  pue: "1.4",
  wue: "0.2",
};

type FormValues = typeof initialForm;

const features = [
  {
    icon: Trees,
    title: "Track Emissions",
    description: "Understand your carbon footprint.",
  },
  {
    icon: Droplets,
    title: "Optimize Resources",
    description: "Improve energy and water efficiency.",
  },
  {
    icon: Sparkles,
    title: "Get AI Recommendations",
    description: "Make data-driven decisions.",
  },
];

export default function ImpactCalculatorPage() {
  const [form, setForm] = useState<FormValues>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Record<string, unknown> | null>(null);


  function updateField(field: keyof FormValues, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
    setError("");
    setResult(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    const facilityArea = Number(form.facilityArea);
    const gpuCount = Number(form.gpuCount);
    const hoursUsed = Number(form.hoursUsed);
    const renewableEnergyPercent = Number(form.renewableEnergyPercent);
    const pue = Number(form.pue);
    const wue = Number(form.wue);

    if (
      !Number.isFinite(facilityArea) ||
      !Number.isFinite(gpuCount) ||
      !Number.isFinite(hoursUsed) ||
      !Number.isFinite(renewableEnergyPercent) ||
      !Number.isFinite(pue) ||
      !Number.isFinite(wue) ||
      facilityArea <= 0 ||
      !Number.isInteger(gpuCount) ||
      gpuCount <= 0 ||
      hoursUsed <= 0 ||
      hoursUsed > 24 ||
      renewableEnergyPercent < 0 ||
      renewableEnergyPercent > 100 ||
      pue < 1 ||
      wue < 0
    ) {
      setError(
        "Enter valid values. Hours must be at most 24, renewable energy must be between 0 and 100%, PUE must be at least 1, and WUE cannot be negative."
      );
      return;
    }

    setLoading(true);

    try {
      console.log('sending this data ', facilityArea,form.gpuModel,gpuCount,hoursUsed,renewableEnergyPercent,pue,wue);
      const response = await fetch(
        `/api/user/calculation/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
              facilityArea,
              gpuModel: form.gpuModel,
              gpuCount,
              hoursUsed,
              renewableEnergyPercent,
              pue,
              wue,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to calculate impact.");
      }
      console.log(data);
      setResult(data.data ?? data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

  const labelClass = "text-sm font-medium text-slate-700";

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Top navigation */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
          <Link href="/dashboard" className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-800 text-white">
              <Leaf size={21} />
            </div>

            <span className="text-lg font-semibold tracking-tight text-slate-900">
              EnvoSphere
            </span>
          </Link>

          {/* <div className="hidden max-w-md flex-1 md:block">
            <label className="relative block">
              <Activity
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                placeholder="Search..."
                aria-label="Search"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-600 focus:bg-white"
              />
            </label>
          </div> */}

          {/* <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
              <Leaf size={17} />
            </div>
            <span className="hidden text-sm font-medium text-slate-700 sm:block">
              Anurag Singh
            </span>
          </div> */}
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
        {/* Page heading */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-emerald-800"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
              <Activity size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Impact Calculator
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Estimate your facility&apos;s environmental footprint.
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1.8fr_1fr]">
          {/* Calculator form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Facility details */}
            <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                  <FileText size={22} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Facility &amp; Hardware Details
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Enter the details about your facility and GPU setup.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="facilityArea" className={labelClass}>
                    Facility Area (m²)
                  </label>
                  <input
                    id="facilityArea"
                    name="facilityArea"
                    type="number"
                    min="0.01"
                    step="any"
                    required
                    value={form.facilityArea}
                    onChange={(e) =>
                      updateField("facilityArea", e.target.value)
                    }
                    className={inputClass}
                    placeholder="e.g. 1000"
                  />
                </div>

                <div>
                  <label htmlFor="gpuModel" className={labelClass}>
                    GPU Model
                  </label>
                  <select
                    id="gpuModel"
                    name="gpuModel"
                    value={form.gpuModel}
                    onChange={(e) => updateField("gpuModel", e.target.value)}
                    className={inputClass}
                  >
                    {gpuModels.map((gpu) => (
                      <option key={gpu.value} value={gpu.value}>
                        {gpu.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="gpuCount" className={labelClass}>
                    GPU Count
                  </label>
                  <input
                    id="gpuCount"
                    name="gpuCount"
                    type="number"
                    min="1"
                    step="1"
                    required
                    value={form.gpuCount}
                    onChange={(e) => updateField("gpuCount", e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 8"
                  />
                </div>

                <div>
                  <label htmlFor="hoursUsed" className={labelClass}>
                    Hours Used (per day)
                  </label>
                  <input
                    id="hoursUsed"
                    name="hoursUsed"
                    type="number"
                    min="0.01"
                    max="24"
                    step="any"
                    required
                    value={form.hoursUsed}
                    onChange={(e) => updateField("hoursUsed", e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 24"
                  />
                </div>
              </div>
            </section>

            {/* Energy details */}
            <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="mb-6 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                  <Zap size={22} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Energy &amp; Efficiency
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Add energy and efficiency related information.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="renewableEnergyPercent"
                    className={labelClass}
                  >
                    Renewable Energy Percent (%)
                  </label>
                  <input
                    id="renewableEnergyPercent"
                    name="renewableEnergyPercent"
                    type="number"
                    min="0"
                    max="100"
                    step="any"
                    required
                    value={form.renewableEnergyPercent}
                    onChange={(e) =>
                      updateField("renewableEnergyPercent", e.target.value)
                    }
                    className={inputClass}
                    placeholder="e.g. 60"
                  />
                  <p className="mt-1.5 text-xs text-slate-400">
                    Enter a value between 0 and 100.
                  </p>
                </div>

                <div>
                  <label htmlFor="pue" className={labelClass}>
                    PUE (Power Usage Effectiveness)
                  </label>
                  <input
                    id="pue"
                    name="pue"
                    type="number"
                    min="1"
                    step="any"
                    required
                    value={form.pue}
                    onChange={(e) => updateField("pue", e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 1.4"
                  />
                  <p className="mt-1.5 text-xs text-slate-400">
                    Minimum value: 1.0.
                  </p>
                </div>

                <div>
                  <label htmlFor="wue" className={labelClass}>
                    WUE (Water Usage Effectiveness)
                  </label>
                  <input
                    id="wue"
                    name="wue"
                    type="number"
                    min="0"
                    step="any"
                    required
                    value={form.wue}
                    onChange={(e) => updateField("wue", e.target.value)}
                    className={inputClass}
                    placeholder="e.g. 0.2"
                  />
                  <p className="mt-1.5 text-xs text-slate-400">
                    Water usage effectiveness, in L/kWh.
                  </p>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                >
                  {error}
                </div>
              )}

              <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-slate-400">
                  Results are based on your supplied inputs and calculation
                  assumptions.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <LoaderCircle size={17} className="animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      Calculate Impact
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* Calculation results */}
            {result && (
              <section
                aria-live="polite"
                className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 sm:p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800">
                    <Leaf size={21} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Calculation Completed
                    </h2>
                    <p className="text-sm text-slate-500">
                      Your calculation was submitted successfully.
                    </p>
                  </div>
                </div>

                <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-white p-4 text-xs leading-6 text-slate-700">
                  {JSON.stringify(result, null, 2)}
                </pre>

                <Link
                  href="/dashboard/calculations"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-800 hover:text-emerald-900"
                >
                  View all calculations
                  <ArrowRight size={16} />
                </Link>
              </section>
            )}
          </form>

          {/* Information panel */}
          <aside className="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-teal-50/40 p-6 sm:p-8 xl:sticky xl:top-24">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-100 bg-white text-emerald-800 shadow-sm">
              <Leaf size={25} />
            </div>

            <h2 className="max-w-sm text-2xl font-semibold leading-snug tracking-tight text-emerald-950">
              Smarter Infrastructure.
              <br />
              Lower Impact.
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Calculate your facility&apos;s environmental impact and get
              actionable insights for a more sustainable future.
            </p>

            <div className="mt-8 space-y-6">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="flex items-center gap-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-white text-emerald-800">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-emerald-950">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-slate-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 border-t border-emerald-100 pt-5">
              <p className="text-xs leading-5 text-slate-500">
                <span className="font-medium text-emerald-900">
                  Sustainability starts with measurement.
                </span>{" "}
                Use consistent facility inputs to compare your environmental
                performance over time.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}