
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  Menu,
  X,
  Zap,
  Droplets,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Gauge,
  Activity,
} from "lucide-react";

const routes = {
  home: "/",
  login: "/auth/login",
  register: "/auth/register",
};

const features = [
  {
    icon: Zap,
    title: "Energy intelligence",
    description:
      "Understand IT energy demand, total facility consumption, and the contribution of renewable energy.",
  },
  {
    icon: Droplets,
    title: "Carbon and water impact",
    description:
      "Estimate carbon emissions and water consumption with transparent inputs and calculation assumptions.",
  },
  {
    icon: Lightbulb,
    title: "Actionable recommendations",
    description:
      "Turn calculated results into practical insights with AI-assisted summaries and efficiency suggestions.",
  },
];

const steps = [
  {
    number: "01",
    title: "Enter your inputs",
    description:
      "Add your GPU configuration, operating hours, and facility efficiency parameters.",
  },
  {
    number: "02",
    title: "Calculate your impact",
    description:
      "Estimate energy consumption, carbon emissions, water usage, and thermal output.",
  },
  {
    number: "03",
    title: "Understand your results",
    description:
      "Review your metrics and explore recommendations to identify improvement opportunities.",
  },
];

function Logo() {
  return (
    <Link
      href={routes.home}
      className="inline-flex items-center gap-2.5 rounded-sm"
      aria-label="EnvoSphere home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#247A4B] text-white">
        <Leaf size={20} strokeWidth={1.9} />
      </span>
      <span className="text-[19px] font-semibold tracking-[-0.7px] text-[#17231D]">
        Envo<span className="text-[#247A4B]">Sphere</span>
      </span>
    </Link>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Product", href: "#product" },
    { label: "How it works", href: "#how-it-works" },
    { label: "About", href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5EAE6] bg-white/95 backdrop-blur-sm">
      <nav
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"
        aria-label="Main navigation"
      >
        <Logo />

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#66736B] transition-colors hover:text-[#247A4B]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href={routes.login}
            className="text-sm font-medium text-[#34433A] transition-colors hover:text-[#247A4B]"
          >
            Sign in
          </Link>
          <Link
            href={routes.register}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#247A4B] px-4 text-sm font-medium text-white transition-colors hover:bg-[#195F39] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#247A4B] focus-visible:ring-offset-2"
          >
            Get started <ArrowRight size={15} />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-[#17231D] hover:bg-[#F4F7F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#247A4B] md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#E5EAE6] bg-white px-5 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-[#34433A] hover:bg-[#F4F7F4]"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-3 border-t border-[#E5EAE6] pt-4">
              <Link
                href={routes.login}
                onClick={() => setMenuOpen(false)}
                className="flex h-10 flex-1 items-center justify-center rounded-md border border-[#E5EAE6] text-sm font-medium text-[#34433A]"
              >
                Sign in
              </Link>
              <Link
                href={routes.register}
                onClick={() => setMenuOpen(false)}
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-[#247A4B] text-sm font-medium text-white"
              >
                Get started <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Metric({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="min-w-0 border-l border-[#E5EAE6] pl-3 first:border-0 first:pl-0 sm:pl-4">
      <p className="text-[11px] leading-5 text-[#66736B] sm:text-xs">{label}</p>
      <p className="mt-1 whitespace-nowrap text-lg font-semibold tracking-tight text-[#17231D] sm:text-xl">
        {value}
      </p>
      <p className="mt-0.5 text-[10px] text-[#66736B] sm:text-[11px]">{unit}</p>
    </div>
  );
}

function ProductPreview() {
  return (
    <div
      id="product"
      className="relative mx-auto w-full max-w-[540px] scroll-mt-28"
    >
      <div className="overflow-hidden rounded-xl border border-[#DFE6E0] bg-white shadow-[0_16px_55px_-28px_rgba(23,55,35,0.24)]">
        <div className="flex items-center justify-between border-b border-[#E5EAE6] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF4EC] text-[#247A4B]">
              <Activity size={18} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#17231D]">
                Environmental assessment
              </h2>
              <p className="mt-0.5 text-xs text-[#78837B]">
                Infrastructure overview
              </p>
            </div>
          </div>
          <span className="hidden items-center gap-1.5 text-[11px] text-[#66736B] sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#247A4B]" />
            Example assessment
          </span>
        </div>

        <div className="grid gap-6 p-5 sm:p-6">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-[0.09em] text-[#66736B]">
                Infrastructure inputs
              </h3>
              <span className="text-[10px] text-[#8A948D]">Illustrative</span>
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
              <div>
                <p className="mb-1.5 text-xs text-[#66736B]">GPU model</p>
                <div className="flex h-10 items-center justify-between rounded-md border border-[#E5EAE6] px-3 text-sm font-medium text-[#26372C]">
                  NVIDIA H100
                  <ChevronRight size={14} className="rotate-90 text-[#8A948D]" />
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-xs text-[#66736B]">GPU count</p>
                <div className="flex h-10 items-center rounded-md border border-[#E5EAE6] px-3 text-sm font-medium text-[#26372C]">
                  8 GPUs
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-xs text-[#66736B]">Operating hours</p>
                <div className="flex h-10 items-center rounded-md border border-[#E5EAE6] px-3 text-sm font-medium text-[#26372C]">
                  24 hours/day
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-xs text-[#66736B]">PUE</p>
                <div className="flex h-10 items-center rounded-md border border-[#E5EAE6] px-3 text-sm font-medium text-[#26372C]">
                  1.40
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-[#66736B]">
                  Renewable energy
                </span>
                <span className="text-xs font-semibold text-[#247A4B]">
                  35%
                </span>
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-[#EAF0EB]"
                role="img"
                aria-label="Illustrative renewable energy percentage: 35%"
              >
                <div className="h-full w-[35%] rounded-full bg-[#247A4B]" />
              </div>
            </div>
          </div>

          <div className="border-t border-[#E5EAE6] pt-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-[0.09em] text-[#66736B]">
                Estimated results
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] text-[#66736B]">
                <Gauge size={12} /> Sample values
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Metric
                label="Facility energy"
                value="1,881.6"
                unit="kWh / day"
              />
              <Metric
                label="Carbon emissions"
                value="878.9"
                unit="kg CO₂ / day"
              />
              <Metric
                label="Water usage"
                value="3,387"
                unit="litres / day"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-md bg-[#F4F8F4] p-3">
            <CheckCircle2
              size={16}
              className="mt-0.5 shrink-0 text-[#247A4B]"
            />
            <p className="text-[11px] leading-5 text-[#526257]">
              Illustrative example only. Results depend on the calculation
              assumptions, energy mix, and facility operating conditions.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 left-6 -z-10 h-20 w-[85%] rounded-full bg-[#EAF4EC] blur-2xl" />
    </div>
  );
}

function Hero() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.03fr_0.97fr] lg:gap-12 lg:px-12 lg:py-24">
        <div className="max-w-[570px]">
          <div className="mb-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#247A4B] sm:text-[11px]">
            <span className="h-px w-6 bg-[#247A4B]" />
            Environmental intelligence for modern infrastructure
          </div>

          <h1 className="text-[42px] font-semibold leading-[1.12] tracking-[-1.9px] text-[#17231D] sm:text-5xl lg:text-[58px] lg:leading-[1.1]">
            Understand your impact.
            <span className="mt-1 block text-[#247A4B]">
              Build a more efficient future.
            </span>
          </h1>

          <p className="mt-6 max-w-[490px] text-base leading-7 text-[#66736B] sm:text-[17px] sm:leading-8">
            Measure energy consumption, carbon emissions, water usage, and
            thermal output across your infrastructure — all in one place.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href={routes.register}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#247A4B] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#195F39] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#247A4B] focus-visible:ring-offset-2 sm:w-auto"
            >
              Start calculating <ArrowRight size={16} />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center gap-2 text-sm font-medium text-[#34433A] transition-colors hover:text-[#247A4B]"
            >
              Explore the platform <ArrowRight size={15} />
            </a>
          </div>

          <div className="mt-9 flex items-start gap-3 border-t border-[#E5EAE6] pt-5">
            <CheckCircle2
              size={17}
              className="mt-0.5 shrink-0 text-[#247A4B]"
            />
            <p className="max-w-[390px] text-xs leading-5 text-[#66736B]">
              Practical environmental insights. Transparent calculations.
              Actionable recommendations.
            </p>
          </div>
        </div>

        <ProductPreview />
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-[#E5EAE6] bg-[#F7F9F7]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="max-w-[590px]">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#247A4B]">
            What you can measure
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-1.1px] text-[#17231D] sm:text-4xl">
            Environmental insights, without the complexity.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#66736B] sm:text-base">
            Understand your infrastructure&apos;s resource consumption and
            identify opportunities to operate more efficiently.
          </p>
        </div>

        <div className="mt-12 grid gap-9 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className={`border-[#DFE6E0] ${
                  index > 0 ? "border-t pt-7 sm:border-t-0 sm:pt-0" : ""
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DFE6E0] bg-white text-[#247A4B]">
                  <Icon size={19} strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 text-base font-semibold text-[#17231D]">
                  {feature.title}
                </h3>
                <p className="mt-2 max-w-[340px] text-sm leading-6 text-[#66736B]">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#247A4B]">
              A straightforward process
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-1.1px] text-[#17231D] sm:text-4xl">
              From inputs to insight.
            </h2>
          </div>
          <p className="max-w-[390px] text-sm leading-6 text-[#66736B]">
            Get a clearer understanding of your environmental footprint in
            three simple steps.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-7">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className={`relative border-t border-[#DFE6E0] pt-5 ${
                index > 0 ? "md:pl-6" : ""
              }`}
            >
              <span className="text-sm font-semibold tabular-nums text-[#247A4B]">
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[#17231D]">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[330px] text-sm leading-6 text-[#66736B]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-white px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-xl border border-[#DDE9DE] bg-[#F1F7F1] px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:px-14">
        <div className="max-w-[600px]">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#247A4B]">
            Start with what you know
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-1.1px] text-[#17231D] sm:text-4xl">
            Make your infrastructure more measurable.
          </h2>
          <p className="mt-4 max-w-[510px] text-sm leading-6 text-[#66736B] sm:text-base">
            Start with the data you have. Build a clearer picture of your
            environmental footprint.
          </p>
        </div>
        <Link
          href={routes.register}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-[#247A4B] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#195F39] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#247A4B] focus-visible:ring-offset-2"
        >
          Get started <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#E5EAE6] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div>
          <Logo />
          <p className="mt-3 max-w-[350px] text-xs leading-5 text-[#78837B]">
            Environmental intelligence for more efficient energy and
            AI infrastructure.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-[#66736B]">
          <a href="#product" className="hover:text-[#247A4B]">
            Product
          </a>
          <a href="#about" className="hover:text-[#247A4B]">
            About
          </a>
          <a href="mailto:contact@envosphere.example" className="hover:text-[#247A4B]">
            Contact
          </a>
        </div>

        <p className="text-xs text-[#8A948D]">
          © 2026 EnvoSphere EnvoSphere
        </p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </main>
  );
}