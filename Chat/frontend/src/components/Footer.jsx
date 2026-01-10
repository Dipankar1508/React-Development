import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa6';

export default function Footer() {
    return (
        <footer className="w-full mt-auto border-t border-slate-200/50 bg-gradient-to-t from-slate-950/95 to-slate-900/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">

                {/* 3-COLUMN LAYOUT */}
                <div className="grid md:grid-cols-3 gap-12 mb-12 text-center md:text-left lg:text-left">

                    {/* BRAND */}
                    <div className="order-1 md:order-1">
                        <h3 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
                            Huddle
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Secure real-time chat. Built for teams who value privacy and speed.
                        </p>
                    </div>

                    {/* SOCIAL */}
                    <div className="order-3 md:order-2 flex flex-col items-center md:items-start">
                        <h4 className="text-slate-200 font-bold mb-6">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="group p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-110 shadow-xl hover:shadow-2xl">
                                <FaGithub className="w-5 h-5 text-slate-300 group-hover:text-white" />
                            </a>
                            <a href="#" className="group p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-110 shadow-xl hover:shadow-2xl">
                                <FaLinkedin className="w-5 h-5 text-slate-300 group-hover:text-[#0077B5]" />
                            </a>
                            <a href="#" className="group p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-110 shadow-xl hover:shadow-2xl">
                                <FaTwitter className="w-5 h-5 text-slate-300 group-hover:text-[#1DA1F2]" />
                            </a>
                            <a href="mailto:sciencexlldipankarsarkar@gmail.com" className="group p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-110 shadow-xl hover:shadow-2xl">
                                <FaEnvelope className="w-5 h-5 text-slate-300 group-hover:text-rose-400" />
                            </a>
                        </div>
                    </div>

                    {/* CONTACT */}
                    <div className="order-2 md:order-3">
                        <h4 className="text-slate-200 font-bold mb-6">Get in touch</h4>
                        <p className="text-slate-400 text-sm mb-4">sciencexlldipankarsarkar@gmail.com</p>
                        <p className="text-slate-400 text-sm">Malda, West Bengal</p>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="border-t border-white/10 pt-8 text-center text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} Huddle. Built with ❤️ by Dipankar Sarkar</p>
                    <p className="mt-2">Made with React • Node.js • Socket.IO</p>
                </div>
            </div>
        </footer>
    );
}
