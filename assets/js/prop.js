 // Typed text effect
        const phrases = ['> HAI,Dev here!', '> .', '> Let\'s create together.'];
        let pi = 0, ci = 0, del = false;
        function type() {
            const el = document.getElementById('typed-text');
            if (!el) return;
            const phrase = phrases[pi];
            if (!del) {
                el.textContent = phrase.slice(0, ++ci);
                if (ci === phrase.length) { del = true; setTimeout(type, 2000); return; }
            } else {
                el.textContent = phrase.slice(0, --ci);
                if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
            }
            setTimeout(type, del ? 40 : 80);
        }
        type();

        // Mobile menu
        function toggleMobile() { document.getElementById('mobile-menu').classList.toggle('open'); }
        function closeMobile() { document.getElementById('mobile-menu').classList.remove('open'); }

        // Scroll reveal
        const observer = new IntersectionObserver(entries => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    e.target.style.transitionDelay = (i * 0.05) + 's';
                    e.target.classList.add('visible');
                    // Trigger skill bars
                    e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                        bar.style.width = bar.dataset.width + '%';
                    });
                }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Also observe skill bars directly
        const skillObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
                    });
                }
            });
        }, { threshold: 0.3 });
        document.getElementById('skill-bars') && skillObserver.observe(document.getElementById('skill-bars'));

        // Counter animation
        function animateCounter(el) {
            const target = parseInt(el.dataset.count);
            let current = 0;
            const step = Math.ceil(target / 40);
            const timer = setInterval(() => {
                current = Math.min(current + step, target);
                el.textContent = current + (target >= 10 ? '+' : '');
                if (current >= target) clearInterval(timer);
            }, 40);
        }
        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    document.querySelectorAll('[data-count]').forEach(animateCounter);
                    counterObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });
        const statsEl = document.querySelector('[data-count]');
        if (statsEl) counterObserver.observe(statsEl);

        // Project filter
        function filterProjects(cat) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            document.querySelector(`[data-filter="${cat}"]`).classList.add('active');
            document.querySelectorAll('.project-card').forEach(card => {
                const match = cat === 'all' || card.dataset.cat === cat;
                card.style.opacity = match ? '1' : '0.2';
                card.style.pointerEvents = match ? 'auto' : 'none';
                card.style.transform = match ? '' : 'scale(0.95)';
                card.style.transition = 'opacity 0.4s, transform 0.4s';
            });
        }

        // Send message
        function sendMessage() {
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const msg = document.getElementById('form-message').value;
            if (!name || !email || !msg) { alert('Please fill all fields.'); return; }
            const toast = document.getElementById('toast');
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
            document.getElementById('form-name').value = '';
            document.getElementById('form-email').value = '';
            document.getElementById('form-subject').value = '';
            document.getElementById('form-message').value = '';
        }

        // Active nav on scroll
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
            document.querySelectorAll('.nav-link').forEach(l => {
                l.style.color = l.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
            });
        });