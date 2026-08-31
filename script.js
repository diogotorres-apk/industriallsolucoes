// NAVBAR MOBILE
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');

if (hamburger && navbarMenu) {
    hamburger.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
    });
}

// FECHAR MENU AO CLICAR EM LINK
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarMenu) {
            navbarMenu.classList.remove('active');
        }
    });
});

// ACTIVE LINK NO SCROLL
window.addEventListener('scroll', () => {
    let current = '';

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// FORM SUBMISSION
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const nome = formData.get('nome') || 'Cliente';
        const email = formData.get('email') || '';
        const telefone = formData.get('telefone') || '';
        const servico = formData.get('servico') || 'Não informado';
        const mensagem = formData.get('mensagem') || '';

        const text = encodeURIComponent(
            `Olá, Industriall Soluções!\n\n` +
            `Nome: ${nome}\n` +
            `E-mail: ${email}\n` +
            `Telefone: ${telefone}\n` +
            `Serviço: ${servico}\n\n` +
            `Mensagem:\n${mensagem}`
        );

        const whatsappNumber = '5599982755212';
        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');

        contactForm.reset();
    });
}

// CARROSSEL DA HERO SECTION
const heroSlides = Array.from(document.querySelectorAll('.hero-slide'));
const heroDots = Array.from(document.querySelectorAll('.dot'));
const heroPrev = document.querySelector('.hero-slider-btn.prev');
const heroNext = document.querySelector('.hero-slider-btn.next');
let currentSlide = 0;
let heroInterval;

function showHeroSlide(index) {
    if (!heroSlides.length) return;

    currentSlide = (index + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle('active', slideIndex === currentSlide);
    });

    heroDots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === currentSlide);
    });
}

function startHeroSlider() {
    if (!heroSlides.length) return;

    clearInterval(heroInterval);
    heroInterval = setInterval(() => {
        showHeroSlide(currentSlide + 1);
    }, 5000);
}

if (heroSlides.length) {
    showHeroSlide(0);
    startHeroSlider();

    heroPrev?.addEventListener('click', () => {
        showHeroSlide(currentSlide - 1);
        startHeroSlider();
    });

    heroNext?.addEventListener('click', () => {
        showHeroSlide(currentSlide + 1);
        startHeroSlider();
    });

    heroDots.forEach(dot => {
        dot.addEventListener('click', () => {
            showHeroSlide(Number(dot.getAttribute('data-slide')));
            startHeroSlider();
        });
    });
}

// BOTÃO VOLTAR AO TOPO
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopButton?.classList.add('visible');
    } else {
        backToTopButton?.classList.remove('visible');
    }
});

// ANIMAÇÃO AO SCROLL
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.servico-card, .area-card, .diferencial').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}