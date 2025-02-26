document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate sections on scroll
    document.querySelectorAll('.feature-card, .staff-member, .section-divider').forEach((element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        scrollObserver.observe(element);
    });

    // Dynamic banner glow effect
    const banner = document.querySelector('.banner-container');
    if (banner) {
        banner.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = banner.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            const glowStrength = 30;
            const xOffset = (x - 0.5) * glowStrength;
            const yOffset = (y - 0.5) * glowStrength;
            
            banner.style.setProperty('--glow-position', `${xOffset}px ${yOffset}px`);
        });
    }

    // Parallax scroll effect for banner
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const banner = document.querySelector('.banner');
        const tagline = document.querySelector('.tagline');
        
        if (banner && tagline) {
            banner.style.transform = `translateY(${scrolled * 0.5}px)`;
            tagline.style.transform = `translate(-50%, ${-50 + (scrolled * 0.2)}%)`;
        }
    });

    // Mobile menu handling
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navbar.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navbar.classList.remove('menu-open');
        });
    });

    // Enhanced scroll handling for navbar
    let lastScroll = 0;
    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            if (currentScroll > lastScroll) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    };
    
    window.addEventListener('scroll', handleScroll);

    // Parallax effect for banner
    const bannerWrapper = document.querySelector('.banner-wrapper');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (bannerWrapper && heroContent) {
            bannerWrapper.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Dynamic particle creation
    const createParticles = () => {
        const container = document.querySelector('.particle-container');
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `-${Math.random() * 15}s`;
            container.appendChild(particle);
        }
    };
    createParticles();

    // Staff section animations
    const staffObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                staffObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.staff-category').forEach(category => {
        staffObserver.observe(category);
    });

    // Optional: Add hover effect for member cards
    document.querySelectorAll('.staff-member').forEach(member => {
        member.addEventListener('mouseenter', () => {
            const glow = member.querySelector('.image-glow');
            if (glow) {
                glow.style.opacity = '1';
            }
        });

        member.addEventListener('mouseleave', () => {
            const glow = member.querySelector('.image-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
    });

    // Modal handling
    const modal = document.getElementById('comingSoonModal');
    const comingSoonLinks = document.querySelectorAll('.coming-soon');
    
    comingSoonLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });
    });

    // Close modal when clicking the close button
    const closeButton = modal.querySelector('.modal-close');
    closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}); 
