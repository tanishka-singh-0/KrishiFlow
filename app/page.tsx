import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] relative overflow-hidden font-sans text-[#2C1802]">
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <svg width="100%" height="100%"><defs><pattern id="p" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="#2C1802" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center py-6 border-b-4 border-green-800/20 mb-10">
          <div className="flex items-center gap-3">
            <span className="text-5xl">🚜</span>
            <h1 className="text-4xl font-black text-green-900 tracking-tighter">
              Krishi<span className="text-green-600">Flow</span>
            </h1>
          </div>
          <div className="text-right">
            <div className="bg-green-700 text-white px-5 py-2 rounded-xl font-black text-sm shadow-lg mb-1">
              TEAM: RISING ROOKIES
            </div>
            <p className="text-[10px] font-black text-green-900 uppercase tracking-[0.2em]">Smart Fertilizer Distribution</p>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex-grow flex flex-col md:flex-row items-center gap-12 py-6">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full font-black text-sm uppercase border-2 border-black shadow-[4px_4px_0_black]">
              DAP aur UREA ki Home Delivery! 📦
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-green-950 uppercase">
              Ab Line Mein <br />
              <span className="text-red-600 italic">Lagne Ka Tension Khatam!</span>
            </h2>
            
            <p className="text-2xl text-[#4A3721] font-bold max-w-2xl leading-snug mx-auto md:mx-0">
              KrishiFlow se apna <span className="text-green-700 underline">Smart E-Token</span> online book karein aur factory se seedha apne ghar tak Fertilizer mangwayein. 
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start pt-6">
              <button className="bg-green-700 hover:bg-green-800 text-white font-black px-12 py-6 rounded-3xl text-2xl transition-all hover:scale-105 shadow-[0_12px_0_rgb(21,71,32)] active:translate-y-2 active:shadow-none border-2 border-green-900">
                E-Token Book Karein 🎫
              </button>
              <button className="bg-white hover:bg-yellow-50 text-green-950 font-black px-12 py-6 rounded-3xl text-2xl transition-all border-4 border-green-950 shadow-xl">
                Stock Check Karein 📊
              </button>
            </div>

            {/* Smart Tracker */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border-2 border-green-900/10 inline-block w-full max-w-lg shadow-inner">
              <h3 className="font-black text-green-900 mb-4 uppercase text-sm tracking-widest">Narmadapuram Center Update:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-100 p-4 rounded-2xl border-b-4 border-green-600">
                  <p className="text-xs font-bold text-green-800">DAP Stock</p>
                  <p className="text-xl font-black text-green-950 text-black">1200 Bags</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-2xl border-b-4 border-yellow-600">
                  <p className="text-xs font-bold text-yellow-800">UREA Stock</p>
                  <p className="text-xl font-black text-yellow-950 text-black">850 Bags</p>
                </div>
              </div>
            </div>
          </div>

          {/* Side Graphic */}
          <div className="flex-1 w-full max-w-xl">
            <div className="bg-white p-10 rounded-[5rem] shadow-2xl border-4 border-green-950 relative overflow-hidden aspect-square flex flex-col items-center justify-center space-y-6 transform -rotate-3 transition-transform hover:rotate-0 duration-500">
              <div className="relative">
                <span className="text-[140px] md:text-[160px] leading-none">🎒</span>
                <span className="absolute -top-4 -right-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-black animate-pulse">ASLI STOCK</span>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-green-900 tracking-tighter">CERTIFIED FERTILIZER</p>
                <p className="text-lg font-bold text-gray-500 italic">"Kisaan ki unnati, hamari pehchan"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 bg-green-950 p-5 rounded-[2rem] flex flex-wrap items-center justify-center gap-6 text-white font-black text-xs tracking-widest border-4 border-green-800 shadow-2xl">
          <span className="flex items-center gap-2 underline decoration-yellow-400 decoration-2">Verified E-Token System</span>
          <span className="text-green-600">|</span>
          <span>Zero Black Marketing</span>
          <span className="text-green-600">|</span>
          <span className="text-yellow-400">Rising Rookies Google Hackathon 🚀</span>
        </div>
      </div>
    </main>
  );
}