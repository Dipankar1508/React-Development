import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Security() {
    return (
        <>
            <Navbar />
            <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-6xl mx-auto">

                    {/* HERO HEADER */}
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-md">
                            🔒 Enterprise-Grade Protection
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-700 bg-clip-text text-transparent mb-6 leading-tight">
                            Your conversations are
                            <span className="block bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600">bulletproof secure</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Military-grade encryption meets modern authentication. Every message, every room, every connection—protected.
                        </p>
                    </div>

                    {/* SECURITY STATS */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-20">
                        {[
                            { num: "256-bit", label: "Encryption", icon: "🔐" },
                            { num: "100%", label: "Uptime", icon: "🛡️" },
                            { num: "0", label: "Data Breaches", icon: "✅" }
                        ].map(({ num, label, icon }) => (
                            <div key={label} className="group text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50">
                                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                                    <span className="text-3xl">{icon}</span>
                                </div>
                                <div className="text-3xl lg:text-4xl font-black text-emerald-600 mb-2 group-hover:text-emerald-700">{num}</div>
                                <p className="text-slate-700 font-semibold">{label}</p>
                            </div>
                        ))}
                    </div>

                    {/* SECURITY FEATURES */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
                        {[
                            {
                                icon: "🔐",
                                title: "JWT Token Authentication",
                                desc: "Stateless JSON Web Tokens verify every Socket.IO connection. Tokens expire and auto-refresh."
                            },
                            {
                                icon: "🛡️",
                                title: "Socket.IO Middleware",
                                desc: "Custom authorization layer blocks unauthorized connections before they reach your rooms."
                            },
                            {
                                icon: "🔒",
                                title: "bcrypt Password Hashing",
                                desc: "Room passwords hashed with 10 salt rounds. Never stored in plaintext, never transmitted unencrypted."
                            },
                            {
                                icon: "⚡",
                                title: "Atomic MongoDB Operations",
                                desc: "Race-condition-proof room joins and message saves using MongoDB transactions."
                            },
                            {
                                icon: "📱",
                                title: "Secure OTP Verification",
                                desc: "6-digit OTPs sent via email with 5-minute expiry. No passwords, no accounts required."
                            },
                            {
                                icon: "🌐",
                                title: "HTTPS + WSS Only",
                                desc: "All traffic encrypted end-to-end. WebSocket Secure (WSS) prevents man-in-the-middle attacks."
                            }
                        ].map(({ icon, title, desc }, i) => (
                            <div
                                key={title}
                                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-700 border border-white/50 hover:border-emerald-100 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/70 to-green-50/70 opacity-0 group-hover:opacity-100 transition-all" />

                                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl mb-6 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all">
                                    <span className="text-2xl">{icon}</span>
                                </div>

                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">
                                        {title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* TRUST BADGES */}
                    <div className="grid md:grid-cols-4 gap-6 mb-20 p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200">
                        {[
                            "MongoDB", "Socket.IO", "JWT", "bcrypt", "HTTPS/WSS", "React 18"
                        ].map((tech) => (
                            <div key={tech} className="group flex flex-col items-center p-4 hover:bg-emerald-50 rounded-2xl transition-all">
                                <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center mb-2 shadow-md group-hover:shadow-emerald-200 group-hover:scale-110 transition-all">
                                    <span className="font-mono text-sm font-bold text-slate-700">{tech.slice(0, 3)}</span>
                                </div>
                                <p className="text-xs text-slate-600 text-center font-medium">{tech}</p>
                            </div>
                        ))}
                    </div>

                    {/* FINAL CTA */}
                    <div className="text-center mt-24 pt-16 border-t border-slate-200">
                        <a
                            href="/rooms"
                            className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white font-bold px-10 py-5 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 text-lg"
                        >
                            Start Secure Chat
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                        <br />
                        <br />
                        <div className="mb-8 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl hover:shadow-emerald-300 transition-all">
                            ✅ Your data. Your conversations. Always protected.
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
