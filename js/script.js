document.addEventListener('DOMContentLoaded', () => {
    
    const elemenHTML = document.documentElement;
    const menuDropdown = document.getElementById('dropdown-menu');
    const burgerBtn = document.getElementById('burger-btn');
    const tautanMenuHp = document.querySelectorAll('.tautan-menu-hp a');
    const semuaTombolTema = document.querySelectorAll('.tombol-tema');
    
    // --- FUNGSI GANTI TEMA ---
    function updateIkonTema(isGelap) {
        document.querySelectorAll('.ikon-bulan').forEach(ikon => ikon.style.display = isGelap ? 'none' : 'block');
        document.querySelectorAll('.ikon-matahari').forEach(ikon => ikon.style.display = isGelap ? 'block' : 'none');
    }

    if (localStorage.getItem('tema') === 'gelap') {
        elemenHTML.setAttribute('data-tema', 'gelap');
        updateIkonTema(true);
    }

    // Klik Ganti Tema (Desktop & Mobile)
    semuaTombolTema.forEach(tombol => {
        tombol.addEventListener('click', (e) => {
            e.preventDefault();
            const temaSekarang = elemenHTML.getAttribute('data-tema');
            if (temaSekarang === 'gelap') {
                elemenHTML.removeAttribute('data-tema');
                localStorage.setItem('tema', 'terang');
                updateIkonTema(false);
            } else {
                elemenHTML.setAttribute('data-tema', 'gelap');
                localStorage.setItem('tema', 'gelap');
                updateIkonTema(true);
            }
        });
    });

    // --- LOGIKA BURGER MENU (= ke X) ---
    if (burgerBtn && menuDropdown) {
        burgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Menambah class 'aktif' akan memicu animasi X di CSS dan menampilkan menu
            burgerBtn.classList.toggle('aktif');
            menuDropdown.classList.toggle('aktif');
            document.body.classList.toggle('menu-open');
        });
    }

    // Tutup menu jika pengguna menekan link di dalamnya
    if (tautanMenuHp.length > 0) {
        tautanMenuHp.forEach(link => {
            link.addEventListener('click', () => {
                burgerBtn.classList.remove('aktif');
                menuDropdown.classList.remove('aktif');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // --- SMOOTH SCROLL NAVIGATION DENGAN OFFSET ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Skip jika hanya '#' atau '#' kosong
            if (href === '#' || href === '') return;

            const targetId = href.slice(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                
                // Offset untuk navbar fixed (110px padding-top dari .isi-halaman)
                let targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                
                if (targetId === 'beranda') {
                    // Jika ke beranda, scroll ke paling atas (0)
                    targetPosition = 0;
                } else {
                    const navbarHeight = 110;
                    targetPosition -= navbarHeight;
                }

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Tutup mobile menu jika terbuka
                if (burgerBtn && menuDropdown) {
                    burgerBtn.classList.remove('aktif');
                    menuDropdown.classList.remove('aktif');
                    document.body.classList.remove('menu-open');
                }
            }
        });
    });

    // --- LOGIKA AKORDION FAQ ---
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const kartuFaq = header.parentElement;
            const isOpen = kartuFaq.classList.contains('aktif');
            
            // Tutup semua akordion lain (opsional agar tidak menumpuk)
            document.querySelectorAll('.kartu-faq').forEach(k => k.classList.remove('aktif'));
            
            if (!isOpen) { 
                kartuFaq.classList.add('aktif'); 
            }
        });
    });

    // --- GANTI STATE NAVBAR SAAT SCROLL (FLOATING GLASSMORPHISM) ---
    const kepalaWeb = document.querySelector('.kepala-web');
    if (kepalaWeb) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                kepalaWeb.classList.add('scrolled');
            } else {
                kepalaWeb.classList.remove('scrolled');
            }
        });
    }
});