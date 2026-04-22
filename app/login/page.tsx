"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Theme = 'light' | 'dark' | 'comfort';

const themeClasses = {
  light: {
    mainBg: "bg-slate-50",
    textPrimary: "text-slate-800",
    textSecondary: "text-slate-500",
    card: "bg-white border-slate-200 shadow-xl",
    input: "bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 text-slate-800",
    tabContainer: "bg-slate-200/50",
    tabInActive: "text-slate-500 hover:text-slate-800 hover:bg-slate-300/50",
    tabActive: "bg-white text-emerald-600 shadow-sm border border-slate-200",
    heroBg: "bg-emerald-600",
    btnTheme: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 text-white",
  },
  dark: {
    mainBg: "bg-slate-950",
    textPrimary: "text-slate-100",
    textSecondary: "text-slate-400",
    card: "bg-slate-900 border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.5)]",
    input: "bg-slate-950 border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/10 text-slate-100",
    tabContainer: "bg-slate-800/50 border border-slate-700",
    tabInActive: "text-slate-400 hover:text-slate-200 hover:bg-slate-800",
    tabActive: "bg-slate-700 text-emerald-400 border border-slate-600 shadow-sm",
    heroBg: "bg-emerald-900",
    btnTheme: "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/10",
  },
  comfort: {
    mainBg: "bg-[#FDFBF7]",
    textPrimary: "text-stone-800",
    textSecondary: "text-stone-500",
    card: "bg-white/80 backdrop-blur-xl border-stone-200 shadow-[0_8px_30px_rgb(120,113,108,0.06)]",
    input: "bg-white border-stone-200 focus:border-orange-500 focus:ring-orange-500/10 text-stone-800",
    tabContainer: "bg-stone-200/50 shadow-inner",
    tabInActive: "text-stone-500 hover:text-stone-700 hover:bg-stone-200",
    tabActive: "bg-white text-orange-700 border border-stone-200 shadow-sm",
    heroBg: "bg-gradient-to-br from-amber-700 to-orange-800",
    btnTheme: "bg-orange-600 hover:bg-orange-700 text-white shadow-orange-600/20",
  }
};

