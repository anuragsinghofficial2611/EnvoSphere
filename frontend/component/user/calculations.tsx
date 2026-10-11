"use client";

import { useMemo, useState } from "react";
import {
  Leaf,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
  CalendarDays,
  Zap,
  Droplets,
  Activity,
  FileText,
} from "lucide-react";

type Calculation = {
  id: string;
  facility: string;
  date: string;
  timestamp: string;
  period: string;
  emissions: number;
  energy: number;
  water: number;
  area: number;
  gpuModel: string;
  gpuCount: number;
  hoursUsed: number;
  renewablePercent: number;
  pue: number;
  wue: number;
  itEnergy: number;
  gridEnergy: number;
  heat: number;
  status: string;
};

const calculations: Calculation[] = [
  {
    id: "CAL-001",
    facility: "Data Center A",
    date: "Apr 28, 2025",
    timestamp: "10:24 AM",
    period: "April 2025",
    emissions: 2.8,
    energy: 48320,
    water: 1280,
    area: 1000,
    gpuModel: "NVIDIA H100",
    gpuCount: 8,
    hoursUsed: 24,
    renewablePercent: 60,
    pue: 1.4,
    wue: 0.2,
    itEnergy: 34514,
    gridEnergy: 19328,
    heat: 3.92,
    status: "Completed",
  },
  {
    id: "CAL-002",
    facility: "Data Center B",
    date: "Apr 25, 2025",
    timestamp: "02:16 PM",
    period: "April 2025",
    emissions: 4.1,
    energy: 72640,
    water: 2040,
    area: 1800,
    gpuModel: "NVIDIA A100",
    gpuCount: 16,
    hoursUsed: 22,
    renewablePercent: 45,
    pue: 1.5,
    wue: 0.3,
    itEnergy: 48427,
    gridEnergy: 39952,
    heat: 5.2,
    status: "Completed",
  },
  {
    id: "CAL-003",
    facility: "Research Lab",
    date: "Apr 20, 2025",
    timestamp: "11:03 AM",
    period: "April 2025",
    emissions: 1.2,
    energy: 21560,
    water: 620,
    area: 600,
    gpuModel: "NVIDIA L40S",
    gpuCount: 8,
    hoursUsed: 12,
    renewablePercent: 70,
    pue: 1.3,
    wue: 0.2,
    itEnergy: 16585,
    gridEnergy: 6468,
    heat: 1.96,
    status: "Completed",
  },
  {
    id: "CAL-004",
    facility: "Main Campus",
    date: "Apr 15, 2025",
    timestamp: "09:45 AM",
    period: "April 2025",
    emissions: 3.6,
    energy: 65200,
    water: 1860,
    area: 1400,
    gpuModel: "NVIDIA H100",
    gpuCount: 12,
    hoursUsed: 18,
    renewablePercent: 55,
    pue: 1.4,
    wue: 0.25,
    itEnergy: 46571,
    gridEnergy: 29340,
    heat: 5.88,
    status: "Completed",
  },
];

const numberFormat = new Intl.NumberFormat("en-US");

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-right text-sm font-medium text-slate-800">
        {value}
      </span>
    </div>
  );
}

