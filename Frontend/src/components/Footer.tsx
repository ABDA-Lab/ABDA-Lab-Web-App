'use client';
export default function Footer() {
    return (
        <footer className="bg-slate-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    {/* Logo and Description */}
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-lg font-bold">ABDA Lab</h2>
                        <p className="text-sm">Advancing Boundaries of Data and AI</p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                        <a href="/about" className="text-sm hover:underline">
                            About Us
                        </a>
                        <a href="/research" className="text-sm hover:underline">
                            Research
                        </a>
                        <a href="/contact" className="text-sm hover:underline">
                            Contact
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-4 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} ABDA Lab. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
