const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el    = entry.target;
            const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
            setTimeout(() => el.classList.add('visible'), delay);
            observer.unobserve(el);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
