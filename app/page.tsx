export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] relative overflow-hidden font-sans text-[#2C1802]">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <svg width="100%" height="100%"><defs><pattern id="p" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="30" cy="30" r="1" fill="#2C1802"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-10 flex flex-col min-h-screen">
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
              SMART FERTILIZER LOGISTICS
            </div>
            <p className="text-[10px] font-black text-green-950 uppercase tracking-[0.2em]">Rising Rookies Hackathon 2026</p>
          </div>
        </header>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <div className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full font-black text-xs uppercase border-2 border-black shadow-[4px_4px_0_black]">
              Smart E-Token & GPS Tracking 🛰️
            </div>
            <h2 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-green-950 uppercase">
              Supply Chain <br />
              <span className="text-green-600 italic">Ab Seedhi Aur Saaf!</span>
            </h2>
            <p className="text-2xl text-[#4A3721] font-bold leading-tight">
              E-token se bhed-bhav khatam hua, <span className="text-green-800">KrishiFlow</span> se ab intezaar aur kharcha khatam hoga!
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-green-700 hover:bg-green-800 text-white font-black px-10 py-5 rounded-[2rem] text-xl transition-all shadow-xl">
                Track E-Token 🎫
              </button>
              <button className="bg-white hover:bg-yellow-50 text-green-950 font-black px-10 py-5 rounded-[2rem] text-xl transition-all border-4 border-green-950">
                Live Mandi Stock 📊
              </button>
            </div>
          </div>

          {/* Supply Chain Visual Card */}
          <div className="bg-white p-10 rounded-[4rem] border-4 border-green-950 shadow-2xl relative overflow-hidden group hover:rotate-1 transition-transform">
            <h4 className="font-black text-green-900 mb-6 uppercase tracking-widest text-center">Live Supply Tracker</h4>
            <div className="space-y-8 relative">
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-green-100 z-0"></div>
              
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-white text-xl border-4 border-white shadow-md">🏭</div>
                <div>
                  <p className="font-black text-green-950 uppercase leading-none">IFFCO Factory</p>
                  <p className="text-xs font-bold text-gray-400">Batch NF-2026 Dispatched</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black text-xl border-4 border-white shadow-md animate-bounce">🚚</div>
                <div>
                  <p className="font-black text-yellow-600 uppercase leading-none italic underline">On Way: Bhopal Road</p>
                  <p className="text-xs font-bold text-gray-500 italic">Expected: Tonight 10 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-6 relative z-10 opacity-40">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xl border-4 border-white shadow-md">🏢</div>
                <div>
                  <p className="font-black text-gray-400 uppercase leading-none">Narmadapuram Warehouse</p>
                  <p className="text-xs font-bold text-gray-300">Ready for Unloading</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Improvised Solutions Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Solution 1: Trolley Pool */}
          <div className="bg-[#FEFCE8] p-8 rounded-[3rem] border-4 border-yellow-200 shadow-xl group hover:border-yellow-500 transition-all">
            <div className="text-4xl mb-4">🤝</div>
            <h4 className="font-black text-yellow-950 uppercase mb-2">Trolley Pooling</h4>
            <p className="text-sm font-bold text-yellow-800 leading-tight">
              Aapke gaon ke 6 kisaan kal khaad lene ja rahe hain. Saath mein trolley share karein aur diesel ke paise bachayein!
            </p>
            <div className="mt-4 text-[10px] font-black text-yellow-600 uppercase tracking-widest">Connect with Village Group →</div>
          </div>

          {/* Solution 2: Smart Buffer */}
          <div className="bg-[#F0FDF4] p-8 rounded-[3rem] border-4 border-green-200 shadow-xl group hover:border-green-600 transition-all">
            <div className="text-4xl mb-4">🛰️</div>
            <h4 className="font-black text-green-950 uppercase mb-2">Dynamic Diversion</h4>
            <p className="text-sm font-bold text-green-800 leading-tight">
              Agar Mandi mein bheed zyada hui, toh hum truck ko automatic diverted warehouse par bhejenge taaki line na lage.
            </p>
            <div className="mt-4 text-[10px] font-black text-green-600 uppercase tracking-widest">Live Optimization Active</div>
          </div>

          {/* Solution 3: Authenticity */}
          <div className="bg-[#EFF6FF] p-8 rounded-[3rem] border-4 border-blue-200 shadow-xl group hover:border-blue-600 transition-all">
            <div className="text-4xl mb-4">🔍</div>
            <h4 className="font-black text-blue-950 uppercase mb-2">Batch Report</h4>
            <p className="text-sm font-bold text-blue-800 leading-tight">
              Bori ka QR code scan karke dekhein ki ye kis factory se aur kis quality report ke saath aayi hai. 100% Asli!
            </p>
            <div className="mt-4 text-[10px] font-black text-blue-600 uppercase tracking-widest">Scan for Lab Report →</div>
          </div>
        </div>

        {/* Footer Banner */}
        <div className="mt-auto bg-green-950 text-white p-6 rounded-[2rem] flex items-center justify-around font-black text-[10px] tracking-[0.3em] uppercase italic">
          <span className="text-green-500 underline decoration-yellow-400 decoration-2 underline-offset-4">Smart Supply Chain</span>
          <span>●</span>
          <span>Zero Waste Management</span>
          <span>●</span>
          <span className="text-yellow-400">Project KrishiFlow 🚀</span>
        </div>
      </div>
    </main>
  );
}