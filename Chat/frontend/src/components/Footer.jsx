export default function Footer() {
    return (
        <footer className="w-full border-t border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} Huddle. All rights reserved.
            </div>
        </footer>
    );
}
