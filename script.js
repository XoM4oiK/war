document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    
    setupActiveNav();
    
    if (document.querySelector('.gallery-filters')) {
        setupGalleryFilters();
    }
});

function setupMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            mobileMenu.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav')) {
                navLinks.classList.remove('active');
                mobileMenu.textContent = '☰';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.textContent = '☰';
            });
        });
    }
}

function setupActiveNav() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function getCurrentPage() {
    const path = window.location.pathname;
    let currentPage = path.split('/').pop() || 'index.html';
    
    if (currentPage === '' || currentPage.endsWith('/')) {
        currentPage = 'index.html';
    }
    
    return currentPage;
}

function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');
    const activeFilterIndicator = document.querySelector('.active-filter-indicator');
    const indicatorValue = document.querySelector('.indicator-value');
    const indicatorCount = document.querySelector('.indicator-count');
    
    updateFilterCounts();
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            filterGallery(filterValue);
    
            updateActiveFilterIndicator(filterValue);
        });
    });
    
    function updateFilterCounts() {
        const counts = {
            'all': galleryCards.length,
            'veterans': document.querySelectorAll('[data-category*="veterans"]').length,
            'memorials': document.querySelectorAll('[data-category*="memorials"]').length,
            'archival': document.querySelectorAll('[data-category*="archival"]').length,
            'modern': document.querySelectorAll('[data-category*="modern"]').length
        };
        
        filterButtons.forEach(button => {
            const filter = button.getAttribute('data-filter');
            const countElement = button.querySelector('.filter-count');
            if (countElement) {
                countElement.textContent = counts[filter];
            }
        });
    }
    
    function filterGallery(filterValue) {
        let visibleCount = 0;
        
        galleryCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                visibleCount++;
                return;
            }
            
            const categories = card.getAttribute('data-category').split(' ');
            
            if (categories.includes(filterValue)) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (indicatorCount) {
            indicatorCount.textContent = `${visibleCount} фотографий`;
        }
        
        animateGalleryCards();
    }
    
    function updateActiveFilterIndicator(filterValue) {
        if (!indicatorValue) return;
        
        const filterNames = {
            'all': 'Все фото',
            'veterans': 'Ветераны',
            'memorials': 'Мемориалы',
            'archival': 'Архивные фото',
            'modern': 'Современные фото'
        };
        
        indicatorValue.textContent = filterNames[filterValue] || filterValue;
        
        if (activeFilterIndicator) {
            activeFilterIndicator.style.animation = 'none';
            void activeFilterIndicator.offsetWidth; 
            activeFilterIndicator.style.animation = 'slideInDown 0.5s ease';
        }
    }
    
    function animateGalleryCards() {
        galleryCards.forEach(card => {
            if (card.style.display !== 'none') {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }
        });
    }
    
    animateGalleryCards();
}

document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div style="text-align: center; color: white; margin-bottom: 50px;">
            <div style="font-size: 2.5rem; margin-bottom: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                Память Победы
            </div>
            <div style="font-size: 1.2rem; opacity: 0.9;">
                80 лет Великой Победы
            </div>
        </div>
        
        <div class="tank-loader">
            <div class="tank-track left-track"></div>
            <div class="tank-track right-track"></div>
            <div class="tank-body">
                <div class="tank-turret">
                    <div class="tank-gun"></div>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 40px; color: white; font-size: 1.1rem; text-align: center;">
            <div>Загружаем историю подвига...</div>
            <div style="margin-top: 10px; font-size: 0.9rem; opacity: 0.7;">Т-34 ведет наступление</div>
        </div>
    `;
    
    document.body.appendChild(preloader);

    const tankStyles = document.createElement('style');
    tankStyles.textContent = `
        .tank-loader {
            position: relative;
            width: 120px;
            height: 60px;
            animation: tankMove 3s ease-in-out infinite;
        }
        
        .tank-body {
            position: absolute;
            width: 80px;
            height: 40px;
            background: linear-gradient(135deg, #4a4a4a, #2a2a2a);
            border-radius: 8px;
            top: 10px;
            left: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            border: 2px solid #5a5a5a;
        }
        
        .tank-turret {
            position: absolute;
            width: 50px;
            height: 30px;
            background: linear-gradient(135deg, #5a5a5a, #3a3a3a);
            border-radius: 6px;
            top: -15px;
            left: 15px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.3);
            border: 2px solid #6a6a6a;
        }
        
        .tank-gun {
            position: absolute;
            width: 30px;
            height: 8px;
            background: linear-gradient(135deg, #6a6a6a, #4a4a4a);
            border-radius: 4px;
            top: 11px;
            right: -25px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .tank-track {
            position: absolute;
            width: 100px;
            height: 15px;
            background: linear-gradient(135deg, #333, #222);
            border-radius: 3px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        
        .left-track {
            top: 0;
            left: 0;
            animation: trackMove 0.8s linear infinite;
        }
        
        .right-track {
            bottom: 0;
            right: 0;
            animation: trackMove 0.8s linear infinite reverse;
        }
        
        .tank-track::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                90deg,
                transparent,
                transparent 8px,
                #ffd700 8px,
                #ffd700 12px
            );
            animation: trackPattern 0.4s linear infinite;
        }
        
        @keyframes tankMove {
            0% {
                transform: translateX(-50px) scale(0.9);
            }
            25% {
                transform: translateX(0) scale(1);
            }
            50% {
                transform: translateX(50px) scale(0.9);
            }
            75% {
                transform: translateX(0) scale(1);
            }
            100% {
                transform: translateX(-50px) scale(0.9);
            }
        }
        
        @keyframes trackMove {
            0% {
                background-position: 0 0;
            }
            100% {
                background-position: 20px 0;
            }
        }
        
        @keyframes trackPattern {
            0% {
                background-position: 0 0;
            }
            100% {
                background-position: 12px 0;
            }
        }
        
        .tank-body::after {
            content: '★';
            position: absolute;
            top: 5px;
            right: 5px;
            color: #ffd700;
            font-size: 12px;
            text-shadow: 0 0 3px rgba(255,215,0,0.5);
        }
        
        @media (max-width: 768px) {
            .tank-loader {
                transform: scale(0.8);
            }
        }
    `;
    document.head.appendChild(tankStyles);

    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(preloader)) {
                    document.body.removeChild(preloader);
                }
            }, 800);
        }, 2000); 
    });
});

document.addEventListener('DOMContentLoaded', function() {

    const animatedCards = document.querySelectorAll('.writer-card, .film-card, .music-card, .hero-card, .event-card, .about-card, .access-card, .symbol-card');
    
    if (animatedCards.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        animatedCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
});