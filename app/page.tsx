"use client";
import { useState } from "react";

export default function Home() {
  // Language State: Default Hinglish rakha hai
  const [l, setL] = useState("hinglish");

  // Translation Dictionary
  const t: any = {
    english: {
      nav_title: "SMART FERTILIZER LOGISTICS",
      hero_tag: "Smart E-Token & GPS Tracking",
      hero_h1: "Supply Chain",
      hero_h1_sub: "Direct & Transparent!",
      hero_p: "Discrimination ended with E-tokens, now KrishiFlow will end the wait and expenses!",
      btn_track: "Track E-Token",
      btn_stock: "Live Mandi Stock",
      tracker_title: "Live Supply Tracker",
      step1: "IFFCO Factory",
      step1_sub: "Batch Dispatched",
      step2: "On Way: Bhopal Road",
      step2_sub: "Expected: Tonight 10 PM",
      step3: "Warehouse",
      step3_sub: "Ready for Unloading",
      card1_h: "Trolley Pooling",
      card1_p: "6 farmers from your village are going tomorrow. Share a trolley and save diesel money!",
      card1_sub: "Connect with Village Group",
      card2_h: "Dynamic Diversion",
      card2_p: "If Mandi is overcrowded, we'll divert the truck to another warehouse to avoid lines.",
      card2_sub: "Live Optimization Active",
      card3_h: "Batch Report",
      card3_p: "Scan the bag's QR code to see which factory and quality report it came with. 100% Real!",
      card3_sub: "Scan for Lab Report",
    },
    hindi: {
      nav_title: "स्मार्ट फर्टिलाइजर लॉजिस्टिक्स",
      hero_tag: "स्मार्ट ई-टोकन और जीपीएस ट्रैकिंग",
      hero_h1: "सप्लाई चेन",
      hero_h1_sub: "अब सीधी और साफ़!",
      hero_p: "ई-टोकन से भेदभाव खत्म हुआ, अब कृषि-फ्लो से इंतज़ार और खर्चा खत्म होगा!",
      btn_track: "टोकन ट्रैक करें",
      btn_stock: "लाइव मंडी स्टॉक",
      tracker_title: "लाइव सप्लाई ट्रैकर",
      step1: "इफको फैक्ट्री",
      step1_sub: "बैच रवाना हुआ",
      step2: "रास्ते में: भोपाल रोड",
      step2_sub: "पहुंचेगा: आज रात 10 बजे",
      step3: "वेयरहाउस",
      step3_sub: "अनलोडिंग के लिए तैयार",
      card1_h: "ट्रॉली पूलिंग",
      card1_p: "आपके गाँव के 6 किसान कल खाद लेने जा रहे हैं। साथ में ट्रॉली शेयर करें और डीजल बचाएं!",
      card1_sub: "गाँव के ग्रुप से जुड़ें",
      card2_h: "डायनामिक डाइवर्जन",
      card2_p: "अगर मंडी में भीड़ ज्यादा हुई, तो हम ट्रक को दूसरे वेयरहाउस भेजेंगे ताकि लाइन न लगे।",
      card2_sub: "लाइव ऑप्टिमाइज़ेशन सक्रिय",
      card3_h: "बैच रिपोर्ट",
      card3_p: "बोरी का QR कोड स्कैन करें और देखें कि यह किस फैक्ट्री और क्वालिटी रिपोर्ट के साथ आई है।",
      card3_sub: "लैब रिपोर्ट के लिए स्कैन करें",
    },
    hinglish: {
      nav_title: "SMART FERTILIZER LOGISTICS",
      hero_tag: "Smart E-Token & GPS Tracking",
      hero_h1: "Supply Chain",
      hero_h1_sub: "Ab Seedhi Aur Saaf!",
      hero_p: "E-token se bhed-bhav khatam hua, KrishiFlow se ab intezaar aur kharcha khatam hoga!",
      btn_track: "Track E-Token",
      btn_stock: "Live Mandi Stock",
      tracker_title: "Live Supply Tracker",
      step1: "IFFCO Factory",
      step1_sub: "Batch Dispatched",
      step2: "On Way: Bhopal Road",
      step2_sub: "Expected: Tonight 10 PM",
      step3: "Warehouse",
      step3_sub: "Ready for Unloading",
      card1_h: "Trolley Pooling",
      card1_p: "Aapke gaon ke 6 kisaan kal khaad lene ja rahe hain. Saath mein trolley share karein aur diesel bachayein!",
      card1_sub: "Connect with Village Group",
      card2_h: "Dynamic Diversion",
      card2_p: "Agar Mandi mein bheed zyada hui, toh hum truck ko diverted warehouse par bhejenge taaki line na lage.",
      card2_sub: "Live Optimization Active",
      card3_h: "Batch Report",
      card3_p: "Bori ka QR code scan karke dekhein ki ye kis factory aur quality report ke saath aayi hai. 100% Asli!",
      card3_sub: "Scan for Lab Report",
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] relative overflow-hidden font-sans text-[#2C1802]">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <svg width="100%" height="100%"><defs><pattern id="p" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="30" cy="30" r="1" fill="#2C1802"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-10 flex flex-col min-h-screen">
        
        {/* Language Switcher Buttons */}
        <div className="flex justify-end gap-2 mb-4">
          {["english", "hindi", "hinglish"].map((lang) => (
            <button
              key={lang}
              onClick={() => setL(lang)}
              className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border-2 transition-all ${
                l === lang ? "bg-green-700 text-white border-green-800 shadow-md" : "bg-white text-gray-400 border-gray-100 hover:border-green-200"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Header */}
        <header className="flex justify-between items-center py-6 border-b-4 border-green-800/20 mb-10">
          <div className="flex items-center gap-3">
            <span className="text-5xl">🚜</span>
            <h1 className="text-4xl font-black text-green-900 tracking-tighter uppercase">
              Krishi<span className="text-green-600">Flow</span>
            </h1>
          </div>
          <div className="text-right">
            <div className="bg-green-700 text-white px-5 py-2 rounded-xl font-black text-[10px] shadow-lg mb-1 tracking-widest uppercase">
              {t[l].nav_title}
            </div>
            <p className="text-[10px] font-black text-green-950 uppercase tracking-[0.2em]">Rising Rookies Hackathon 2026</p>
          </div>
        </header>

        {/* Hero Section - FIXED SPACING & Z-INDEX */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-16 relative">
          <div className="space-y-8 z-10">
            <div className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full font-black text-xs uppercase border-2 border-black shadow-[4px_4px_0_black]">
              {t[l].hero_tag} 🛰️
            </div>
            <h2 className="text-6xl md:text-[5.5rem] font-black leading-[0.85] tracking-tighter text-green-950 uppercase">
              {t[l].hero_h1} <br />
              <span className="text-green-600 italic">{t[l].hero_h1_sub}</span>
            </h2>
            <p className="text-2xl text-[#4A3721] font-bold leading-tight max-w-md">
              {t[l].hero_p}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-green-700 hover:bg-green-800 text-white font-black px-10 py-5 rounded-[2rem] text-xl transition-all shadow-xl">
                {t[l].btn_track} 🎫
              </button>
              <button className="bg-white hover:bg-yellow-50 text-green-950 font-black px-10 py-5 rounded-[2rem] text-xl transition-all border-4 border-green-950">
                {t[l].btn_stock} 📊
              </button>
            </div>
          </div>

          {/* Supply Chain Visual Card - POSITION FIXED TO NOT HIDE TEXT */}
          <div className="bg-white p-10 rounded-[4rem] border-4 border-green-950 shadow-2xl relative overflow-hidden lg:ml-auto w-full max-w-md">
            <h4 className="font-black text-green-900 mb-6 uppercase tracking-widest text-center">{t[l].tracker_title}</h4>
            <div className="space-y-8 relative">
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-green-100 z-0"></div>
              
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-white text-xl border-4 border-white shadow-md">🏭</div>
                <div>
                  <p className="font-black text-green-950 uppercase leading-none">{t[l].step1}</p>
                  <p className="text-xs font-bold text-gray-400">{t[l].step1_sub}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black text-xl border-4 border-white shadow-md animate-bounce">🚚</div>
                <div>
                  <p className="font-black text-yellow-600 uppercase leading-none italic underline">{t[l].step2}</p>
                  <p className="text-xs font-bold text-gray-500 italic">{t[l].step2_sub}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 relative z-10 opacity-40">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xl border-4 border-white shadow-md">🏢</div>
                <div>
                  <p className="font-black text-gray-400 uppercase leading-none">{t[l].step3}</p>
                  <p className="text-xs font-bold text-gray-300">{t[l].step3_sub}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solutions Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-[#FEFCE8] p-8 rounded-[3rem] border-4 border-yellow-200 shadow-xl group hover:border-yellow-500 transition-all">
            <div className="text-4xl mb-4">🤝</div>
            <h4 className="font-black text-yellow-950 uppercase mb-2">{t[l].card1_h}</h4>
            <p className="text-sm font-bold text-yellow-800 leading-tight">{t[l].card1_p}</p>
            <div className="mt-4 text-[10px] font-black text-yellow-600 uppercase tracking-widest">{t[l].card1_sub} →</div>
          </div>

          <div className="bg-[#F0FDF4] p-8 rounded-[3rem] border-4 border-green-200 shadow-xl group hover:border-green-600 transition-all">
            <div className="text-4xl mb-4">🛰️</div>
            <h4 className="font-black text-green-950 uppercase mb-2">{t[l].card2_h}</h4>
            <p className="text-sm font-bold text-green-800 leading-tight">{t[l].card2_p}</p>
            <div className="mt-4 text-[10px] font-black text-green-600 uppercase tracking-widest">{t[l].card2_sub}</div>
          </div>

          <div className="bg-[#EFF6FF] p-8 rounded-[3rem] border-4 border-blue-200 shadow-xl group hover:border-blue-600 transition-all">
            <div className="text-4xl mb-4">🔍</div>
            <h4 className="font-black text-blue-950 uppercase mb-2">{t[l].card3_h}</h4>
            <p className="text-sm font-bold text-blue-800 leading-tight">{t[l].card3_p}</p>
            <div className="mt-4 text-[10px] font-black text-blue-600 uppercase tracking-widest">{t[l].card3_sub} →</div>
          </div>
        </div>

        {/* Footer Banner */}
        <div className="mt-auto bg-green-950 text-white p-6 rounded-[2rem] flex items-center justify-around font-black text-[10px] tracking-[0.3em] uppercase italic">
          <span className="text-green-500 underline decoration-yellow-400 decoration-2 underline-offset-4 tracking-tighter italic">Smart Supply Chain</span>
          <span>●</span>
          <span>Zero Waste Management</span>
          <span>●</span>
          <span className="text-yellow-400 italic">Project KrishiFlow 🚀</span>
        </div>
      </div>
    </main>
  );
}