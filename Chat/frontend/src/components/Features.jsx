import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Features() {
    return (
        <>
            <Navbar />

            <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-7xl mx-auto">

                    {/* HERO HEADER */}
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            ✨ Built for Real-Time Collaboration
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
                            Everything you need for
                            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">secure team conversations</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Huddle combines blazing-fast real-time messaging with enterprise-grade security in one beautiful interface.
                        </p>
                    </div>

                    {/* FEATURES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "⚡",
                                title: "Lightning Real-Time Messaging",
                                desc: "Socket.IO powered instant delivery with sub-50ms latency. Messages appear the moment they're sent."
                            },
                            {
                                icon: "🔒",
                                title: "Password-Protected Rooms",
                                desc: "Every room requires a unique password. No links, no invites—just secure, private conversations."
                            },
                            {
                                icon: "🌍",
                                title: "Globally Unique Room IDs",
                                desc: "One ID per room worldwide. Join from anywhere with the exact same room ID and password."
                            },
                            {
                                icon: "💾",
                                title: "Persistent Message History",
                                desc: "Every message saved forever in MongoDB. Rejoin anytime and see full conversation history."
                            },
                            {
                                icon: "📱",
                                title: "Mobile-First Responsive",
                                desc: "Perfect on every screen. Desktop, tablet, phone—same beautiful experience everywhere."
                            },
                            {
                                icon: "🔔",
                                title: "Smart User Feedback",
                                desc: "Intuitive loading states, error handling, and success notifications keep users informed."
                            }
                        ].map(({ icon, title, desc }, i) => (
                            <div
                                key={title}
                                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50 hover:border-indigo-100 overflow-hidden"
                            >
                                {/* Background pattern */}
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Icon */}
                                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform mb-6 mx-auto">
                                    <span className="text-3xl group-hover:rotate-12 transition-transform">{icon}</span>
                                </div>

                                {/* Content */}
                                <div className="relative z-10 text-center">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-700 transition-colors">
                                        {title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">{desc}</p>
                                </div>

                                {/* Bottom glow */}
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-indigo-200/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-24 pt-16 border-t border-slate-200">
                        <h2 className="text-3xl font-black text-slate-900 mb-6">
                            Ready to start chatting?
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                            Join a room in seconds. No accounts, no setup, just instant collaboration.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href="/rooms"
                                className="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 text-lg"
                            >
                                Login Now
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                            <span className="text-sm text-slate-500">100% Free • No signup required</span>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

        </>
    );
}
