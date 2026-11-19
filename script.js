document.addEventListener("DOMContentLoaded", () => {
    // 1. Toggle Menu Mobile
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // Tutup menu mobile saat link diklik
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });

    // 2. Animasi Muncul Saat Scroll (Scroll Reveal)
    const revealElements = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 80) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Jalankan sekali saat halaman pertama dibuka

    // 3. Animasi Hitung Angka Klien (1.234)
    const counterElement = document.querySelector(".client-number");
    let hasCounted = false;

    const animateCounter = () => {
        if (!counterElement || hasCounted) return;
        const rect = counterElement.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            hasCounted = true;
            const target = 1234;
            const duration = 1800; // 1.8 detik
            const startTime = performance.now();

            const updateNumber = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Easing function agar melambat di akhir
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeOut * target);

                // Format titik ribuan ala Indonesia (1.234)
                counterElement.textContent = currentVal.toLocaleString("id-ID");

                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    counterElement.textContent = "1.234";
                }
            };

            requestAnimationFrame(updateNumber);
        }
    };

    window.addEventListener("scroll", animateCounter);
    animateCounter();
});