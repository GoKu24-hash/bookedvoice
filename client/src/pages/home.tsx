import { Button } from "@/components/ui/button";
import { Check, Mail } from "lucide-react";
import { DemoForm } from "@/components/forms/demo-form";
import RevenueCalculator from "@/components/RevenueCalculator";

export default function Home() {
  const scrollToForm = () => {
    document.getElementById("demo-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-[#0B3C5D] border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-2xl tracking-tight text-[#FFFFFF]">
              BookedVoice
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-[#FFFFFF]/90 font-medium text-sm lg:text-base">
              AI Call Answering for HVAC Businesses
            </span>
            <Button size="sm" onClick={scrollToForm} className="font-bold tracking-wide">
              Get Started
            </Button>
          </div>
          <div className="md:hidden">
            <Button size="sm" onClick={scrollToForm} className="font-bold">
              Demo
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* HERO SECTION - White bg */}
        <section className="py-24 md:py-32 bg-[#FFFFFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F4F6F8] text-[#0B3C5D] font-semibold text-sm mb-8 border border-[#0B3C5D]/10">
              <span className="w-2 h-2 rounded-full bg-[#1FA463] animate-pulse"></span>
              24/7 Availability Guaranteed
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold text-[#0B3C5D] leading-[1.1] tracking-tight mb-8">
              Never Miss Another <br className="hidden md:block" /> HVAC Call
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              BookedVoice answers every call 24/7, captures 8 critical job details, and texts you instantly — so you never lose a lead to voicemail again.
            </p>
            <Button size="lg" onClick={scrollToForm} className="text-xl px-12 py-8 rounded-2xl">
              Book a FREE Demo
            </Button>
          </div>

          {/* Hero Image — HVAC owner + happy customer handshake */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-[#0B3C5D]/15 border border-[#0B3C5D]/10">
              <img
                src="/hvac-handshake.png"
                alt="HVAC business owner shaking hands with happy customer after a completed job"
                className="w-full h-72 md:h-[440px] object-cover object-top"
              />
            </div>
          </div>
        </section>

        {/* PROBLEM / SOLUTION SECTION - Soft Gray bg */}
        <section className="py-24 bg-[#F4F6F8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0B3C5D] leading-tight mb-6">
                  HVAC Businesses Lose Jobs Every Day From Missed Calls
                </h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  When a customer's AC breaks, they don't leave a voicemail. They call the next company on Google. BookedVoice solves this automatically so you never lose revenue to a competitor again.
                </p>
                <div className="space-y-4">
                  {[
                    "Stop missing calls after hours",
                    "Stop customers from calling competitors",
                    "Stop losing revenue from unanswered phones",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-[#0B3C5D]/5"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1FA463]/10 flex items-center justify-center">
                        <Check className="w-5 h-5 text-[#1FA463] stroke-[3]" />
                      </div>
                      <span className="text-lg font-semibold text-[#0B3C5D]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#0B3C5D]/5 border border-[#0B3C5D]/10">
                <div className="space-y-6">
                  <div className="border-l-4 border-[#1FA463] pl-6 py-2">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                      MISSED CALL (COMPETITOR)
                    </p>
                    <p className="text-xl font-display font-bold text-[#0B3C5D]">
                      "Hi, my AC is out..." *Voicemail*
                    </p>
                    <p className="text-[#e11d48] font-semibold mt-2">Result: -$850 Lost Job</p>
                  </div>
                  <div className="border-l-4 border-[#1FA463] pl-6 py-2 bg-[#F4F6F8] rounded-r-xl">
                    <p className="text-sm font-bold text-[#1FA463] uppercase tracking-wider mb-1">
                      WITH BOOKEDVOICE
                    </p>
                    <p className="text-xl font-display font-bold text-[#0B3C5D]">
                      "BookedVoice speaking, what is your HVAC emergency?"
                    </p>
                    <p className="text-[#1FA463] font-semibold mt-2">Result: +$850 Booked Job</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION - White bg */}
        <section className="py-24 bg-[#FFFFFF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0B3C5D] mb-4">
              How BookedVoice Works
            </h2>
            <p className="text-lg text-gray-500 mb-16 max-w-2xl mx-auto">
              From the moment a customer calls to the moment you get paid — fully automated.
            </p>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  step: "1",
                  image: "/step1-ai-answers.png",
                  alt: "AI answers the call instantly",
                  title: "AI Answers Instantly",
                  desc: "Every call is picked up immediately, 24/7. No hold times, no missed rings.",
                },
                {
                  step: "2",
                  image: "/step2-data-collection.png",
                  alt: "System collects lead details",
                  title: "Collects Job Details",
                  desc: "Captures 8 critical job details — service type, urgency, location, issue description, and more — so you arrive prepared, not guessing.",
                },
                {
                  step: "3",
                  image: "/step3-lead-delivered.png",
                  alt: "Lead delivered to owner via SMS",
                  title: "Instant SMS Alert to You",
                  desc: "You receive a text with the full lead info — so you can dispatch and get paid.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl bg-[#F4F6F8] border border-[#0B3C5D]/5 hover:-translate-y-1 transition-transform duration-300 overflow-hidden"
                >
                  {/* Step number badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[#0B3C5D] text-white flex items-center justify-center font-display font-bold text-lg shadow-lg shadow-[#0B3C5D]/20 z-10">
                    {item.step}
                  </div>
                  {/* Illustration */}
                  <div className="bg-white flex items-center justify-center p-6 pt-10">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                  {/* Text */}
                  <div className="p-6 pt-4">
                    <h3 className="text-2xl font-display font-bold text-[#0B3C5D] mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16">
              <Button size="lg" onClick={scrollToForm} className="text-lg px-10">
                Start Capturing Leads
              </Button>
            </div>
          </div>
        </section>

        {/* REVENUE CALCULATOR SECTION */}
        <RevenueCalculator />

        {/* WHO IT IS FOR SECTION - Soft Gray bg */}
        <section className="py-24 bg-[#F4F6F8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0B3C5D] mb-8">
              Built Specifically for HVAC Owners
            </h2>
            <p className="text-2xl font-medium text-gray-800 mb-12 leading-relaxed">
              No extra staff. Works 24/7. More booked jobs with less effort.
            </p>
            <div className="bg-[#0B3C5D] rounded-3xl p-10 md:p-14 text-white shadow-2xl shadow-[#0B3C5D]/20">
              <p className="text-xl md:text-2xl font-medium italic opacity-90 mb-8">
                "Customers call most when we're on a job or asleep — and that's exactly when we used to lose them. BookedVoice makes sure we capture every single lead without having to hire a full-time receptionist."
              </p>
              <div className="font-display font-bold text-[#1FA463] text-xl">
                - The BookedVoice Promise
              </div>
            </div>
          </div>
        </section>

        {/* CTA + FORM SECTION - White bg */}
        <section id="demo-form" className="py-24 bg-[#FFFFFF]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-display font-extrabold text-[#0B3C5D] mb-6 leading-tight">
                  See It Work for Your HVAC Business
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Book a free demo and watch exactly how BookedVoice turns missed calls into booked jobs.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-lg font-medium text-[#0B3C5D]">
                    <Check className="w-6 h-6 text-[#1FA463] stroke-[3]" />
                    <span>5-minute custom setup</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg font-medium text-[#0B3C5D]">
                    <Check className="w-6 h-6 text-[#1FA463] stroke-[3]" />
                    <span>No commitment required</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg font-medium text-[#0B3C5D]">
                    <Check className="w-6 h-6 text-[#1FA463] stroke-[3]" />
                    <span>Immediate ROI</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#1FA463]/10 to-[#0B3C5D]/5 rounded-[2.5rem] transform rotate-3"></div>
                <div className="relative">
                  <DemoForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B3C5D] border-t border-white/10">
        {/* Contact highlight */}
        <div className="border-b border-white/10 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">
              Have a question? Reach out directly.
            </p>
            <a
              href="mailto:hello@bookedvoice.com"
              data-testid="link-contact-email"
              className="inline-flex items-center gap-3 bg-[#1FA463] text-white font-bold text-xl md:text-2xl px-8 py-4 rounded-xl transition-opacity hover:opacity-90"
            >
              <Mail className="w-6 h-6 flex-shrink-0" />
              hello@bookedvoice.com
            </a>
            <p className="text-white/40 text-sm mt-4">
              Serving HVAC businesses across Texas and the United States
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-display font-extrabold text-xl tracking-tight text-white">
              BookedVoice
            </span>
            <span className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} BookedVoice. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
