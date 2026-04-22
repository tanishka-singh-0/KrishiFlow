"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const TrackerMap = dynamic(() => import("@/components/TrackerMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-50/10 animate-pulse rounded-2xl">
      <p className="font-medium text-slate-400">Loading Map...</p>
      {/* Global Map Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        .flow-path {
          animation: dash-flow 40s linear infinite;
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -1000; }
        }
      `}} />
    </div>
  ),
});

type Theme = 'light' | 'dark' | 'comfort';

const themeClasses = {
  light: {
    fontBase: "font-sans",
    mainBg: "bg-slate-50",
    gradient: "from-emerald-100/40 via-slate-50 to-slate-50",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-500",
    card: "bg-white/80 backdrop-blur-xl border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
    tabContainer: "bg-slate-200/50 shadow-inner",
    tabInActive: "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50",
    tabActive: "bg-white text-emerald-700 shadow-sm",
    iconBg: "bg-white border-slate-100 shadow-emerald-900/5",
    tagBg: "bg-emerald-50 text-emerald-700 border-emerald-100 shadow-sm hover:bg-emerald-100",
    input: "bg-slate-50 border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/10 text-slate-800 placeholder-slate-400 shadow-sm",
    btnPrimary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20",
    chatUser: "bg-slate-50 border-slate-100 shadow-sm",
    chatAi: "bg-emerald-50/50 border-emerald-100/50 shadow-sm",
    ecoCard: "bg-gradient-to-br from-emerald-50/50 to-teal-50/50 border-emerald-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
    ecoMetric: "bg-white border-emerald-50 shadow-sm hover:shadow-md",
    ecoTag: "bg-emerald-600 text-white shadow-emerald-600/20",
    alertCard: "bg-red-50/50 border-red-100 shadow-lg shadow-red-900/5 hover:shadow-xl hover:shadow-red-900/10",
    mapRing: "ring-slate-200",
    poolCard: "bg-gradient-to-br from-amber-50/50 to-orange-50/50 border-amber-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
    poolBtn: "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20",
    chartCard: "bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border-indigo-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
    portalCard: "bg-gradient-to-br from-blue-50/50 to-sky-50/50 border-blue-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
    portalBtn: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20",
    footer: "bg-white/60 border-slate-200/60 shadow-sm hover:bg-white/80",
    accentEmerald: "text-emerald-600",
    accentAmber: "text-amber-700 bg-amber-50 border-amber-200",
    accentRed: "text-red-700",
    chartBar: "bg-indigo-200/50 hover:bg-indigo-400 text-indigo-600",
    
    headerBorder: "border-slate-200/60",
    pulseDotBase: "bg-amber-400",
    pulseDotCore: "bg-amber-500",
    chatAiText: "text-slate-700",
    progressTrack: "bg-slate-100",
    progressFill: "bg-emerald-500",
    ecoBorder: "border-emerald-100/50",
    alertText: "text-slate-800",
    mapStatusPulse: "text-amber-600",
    avatarR: "bg-emerald-100 text-emerald-700 border-white",
    avatarS: "bg-blue-100 text-blue-700 border-white",
    avatarM: "bg-orange-100 text-orange-700 border-white",
    chartTag: "bg-indigo-600 text-white shadow-indigo-600/20",
    chartBorder: "border-slate-200",
  },
  dark: {
    fontBase: "font-sans",
    mainBg: "bg-slate-950",
    gradient: "from-emerald-900/20 via-slate-950 to-slate-950",
    textPrimary: "text-slate-100",
    textSecondary: "text-slate-400",
    card: "bg-slate-900/80 backdrop-blur-xl border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.8)] hover:border-slate-700",
    tabContainer: "bg-slate-800/50 border border-slate-700",
    tabInActive: "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50",
    tabActive: "bg-slate-700 text-emerald-400 shadow-sm border border-slate-600",
    iconBg: "bg-slate-800 border-slate-700 shadow-black",
    tagBg: "bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700",
    input: "bg-slate-950 border-slate-700 focus:bg-slate-900 focus:border-emerald-500 focus:ring-emerald-500/10 text-slate-100 placeholder-slate-500",
    btnPrimary: "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/10",
    chatUser: "bg-slate-800/50 border-slate-700",
    chatAi: "bg-emerald-900/10 border-emerald-800/30",
    ecoCard: "bg-gradient-to-br from-emerald-900/10 to-teal-900/10 border-emerald-800/30 hover:border-emerald-700/50",
    ecoMetric: "bg-slate-900 border-slate-800 hover:border-emerald-900/50",
    ecoTag: "bg-emerald-900/50 text-emerald-400 border border-emerald-800",
    alertCard: "bg-red-900/10 border-red-800/30 hover:border-red-700/50",
    mapRing: "ring-slate-700",
    poolCard: "bg-gradient-to-br from-amber-900/10 to-orange-900/10 border-amber-800/30 hover:border-amber-700/50",
    poolBtn: "bg-amber-600 text-slate-50 hover:bg-amber-500 shadow-lg shadow-amber-900/20",
    chartCard: "bg-gradient-to-br from-indigo-900/10 to-purple-900/10 border-indigo-800/30 hover:border-indigo-700/50",
    portalCard: "bg-gradient-to-br from-blue-900/10 to-sky-900/10 border-blue-800/30 hover:border-blue-700/50",
    portalBtn: "bg-blue-600 text-slate-50 hover:bg-blue-500 shadow-lg shadow-blue-900/20",
    footer: "bg-slate-900/60 border-slate-800/60 hover:bg-slate-800/80",
    accentEmerald: "text-emerald-400",
    accentAmber: "text-amber-400 bg-amber-900/20 border-amber-800/50",
    accentRed: "text-red-400",
    chartBar: "bg-indigo-900/50 hover:bg-indigo-500 text-indigo-400",

    headerBorder: "border-slate-800/60",
    pulseDotBase: "bg-amber-500",
    pulseDotCore: "bg-amber-400",
    chatAiText: "text-slate-300",
    progressTrack: "bg-slate-800",
    progressFill: "bg-emerald-500",
    ecoBorder: "border-emerald-800/30",
    alertText: "text-slate-200",
    mapStatusPulse: "text-amber-500",
    avatarR: "bg-emerald-900/50 text-emerald-400 border-slate-800",
    avatarS: "bg-blue-900/50 text-blue-400 border-slate-800",
    avatarM: "bg-orange-900/50 text-orange-400 border-slate-800",
    chartTag: "bg-indigo-900/50 text-indigo-400 border border-indigo-800",
    chartBorder: "border-slate-800",
  },
  comfort: {
    fontBase: "font-sans",
    mainBg: "bg-[#FDFBF7]",
    gradient: "from-orange-50/50 via-[#FDFBF7] to-[#FDFBF7]",
    textPrimary: "text-stone-800",
    textSecondary: "text-stone-500",
    card: "bg-white/80 backdrop-blur-xl border-stone-200 shadow-[0_8px_30px_rgb(120,113,108,0.06)] hover:shadow-[0_8px_30px_rgb(120,113,108,0.12)]",
    tabContainer: "bg-stone-200/50 shadow-inner",
    tabInActive: "text-stone-500 hover:text-stone-700 hover:bg-stone-200/50",
    tabActive: "bg-white text-orange-700 shadow-sm border border-stone-200",
    iconBg: "bg-white border-stone-200 shadow-orange-900/5 text-orange-600",
    tagBg: "bg-orange-50 text-orange-700 border-orange-100 shadow-sm hover:bg-orange-100",
    input: "bg-white border-stone-200 focus:bg-white focus:border-orange-500 focus:ring-orange-500/10 text-stone-800 placeholder-stone-400 shadow-sm",
    btnPrimary: "bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-600/20",
    chatUser: "bg-stone-50 border-stone-200 shadow-sm",
    chatAi: "bg-orange-50/50 border-orange-100/50 shadow-sm",
    ecoCard: "bg-gradient-to-br from-orange-50/50 to-amber-50/50 border-orange-100/50 shadow-[0_8px_30px_rgb(120,113,108,0.06)] hover:shadow-[0_8px_30px_rgb(120,113,108,0.12)]",
    ecoMetric: "bg-white border-stone-200 shadow-sm hover:shadow-md",
    ecoTag: "bg-orange-600 text-white shadow-orange-600/20",
    alertCard: "bg-[#FFF5F5] border-[#FFEBEB] text-[#C53030] shadow-[0_8px_30px_rgba(197,48,48,0.08)] hover:border-[#FC8181]",
    mapRing: "ring-stone-200",
    poolCard: "bg-gradient-to-br from-amber-50/50 to-yellow-50/50 border-amber-100/50 shadow-[0_8px_30px_rgb(120,113,108,0.06)] hover:shadow-[0_8px_30px_rgb(120,113,108,0.12)]",
    poolBtn: "bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-600/20",
    chartCard: "bg-gradient-to-br from-rose-50/50 to-orange-50/50 border-rose-100/50 shadow-[0_8px_30px_rgb(120,113,108,0.06)] hover:shadow-[0_8px_30px_rgb(120,113,108,0.12)]",
    portalCard: "bg-gradient-to-br from-stone-100/50 to-stone-50/50 border-stone-200/50 shadow-[0_8px_30px_rgb(120,113,108,0.06)] hover:shadow-[0_8px_30px_rgb(120,113,108,0.12)]",
    portalBtn: "bg-stone-700 text-white hover:bg-stone-800 shadow-lg shadow-stone-700/20",
    footer: "bg-white/60 border-stone-200/60 shadow-sm hover:bg-white/80",
    accentEmerald: "text-orange-600",
    accentAmber: "text-amber-700 bg-amber-50 border-amber-200",
    accentRed: "text-red-700",
    chartBar: "bg-rose-200/50 hover:bg-rose-400 text-rose-600",

    headerBorder: "border-stone-200/60",
    pulseDotBase: "bg-amber-400",
    pulseDotCore: "bg-amber-500",
    chatAiText: "text-stone-700",
    progressTrack: "bg-stone-200",
    progressFill: "bg-orange-500",
    ecoBorder: "border-orange-100/50",
    alertText: "text-[#C53030]",
    mapStatusPulse: "text-orange-600",
    avatarR: "bg-orange-100 text-orange-700 border-white",
    avatarS: "bg-stone-100 text-stone-700 border-white",
    avatarM: "bg-amber-100 text-amber-700 border-white",
    chartTag: "bg-rose-600 text-white shadow-rose-600/20",
    chartBorder: "border-stone-200",
  }
};

export default function Home() {
  // Auth guard removed to keep the prototype simple


  const [l, setL] = useState("hinglish");
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');
  
  const [textInput, setTextInput] = useState("");
  const [input, setInput] = useState("");
  const [res, setRes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [progress, setProgress] = useState(0);
  const [trackingStatus, setTrackingStatus] = useState<'normal' | 'alerting' | 'rerouted'>('normal');
  const [insight, setInsight] = useState("");
  const [isInsightLoading, setIsInsightLoading] = useState(false);
  const [co2Saved, setCo2Saved] = useState(1240);
  const [fuelSaved, setFuelSaved] = useState(450);
  const [weather, setWeather] = useState<any>(null);

  const t: any = {
    english: {
      nav_title: "SMART FERTILIZER LOGISTICS",
      hackathon: "Smart Fertilizer Supply Chain",
      assistant_tag: "Supply Chain AI",
      assistant_h2: "Logistics Assistant",
      assistant_p: "Query live truck routes, warehouse inventory, or delivery ETAs",
      assistant_placeholder: "e.g. Where is Truck MP-04?",
      btn_send: "Send",
      you_asked: "You asked:",
      ai_reply_title: "KrishiFlow AI:",
      ai_loading: "Analyzing data...",
      ai_error: "Connection issue! Please try again.",
      tracker_title: "Dynamic Supply Chain Optimization",
      step1: "Godown Factory",
      step1_sub: "Urea Fertilizer (50kg)",
      pool_title: "Trolley Pooling",
      pool_desc: "3 farmers from your village are going to Warehouse A today. Share a trolley to save diesel and reduce transport costs!",
      pool_btn: "Connect & Pool",
      chart_title: "Predictive Demand",
      chart_desc: "AI forecasts a 40% surge in Urea demand by Week 3 due to expected rainfall. Supply chain is pre-adjusted.",
      eco_title: "Live Eco-Score Tracker",
      eco_desc: "Monitoring emissions reduced via AI-optimized routing & Trolley pooling.",
      co2_label: "CO2 Emissions Prevented",
      fuel_label: "Diesel Fuel Saved",
      eco_tagline: "🌱 Smart Routing. Shared Rides. Greener Farms.",
      etoken_h: "Government E-Token",
      etoken_p: "Access official agriculture portals, apply for subsidies, and generate E-Tokens.",
      btn_portal: "Check Portal →",
      footer1: "AI Assistant",
      footer2: "Zero Wait Time",
      footer3: "KrishiFlow",
      chain_tag: "Anti-Black Market",
      chain_title: "Blockchain Traceability",
      chain_desc: "Verify the authenticity and transit history of your fertilizer batch to prevent adulteration.",
      chain_batch: "Batch ID",
      chain_step1: "Factory Dispatch",
      chain_step1_sub: "Bhopal Plant • 08:30 AM",
      chain_step2: "In Transit",
      chain_step2_sub: "Truck #MP04-TX-9921 • Verified GPS",
      chain_step3: "Pending Arrival",
      chain_step3_sub: "Warehouse B",
      chain_btn: "View Crypto Ledger",
      engine_tag: "Real-Time Diagnostics",
      engine_title: "Logistics AI Engine",
      engine_desc: "Monitoring routing efficiency, fleet connectivity, and dynamic anomaly detection.",
      feat1_title: "Live Dashboard",
      feat1_nodes: "3/3 Nodes Online",
      feat1_desc: "Centralized view of every fertilizer bag moving in the system.",
      feat1_stat1: "Total Active Trucks",
      feat1_stat2: "Volume Tracked",
      feat2_title: "Route Optimization",
      feat2_tag: "GPS SYNCED",
      feat2_desc: "Using GPS algorithms to find the shortest, fuel-efficient paths for delivery trucks.",
      feat2_stat: "Path Efficiency",
      feat3_title: "Dynamic Rerouting",
      feat3_desc: "If a logistics issue occurs, the system reroutes supply instantly to minimize delay.",
      feat3_stat: "Current Status",
      feat3_msg1: "No anomalies detected in transit.",
      feat3_msg2: "Rerouting Truck MP-04 to Warehouse B!"
    },
    hindi: {
      nav_title: "स्मार्ट फर्टिलाइजर लॉजिस्टिक्स",
      hackathon: "स्मार्ट फर्टिलाइजर सप्लाई चेन",
      assistant_tag: "सप्लाई चेन AI",
      assistant_h2: "लॉजिस्टिक्स असिस्टेंट",
      assistant_p: "ट्रक का रूट, गोदाम का स्टॉक या डिलीवरी ETA पूछें",
      assistant_placeholder: "जैसे: ट्रक MP-04 कहाँ है?",
      btn_send: "भेजें",
      you_asked: "आपका सवाल:",
      ai_reply_title: "कृषि-फ्लो AI:",
      ai_loading: "डेटा का विश्लेषण कर रहा है...",
      ai_error: "कनेक्शन समस्या! कृपया पुनः प्रयास करें।",
      tracker_title: "डायनामिक सप्लाई चैन ऑप्टिमाइजेशन",
      step1: "गोदाम फैक्ट्री",
      step1_sub: "यूरिया खाद (50kg)",
      pool_title: "ट्रॉली शेयरिंग",
      pool_desc: "आपके गांव के 3 किसान आज गोदाम जा रहे हैं। ट्रॉली शेयर करें और ट्रांसपोर्ट का खर्च बचाएं!",
      pool_btn: "संपर्क करें",
      chart_title: "अनुमानित मांग",
      chart_desc: "AI के अनुसार बारिश के कारण तीसरे सप्ताह में यूरिया की मांग 40% बढ़ेगी। सप्लाई चेन को पहले ही तैयार कर लिया गया है।",
      eco_title: "लाइव इको-स्कोर ट्रैकर",
      eco_desc: "AI रूटिंग और ट्रॉली पूलिंग द्वारा कम किए गए प्रदूषण की निगरानी।",
      co2_label: "CO2 उत्सर्जन रोका गया",
      fuel_label: "डीजल ईंधन बचाया गया",
      eco_tagline: "🌱 स्मार्ट रूटिंग. शेयर्ड राइड्स. हरे-भरे खेत।",
      etoken_h: "सरकारी ई-टोकन",
      etoken_p: "आधिकारिक कृषि पोर्टल पर जाएं, सब्सिडी के लिए आवेदन करें और ई-टोकन बनाएं।",
      btn_portal: "पोर्टल देखें →",
      footer1: "एआई असिस्टेंट",
      footer2: "जीरो वेट टाइम",
      footer3: "कृषि-फ्लो",
      chain_tag: "कालाबाजारी रोकथाम",
      chain_title: "ब्लॉकचेन ट्रैसबिलिटी",
      chain_desc: "मिलावट रोकने के लिए अपने उर्वरक बैच की प्रामाणिकता और पारगमन इतिहास की पुष्टि करें।",
      chain_batch: "बैच ID",
      chain_step1: "फैक्ट्री से रवाना",
      chain_step1_sub: "भोपाल प्लांट • 08:30 AM",
      chain_step2: "रास्ते में",
      chain_step2_sub: "ट्रक #MP04-TX-9921 • सत्यापित GPS",
      chain_step3: "पहुंचने वाला है",
      chain_step3_sub: "गोदाम B",
      chain_btn: "क्रिप्टो लेज़र देखें",
      engine_tag: "रीयल-टाइम डायग्नोस्टिक्स",
      engine_title: "लॉजिस्टिक्स AI इंजन",
      engine_desc: "रूटिंग दक्षता, ट्रकों की कनेक्टिविटी और डायनामिक विसंगति का पता लगाना।",
      feat1_title: "लाइव डैशबोर्ड",
      feat1_nodes: "3/3 नोड्स ऑनलाइन",
      feat1_desc: "सिस्टम में चलने वाले प्रत्येक उर्वरक बैग का लाइव दृश्य।",
      feat1_stat1: "कुल सक्रिय ट्रक",
      feat1_stat2: "ट्रैक किया गया वॉल्यूम",
      feat2_title: "रूट ऑप्टिमाइजेशन",
      feat2_tag: "GPS सिंक",
      feat2_desc: "डिलीवरी ट्रकों के लिए सबसे छोटे और ईंधन बचाने वाले रास्ते खोजने के लिए GPS का उपयोग।",
      feat2_stat: "पथ दक्षता",
      feat3_title: "डायनामिक रीरूटिंग",
      feat3_desc: "यदि कोई लॉजिस्टिक्स समस्या आती है, तो देरी को कम करने के लिए सिस्टम तुरंत रास्ता बदल देता है।",
      feat3_stat: "वर्तमान स्थिति",
      feat3_msg1: "रास्ते में सब सामान्य है।",
      feat3_msg2: "ट्रक MP-04 को गोदाम B की ओर मोड़ा जा रहा है!"
    },
    hinglish: {
      nav_title: "SMART FERTILIZER LOGISTICS",
      hackathon: "Smart Fertilizer Supply Chain",
      assistant_tag: "Supply Chain AI",
      assistant_h2: "Logistics Assistant",
      assistant_p: "Truck routes, warehouse stock, ya delivery ETA ke baare mein puchiye",
      assistant_placeholder: "Jaise: Truck MP-04 kahan hai?",
      btn_send: "Send",
      you_asked: "Aapne pucha:",
      ai_reply_title: "KrishiFlow AI:",
      ai_loading: "Data analyze ho raha hai...",
      ai_error: "Connection issue! Phir se try karein.",
      tracker_title: "Dynamic Supply Chain Optimization",
      step1: "Godown Factory",
      step1_sub: "Urea Fertilizer (50kg)",
      pool_title: "Trolley Sharing",
      pool_desc: "Aapke gaon ke 3 kisan aaj Warehouse ja rahe hain. Trolley share karein aur diesel bachayein!",
      pool_btn: "Connect Karein",
      chart_title: "Predictive Demand",
      chart_desc: "AI ke hisaab se Week 3 mein barish ki wajah se Urea ki demand 40% badhegi. Supply chain ready hai.",
      eco_title: "Live Eco-Score Tracker",
      eco_desc: "AI routing aur Trolley pooling se kam hue pollution ka track.",
      co2_label: "CO2 Emissions Bachaye",
      fuel_label: "Diesel Bachaya",
      eco_tagline: "🌱 Smart Routing. Shared Rides. Hare-bhare Khet.",
      etoken_h: "Government E-Token",
      etoken_p: "Official agriculture portal access karein, subsidy apply karein aur E-Token banayein.",
      btn_portal: "Portal Check Karein →",
      footer1: "AI Assistant",
      footer2: "Zero Wait Time",
      footer3: "KrishiFlow",
      chain_tag: "Anti-Black Market",
      chain_title: "Blockchain Traceability",
      chain_desc: "Milawat rokne ke liye apne fertilizer batch ki sachai aur transit history verify karein.",
      chain_batch: "Batch ID",
      chain_step1: "Factory Se Nikla",
      chain_step1_sub: "Bhopal Plant • 08:30 AM",
      chain_step2: "Raaste Mein",
      chain_step2_sub: "Truck #MP04-TX-9921 • Verified GPS",
      chain_step3: "Pahunchne Wala Hai",
      chain_step3_sub: "Warehouse B",
      chain_btn: "Crypto Ledger Dekhein",
      engine_tag: "Real-Time Diagnostics",
      engine_title: "Logistics AI Engine",
      engine_desc: "Routing efficiency, truck connectivity, aur problems ko live monitor karna.",
      feat1_title: "Live Dashboard",
      feat1_nodes: "3/3 Nodes Online",
      feat1_desc: "System mein chalne wale har fertilizer bag ki live detail.",
      feat1_stat1: "Total Active Trucks",
      feat1_stat2: "Volume Tracked",
      feat2_title: "Route Optimization",
      feat2_tag: "GPS SYNCED",
      feat2_desc: "Delivery trucks ke liye sabse chote aur fuel bachane wale raste nikalna.",
      feat2_stat: "Path Efficiency",
      feat3_title: "Dynamic Rerouting",
      feat3_desc: "Agar koi logistics problem aati hai, toh system delay kam karne ke liye turant route badal deta hai.",
      feat3_stat: "Current Status",
      feat3_msg1: "Raaste mein sab normal hai.",
      feat3_msg2: "Truck MP-04 ko Warehouse B bhej rahe hain!"
    }
  };

  const generateInsight = async () => {
    // Prevent spamming the API every 40 seconds! Saves Quota.
    if (insight !== "" && !insight.includes("Offline Fallback")) {
      return; 
    }

    setIsInsightLoading(true);
    setInsight("");
    try {
      const prompt = "Act as an AI Supply Chain manager. Write a 2-sentence alert stating that an urgent fertilizer shortage was detected at Warehouse B and the current delivery was dynamically rerouted to prevent a bottleneck. Be professional and concise.";
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      
      // If the backend threw the chat-specific offline error, replace it with a logistics-specific one
      if (data.text.includes("Offline Mode Active")) {
        setInsight("⚠️ URGENT ALERT (Offline Fallback): Severe shortage of 50T UREA detected at Warehouse B. Truck #MP04-TX-9921 has been dynamically rerouted from Vidisha to Sehore to prevent supply chain bottleneck.");
      } else {
        setInsight(data.text);
      }
    } catch (err) {
      setInsight("⚠️ URGENT ALERT (Offline Fallback): Severe shortage of 50T UREA detected at Warehouse B. Truck #MP04-TX-9921 has been dynamically rerouted from Vidisha to Sehore to prevent supply chain bottleneck.");
    } finally {
      setIsInsightLoading(false);
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=23.2599&longitude=77.4126&current_weather=true&daily=precipitation_probability_max&timezone=Asia%2FKolkata");
        const data = await res.json();
        setWeather({ 
          current: data.current_weather, 
          rainProb: data.daily?.precipitation_probability_max?.[0] || 0 
        });
      } catch (err) {
        console.error("Failed to fetch weather", err);
      }
    };
    fetchWeather();

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev >= 100 ? 0 : prev + 5; 
        if (next === 40) {
          setTrackingStatus('alerting');
          generateInsight();
        } else if (next === 50) {
          setTrackingStatus('rerouted');
        } else if (next === 0) {
          setTrackingStatus('normal');
          setInsight("");
        }
        return next;
      });
    }, 2000);

    const ecoTimer = setInterval(() => {
      setCo2Saved((prev) => prev + 2);
      setFuelSaved((prev) => prev + 0.5);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(ecoTimer);
    };
  }, []);

  const handleSend = () => {
    if (!textInput.trim()) return;
    setInput(textInput);
    askKrishiAI(textInput);
    setTextInput("");
  };

  const askKrishiAI = async (textInput: string) => {
    setRes(t[l].ai_loading);
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textInput }),
      });
      const data = await response.json();
      setRes(data.text);
    } catch (err) {
      setRes(t[l].ai_error);
    } finally {
      setIsLoading(false);
    }
  };

  const c = themeClasses[currentTheme];

  return (
    <main className={`min-h-screen ${c.mainBg} relative overflow-hidden ${c.fontBase} transition-colors duration-700`}>
      <div className={`absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${c.gradient} pointer-events-none transition-colors duration-700`}></div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-10 flex flex-col min-h-screen">
        
        {/* Header with Theme & Language Tabs */}
        <header className={`flex flex-col md:flex-row md:justify-between md:items-center pb-8 border-b border-opacity-60 mb-12 gap-6 group cursor-default transition-colors duration-700 ${c.headerBorder}`}>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 border ${c.iconBg}`}>
              🚜
            </div>
            <div>
              <h1 className={`text-4xl font-extrabold tracking-tight transition-colors duration-300 ${c.textPrimary}`}>
                Krishi<span className={c.accentEmerald}>Flow</span>
              </h1>
              <p className={`text-[10px] font-semibold uppercase tracking-widest mt-1 hidden md:block ${c.textSecondary}`}>{t[l].hackathon}</p>
            </div>
          </div>
          
          <div className="flex flex-col-reverse items-end md:flex-row md:items-center gap-4 md:gap-4">
            <a 
              href="https://evikas.mpkrishi.mp.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-[10px] tracking-wider uppercase border shadow-sm transition-all hover:scale-105 active:scale-95 ${c.tagBg} hover:bg-emerald-500 hover:text-white hover:border-emerald-500 dark:hover:bg-emerald-600 dark:hover:text-white`}
            >
              🏛️ {t[l].etoken_h}
            </a>
            
            {/* Theme Switcher Tabs */}
            <div className={`rounded-full p-1 inline-flex items-center transition-all ${c.tabContainer}`}>
              {[
                { id: 'light', icon: '☀️' },
                { id: 'dark', icon: '🌙' },
                { id: 'comfort', icon: '☕' }
              ].map((th) => (
                <button
                  key={th.id}
                  onClick={() => setCurrentTheme(th.id as Theme)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                    currentTheme === th.id 
                      ? c.tabActive 
                      : c.tabInActive
                  }`}
                  title={`${th.id} mode`}
                >
                  {th.icon}
                </button>
              ))}
            </div>

            {/* Language Switcher Tabs */}
            <div className={`rounded-full p-1 inline-flex items-center transition-all ${c.tabContainer}`}>
              {["english", "hindi", "hinglish"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setL(lang)}
                  className={`px-5 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all duration-300 ${
                    l === lang 
                      ? c.tabActive 
                      : c.tabInActive
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-10 w-full max-w-5xl mx-auto mb-16">
          
          {/* Main Top Features */}
          <div className="w-full space-y-10">
            <div className={`p-8 md:p-10 rounded-[2rem] border transition-all duration-500 ${c.card}`}>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-xs uppercase border mb-6 ${c.accentAmber}`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${c.pulseDotBase}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${c.pulseDotCore}`}></span>
                </span>
                {t[l].assistant_tag}
              </div>
              <h2 className={`text-4xl font-extrabold tracking-tight mb-2 ${c.textPrimary}`}>
                {t[l].assistant_h2}
              </h2>
              <p className={`text-sm font-medium mb-8 ${c.textSecondary}`}>{t[l].assistant_p}</p>
              
              <div className="flex flex-col gap-4 mb-8">
                {/* Text Input */}
                <div className="relative w-full group/input">
                  <input 
                    type="text" 
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t[l].assistant_placeholder}
                    className={`w-full px-6 py-5 rounded-[1.5rem] border outline-none transition-all text-lg ${c.input}`}
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !textInput.trim()}
                    className={`absolute right-2 top-2 bottom-2 px-6 rounded-xl font-bold uppercase transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2 active:scale-95 group/btn ${c.btnPrimary}`}
                  >
                    <span className="text-sm tracking-wide">{t[l].btn_send}</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {input && (
                  <div className={`p-6 rounded-[1.5rem] border transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 ${c.chatUser}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${c.textSecondary}`}>{t[l].you_asked}</p>
                    <p className={`font-semibold text-lg ${c.textPrimary}`}>"{input}"</p>
                  </div>
                )}
                
                {res && (
                  <div className={`p-6 rounded-[1.5rem] border flex gap-5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 ${c.chatAi}`}>
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl border ${c.iconBg} ${isLoading ? 'animate-pulse' : ''}`}>
                        ✨
                      </div>
                    </div>
                    <div>
                      <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${c.accentEmerald}`}>{t[l].ai_reply_title}</p>
                      <p className={`whitespace-pre-wrap font-medium text-base leading-relaxed ${c.chatAiText}`}>{res}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* LIVE CARBON FOOTPRINT TRACKER - HIDDEN */}
            {false && (
            <div className={`p-8 md:p-10 rounded-[2rem] border group/eco transition-all duration-500 ${c.ecoCard}`}>
              <div className="flex justify-between items-start mb-8">
                <div className={`text-4xl w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover/eco:scale-110 group-hover/eco:rotate-12 ${c.iconBg}`}>🌿</div>
                <div className="flex flex-col items-end">
                  <div className={`px-4 py-1.5 rounded-full font-bold text-[10px] uppercase mb-1.5 ${c.ecoTag}`}>
                    UN SDG #13
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${c.accentEmerald}`}>Climate Action</span>
                </div>
              </div>
              <h4 className={`text-2xl font-extrabold tracking-tight mb-2 ${c.textPrimary}`}>{t[l].eco_title}</h4>
              <p className={`text-sm font-medium mb-8 ${c.textSecondary}`}>{t[l].eco_desc}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Metric 1 */}
                <div className={`p-6 rounded-2xl border relative overflow-hidden group/metric transition-all ${c.ecoMetric}`}>
                  <div className="absolute -top-2 -right-2 p-4 opacity-[0.03] text-7xl transition-transform duration-700 group-hover/metric:scale-125 group-hover/metric:-rotate-12">☁️</div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${c.accentEmerald}`}>{t[l].co2_label}</p>
                  <p className={`text-4xl font-extrabold tracking-tighter transition-all ${c.textPrimary}`}>{co2Saved.toLocaleString()} <span className={`text-lg font-semibold ${c.textSecondary}`}>kg</span></p>
                  <div className={`mt-5 w-full rounded-full h-2 overflow-hidden ${c.progressTrack}`}>
                    <div className={`h-full rounded-full transition-all duration-1000 ease-out ${c.progressFill}`} style={{ width: `${Math.min(100, (co2Saved / 2000) * 100)}%` }}></div>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className={`p-6 rounded-2xl border relative overflow-hidden group/metric transition-all ${c.ecoMetric}`}>
                  <div className="absolute -top-2 -right-2 p-4 opacity-[0.03] text-7xl transition-transform duration-700 group-hover/metric:scale-125 group-hover/metric:rotate-12">⛽</div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${c.accentEmerald}`}>{t[l].fuel_label}</p>
                  <p className={`text-4xl font-extrabold tracking-tighter transition-all ${c.textPrimary}`}>{fuelSaved.toFixed(1)} <span className={`text-lg font-semibold ${c.textSecondary}`}>L</span></p>
                  <div className={`mt-5 w-full rounded-full h-2 overflow-hidden ${c.progressTrack}`}>
                    <div className={`h-full rounded-full transition-all duration-1000 ease-out ${c.progressFill}`} style={{ width: `${Math.min(100, (fuelSaved / 1000) * 100)}%` }}></div>
                  </div>
                </div>
              </div>

              <div className={`mt-8 pt-6 border-t text-center ${c.ecoBorder}`}>
                <p className={`text-xs font-semibold tracking-wide ${c.accentEmerald}`}>{t[l].eco_tagline}</p>
              </div>
            </div>
            )}

            {/* BLOCKCHAIN TRACEABILITY (Anti-Black Market) */}
            <div className={`p-8 md:p-10 rounded-[2rem] border group/chain transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${c.card}`}>
              <div className="flex justify-between items-start mb-6">
                <div className={`text-4xl w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover/chain:scale-110 ${c.iconBg}`}>🛡️</div>
                <div className={`px-3 py-1.5 rounded-full font-bold text-[10px] uppercase shadow-sm ${c.accentEmerald}`}>
                  {t[l].chain_tag}
                </div>
              </div>
              <h4 className={`text-2xl font-extrabold tracking-tight mb-2 ${c.textPrimary}`}>{t[l].chain_title}</h4>
              <p className={`text-sm font-medium mb-8 ${c.textSecondary}`}>{t[l].chain_desc}</p>
              
              <div className={`p-5 rounded-2xl border bg-slate-50/50 dark:bg-black/20 ${c.ecoBorder}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${c.textSecondary}`}>{t[l].chain_batch}</span>
                  <span className={`text-xs font-mono font-bold ${c.textPrimary}`}>#UREA-MP-9842</span>
                </div>
                
                <div className="relative pl-4 space-y-4 before:absolute before:inset-y-2 before:left-[7px] before:w-0.5 before:bg-emerald-500/20">
                  <div className="relative">
                    <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${c.accentEmerald}`}>{t[l].chain_step1}</p>
                    <p className={`text-xs font-semibold mt-1 ${c.textSecondary}`}>{t[l].chain_step1_sub}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${c.accentEmerald}`}>{t[l].chain_step2}</p>
                    <p className={`text-xs font-semibold mt-1 ${c.textSecondary}`}>{t[l].chain_step2_sub}</p>
                  </div>
                  <div className="relative">
                    <div className={`absolute -left-[19px] top-1 w-3 h-3 rounded-full border-2 border-emerald-500 ${c.iconBg}`}></div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${c.textSecondary}`}>{t[l].chain_step3}</p>
                    <p className={`text-xs font-semibold mt-1 ${c.textSecondary}`}>{t[l].chain_step3_sub}</p>
                  </div>
                </div>

                <button 
                  className={`w-full mt-6 px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-wider transition-all duration-300 active:scale-95 border border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 ${c.accentEmerald}`}
                  onClick={() => alert('View full blockchain ledger hash: 0x8f2a...9c4e ✅')}
                >
                  {t[l].chain_btn}
                </button>
              </div>
            </div>


          {/* Main Bottom Features */}
          <div className="w-full space-y-10">
            
            {/* AI Insights Panel */}
            {(trackingStatus === 'alerting' || trackingStatus === 'rerouted') && (
              <div className={`p-6 rounded-[2rem] border relative transition-all duration-500 animate-in fade-in slide-in-from-top-4 hover:-translate-y-1 ${c.alertCard}`}>
                <div className="absolute -top-4 -right-4 bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full text-xl shadow-lg shadow-red-500/30 animate-pulse">🚨</div>
                <h4 className={`font-bold mb-2 flex items-center gap-2 text-xs tracking-widest uppercase ${c.accentRed}`}>
                  <span>🧠</span> AI Supply Chain Insight
                </h4>
                {isInsightLoading ? (
                  <p className={`font-medium text-sm animate-pulse ${c.accentRed}`}>Analyzing transit data...</p>
                ) : (
                  <p className={`font-semibold text-sm leading-relaxed ${c.alertText}`}>{insight}</p>
                )}
              </div>
            )}

            {/* Live Delivery Leaflet Map */}
            <div className={`p-8 rounded-[2rem] border relative overflow-hidden w-full h-[500px] flex flex-col transition-all duration-500 group/map ${c.card}`}>
              <h4 className={`font-bold mb-5 uppercase tracking-widest text-center text-xs transition-colors ${trackingStatus === 'normal' ? c.textSecondary : c.accentRed}`}>{t[l].tracker_title}</h4>
              
              <div className={`flex-1 w-full rounded-[1.5rem] overflow-hidden relative transition-all duration-500 ring-1 shadow-inner ${trackingStatus === 'normal' ? c.mapRing : 'ring-red-300 dark:ring-red-900'}`}>
                {/* Leaflet Map Integration */}
                <div className="absolute inset-0 z-0">
                  <TrackerMap progress={progress} status={trackingStatus} theme={currentTheme} />
                </div>
              </div>
              
              <div className="mt-5 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span className={`transition-colors px-3 py-1.5 rounded-full ${trackingStatus === 'normal' ? c.tagBg : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                  {progress}% Completed
                </span>
                <span className={`${c.mapStatusPulse} animate-pulse`}>
                  {trackingStatus === 'normal' ? 'IN TRANSIT TO WAREHOUSE A' : trackingStatus === 'alerting' ? 'DETECTING SHORTAGE...' : 'REROUTED TO WAREHOUSE B'}
                </span>
              </div>
            </div>

            {/* LOGISTICS AI ENGINE */}
            <div className={`p-8 md:p-10 rounded-[2rem] border group/engine transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${c.card}`}>
              <div className="flex justify-between items-start mb-6">
                <div className={`text-4xl w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover/engine:scale-110 ${c.iconBg}`}>⚙️</div>
                <div className={`px-3 py-1.5 rounded-full font-bold text-[10px] uppercase shadow-sm ${c.accentEmerald}`}>
                  {t[l].engine_tag}
                </div>
              </div>
              <h4 className={`text-2xl font-extrabold tracking-tight mb-2 ${c.textPrimary}`}>{t[l].engine_title}</h4>
              <p className={`text-sm font-medium mb-8 ${c.textSecondary}`}>{t[l].engine_desc}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Feature 1: Live Dashboard */}
                <div className={`p-5 rounded-2xl border ${c.ecoBorder} bg-slate-50/50 dark:bg-black/20 relative overflow-hidden group/feat1 transition-all`}>
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-6xl group-hover/feat1:scale-110 transition-transform">📊</div>
                  <div className="flex justify-between items-center mb-3">
                    <h5 className={`font-bold flex items-center gap-2 ${c.textPrimary}`}>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                      {t[l].feat1_title}
                    </h5>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${c.accentEmerald}`}>{t[l].feat1_nodes}</span>
                  </div>
                  <p className={`text-xs font-semibold mb-3 ${c.textSecondary}`}>{t[l].feat1_desc}</p>
                  <div className="flex justify-between items-end border-t pt-3 border-emerald-500/10">
                    <div>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${c.textSecondary}`}>{t[l].feat1_stat1}</p>
                      <p className={`font-bold font-mono text-lg ${c.textPrimary}`}>03</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${c.textSecondary}`}>{t[l].feat1_stat2}</p>
                      <p className={`font-bold font-mono text-lg ${c.textPrimary}`}>150 Tons</p>
                    </div>
                  </div>
                </div>

                {/* Feature 2: Route Optimization */}
                <div className={`p-5 rounded-2xl border ${c.ecoBorder} bg-slate-50/50 dark:bg-black/20 relative overflow-hidden group/feat2 transition-all`}>
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-6xl group-hover/feat2:scale-110 transition-transform">📍</div>
                  <div className="flex justify-between items-center mb-3">
                    <h5 className={`font-bold ${c.textPrimary}`}>{t[l].feat2_title}</h5>
                    <span className={`text-[10px] font-bold uppercase tracking-widest bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded`}>{t[l].feat2_tag}</span>
                  </div>
                  <p className={`text-xs font-semibold mb-4 ${c.textSecondary}`}>{t[l].feat2_desc}</p>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className={c.textSecondary}>{t[l].feat2_stat}</span>
                      <span className={c.accentEmerald}>98%</span>
                    </div>
                    <div className={`w-full rounded-full h-1.5 overflow-hidden ${c.progressTrack}`}>
                      <div className={`h-full rounded-full transition-all duration-1000 ease-out ${c.progressFill}`} style={{ width: '98%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Feature 3: Dynamic Rerouting */}
                <div className={`p-5 rounded-2xl border transition-all ${trackingStatus === 'alerting' || trackingStatus === 'rerouted' ? 'border-red-500/50 bg-red-50/50 dark:bg-red-950/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : `${c.ecoBorder} bg-slate-50/50 dark:bg-black/20`}`}>
                  <div className="flex justify-between items-center mb-3">
                    <h5 className={`font-bold ${c.textPrimary}`}>{t[l].feat3_title}</h5>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border transition-colors duration-500 ${trackingStatus === 'alerting' || trackingStatus === 'rerouted' ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800 animate-pulse' : 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'}`}>
                      {trackingStatus === 'alerting' || trackingStatus === 'rerouted' ? 'ACTIVE' : 'STANDBY'}
                    </span>
                  </div>
                  <p className={`text-xs font-semibold mb-3 ${c.textSecondary}`}>{t[l].feat3_desc}</p>
                  
                  <div className={`p-3 rounded-xl border flex items-center gap-3 transition-colors duration-500 ${trackingStatus === 'alerting' || trackingStatus === 'rerouted' ? 'bg-red-100/50 border-red-200 dark:bg-red-900/20 dark:border-red-800' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${trackingStatus === 'alerting' || trackingStatus === 'rerouted' ? 'bg-red-500 text-white animate-bounce' : 'bg-slate-200 dark:bg-slate-800'}`}>
                      {trackingStatus === 'alerting' || trackingStatus === 'rerouted' ? '🚨' : '✅'}
                    </div>
                    <div>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${trackingStatus === 'alerting' || trackingStatus === 'rerouted' ? 'text-red-600 dark:text-red-400' : c.textSecondary}`}>{t[l].feat3_stat}</p>
                      <p className={`text-xs font-semibold ${c.textPrimary}`}>
                        {trackingStatus === 'normal' ? t[l].feat3_msg1 : t[l].feat3_msg2}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 4: Predictive Demand */}
                <div className={`p-5 rounded-2xl border ${c.ecoBorder} bg-slate-50/50 dark:bg-black/20 relative overflow-hidden group/feat4 transition-all`}>
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-6xl group-hover/feat4:scale-110 transition-transform">📊</div>
                  <div className="flex justify-between items-center mb-3">
                    <h5 className={`font-bold ${c.textPrimary}`}>{t[l].chart_title}</h5>
                    <span className={`text-[10px] font-bold uppercase tracking-widest bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 px-2 py-0.5 rounded`}>AI FORECAST</span>
                  </div>
                  <p className={`text-xs font-semibold mb-4 ${c.textSecondary}`}>{t[l].chart_desc}</p>
                  
                  {/* Miniature CSS Bar Chart */}
                  <div className={`flex items-end justify-between h-20 gap-2 mt-2 border-b pb-2 ${c.chartBorder}`}>
                    <div className="flex flex-col items-center flex-1 group/bar">
                      <div className={`w-full rounded-t-md h-[40%] ${c.chartBar}`}></div>
                      <span className={`text-[8px] font-bold mt-1 ${c.textSecondary}`}>W1</span>
                    </div>
                    <div className="flex flex-col items-center flex-1 group/bar">
                      <div className={`w-full rounded-t-md h-[60%] ${c.chartBar}`}></div>
                      <span className={`text-[8px] font-bold mt-1 ${c.textSecondary}`}>W2</span>
                    </div>
                    <div className="flex flex-col items-center flex-1 group/bar relative">
                      <div className="absolute -top-5 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm shadow-red-500/20 animate-pulse">PEAK</div>
                      <div className="w-full bg-red-400 dark:bg-red-500/80 rounded-t-md h-[90%] shadow-sm"></div>
                      <span className={`text-[8px] font-bold mt-1 ${c.accentRed}`}>W3</span>
                    </div>
                    <div className="flex flex-col items-center flex-1 group/bar">
                      <div className={`w-full rounded-t-md h-[30%] ${c.chartBar}`}></div>
                      <span className={`text-[8px] font-bold mt-1 ${c.textSecondary}`}>W4</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
            {/* Extra Cards - HIDDEN TO KEEP PROTOTYPE SIMPLE */}
            {false && (
              <>
            {/* Live Weather Widget */}
            <div className={`p-8 rounded-[2rem] border group/weather transition-all duration-500 hover:-translate-y-1 ${c.card}`}>
              <div className="flex justify-between items-start mb-6">
                <div className={`text-4xl w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover/weather:scale-110 group-hover/weather:-rotate-12 ${c.iconBg}`}>⛅</div>
                <div className={`px-3 py-1.5 rounded-full font-bold text-[10px] uppercase shadow-sm ${c.accentEmerald}`}>
                  Live Weather
                </div>
              </div>
              <div className="flex justify-between items-start">
                {weather ? (
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-5">
                        <div className="text-6xl drop-shadow-sm">
                          {weather.current.weathercode === 0 ? "☀️" : weather.current.weathercode < 3 ? "🌤️" : weather.current.weathercode < 60 ? "☁️" : weather.current.weathercode < 80 ? "🌧️" : "⛈️"}
                        </div>
                        <div className="flex flex-col">
                          <h4 className={`text-5xl font-extrabold tracking-tighter ${c.textPrimary}`}>
                            {weather.current.temperature}°<span className={`text-2xl ${c.textSecondary}`}>C</span>
                          </h4>
                          <p className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${c.textSecondary}`}>
                            Wind: {weather.current.windspeed} km/h
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${c.textSecondary}`}>Bhopal, MP</span>
                      </div>
                    </div>
                    {/* Predictive AI Box */}
                    <div className={`mt-2 p-3 rounded-xl border flex items-center gap-3 transition-colors ${weather.rainProb > 40 ? c.alertCard : c.tagBg}`}>
                      <div className="text-xl">{weather.rainProb > 40 ? "⚠️" : "🤖"}</div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-extrabold uppercase tracking-widest opacity-80">AI Forecast Prediction</span>
                        <span className="text-xs font-semibold mt-0.5">
                          {weather.rainProb}% Rain Prob. {weather.rainProb > 40 ? "Prepare tarps for Urea transport!" : "Clear skies expected for transport."}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 animate-pulse w-full">
                    <div className={`w-14 h-14 rounded-full ${c.progressTrack}`}></div>
                    <div className="flex flex-col gap-2">
                      <div className={`w-20 h-10 rounded-lg ${c.progressTrack}`}></div>
                      <div className={`w-16 h-3 rounded-lg ${c.progressTrack}`}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trolley Pooling Card */}
            <div className={`p-8 rounded-[2rem] border group/pool transition-all duration-500 ${c.poolCard}`}>
              <div className="flex justify-between items-start mb-6">
                <div className={`text-4xl w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover/pool:scale-110 group-hover/pool:-rotate-12 ${c.iconBg}`}>🤝</div>
                <div className={`px-3 py-1.5 rounded-full font-bold text-[10px] uppercase shadow-sm ${c.accentAmber}`}>
                  Last-Mile Eco
                </div>
              </div>
              <h4 className={`text-xl font-extrabold tracking-tight mb-2 ${c.textPrimary}`}>{t[l].pool_title}</h4>
              <p className={`text-sm font-medium leading-relaxed mb-6 ${c.textSecondary}`}>{t[l].pool_desc}</p>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="flex -space-x-3">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm shadow-sm transition-transform duration-300 hover:z-10 hover:scale-110 cursor-pointer ${c.avatarR}`}>R</div>
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm shadow-sm transition-transform duration-300 hover:z-10 hover:scale-110 cursor-pointer ${c.avatarS}`}>S</div>
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm shadow-sm transition-transform duration-300 hover:z-10 hover:scale-110 cursor-pointer ${c.avatarM}`}>M</div>
                </div>
                <span className={`text-[11px] font-semibold ${c.textSecondary}`}>+ Ram, Shyam & 1 other</span>
              </div>

              <button 
                className={`w-full px-6 py-4 rounded-2xl font-bold uppercase text-xs tracking-wider transition-all duration-300 active:scale-95 ${c.poolBtn}`}
                onClick={() => alert('Pooling request sent to Village Group! ✅')}
              >
                {t[l].pool_btn}
              </button>
            </div>
              </>
            )}

            {/* Predictive Analytics Chart Card - MOVED TO LOGISTICS ENGINE */}
            {false && (
            <div className={`p-8 rounded-[2rem] border group/chart transition-all duration-500 ${c.chartCard}`}>
              <div className="flex justify-between items-start mb-6">
                <div className={`text-4xl w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover/chart:scale-110 ${c.iconBg}`}>📊</div>
                <div className={`px-3 py-1.5 rounded-full font-bold text-[10px] uppercase ${c.chartTag}`}>
                  AI Forecast
                </div>
              </div>
              <h4 className={`text-xl font-extrabold tracking-tight mb-2 ${c.textPrimary}`}>{t[l].chart_title}</h4>
              <p className={`text-sm font-medium leading-relaxed mb-8 ${c.textSecondary}`}>{t[l].chart_desc}</p>
              
              {/* CSS Bar Chart */}
              <div className={`flex items-end justify-between h-36 gap-3 mt-4 border-b pb-3 ${c.chartBorder}`}>
                <div className="flex flex-col items-center flex-1 group/bar cursor-pointer">
                  <div className={`w-full rounded-t-xl h-[40%] transition-all duration-500 group-hover/bar:h-[45%] ${c.chartBar}`}></div>
                  <span className={`text-[10px] font-bold mt-3 transition-colors ${c.textSecondary}`}>W1</span>
                </div>
                <div className="flex flex-col items-center flex-1 group/bar cursor-pointer">
                  <div className={`w-full rounded-t-xl h-[60%] transition-all duration-500 group-hover/bar:h-[65%] ${c.chartBar}`}></div>
                  <span className={`text-[10px] font-bold mt-3 transition-colors ${c.textSecondary}`}>W2</span>
                </div>
                <div className="flex flex-col items-center flex-1 group/bar cursor-pointer relative">
                  <div className="absolute -top-7 bg-red-500 text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-md shadow-red-500/20 animate-bounce">PEAK</div>
                  <div className="w-full bg-red-400 dark:bg-red-500/80 rounded-t-xl h-[90%] transition-all duration-500 group-hover/bar:bg-red-500 group-hover/bar:h-[95%] shadow-sm"></div>
                  <span className={`text-[10px] font-bold mt-3 transition-colors ${c.accentRed}`}>W3</span>
                </div>
                <div className="flex flex-col items-center flex-1 group/bar cursor-pointer">
                  <div className={`w-full rounded-t-xl h-[30%] transition-all duration-500 group-hover/bar:h-[35%] ${c.chartBar}`}></div>
                  <span className={`text-[10px] font-bold mt-3 transition-colors ${c.textSecondary}`}>W4</span>
                </div>
              </div>
            </div>
            )}

            {/* Government Portal Link - HIDDEN */}
            {false && (
            <div className={`p-8 rounded-[2rem] border group/link transition-all duration-500 ${c.portalCard}`}>
              <div className={`text-4xl w-14 h-14 rounded-2xl flex items-center justify-center border mb-6 transition-transform duration-300 group-hover/link:scale-110 group-hover/link:-rotate-12 ${c.iconBg}`}>🏛️</div>
              <h4 className={`text-xl font-extrabold tracking-tight mb-2 ${c.textPrimary}`}>{t[l].etoken_h}</h4>
              <p className={`text-sm font-medium leading-relaxed mb-8 ${c.textSecondary}`}>{t[l].etoken_p}</p>
              <a 
                href="https://evikas.mpkrishi.mp.gov.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center w-full gap-2 px-6 py-4 rounded-2xl font-bold uppercase text-xs tracking-wider transition-all duration-300 active:scale-95 ${c.portalBtn}`}
              >
                <span>{t[l].btn_portal}</span>
              </a>
            </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className={`mt-auto p-6 rounded-3xl flex flex-wrap items-center justify-center gap-4 md:justify-around font-semibold text-[11px] tracking-widest uppercase text-center border transition-colors duration-300 ${c.footer}`}>
          <span className={`transition-colors cursor-pointer hover:opacity-80 ${c.accentEmerald}`}>{t[l].footer1}</span>
          <span className="hidden md:inline opacity-30">●</span>
          <span className={`transition-colors cursor-pointer hover:opacity-80 ${c.accentEmerald}`}>{t[l].footer2}</span>
          <span className="hidden md:inline opacity-30">●</span>
          <span className={`transition-colors cursor-pointer hover:opacity-80 ${c.accentEmerald}`}>{t[l].footer3}</span>
        </div>
      </div>
    </main>
  );
}