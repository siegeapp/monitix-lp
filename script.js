// Language Configuration
const languageConfig = {
    en: { flag: '🇺🇸', name: 'EN' },
    pt: { flag: '🇧🇷', name: 'PT' },
    es: { flag: '🇪🇸', name: 'ES' },
    fr: { flag: '🇫🇷', name: 'FR' },
    de: { flag: '🇩🇪', name: 'DE' },
    it: { flag: '🇮🇹', name: 'IT' },
    zh: { flag: '🇨🇳', name: 'ZH' },
    ja: { flag: '🇯🇵', name: 'JA' },
    ru: { flag: '🇷🇺', name: 'RU' },
    ko: { flag: '🇰🇷', name: 'KO' },
    ar: { flag: '🇸🇦', name: 'AR' },
    hi: { flag: '🇮🇳', name: 'HI' }
};

// Get language from URL parameter or browser
function getDefaultLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    
    if (urlLang && translations[urlLang]) {
        return urlLang;
    }
    
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0];
    
    return translations[langCode] ? langCode : 'en';
}

// Change Language Function
function changeLanguage(lang) {
    if (!translations[lang]) {
        console.error('Language not found:', lang);
        return;
    }
    
    // Update URL parameter
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.pushState({}, '', url);
    
    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update document language attribute
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'META') {
                element.setAttribute('content', translations[lang][key]);
            } else if (element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translations[lang][key]);
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update language selector
    const currentFlag = document.getElementById('currentFlag');
    const currentLang = document.getElementById('currentLang');
    if (currentFlag && currentLang && languageConfig[lang]) {
        currentFlag.textContent = languageConfig[lang].flag;
        currentLang.textContent = languageConfig[lang].name;
    }
    
    // Update page title
    if (translations[lang].meta_title) {
        document.title = translations[lang].meta_title;
    }
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && translations[lang].meta_description) {
        metaDescription.setAttribute('content', translations[lang].meta_description);
    }
    
    // Update Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && translations[lang].meta_title) {
        ogTitle.setAttribute('content', translations[lang].meta_title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && translations[lang].meta_description) {
        ogDescription.setAttribute('content', translations[lang].meta_description);
    }
    
    // Update Twitter meta tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle && translations[lang].meta_title) {
        twitterTitle.setAttribute('content', translations[lang].meta_title);
    }
    
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription && translations[lang].meta_description) {
        twitterDescription.setAttribute('content', translations[lang].meta_description);
    }
    
    // Close dropdown
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
    
    const languageBtn = document.getElementById('languageBtn');
    if (languageBtn) {
        languageBtn.classList.remove('active');
    }
    
    // Adjust RTL for Arabic
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }
}

// Toggle Language Dropdown
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    const languageBtn = document.getElementById('languageBtn');
    
    if (dropdown && languageBtn) {
        dropdown.classList.toggle('active');
        languageBtn.classList.toggle('active');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Get preferred language
    const savedLang = localStorage.getItem('preferredLanguage');
    const defaultLang = savedLang || getDefaultLanguage();
    
    // Apply language
    changeLanguage(defaultLang);
    
    // Setup language button
    const languageBtn = document.getElementById('languageBtn');
    if (languageBtn) {
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleLanguageDropdown();
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('languageDropdown');
        const languageBtn = document.getElementById('languageBtn');
        
        if (dropdown && languageBtn) {
            if (!languageBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
                languageBtn.classList.remove('active');
            }
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .perfect-card, .why-item, .pricing-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
    
    // Track button clicks for analytics (you can integrate with Google Analytics)
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            console.log('Button clicked:', buttonText);
            // Add your analytics tracking code here
            // Example: gtag('event', 'button_click', { button_name: buttonText });
        });
    });
    
    // Add hover effect to demo items
    const demoItems = document.querySelectorAll('.demo-item');
    demoItems.forEach((item, index) => {
        setInterval(() => {
            item.style.transform = 'scale(1.02)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 200);
        }, 3000 + (index * 500));
    });
});

// Handle browser back/forward navigation
window.addEventListener('popstate', function() {
    const lang = getDefaultLanguage();
    changeLanguage(lang);
});

// Detect language change from other tabs
window.addEventListener('storage', function(e) {
    if (e.key === 'preferredLanguage' && e.newValue) {
        changeLanguage(e.newValue);
    }
});

// Add loading state
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Performance optimization: Lazy load images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    // Escape key closes language dropdown
    if (e.key === 'Escape') {
        const dropdown = document.getElementById('languageDropdown');
        const languageBtn = document.getElementById('languageBtn');
        if (dropdown && languageBtn) {
            dropdown.classList.remove('active');
            languageBtn.classList.remove('active');
        }
    }
});

// Prevent console errors in production
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    console.log = function() {};
    console.error = function() {};
    console.warn = function() {};
}

