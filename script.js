/* ===================================
   Arie Skipper & Chef - Scripts
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // --- Mobile menu toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Language switcher toggle (mobile) ---
    const langToggle = document.querySelector('.lang-toggle');
    const navLang = document.querySelector('.nav-lang');
    if (langToggle && navLang) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLang.classList.toggle('open');
        });
        document.addEventListener('click', () => {
            navLang.classList.remove('open');
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 10;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });

    // --- Scroll animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for grid items
                const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
                const siblingIndex = Array.from(siblings).indexOf(entry.target);
                const delay = siblingIndex * 100;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // --- Active nav link on scroll ---
    const sections = document.querySelectorAll('section[id]');

    const highlightNav = () => {
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    // --- Contact form handling ---
    const contactForm = document.getElementById('contactForm');
    const pageLang = document.documentElement.lang || 'he';

    const formStrings = {
        he: { greeting: 'שלום אריה, אני', phone: 'טלפון', interested: 'מעוניין/ת ב', msg: 'הודעה', success: 'הפנייה נשלחה!', redirect: 'מעבירים אתכם לוואטסאפ לתיאום מהיר...' },
        en: { greeting: 'Hello Arie, my name is', phone: 'Phone', interested: 'Interested in', msg: 'Message', success: 'Inquiry sent!', redirect: 'Redirecting you to WhatsApp...' },
        fr: { greeting: 'Bonjour Arie, je suis', phone: 'Téléphone', interested: 'Intéressé(e) par', msg: 'Message', success: 'Demande envoyée !', redirect: 'Redirection vers WhatsApp...' },
        ru: { greeting: 'Здравствуйте Арье, меня зовут', phone: 'Телефон', interested: 'Интересует', msg: 'Сообщение', success: 'Запрос отправлен!', redirect: 'Перенаправляем в WhatsApp...' },
        ar: { greeting: 'مرحباً آريه، أنا', phone: 'هاتف', interested: 'مهتم/ة بـ', msg: 'رسالة', success: 'تم إرسال الطلب!', redirect: 'جاري تحويلكم إلى واتساب...' }
    };

    const strings = formStrings[pageLang] || formStrings.he;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        // Build WhatsApp message
        let waMessage = `${strings.greeting} ${name}.%0A`;
        waMessage += `${strings.phone}: ${phone}%0A`;

        if (service) {
            const serviceOption = document.getElementById('service');
            const serviceText = serviceOption.options[serviceOption.selectedIndex].text;
            waMessage += `${strings.interested}: ${serviceText}%0A`;
        }

        if (message) {
            waMessage += `${strings.msg}: ${message}`;
        }

        // Show success message
        const formWrapper = document.querySelector('.contact-form-wrapper');
        formWrapper.innerHTML = `
            <div class="form-success">
                <div class="form-success-icon">&#9989;</div>
                <h3>${strings.success}</h3>
                <p>${strings.redirect}</p>
            </div>
        `;

        // Open WhatsApp
        setTimeout(() => {
            window.open(`https://wa.me/9720585731509?text=${waMessage}`, '_blank');
        }, 1000);
    });

    // --- Gallery infinite scroll (duplicate items for seamless loop) ---
    const galleryScroll = document.querySelector('.gallery-scroll');
    if (galleryScroll) {
        const items = galleryScroll.innerHTML;
        galleryScroll.innerHTML = items + items;
    }

    // --- Parallax effect on hero (subtle) ---
    const heroBg = document.querySelector('.hero-bg-img');
    if (heroBg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.05)`;
            }
        });
    }

    // --- Cookie Consent ---
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieDecline = document.getElementById('cookieDecline');

    if (cookieBanner) {
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (!cookieConsent) {
            setTimeout(() => cookieBanner.classList.add('visible'), 1500);
        }

        if (cookieAccept) {
            cookieAccept.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'accepted');
                cookieBanner.classList.remove('visible');
            });
        }

        if (cookieDecline) {
            cookieDecline.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'declined');
                cookieBanner.classList.remove('visible');
            });
        }
    }

    // --- Accessibility Toolbar ---
    const a11yToggle = document.getElementById('a11yToggle');
    const a11yPanel = document.getElementById('a11yPanel');
    const a11yClose = document.getElementById('a11yClose');

    if (a11yToggle && a11yPanel) {
        a11yToggle.addEventListener('click', () => {
            a11yPanel.classList.toggle('open');
        });

        if (a11yClose) {
            a11yClose.addEventListener('click', () => {
                a11yPanel.classList.remove('open');
            });
        }

        // Load saved preferences
        const savedA11y = JSON.parse(localStorage.getItem('a11yPrefs') || '{}');
        let currentFontSize = savedA11y.fontSize || 100;
        document.documentElement.style.fontSize = currentFontSize + '%';

        if (savedA11y.highContrast) document.body.classList.add('a11y-high-contrast');
        if (savedA11y.grayscale) document.body.classList.add('a11y-grayscale');
        if (savedA11y.underlineLinks) document.body.classList.add('a11y-underline-links');
        if (savedA11y.readableFont) document.body.classList.add('a11y-readable-font');

        // Update active states
        const updateButtonStates = () => {
            document.querySelectorAll('.a11y-btn[data-action]').forEach(btn => {
                const action = btn.getAttribute('data-action');
                btn.classList.remove('active');
                if (action === 'high-contrast' && savedA11y.highContrast) btn.classList.add('active');
                if (action === 'grayscale' && savedA11y.grayscale) btn.classList.add('active');
                if (action === 'underline-links' && savedA11y.underlineLinks) btn.classList.add('active');
                if (action === 'readable-font' && savedA11y.readableFont) btn.classList.add('active');
            });
        };
        updateButtonStates();

        const savePrefs = () => {
            localStorage.setItem('a11yPrefs', JSON.stringify(savedA11y));
            updateButtonStates();
        };

        document.querySelectorAll('.a11y-btn[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');

                switch (action) {
                    case 'font-increase':
                        if (currentFontSize < 150) {
                            currentFontSize += 10;
                            document.documentElement.style.fontSize = currentFontSize + '%';
                            savedA11y.fontSize = currentFontSize;
                        }
                        break;
                    case 'font-decrease':
                        if (currentFontSize > 80) {
                            currentFontSize -= 10;
                            document.documentElement.style.fontSize = currentFontSize + '%';
                            savedA11y.fontSize = currentFontSize;
                        }
                        break;
                    case 'high-contrast':
                        document.body.classList.toggle('a11y-high-contrast');
                        savedA11y.highContrast = document.body.classList.contains('a11y-high-contrast');
                        break;
                    case 'grayscale':
                        document.body.classList.toggle('a11y-grayscale');
                        savedA11y.grayscale = document.body.classList.contains('a11y-grayscale');
                        break;
                    case 'underline-links':
                        document.body.classList.toggle('a11y-underline-links');
                        savedA11y.underlineLinks = document.body.classList.contains('a11y-underline-links');
                        break;
                    case 'readable-font':
                        document.body.classList.toggle('a11y-readable-font');
                        savedA11y.readableFont = document.body.classList.contains('a11y-readable-font');
                        break;
                    case 'reset':
                        currentFontSize = 100;
                        document.documentElement.style.fontSize = '100%';
                        document.body.classList.remove('a11y-high-contrast', 'a11y-grayscale', 'a11y-underline-links', 'a11y-readable-font');
                        savedA11y.fontSize = 100;
                        savedA11y.highContrast = false;
                        savedA11y.grayscale = false;
                        savedA11y.underlineLinks = false;
                        savedA11y.readableFont = false;
                        break;
                }
                savePrefs();
            });
        });
    }
});
