import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, ShieldCheck, Smartphone, MapPin, BarChart3, Users } from "lucide-react";
import { motion } from "motion/react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="h-20 flex items-center justify-between px-8 lg:px-20 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <CheckCircle2 className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">Attendora</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">Login</Link>
          <Link to="/signup" className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-8 lg:px-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold">
            <ShieldCheck className="w-4 h-4" />
            Trusted by 500+ Small Businesses
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1]">
            Modern Attendance for <span className="text-primary">Modern Teams.</span>
          </h1>
          
          <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
            Streamline your workforce management with GPS-verified attendance, selfie check-ins, and automated reporting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/signup" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2">
              Start 14-Day Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="bg-white border-2 border-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              Watch Demo
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-primary/5 rounded-[40px] blur-3xl -z-10" />
          <img 
            src="https://picsum.photos/seed/dashboard/800/600" 
            alt="Dashboard Preview" 
            className="rounded-3xl shadow-2xl border border-slate-100"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="px-8 lg:px-20 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">Everything you need to manage attendance</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Powerful features designed specifically for small business owners who value their time.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Smartphone className="text-primary" />}
              title="Selfie Check-in"
              description="Prevent proxy attendance with mandatory live selfie capture during check-in and check-out."
            />
            <FeatureCard 
              icon={<MapPin className="text-primary" />}
              title="GPS Verification"
              description="Automatically capture precise GPS coordinates to ensure employees are at the right location."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-primary" />}
              title="Real-time Reports"
              description="Generate detailed daily, weekly, and monthly attendance reports with just one click."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="px-8 lg:px-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Simple, Transparent Pricing</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard 
              title="6 Month Plan"
              price="₹2,999"
              period="6 Months"
              features={["Up to 20 Employees", "GPS & Selfie Verification", "WhatsApp Notifications", "Email Support"]}
            />
            <PricingCard 
              title="Yearly Plan"
              price="₹4,999"
              period="12 Months"
              popular
              features={["Up to 20 Employees", "GPS & Selfie Verification", "WhatsApp Notifications", "Priority Support", "2 Months Free"]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="px-8 lg:px-20 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircle2 className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900">Attendora</span>
          </div>
          
          <p className="text-slate-400 text-sm">© 2026 Attendora. All rights reserved.</p>
          
          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

function PricingCard({ title, price, period, features, popular = false }: { title: string; price: string; period: string; features: string[]; popular?: boolean }) {
  return (
    <div className={`p-8 rounded-[32px] border-2 transition-all relative ${popular ? "border-primary bg-white shadow-2xl shadow-primary/10 scale-105" : "border-slate-100 bg-slate-50"}`}>
      {popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-bold text-slate-900">{price}</span>
        <span className="text-slate-400 font-medium">/ {period}</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
            <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Link to="/signup" className={`w-full py-4 rounded-2xl font-bold text-center block transition-all ${popular ? "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20" : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50"}`}>
        Choose Plan
      </Link>
    </div>
  );
}
