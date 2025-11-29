document.addEventListener('DOMContentLoaded', () => {
    
    // --- DESKTOP STICKY NAVBAR LOGIC ---
    const navbar = document.getElementById('navbar');
    const hero = document.querySelector('.hero-section');

    const sectionOneOptions = {
        rootMargin: "0px 0px 0px 0px"
    };

    const sectionOneObserver = new IntersectionObserver(function(entries, sectionOneObserver) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                navbar.classList.add('is-sticky');
            } else {
                if (window.scrollY < hero.offsetHeight * 0.95) {
                    navbar.classList.remove('is-sticky');
                }
            }
        });
    }, sectionOneOptions);

    if (window.matchMedia('(min-width: 769px)').matches) {
        if (hero) {
            sectionOneObserver.observe(hero);
        }
    }

    // --- MOBILE MENU LOGIC ---
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileLinks = document.querySelectorAll('.m-link');

    if (mobileToggle && mobileOverlay) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : 'auto';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    } else {
        console.error("Mobile navigation elements not found. Check IDs 'mobileToggle' and 'mobileOverlay'.");
    }

    // =========================================
    // --- SKILL LIST DYNAMIC HEIGHT CALCULATION (for perfect CSS loop) ---
    // =========================================
    function setSkillListHeight() {
        const skillList = document.getElementById('skillList');
        if (skillList) {
            // We need to calculate the height of *one full cycle* of the original skills.
            // Assuming the first 7 items are your unique skills, we sum their height.
            let uniqueSkillsHeight = 0;
            const uniqueSkillCount = 7; // Adjust this if your primary skill count changes
            for (let i = 0; i < uniqueSkillCount; i++) {
                if (skillList.children[i]) {
                    uniqueSkillsHeight += skillList.children[i].offsetHeight;
                }
            }
            document.documentElement.style.setProperty('--list-height', `${uniqueSkillsHeight}px`);
        }
    }

    // Recalculate on load and resize
    window.addEventListener('load', setSkillListHeight);
    window.addEventListener('resize', setSkillListHeight);
});