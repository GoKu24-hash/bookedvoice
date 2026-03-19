import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const BOOKEDVOICE_ANNUAL_COST = 4987;

const JOB_TABLE = [
  { type: "AC Repair", min: 250, max: 500, perMonth: 8 },
  { type: "Heating Repair", min: 300, max: 600, perMonth: 4 },
  { type: "Maintenance / Tune-up", min: 100, max: 200, perMonth: 4 },
  { type: "New AC Installation", min: 3500, max: 7500, perMonth: 2 },
  { type: "Full System Replacement", min: 6000, max: 12000, perMonth: 1 },
];

type Mix = "mixed" | "repair" | "install";

const MIX_CONFIG: Record<Mix, { repairPct: number; installPct: number; label: string }> = {
  mixed:   { repairPct: 0.6, installPct: 0.4, label: "Mixed" },
  repair:  { repairPct: 0.8, installPct: 0.2, label: "Repair Focus" },
  install: { repairPct: 0.3, installPct: 0.7, label: "Install Focus" },
};

function calcLeak(missed: number, repairTicket: number, installTicket: number, mix: Mix) {
  const { repairPct, installPct } = MIX_CONFIG[mix];
  return (missed * repairPct * repairTicket) + (missed * installPct * installTicket);
}

function useCountUp(target: number, duration = 600) {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = prevRef.current;
    const end = target;
    if (start === end) return;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        prevRef.current = end;
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return display;
}

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function AnimatedDollar({ value, className }: { value: number; className?: string }) {
  const displayed = useCountUp(value);
  return <span className={className}>{fmt(displayed)}</span>;
}

