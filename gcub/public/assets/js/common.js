document.addEventListener("DOMContentLoaded", function () {
    // Load Header
    const headerPlaceholder = document.getElementById("common-header");
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
            <!-- Main Header -->
            <header class="bg-white py-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative z-20">
                <div class="container mx-auto px-4 md:px-6 flex justify-between items-center">
                    <div class="flex items-center gap-3 md:gap-4">
                        <!-- Logo Image Only -->
                        <a href="index.html">
                            <img src="assets/images/gcublogo.png" alt="GCUB Logo" class="h-8 md:h-12 object-contain">
                        </a>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button id="mobile-menu-btn" class="md:hidden text-[#003399] focus:outline-none">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7">
                            </path>
                        </svg>
                    </button>

                    <!-- Desktop Login Button -->
                    <button
                        class="hidden md:block bg-[#E61111] text-white px-8 py-2.5 rounded-md font-bold text-sm tracking-wide shadow-lg shadow-red-200 hover:bg-red-700 hover:shadow-red-300 transition transform active:scale-95">LOGIN</button>
                </div>
            </header>

            <!-- Navigation -->
            <nav class="bg-[#004085] text-white text-[13px] relative z-10 shadow-md">
                <div class="container mx-auto px-4 md:px-6">
                    <!-- Desktop Nav -->
                    <ul class="hidden md:flex items-center gap-8 py-3.5 font-medium tracking-wide">
                        <li><a href="index.html" class="hover:text-yellow-300 transition-colors duration-200">Home</a></li>
                        <li class="relative group cursor-pointer">
                            <a href="#"
                                class="hover:text-yellow-300 transition-colors duration-200 flex items-center gap-1">About Us
                                <span class="text-[10px] mt-0.5">▼</span></a>
                        </li>
                        <li><a href="#" class="hover:text-yellow-300 transition-colors duration-200">Deposits</a></li>
                        <li><a href="#" class="hover:text-yellow-300 transition-colors duration-200">Loans & Advances</a></li>
                        <li><a href="#" class="hover:text-yellow-300 transition-colors duration-200">Our Services</a></li>
                        <li><a href="#" class="hover:text-yellow-300 transition-colors duration-200">Gallery</a></li>
                        <li><a href="#" class="hover:text-yellow-300 transition-colors duration-200">Deaf Accs</a></li>
                        <li><a href="#" class="hover:text-yellow-300 transition-colors duration-200">Contact</a></li>
                        <li><a href="#" class="hover:text-yellow-300 transition-colors duration-200">Downloads</a></li>
                        <li><a href="#" class="hover:text-yellow-300 transition-colors duration-200">Branch Locator</a></li>
                    </ul>

                    <!-- Mobile Nav Menu (Hidden by default) -->
                    <div id="mobile-menu" class="hidden md:hidden py-4 border-t border-blue-800">
                        <ul class="flex flex-col gap-3 font-medium">
                            <li><a href="index.html" class="block py-1 hover:text-yellow-300">Home</a></li>
                            <li><a href="#" class="block py-1 hover:text-yellow-300">About Us</a></li>
                            <li><a href="#" class="block py-1 hover:text-yellow-300">Deposits</a></li>
                            <li><a href="#" class="block py-1 hover:text-yellow-300">Loans & Advances</a></li>
                            <li><a href="#" class="block py-1 hover:text-yellow-300">Our Services</a></li>
                            <li><a href="#" class="block py-1 hover:text-yellow-300">Contact</a></li>
                            <li><button
                                    class="mt-2 w-full bg-[#E61111] text-white px-4 py-2 rounded font-bold hover:bg-red-700">LOGIN</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;

        // Mobile Menu Logic
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
            });
        }
    }

    // Load Footer
    const footerPlaceholder = document.getElementById("common-footer");
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
            <footer class="bg-[#0b1320] text-gray-400 text-sm mt-12 py-8 text-center">
                <p>© 2026 The Guntur Co-operative Urban Bank Limited. All rights reserved.</p>
            </footer>
        `;
    }
});