const translations = {
  english: {
    title: "Project KrishiFlow",
    subtitle: "AI-Driven Supply Chain & Logistics Optimization for a sustainable agricultural future.",
    welcome: "Welcome Back",
    instruction: "Log in to your KrishiFlow dashboard",
    phone_label: "Mobile Number",
    send_otp: "Send OTP",
    enter_otp: "Enter OTP sent to",
    verify: "Verify & Login",
    edit: "Edit"
  },
  hindi: {
    title: "Project KrishiFlow",
    subtitle: "AI-sanchalit Krishi Supply Chain aur Logistics, ek behtar bhavishya ke liye.",
    welcome: "Swagat Hai",
    instruction: "Apne KrishiFlow dashboard mein login karein",
    phone_label: "Mobile Number",
    send_otp: "OTP Bhejein",
    enter_otp: "OTP darj karein jo is par bheja gaya",
    verify: "Verify Aur Login Karein",
    edit: "Badlein"
  },
  hinglish: {
    title: "Project KrishiFlow",
    subtitle: "AI-Driven Supply Chain aur Logistics se agriculture ko sustainable banayein.",
    welcome: "Welcome Back",
    instruction: "Apne KrishiFlow dashboard me login karein",
    phone_label: "Mobile Number",
    send_otp: "OTP Send Karein",
    enter_otp: "OTP enter karein jo is number pe bheja gaya",
    verify: "Verify & Login",
    edit: "Change"
  }
};

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  
  const [currentTheme, setCurrentTheme] = useState<Theme>('comfort');
  const [l, setL] = useState<string>('hinglish');

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length < 4) return;
    setLoading(true);
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  const c = themeClasses[currentTheme];
  const t = translations[l as keyof typeof translations];

  return (
    <div className={`min-h-screen ${c.mainBg} flex flex-col md:flex-row font-sans ${c.textPrimary} transition-colors duration-700 overflow-hidden`}>
      
      {/* Custom Animations injected via Style Tag */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
      `}} />

      {/* Left Column: Project Overview */}
      <div className={`hidden md:flex flex-col justify-between w-1/2 p-12 ${c.heroBg} text-white relative overflow-hidden transition-colors duration-700 shadow-2xl z-10`}>
        
        {/* Animated Floating Blobs Background */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white/10 blur-[80px] animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-black/10 blur-[80px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-yellow-500/10 blur-[80px] animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 fade-in-up">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm mb-6 text-3xl border border-white/10 shadow-lg transform transition-transform duration-500 hover:scale-110 hover:rotate-6">🚜</div>
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-md">{t.title}</h1>
          <p className="text-white/80 text-lg font-medium max-w-md leading-relaxed">{t.subtitle}</p>
        </div>

        <div className="space-y-2 relative z-10">
          <div className="group p-4 -m-4 rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-start gap-5 cursor-default fade-in-up delay-1">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl shrink-0 backdrop-blur-md shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/20">📊</div>
            <div className="transform transition-transform duration-300 group-hover:translate-x-2">
              <h3 className="font-bold text-lg mb-1">Live Dashboard</h3>
              <p className="text-white/70 text-sm leading-snug">Centralized view of every fertilizer bag moving in the system.</p>
            </div>
          </div>
          
          <div className="group p-4 -m-4 rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-start gap-5 cursor-default fade-in-up delay-2">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl shrink-0 backdrop-blur-md shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/20">📍</div>
            <div className="transform transition-transform duration-300 group-hover:translate-x-2">
              <h3 className="font-bold text-lg mb-1">Route Optimization</h3>
              <p className="text-white/70 text-sm leading-snug">Using GPS algorithms to find the shortest, fuel-efficient paths for delivery trucks.</p>
            </div>
          </div>
          
          <div className="group p-4 -m-4 rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-start gap-5 cursor-default fade-in-up delay-3">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl shrink-0 backdrop-blur-md shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/20">🔄</div>
            <div className="transform transition-transform duration-300 group-hover:translate-x-2">
              <h3 className="font-bold text-lg mb-1">Dynamic Rerouting</h3>
              <p className="text-white/70 text-sm leading-snug">If a logistics issue (like flood or traffic) occurs, the system reroutes supply instantly to minimize delay.</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 fade-in-up delay-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30 animate-pulse">🏆</div>
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Google Solution Challenge 2026</p>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col p-8 relative fade-in-up delay-1">
        
        {/* Header Controls: Theme & Language */}
        <div className="w-full flex justify-end gap-4 mb-4">
          <div className={`rounded-full p-1.5 inline-flex items-center transition-all ${c.tabContainer}`}>
            {[
              { id: 'light', icon: '☀️' },
              { id: 'dark', icon: '🌙' },
              { id: 'comfort', icon: '☕' }
            ].map((th) => (
              <button
                key={th.id}
                onClick={() => setCurrentTheme(th.id as Theme)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${currentTheme === th.id ? c.tabActive : c.tabInActive}`}
                title={`${th.id} mode`}
              >
                {th.icon}
              </button>
            ))}
          </div>

          <div className={`rounded-full p-1.5 hidden sm:inline-flex items-center transition-all ${c.tabContainer}`}>
            {["english", "hindi", "hinglish"].map((lang) => (
              <button
                key={lang}
                onClick={() => setL(lang)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all duration-300 ${l === lang ? c.tabActive : c.tabInActive}`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center -mt-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center fade-in-up delay-2">
              <h2 className="text-3xl font-extrabold tracking-tight mb-2 transition-colors duration-700">{t.welcome}</h2>
              <p className={`text-sm font-medium transition-colors duration-700 ${c.textSecondary}`}>{t.instruction}</p>
            </div>

            <div className={`p-8 md:p-10 rounded-[2.5rem] border transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 fade-in-up delay-3 ${c.card}`}>
              {step === 1 ? (
                <form onSubmit={handleSendOTP} className="space-y-6">
                  <div className="space-y-2 group/input">
                    <label className={`text-xs font-bold uppercase tracking-widest transition-colors duration-700 ${c.textSecondary}`}>{t.phone_label}</label>
                    <div className="relative">
                      <div className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold transition-colors duration-700 ${c.textSecondary}`}>+91</div>
                      <input 
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="98765 43210"
                        className={`w-full pl-14 pr-4 py-4 rounded-2xl border outline-none transition-all font-bold text-lg group-hover/input:shadow-md ${c.input}`}
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={phone.length !== 10 || loading}
                    className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all duration-300 active:scale-95 flex justify-center items-center h-14 ${c.btnTheme} disabled:opacity-50 hover:shadow-xl relative overflow-hidden group/btn`}
                  >
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span className="relative z-10">{t.send_otp}</span>}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="text-center mb-6">
                    <p className={`text-xs font-bold uppercase tracking-widest mb-1 transition-colors duration-700 ${c.textSecondary}`}>{t.enter_otp}</p>
                    <div className="flex items-center justify-center gap-2">
                      <p className={`font-bold transition-colors duration-700 ${c.textPrimary}`}>+91 {phone}</p>
                      <button type="button" onClick={() => setStep(1)} className={`text-sm hover:underline transition-colors duration-700 ${c.textSecondary}`}>{t.edit}</button>
                    </div>
                  </div>

                  <div className="flex justify-between gap-3">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={otp[index]}
                        onChange={(e) => {
                          const newOtp = [...otp];
                          newOtp[index] = e.target.value.replace(/\D/g, '');
                          setOtp(newOtp);
                          if (e.target.value && index < 3) {
                            document.getElementById(`otp-${index + 1}`)?.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !otp[index] && index > 0) {
                            document.getElementById(`otp-${index - 1}`)?.focus();
                          }
                        }}
                        className={`w-full aspect-square text-center font-extrabold text-3xl rounded-2xl border outline-none transition-all hover:shadow-md focus:-translate-y-1 ${c.input}`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={otp.join("").length !== 4 || loading}
                    className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all duration-300 active:scale-95 flex justify-center items-center h-14 ${c.btnTheme} disabled:opacity-50 hover:shadow-xl relative overflow-hidden group/btn`}
                  >
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span className="relative z-10">{t.verify}</span>}
                  </button>
                </form>
              )}
            </div>
            
            <p className={`text-center text-xs font-semibold opacity-70 transition-colors duration-700 fade-in-up delay-4 ${c.textSecondary}`}>
              By logging in, you agree to KrishiFlow's Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