export default function RevenueCalculator() {
  const [missed, setMissed] = useState(5);
  const [mix, setMix] = useState<Mix>("mixed");

  const avgRepair = 375;
  const avgInstall = 5000;
  const minRepair = 250; const maxRepair = 600;
  const minInstall = 3500; const maxInstall = 12000;

  const weeklyAvg   = calcLeak(missed, avgRepair, avgInstall, mix);
  const monthlyAvg  = weeklyAvg * 4;
  const annualAvg   = monthlyAvg * 12;
  const netRecovered = annualAvg - BOOKEDVOICE_ANNUAL_COST;

  const weeklyMin   = calcLeak(missed, minRepair, minInstall, mix);
  const annualMin   = weeklyMin * 4 * 12;

  const weeklyMax   = calcLeak(missed, maxRepair, maxInstall, mix);
  const annualMax   = weeklyMax * 4 * 12;

  const netMin = annualMin - BOOKEDVOICE_ANNUAL_COST;
  const netMax = annualMax - BOOKEDVOICE_ANNUAL_COST;

  return (
    <section className="py-24 bg-[#0B1F2E]" id="calculator">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#1FA463] font-bold uppercase tracking-widest text-sm mb-3">Revenue Calculator</p>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white leading-tight mb-4">
            What Does One Missed Call<br className="hidden md:block" /> Actually Cost You?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Adjust the slider below. The math will do the talking.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-[#0f2336] rounded-2xl p-8 mb-8 border border-white/5">
          {/* Slider */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="text-white font-semibold text-lg">Missed calls per week</label>
              <span className="text-4xl font-display font-extrabold text-[#F97316]">{missed}</span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={missed}
              onChange={(e) => setMissed(Number(e.target.value))}
              data-testid="slider-missed-calls"
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #1FA463 0%, #1FA463 ${((missed - 1) / 19) * 100}%, #1e3a4f ${((missed - 1) / 19) * 100}%, #1e3a4f 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span><span>5</span><span>10</span><span>15</span><span>20</span>
            </div>
          </div>

          {/* Toggle */}
          <div>
            <p className="text-white font-semibold mb-3">Job type mix</p>
            <div className="flex flex-wrap gap-3">
              {(["mixed", "repair", "install"] as Mix[]).map((m) => (
                <button
                  key={m}
                  data-testid={`toggle-mix-${m}`}
                  onClick={() => setMix(m)}
                  className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 border ${
                    mix === m
                      ? "bg-[#1FA463] text-white border-[#1FA463]"
                      : "bg-transparent text-gray-400 border-white/10 hover:border-white/30"
                  }`}
                >
                  {MIX_CONFIG[m].label}
                </button>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-2">
              {mix === "mixed"   && "60% repairs · 40% installations"}
              {mix === "repair"  && "80% repairs · 20% installations"}
              {mix === "install" && "30% repairs · 70% installations"}
            </p>
          </div>
        </div>

        {/* Main output */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Weekly Revenue Leak", value: weeklyAvg },
            { label: "Monthly Revenue Leak", value: monthlyAvg },
            { label: "Annual Revenue Leak", value: annualAvg },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#0f2336] rounded-2xl p-6 border border-white/5 text-center">
              <p className="text-gray-400 text-sm font-medium mb-2">{label}</p>
              <AnimatedDollar
                value={value}
                className="text-3xl md:text-4xl font-display font-extrabold text-[#F97316]"
              />
            </div>
          ))}
        </div>

        {/* Net recovered highlight */}
        <div className="bg-[#1FA463]/10 border border-[#1FA463]/30 rounded-2xl p-6 mb-6 text-center">
          <p className="text-[#1FA463] font-semibold text-sm uppercase tracking-widest mb-1">
            Net Revenue Recovered (Annual, after BookedVoice cost)
          </p>
          <AnimatedDollar
            value={netRecovered}
            className="text-5xl md:text-6xl font-display font-extrabold text-white"
          />
          <p className="text-gray-400 text-sm mt-2">
            BookedVoice annual cost: {fmt(BOOKEDVOICE_ANNUAL_COST)} ($399/mo + $199 onboarding)
          </p>
        </div>

        {/* Min / Max side by side */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#0f2336] rounded-2xl p-6 border border-white/5">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Conservative Estimate</p>
            <p className="text-gray-300 text-sm mb-1">Avg repair ticket: {fmt(minRepair)} · Install: {fmt(minInstall)}</p>
            <div className="flex justify-between items-end mt-4">
              <div>
                <p className="text-gray-500 text-xs mb-1">Annual leak</p>
                <AnimatedDollar value={annualMin} className="text-2xl font-display font-bold text-white" />
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs mb-1">Net recovered</p>
                <AnimatedDollar
                  value={netMin}
                  className={`text-2xl font-display font-bold ${netMin >= 0 ? "text-[#1FA463]" : "text-red-400"}`}
                />
              </div>
            </div>
          </div>
          <div className="bg-[#0f2336] rounded-2xl p-6 border border-white/5">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Maximum Potential</p>
            <p className="text-gray-300 text-sm mb-1">Avg repair ticket: {fmt(maxRepair)} · Install: {fmt(maxInstall)}</p>
            <div className="flex justify-between items-end mt-4">
              <div>
                <p className="text-gray-500 text-xs mb-1">Annual leak</p>
                <AnimatedDollar value={annualMax} className="text-2xl font-display font-bold text-white" />
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs mb-1">Net recovered</p>
                <AnimatedDollar value={netMax} className="text-2xl font-display font-bold text-[#1FA463]" />
              </div>
            </div>
          </div>
        </div>

        {/* Callout */}
        <div className="bg-[#0B3C5D] border border-[#1FA463]/30 rounded-2xl p-8 mb-8 text-center">
          <p className="text-white text-xl md:text-2xl font-semibold leading-relaxed">
            BookedVoice costs <span className="text-[#F97316] font-extrabold">{fmt(BOOKEDVOICE_ANNUAL_COST)}/year</span>.
            If we recover just <span className="text-[#1FA463] font-extrabold">1 installation job</span>, you're already ahead.
          </p>
          <p className="text-gray-400 mt-3 text-base">
            Every call after that is pure profit.
          </p>
        </div>

        {/* Job table */}
        <div className="bg-[#0f2336] rounded-2xl border border-white/5 overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-gray-400 font-semibold px-5 py-3">Job Type</th>
                <th className="text-right text-gray-400 font-semibold px-5 py-3">Ticket Range</th>
                <th className="text-right text-gray-400 font-semibold px-5 py-3">Jobs / Month</th>
              </tr>
            </thead>
            <tbody>
              {JOB_TABLE.map((row, i) => (
                <tr key={row.type} className={`border-b border-white/5 ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}>
                  <td className="text-white px-5 py-3 font-medium">{row.type}</td>
                  <td className="text-[#F97316] text-right px-5 py-3 font-semibold">
                    {fmt(row.min)} – {fmt(row.max)}
                  </td>
                  <td className="text-gray-300 text-right px-5 py-3">{row.perMonth}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-gray-600 text-xs text-center mb-10 leading-relaxed">
          Averages based on industry data from HomeAdvisor, Angi, and IBISWorld.
          Actual figures vary by market and season.
        </p>

        {/* CTA */}
        <div className="text-center">
          <a href="#demo-form">
            <Button
              size="lg"
              data-testid="button-calculator-cta"
              className="text-lg px-10 py-6 rounded-xl bg-[#1FA463] text-white font-bold"
            >
              See How It Works — Book a Free 15-Min Demo
            </Button>
          </a>
        </div>

      </div>
    </section>
  );
}