export default function CalculationsPage() {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("All Time");
  const [selected, setSelected] = useState<Calculation | null>(null);
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return calculations.filter((item) => {
      const matchesSearch =
        !query ||
        item.facility.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.gpuModel.toLowerCase().includes(query);

      const matchesPeriod =
        period === "All Time" || item.period === period;

      return matchesSearch && matchesPeriod;
    });
  }, [search, period]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        {/* Page heading and filters */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-emerald-800">
              <Leaf size={21} />
              <span className="text-sm font-semibold">EnvoSphere</span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              My Calculations
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              View and manage your saved calculations.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative block sm:w-[270px]">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search calculations..."
                aria-label="Search calculations"
                className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-50"
              />
            </label>

            <div className="relative">
              <select
                value={period}
                onChange={(e) => {
                  setPeriod(e.target.value);
                  setPage(1);
                }}
                aria-label="Filter by time period"
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm text-slate-700 outline-none focus:border-emerald-600 sm:w-[155px]"
              >
                <option>All Time</option>
                <option>April 2025</option>
                <option>March 2025</option>
              </select>
              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Calculation cards */}
        <section aria-label="Saved calculations" className="space-y-3">
          {visible.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-emerald-200 sm:px-6 sm:py-6"
            >
              <div className="grid grid-cols-1 items-center gap-5 xl:grid-cols-[minmax(190px,1.5fr)_minmax(110px,0.7fr)_minmax(110px,0.7fr)_minmax(100px,0.7fr)_auto]">
                <div className="flex min-w-0 items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
                    <FileText size={20} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-slate-800">
                      {item.facility}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.date} · {item.timestamp}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {item.emissions.toFixed(1)}{" "}
                    <span className="text-xs font-medium">tCO₂e</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Emissions</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {numberFormat.format(item.energy)}{" "}
                    <span className="text-xs font-medium">kWh</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Energy</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {numberFormat.format(item.water)}{" "}
                    <span className="text-xs font-medium">m³</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Water</p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  View Details
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}

          {visible.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 px-5 py-16 text-center">
              <Search size={28} className="mx-auto mb-3 text-slate-400" />
              <h2 className="font-medium text-slate-800">
                No calculations found
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Try a different search term or time period.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setPeriod("All Time");
                  setPage(1);
                }}
                className="mt-4 text-sm font-medium text-emerald-800 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Pagination */}
        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
            –
            {Math.min(currentPage * pageSize, filtered.length)} of{" "}
            {filtered.length}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft size={17} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`Page ${n}`}
                aria-current={currentPage === n ? "page" : undefined}
                onClick={() => setPage(n)}
                className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium ${
                  currentPage === n
                    ? "bg-emerald-800 text-white"
                    : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              type="button"
              aria-label="Next page"
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        <footer className="mt-8 border-t border-slate-100 pt-5">
          <p className="text-xs text-slate-400">
            EnvoSphere · Environmental impact monitoring
          </p>
        </footer>
      </div>

      {/* Details modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="details-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-5 py-5 sm:px-7">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                  <FileText size={22} />
                </div>
                <div>
                  <h2
                    id="details-title"
                    className="text-lg font-semibold text-slate-900"
                  >
                    {selected.facility}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Calculation ID: {selected.id}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <CalendarDays size={13} />
                    {selected.date} · {selected.timestamp}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close details"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 p-5 sm:p-7">
              <section>
                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                  Environmental Impact
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 p-4">
                    <Leaf size={19} className="mb-3 text-emerald-700" />
                    <p className="text-xl font-semibold text-slate-900">
                      {selected.emissions.toFixed(1)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Emissions (tCO₂e)
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-4">
                    <Zap size={19} className="mb-3 text-emerald-700" />
                    <p className="text-xl font-semibold text-slate-900">
                      {numberFormat.format(selected.energy)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Energy (kWh)</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-4">
                    <Droplets size={19} className="mb-3 text-emerald-700" />
                    <p className="text-xl font-semibold text-slate-900">
                      {numberFormat.format(selected.water)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Water (m³)</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-2 text-sm font-semibold text-slate-900">
                  Facility &amp; Hardware
                </h3>
                <div className="rounded-xl border border-slate-200 px-4">
                  <DetailRow label="Facility area" value={`${selected.area} m²`} />
                  <DetailRow label="GPU model" value={selected.gpuModel} />
                  <DetailRow label="GPU count" value={selected.gpuCount} />
                  <DetailRow
                    label="Hours used per day"
                    value={`${selected.hoursUsed} hours`}
                  />
                </div>
              </section>

              <section>
                <h3 className="mb-2 text-sm font-semibold text-slate-900">
                  Energy &amp; Efficiency
                </h3>
                <div className="rounded-xl border border-slate-200 px-4">
                  <DetailRow
                    label="Renewable energy"
                    value={`${selected.renewablePercent}%`}
                  />
                  <DetailRow label="Power Usage Effectiveness (PUE)" value={selected.pue} />
                  <DetailRow
                    label="Water Usage Effectiveness (WUE)"
                    value={`${selected.wue} L/kWh`}
                  />
                </div>
              </section>

              <section>
                <h3 className="mb-2 text-sm font-semibold text-slate-900">
                  Additional Results
                </h3>
                <div className="rounded-xl border border-slate-200 px-4">
                  <DetailRow
                    label="IT energy"
                    value={`${numberFormat.format(selected.itEnergy)} kWh`}
                  />
                  <DetailRow
                    label="Grid energy"
                    value={`${numberFormat.format(selected.gridEnergy)} kWh`}
                  />
                  <DetailRow
                    label="Heat output"
                    value={`${selected.heat.toFixed(2)} kW`}
                  />
                  <DetailRow label="Status" value={selected.status} />
                </div>
              </section>

              <div className="flex items-start gap-2 rounded-lg bg-emerald-50 p-3.5">
                <Activity size={17} className="mt-0.5 shrink-0 text-emerald-800" />
                <p className="text-xs leading-5 text-emerald-900">
                  These details belong to the selected calculation. Replace
                  the sample records with your backend data when integrating
                  the API.
                </p>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:px-7">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg bg-emerald-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-900"
              >
                Close Details
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}