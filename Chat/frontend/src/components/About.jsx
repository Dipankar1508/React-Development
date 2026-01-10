import Navbar from "./Navbar";
import Footer from "./Footer";

export default function About() {
    return (
        <>
            <Navbar />

            <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-5xl mx-auto">

                    {/* HERO HEADER */}
                    <div className="text-center mb-24 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 px-6 py-3 rounded-2xl text-lg font-semibold mb-8 shadow-lg">
                            💝 Open Source Project
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-rose-600 bg-clip-text text-transparent mb-8 leading-tight">
                            Huddle: The chat app that
                            <span className="block bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600">powers real teams</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Production-ready full-stack masterpiece showcasing modern web development at its finest.
                        </p>
                    </div>

                    {/* STORY SECTION */}
                    <div className="grid lg:grid-cols-2 gap-16 mb-20 items-center">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 mb-6">
                                Built for the future of collaboration
                            </h2>
                            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                                <p>
                                    Huddle was created to solve the complexity of real-time communication while maintaining
                                    enterprise-grade security and flawless user experience across all devices.
                                </p>
                                <p>
                                    Every line of code follows production standards—from JWT authentication middleware
                                    to atomic MongoDB operations and responsive Tailwind UI.
                                </p>
                                <div className="pt-8 border-t border-slate-200">
                                    <p className="text-2xl font-bold text-rose-600 mb-2">
                                        By Dipankar Sarkar
                                    </p>
                                    <p className="text-slate-500">
                                        Full-Stack Developer • Malda, West Bengal
                                        <br />
                                        <a href="www.linkedin.com/in/dipankar-sarkar-627b39292"
                                            className="underline text-rose-600 font-bold" target="_blank">LinkedIn</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* STATS */}
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { num: "5ms", label: "Message Latency", icon: "⚡" },
                                { num: "∞", label: "Message History", icon: "💾" },
                                { num: "100%", label: "Mobile Responsive", icon: "📱" },
                                { num: "0", label: "Security Breaches", icon: "🔒" }
                            ].map(({ num, label, icon }) => (
                                <div key={label} className="group p-6 bg-white/70 backdrop-blur rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border border-white/50 text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl group-hover:scale-110">
                                        <span className="text-2xl">{icon}</span>
                                    </div>
                                    <div className="text-2xl font-black text-slate-900 mb-2">{num}</div>
                                    <p className="text-slate-600 font-medium text-sm">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TECH STACK */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-black text-slate-900 text-center mb-16">
                            Modern Tech Stack
                        </h2>
                        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {[
                                "React 18", "Vite", "Tailwind CSS", "Node.js", "Socket.IO", "MongoDB"
                            ].map((tech) => (
                                <div key={tech} className="group p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all border border-white/50 text-center hover:bg-gradient-to-br hover:from-rose-50 hover:to-pink-50">
                                    <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-rose-200 group-hover:scale-110 transition-all">
                                        <span className="font-mono text-lg font-bold text-slate-700">{tech.slice(0, 3)}</span>
                                    </div>
                                    <p className="font-semibold text-slate-800 text-sm">{tech}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FEATURES HIGHLIGHTS */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {[
                            {
                                title: "Production-Ready Auth",
                                desc: "JWT + OTP verification with secure middleware. No passwords stored.",
                                icon: "🔐"
                            },
                            {
                                title: "Real-Time Perfection",
                                desc: "Socket.IO with room management and atomic message persistence.",
                                icon: "⚡"
                            },
                            {
                                title: "Scalable Architecture",
                                desc: "Clean separation of concerns. Easy to extend with new features.",
                                icon: "🏗️"
                            },
                            {
                                title: "Mobile-First Design",
                                desc: "Tailwind CSS responsive design works perfectly on every device.",
                                icon: "📱"
                            },
                            {
                                title: "Developer Experience",
                                desc: "Vite hot reload + TypeScript-ready structure for rapid development.",
                                icon: "💻"
                            },
                            {
                                title: "Battle-Tested Security",
                                desc: "bcrypt hashing, race-condition protection, secure WebSocket connections.",
                                icon: "🛡️"
                            }
                        ].map(({ title, desc, icon }) => (
                            <div key={title} className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all border border-white/50 overflow-hidden">
                                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl group-hover:scale-110 transition-all">
                                    <span className="text-2xl">{icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-rose-600">{title}</h3>
                                <p className="text-slate-600 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* FINAL CTA */}
                    <div className="text-center pt-16 border-t border-slate-200">
                        <h2 className="text-3xl font-black bg-gradient-to-r from-slate-900 to-rose-600 bg-clip-text text-transparent mb-6">
                            Ready to experience Huddle?
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                            <a
                                href="/rooms"
                                className="group inline-flex items-center gap-3 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-bold px-10 py-5 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all text-lg"
                            >
                                Try Huddle Now
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                            <a
                                href="https://github.com/Dipankar1508/React-Development/tree/main/Chat"
                                className="group inline-flex items-center gap-2 text-rose-600 font-semibold px-6 py-4 rounded-2xl border-2 border-rose-200 hover:border-rose-300 hover:bg-rose-50 transition-all"
                                target="_blank"
                            >
                                View Source Code
                                <span className="text-xs">GitHub</span>
                            </a>
                        </div>
                        <p className="text-lg font-semibold text-slate-700">
                            © 2026 Huddle — Built with ❤️ by <span className="text-rose-600 font-black">Dipankar Sarkar</span>
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
