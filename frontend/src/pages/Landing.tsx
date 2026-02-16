import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Landing() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#020204] text-slate-300 antialiased selection:bg-blue-500/30 selection:text-blue-200 font-sans">
      {/* Background Effects */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020204]/80 to-transparent blur-[80px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#030508]/60 backdrop-blur-xl">
        <div className="flex max-w-7xl mx-auto px-6 py-4 items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2 group">
              <div className="flex text-xs font-bold text-black bg-gradient-to-br from-cyan-400 to-blue-600 w-8 h-8 rounded items-center justify-center">
                S
              </div>
              <span className="text-sm font-semibold text-white tracking-tight">CloudHelm</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
              <a href="#integration" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Integration</a>
              <a href="#developers" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Developers</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="hidden text-xs font-medium text-slate-300 hover:text-white sm:block"
            >
              Log in
            </button>
            <button
              onClick={() => navigate('/login')}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-cyan-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]"
            >
              <span>Start Deploying</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="relative">
        {/* Hero Section */}
        <section className="overflow-hidden min-h-[1100px] pt-32 pb-44 relative">
          {/* Animated Radar Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] z-0 pointer-events-none mask-radar-bottom select-none">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 w-full h-full rounded-full animate-[radar-scan_8s_linear_infinite]">
                <div className="radar-sweep w-full h-full rounded-full"></div>
                <div className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-gradient-to-b from-cyan-300 via-cyan-500 to-transparent origin-bottom -translate-x-1/2 shadow-[0_0_30px_rgba(34,211,238,1)]"></div>
              </div>
              <div className="absolute w-[98%] h-[98%] rounded-full border border-dashed border-cyan-500/10 opacity-30 animate-[spin-slow_120s_linear_infinite]"></div>
              <div className="absolute w-[80%] h-[80%] rounded-full border border-cyan-500/10 opacity-60"></div>
              <svg className="absolute w-[80%] h-[80%] animate-[spin-reverse-slow_60s_linear_infinite]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(34,211,238,0.1)" strokeWidth="0.2" strokeDasharray="20 40"></circle>
              </svg>
              <div className="absolute w-[72%] h-[72%] rounded-full border border-cyan-500/5"></div>
              <div className="absolute w-full h-full opacity-10">
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-cyan-400"></div>
                <div className="absolute left-0 right-0 top-1/2 h-px bg-cyan-400"></div>
                <div className="absolute top-[14.6%] left-[14.6%] w-[70.8%] h-[70.8%] border border-cyan-400 rounded-full"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] flex items-center justify-center">
                <div className="absolute inset-0 bg-cyan-500/10 blur-xl rounded-full animate-pulse"></div>
                <div className="w-[60%] h-[60%] border border-cyan-400/30 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
                </div>
              </div>
              <div className="absolute top-[20%] left-[75%] flex items-center gap-2 text-cyan-500/50 text-[10px] font-mono animate-pulse">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div> TARGET_LOCKED
              </div>
              <div className="absolute bottom-[40%] left-[25%] flex items-center gap-2 text-blue-500/50 text-[10px] font-mono animate-pulse delay-700">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> SCANNING...
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="flex flex-col max-w-7xl z-10 mx-auto px-6 relative items-center">
            <div className="text-center max-w-3xl mx-auto mb-16 pt-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-950/20 px-4 py-1.5 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.1)] animate-enter">
                <div className="h-1.5 w-1.5 animate-pulse bg-cyan-400 rounded-full"></div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-cyan-300">
                  Next Gen Defense
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.1] animate-enter delay-100">
                Security at the
                <span className="text-gradient-cyan relative inline-block ml-3">
                  speed of code
                  <svg className="absolute w-full h-2 bottom-0 left-0 text-cyan-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" fill="transparent" stroke="currentColor" strokeWidth="1"></path>
                  </svg>
                </span>
              </h1>

              <p className="text-lg text-slate-400 font-light max-w-xl mx-auto leading-relaxed mb-8 animate-enter delay-200">
                Unified security platform for modern engineering teams. Monitor infrastructure drift and detect threats in real-time.
              </p>

              <div className="flex items-center justify-center gap-4 animate-enter delay-300">
                <button
                  onClick={() => navigate('/login')}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]"
                >
                  <span>Start Free Trial</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20"
                >
                  <span>View Demo</span>
                </button>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="w-full max-w-6xl z-20 mt-[-20px] relative perspective-1000 animate-enter delay-400">
              <div className="glass-surface border border-white/20 rounded-t-2xl overflow-hidden backdrop-blur-md shadow-[0_0_80px_rgba(34,211,238,0.15)] relative">
                <div className="glass-top-border"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
                <div className="flex bg-black/20 border-b border-white/5 pt-4 px-6 pb-4 items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
                    </div>
                    <div className="h-4 w-px bg-white/10 mx-2"></div>
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      <span>SYS.MONITORING</span>
                      <span className="text-slate-600">/</span>
                      <span className="text-slate-300">MAIN_CLUSTER</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                    <span className="text-[10px] font-semibold text-cyan-300 tracking-wide">LIVE FEED</span>
                  </div>
                </div>
                <div className="flex h-[400px] relative z-10">
                  <div className="flex flex-col gap-6 bg-black/10 w-16 border-r border-white/5 pt-6 pb-6 items-center">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 p-6 flex items-center justify-center text-slate-400 text-sm">
                    Dashboard Preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted Partners Section - Integration Schema / Logic Flow */}
        <section className="overflow-visible max-w-7xl mx-auto pt-24 px-6 pb-64 relative">
          {/* Styles for enhanced local animations */}
          <style>{`
            @keyframes flow-custom {
              to { stroke-dashoffset: -1000; }
            }
            .animate-flow-custom {
              animation: flow-custom 10s linear infinite;
            }
            @keyframes scanner {
              0%, 100% { transform: translateY(-100%); opacity: 0; }
              50% { opacity: 1; }
              100% { transform: translateY(100%); opacity: 0; }
            }
            .animate-scanner {
              animation: scanner 3s ease-in-out infinite;
            }
          `}</style>

          {/* Background Ambience */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="glow-dot absolute top-[10%] left-[15%] h-2 w-2 rounded-full bg-blue-400/60 blur-sm"></div>
            <div className="glow-dot absolute top-[30%] right-[20%] h-2 w-2 rounded-full bg-cyan-400/60 blur-sm" style={{ animationDelay: '1s' }}></div>
            <div className="glow-dot absolute bottom-[20%] left-[25%] h-2 w-2 rounded-full bg-blue-500/60 blur-sm" style={{ animationDelay: '2s' }}></div>
          </div>

          {/* Header */}
          <div className="relative z-10 text-center mb-20">
            <h2 className="text-4xl font-medium tracking-tight text-white sm:text-5xl">
              Trusted Partners
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-slate-400 leading-relaxed">
              We elevate your cybersecurity to the highest level alongside the world's leading brands and infrastructure providers.
            </p>
          </div>

          {/* SVG Flow Schema */}
          <svg className="absolute top-60 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[800px] z-0 pointer-events-none" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="blueFlowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Animated Data Flow Lines (Base Gradient) - Made longer */}
            <path className="animate-flow-custom" strokeDasharray="200, 400" strokeDashoffset="0" d="M 125,200 C 125,600 480,550 500,750" fill="none" stroke="url(#blueFlowGradient)" strokeWidth="2" style={{ animationDuration: '8s', opacity: 0.4 }}></path>
            <path className="animate-flow-custom" strokeDasharray="200, 400" strokeDashoffset="-200" d="M 375,200 C 375,600 490,550 500,750" fill="none" stroke="url(#blueFlowGradient)" strokeWidth="2" style={{ animationDuration: '10s', opacity: 0.4 }}></path>
            <path className="animate-flow-custom" strokeDasharray="200, 400" strokeDashoffset="-100" d="M 625,200 C 625,600 510,550 500,750" fill="none" stroke="url(#blueFlowGradient)" strokeWidth="2" style={{ animationDuration: '9s', opacity: 0.4 }}></path>
            <path className="animate-flow-custom" strokeDasharray="200, 400" strokeDashoffset="-300" d="M 875,200 C 875,600 520,550 500,750" fill="none" stroke="url(#blueFlowGradient)" strokeWidth="2" style={{ animationDuration: '11s', opacity: 0.4 }}></path>

            {/* Animated Data Packets (Bright, Fast, Glowing) - Made longer */}
            <path className="animate-flow-custom" strokeDasharray="20, 600" strokeDashoffset="0" d="M 125,200 C 125,600 480,550 500,750" fill="none" stroke="#60a5fa" strokeWidth="3" filter="url(#glow)" style={{ animationDuration: '4s', opacity: 1, strokeLinecap: 'round' }}></path>
            <path className="animate-flow-custom" strokeDasharray="20, 600" strokeDashoffset="-200" d="M 375,200 C 375,600 490,550 500,750" fill="none" stroke="#60a5fa" strokeWidth="3" filter="url(#glow)" style={{ animationDuration: '5s', opacity: 1, strokeLinecap: 'round' }}></path>
            <path className="animate-flow-custom" strokeDasharray="20, 600" strokeDashoffset="-100" d="M 625,200 C 625,600 510,550 500,750" fill="none" stroke="#60a5fa" strokeWidth="3" filter="url(#glow)" style={{ animationDuration: '4.5s', opacity: 1, strokeLinecap: 'round' }}></path>
            <path className="animate-flow-custom" strokeDasharray="20, 600" strokeDashoffset="-300" d="M 875,200 C 875,600 520,550 500,750" fill="none" stroke="#60a5fa" strokeWidth="3" filter="url(#glow)" style={{ animationDuration: '6s', opacity: 1, strokeLinecap: 'round' }}></path>
          </svg>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 z-10 mb-20 relative">
            {/* Row 1 - Slack */}
            <div className="group flex transition-all duration-300 hover:bg-white/[0.02] hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden bg-[#0B0C10] w-full h-24 border-white/5 border relative items-center justify-center">
              <div className="anim-slack">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-slate-400 group-hover:text-white transition-all duration-300 lottie-stroke">
                  <rect width="3" height="8" x="13" y="2" rx="1.5"></rect>
                  <path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5"></path>
                  <rect width="3" height="8" x="8" y="14" rx="1.5"></rect>
                  <path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5"></path>
                  <rect width="8" height="3" x="14" y="13" rx="1.5"></rect>
                  <path d="M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5"></path>
                  <rect width="8" height="3" x="2" y="8" rx="1.5"></rect>
                  <path d="M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5"></path>
                </svg>
              </div>
            </div>

            {/* Row 1 - Chevron */}
            <div className="group flex transition-all duration-300 hover:bg-white/[0.02] hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden bg-[#0B0C10] w-full h-24 border-white/5 border relative items-center justify-center">
              <div className="anim-chevron">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-slate-400 group-hover:text-white transition-all duration-300 lottie-stroke">
                  <path d="m6 17 5-5-5-5"></path>
                  <path d="m13 17 5-5-5-5"></path>
                </svg>
              </div>
            </div>

            {/* Row 1 - Command */}
            <div className="group flex transition-all duration-300 hover:bg-white/[0.02] hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden bg-[#0B0C10] w-full h-24 border-white/5 border relative items-center justify-center">
              <div className="anim-command">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-slate-400 group-hover:text-white transition-all duration-300 lottie-stroke">
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
                </svg>
              </div>
            </div>

            {/* Row 1 - Figma */}
            <div className="group flex transition-all duration-300 hover:bg-white/[0.02] hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden bg-[#0B0C10] w-full h-24 border-white/5 border relative items-center justify-center">
              <div className="anim-figma">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-slate-400 group-hover:text-white transition-all duration-300 lottie-stroke">
                  <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path>
                  <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path>
                  <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path>
                  <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path>
                  <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>
                </svg>
              </div>
            </div>

            {/* Row 2 - Asterisk */}
            <div className="group flex transition-all duration-300 hover:bg-white/[0.02] hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden bg-[#0B0C10] w-full h-24 border-white/5 border relative items-center justify-center">
              <div className="anim-asterisk">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-slate-400 group-hover:text-white transition-all duration-300 lottie-stroke">
                  <path d="M12 6v12"></path>
                  <path d="M17.196 9 6.804 15"></path>
                  <path d="m6.804 9 10.392 6"></path>
                </svg>
              </div>
            </div>

            {/* Row 2 - Link */}
            <div className="group flex transition-all duration-300 hover:bg-white/[0.02] hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden bg-[#0B0C10] w-full h-24 border-white/5 border relative items-center justify-center">
              <div className="anim-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-slate-400 group-hover:text-white transition-all duration-300 lottie-stroke">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </div>
            </div>

            {/* Row 2 - Aperture */}
            <div className="group flex transition-all duration-300 hover:bg-white/[0.02] hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden bg-[#0B0C10] w-full h-24 border-white/5 border relative items-center justify-center">
              <div className="anim-aperture">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-slate-400 group-hover:text-white transition-all duration-300 lottie-stroke">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m14.31 8 5.74 9.94"></path>
                  <path d="M9.69 8h11.48"></path>
                  <path d="m7.38 12 5.74-9.94"></path>
                  <path d="M9.69 16 3.95 6.06"></path>
                  <path d="M14.31 16H2.83"></path>
                  <path d="m16.62 12-5.74 9.94"></path>
                </svg>
              </div>
            </div>

            {/* Row 2 - Toggle */}
            <div className="group flex transition-all duration-300 hover:bg-white/[0.02] hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden bg-[#0B0C10] w-full h-24 border-white/5 border relative items-center justify-center">
              <div className="anim-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-white transition-all duration-300 lottie-stroke">
                  <rect width="20" height="12" x="2" y="6" rx="6" ry="6"></rect>
                  <circle cx="16" cy="12" r="2"></circle>
                </svg>
              </div>
            </div>
          </div>

          {/* Central Convergence Hub */}
          <div className="flex mt-48 z-20 relative justify-center">
            <div className="flex relative items-center justify-center">
              {/* Connection Tip & Beam (Incoming from above) - Made longer and positioned lower */}
              <div className="absolute -top-60 h-80 w-[2px] bg-gradient-to-b from-transparent via-blue-500/50 to-blue-500 shadow-[0_0_20px_#3b82f6] overflow-hidden">
                <div className="absolute inset-0 bg-white/50 w-full h-1/2 animate-scanner blur-[2px]"></div>
              </div>

              {/* Outgoing Connection Beam (to next section) - Extended downward */}
              <div className="absolute -bottom-[25rem] h-[25rem] w-[2px] bg-gradient-to-t from-transparent via-blue-500/50 to-blue-500 shadow-[0_0_20px_#3b82f6] overflow-hidden">
                <div className="absolute inset-0 bg-white/50 w-full h-1/2 animate-scanner blur-[2px]" style={{ animationDelay: '1.5s' }}></div>
              </div>

              {/* Core Icon Wrapper with Orbital Rings */}
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#020204] shadow-[0_0_50px_rgba(59,130,246,0.5)] border border-blue-500/30">
                {/* Outer Spinning Ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-blue-400/30 animate-[spin-slow_20s_linear_infinite]"></div>
                
                {/* Inner Spinning Ring (Reverse) */}
                <div className="absolute inset-2 rounded-full border border-blue-400/20 animate-[spin-reverse-slow_15s_linear_infinite]"></div>

                {/* Atom Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 relative z-10">
                  <circle cx="12" cy="12" r="1"></circle>
                  <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"></path>
                  <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"></path>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Features Section - EXACT FROM REFERENCE */}
        <section id="features" className="relative py-16 overflow-hidden -mt-32">
          {/* Ambient Background */}
          <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-32">
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 shadow-lg shadow-blue-900/20">
                <span className="text-xs font-semibold tracking-wider text-blue-300 uppercase">Integrations</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
                Seamless Integrations
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto font-light">
                Connect with your favorite tools to streamline workflows
              </p>
            </div>

            {/* Integration Grid */}
            <div className="relative max-w-5xl mx-auto">
              {/* Axis Lines */}
              <div className="absolute top-1/2 left-[-50%] right-[-50%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2"></div>
              <div className="absolute left-1/2 top-[-50%] bottom-[-50%] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2"></div>
              
              {/* Center Hub */}
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative w-[260px] h-[260px]">
                  {/* 3 filled concentric circles (small, medium, big) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="center-circle center-circle--3 w-56 h-56 rounded-full bg-blue-500/15"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="center-circle center-circle--2 w-40 h-40 rounded-full bg-blue-500/30"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="center-circle w-24 h-24 rounded-full bg-blue-500/55"></div>
                  </div>

                  {/* Rays that end the animation, aligned with the separator lines */}
                  {/* Left ray */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="center-ray-horizontal center-ray-left bg-gradient-to-l from-blue-400/80 via-blue-400/60 to-transparent w-14"></div>
                  </div>

                  {/* Right ray */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="center-ray-horizontal center-ray-right w-14 bg-gradient-to-r from-blue-400/80 via-blue-400/60 to-transparent"></div>
                  </div>

                  {/* Top ray */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="center-ray-vertical center-ray-top h-14 bg-gradient-to-t from-blue-400/80 via-blue-400/60 to-transparent"></div>
                  </div>

                  {/* Bottom ray */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="center-ray-vertical center-ray-bottom h-14 bg-gradient-to-b from-blue-400/80 via-blue-400/60 to-transparent"></div>
                  </div>

                  {/* Core Icon (stays perfectly center) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex bg-blue-600 w-16 h-16 rounded-full ring-[#020215] ring-8 relative shadow-[0_0_40px_rgba(37,99,235,0.65)] items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-32">
                {/* Item 1 (Top Left) */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-[#0B0C10] border border-white/10 flex items-center justify-center mb-6 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-white transition-colors">
                      <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                      <path d="M12 2a10 10 0 1 1-10 10h10V2z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                  <p className="text-sm text-slate-300 max-w-[240px]">
                    GPT models to generate content and build intelligent agents.
                  </p>
                </div>

                {/* Item 2 (Top Right) */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-[#0B0C10] border border-white/10 flex items-center justify-center mb-6 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                    <span className="font-serif text-3xl text-slate-400 group-hover:text-white transition-colors">N</span>
                  </div>
                  <p className="text-sm text-slate-300 max-w-[240px]">
                    Summarize tasks, and organize info using Notion's powerful AI assistant.
                  </p>
                </div>

                {/* Item 3 (Bottom Left) */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-[#0B0C10] border border-white/10 flex items-center justify-center mb-6 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-white transition-colors">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                  <p className="text-sm text-slate-300 max-w-[240px]">
                    Connect with Linked In and with dozens of other tools in it
                  </p>
                </div>

                {/* Item 4 (Bottom Right) */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-[#0B0C10] border border-white/10 flex items-center justify-center mb-6 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-white transition-colors">
                      <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                    </svg>
                  </div>
                  <p className="text-sm text-slate-300 max-w-[240px]">
                    Connect with Twitter and with dozens of other tools in it without code
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Config as Code Section with AI Editor - EXACT FROM REFERENCE */}
        <section className="border-y border-white/5 pt-24 pr-24 pb-24 pl-24" id="developers">
          <div className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900/20 backdrop-blur-md" style={{ position: 'relative' }}>
            {/* Background Glow */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-indigo-600/30 transition-colors duration-700"></div>
            
            <div className="grid lg:grid-cols-2 z-10 gap-x-0 gap-y-0" style={{ position: 'relative' }}>
              {/* Text Content */}
              <div className="md:p-16 flex flex-col z-10 pt-12 pr-12 pb-12 pl-12 justify-center">
                <div className="mb-6 h-12 w-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-indigo-400">
                    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"></path>
                    <path d="m14 7 3 3"></path>
                    <path d="M5 6v4"></path>
                    <path d="M19 14v4"></path>
                    <path d="M10 2v2"></path>
                    <path d="M7 8H3"></path>
                    <path d="M21 16h-4"></path>
                    <path d="M11 3H9"></path>
                  </svg>
                </div>

                <h2 className="text-3xl tracking-tight text-white sm:text-4xl font-medium">
                  Config as Code.
                  <br />
                  <span className="text-gradient-blue">
                    Version control your security.
                  </span>
                </h2>

                <div className="space-y-6 text-lg text-zinc-400 font-normal leading-relaxed">
                  <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                    Stop clicking through endless dashboards. Define your security policies in TypeScript, Python, or YAML. Review changes in PRs, rollback instantly, and keep your history clean.
                  </p>
                  <ul className="mt-10 space-y-4">
                    <li className="flex items-center gap-3 text-base text-slate-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-500">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span>Type-safe policy definitions</span>
                    </li>
                    <li className="flex items-center gap-3 text-base text-slate-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-500">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span>Integrates with Terraform &amp; Pulumi</span>
                    </li>
                    <li className="flex items-center gap-3 text-base text-slate-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-500">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span>CI/CD pipeline blocking</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Visual: AI Editor */}
              <div className="min-h-[500px] lg:border-t-0 lg:border-l bg-black/40 border-white/5 border-t relative overflow-hidden">
                {/* Floating Prompt Input */}
                <div className="-translate-x-1/2 -translate-y-1/2 z-20 w-[85%] max-w-md absolute top-1/2 left-1/2">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/90 p-4 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:border-indigo-500/30">
                    {/* Prompt Header */}
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
                        <span className="text-xs font-medium text-indigo-300">CloudHelm Assistant</span>
                      </div>
                      <span className="text-[10px] text-zinc-600">v2.1 Model</span>
                    </div>

                    {/* User Input Simulation */}
                    <div className="flex gap-3 mb-4">
                      <div className="h-6 w-6 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-white/5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-zinc-400">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <div className="text-sm text-zinc-300 font-normal leading-relaxed">
                        Generate a security policy to enforce MFA and block public access for the production environment.
                      </div>
                    </div>

                    {/* AI Generating Loader */}
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-indigo-400">
                          <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
                          <path d="M20 2v4"></path>
                          <path d="M22 4h-4"></path>
                          <circle cx="4" cy="20" r="2"></circle>
                        </svg>
                      </div>
                      <div className="w-full space-y-2">
                        <div className="h-2 w-3/4 bg-zinc-800 rounded animate-pulse"></div>
                        <div className="h-2 w-1/2 bg-zinc-800 rounded animate-pulse delay-75"></div>

                        {/* The Generated Component Preview (Code Block) */}
                        <div className="mt-4 rounded-lg border border-zinc-700/50 bg-[#0B0C10] p-4 font-mono text-[10px] md:text-xs leading-relaxed overflow-hidden relative group">
                          {/* Language Badge */}
                          <div className="absolute top-2 right-2 text-[8px] text-zinc-500 border border-zinc-800 px-1.5 rounded bg-zinc-900/50">TS</div>
                          <div className="text-zinc-400">
                            <span className="text-purple-400">export </span>
                            <span className="text-blue-400">const </span>
                            <span className="text-yellow-200">securityConfig </span>
                            = {'{'}
                          </div>
                          <div className="pl-4 text-zinc-400">
                            environment: <span className="text-green-400">'production'</span>,
                          </div>
                          <div className="pl-4 text-zinc-400">compliance: {'{'}</div>
                          <div className="pl-8 text-zinc-400">
                            enforceMfa: <span className="text-blue-400">true</span>,
                          </div>
                          <div className="pl-8 text-zinc-400">
                            blockPublicAccess: <span className="text-blue-400">true</span>,
                          </div>
                          <div className="pl-4 text-zinc-400">{'}'},</div>
                          <div className="text-zinc-400">{'}'}</div>

                          {/* Decorative glowing cursor or selection */}
                          <div className="absolute bottom-4 left-10 w-1.5 h-3 bg-indigo-500/50 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background Abstract Code */}
                <div className="absolute inset-0 p-8 opacity-20 pointer-events-none select-none overflow-hidden">
                  <div className="absolute inset-0 w-full h-full" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
                    <div className="w-full animate-[scrollUp_30s_linear_infinite]">
                      {/* Original Block */}
                      <div className="text-xs text-zinc-600 space-y-1 pb-16">
                        <p><span className="text-purple-400">export default </span><span className="text-blue-400">function </span><span className="text-yellow-200">RevenueCard</span>() {'{'}</p>
                        <p className="pl-4"><span className="text-purple-400">return </span>(</p>
                        <p className="pl-8">&lt;<span className="text-red-400">Card </span>className=<span className="text-green-400">"bg-zinc-950 p-6 border..."</span>&gt;</p>
                        <p className="pl-12">&lt;<span className="text-red-400">div </span>className=<span className="text-green-400">"flex justify-between"</span>&gt;</p>
                        <p className="pl-16">&lt;<span className="text-red-400">h3</span>&gt;Revenue&lt;/<span className="text-red-400">h3</span>&gt;</p>
                        <p className="pl-12">&lt;/<span className="text-red-400">div</span>&gt;</p>
                        <p className="pl-8">&lt;/<span className="text-red-400">Card</span>&gt;</p>
                        <p className="pl-4">);</p>
                        <p>{'}'}</p>
                      </div>
                      {/* Duplicate for seamless loop */}
                      <div className="text-xs text-zinc-600 space-y-1 pb-16">
                        <p><span className="text-purple-400">export default </span><span className="text-blue-400">function </span><span className="text-yellow-200">RevenueCard</span>() {'{'}</p>
                        <p className="pl-4"><span className="text-purple-400">return </span>(</p>
                        <p className="pl-8">&lt;<span className="text-red-400">Card </span>className=<span className="text-green-400">"bg-zinc-950 p-6 border..."</span>&gt;</p>
                        <p className="pl-12">&lt;<span className="text-red-400">div </span>className=<span className="text-green-400">"flex justify-between"</span>&gt;</p>
                        <p className="pl-16">&lt;<span className="text-red-400">h3</span>&gt;Revenue&lt;/<span className="text-red-400">h3</span>&gt;</p>
                        <p className="pl-12">&lt;/<span className="text-red-400">div</span>&gt;</p>
                        <p className="pl-8">&lt;/<span className="text-red-400">Card</span>&gt;</p>
                        <p className="pl-4">);</p>
                        <p>{'}'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section - EXACT FROM REFERENCE */}
        <section className="pt-24 pb-24 relative" id="pricing">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6">
                Simple, transparent pricing
              </h2>
              <p className="text-slate-400 text-lg">
                Start specific, scale infinitely.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Starter */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:border-white/20 transition-all">
                <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
                <p className="text-sm text-slate-400 mb-6">Perfect for side projects.</p>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">$0</span>
                  <span className="text-slate-400 text-lg ml-2">/mo</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex gap-3 text-sm text-slate-300">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    3 Projects
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Community Support
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Basic Analytics
                  </li>
                </ul>
                <button onClick={() => navigate('/login')} className="w-full py-3 px-6 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-all font-medium">
                  Get Started
                </button>
              </div>

              {/* Pro - Popular */}
              <div className="rounded-2xl border-2 border-cyan-500/50 bg-gradient-to-b from-cyan-500/10 to-transparent p-8 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-xs font-bold text-white">
                  Popular
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
                <p className="text-sm text-slate-400 mb-6">For growing teams.</p>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">$49</span>
                  <span className="text-slate-400 text-lg ml-2">/mo</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex gap-3 text-sm text-slate-300">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Unlimited Projects
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Priority Support
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Advanced Analytics
                  </li>
                </ul>
                <button onClick={() => navigate('/login')} className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all font-medium shadow-lg shadow-cyan-500/50">
                  Start Free Trial
                </button>
              </div>

              {/* Enterprise */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:border-white/20 transition-all">
                <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
                <p className="text-sm text-slate-400 mb-6">For large scale security.</p>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">Custom</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex gap-3 text-sm text-slate-300">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    SSO &amp; Audit Logs
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Dedicated Success Manager
                  </li>
                  <li className="flex gap-3 text-sm text-slate-300">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    99.99% Uptime SLA
                  </li>
                </ul>
                <button onClick={() => navigate('/login')} className="w-full py-3 px-6 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-all font-medium">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - EXACT FROM REFERENCE */}
        <section className="border-white/5 border-t pt-24 pb-24" id="faq">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-medium text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'How does the integration work?',
                  a: 'We connect to your cloud infrastructure via secure read-only API access. Our agent analyzes your configuration, detects drift, and provides real-time alerts without ever storing your source code.'
                },
                {
                  q: 'Is my code safe?',
                  a: 'Absolutely. We never store your source code. Our agent analyzes metadata and configuration patterns locally within your environment and only sends anonymized telemetry for the dashboard.'
                },
                {
                  q: 'Do you offer on-premise deployment?',
                  a: 'Yes, our Enterprise plan includes an option for self-hosted runners and on-premise control planes for air-gapped environments. Contact sales for details.'
                }
              ].map((faq, index) => (
                <div key={index} className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-medium text-white pr-8">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-5 text-slate-400 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - EXACT FROM REFERENCE */}
        <section className="mx-auto max-w-4xl px-6 py-32 text-center">
          <h2 className="text-4xl tracking-tight text-white sm:text-5xl font-medium">
            Ready to secure the future?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
            Join the thousands of developers who have switched to CloudHelm for a safer, faster, and more reliable infrastructure.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/50 transition-all"
            >
              Get Started for Free
            </button>
            <button
              onClick={() => navigate('/login')}
              className="rounded-lg border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
            >
              Contact Sales
            </button>
          </div>
        </section>
      </main>

      {/* Footer - EXACT FROM REFERENCE */}
      <footer className="border-t border-white/10 bg-[#010203] pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-xs font-bold text-black bg-gradient-to-br from-cyan-400 to-blue-600 w-6 h-6 rounded items-center justify-center">
                  S
                </div>
                <span className="text-base font-semibold text-white">CloudHelm</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                The first unified security platform designed for engineering teams. Secure your infrastructure at the speed of code.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#integration" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © 2026 CloudHelm Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs text-slate-500">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
