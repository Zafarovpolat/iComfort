// script.js - Обновленная версия
document.addEventListener('DOMContentLoaded', function () {

    // global.js (можно добавить в начало script.js)

    // --- 1. Мультиязычность ---
    const translations = {
        ru: {
            iphone: "iPhone", mac: "Mac", ipad: "iPad", watch: "Watch", airpods: "AirPods",
            buy: "Купить", more: "Подробнее",
            "cart-title": "Корзина", "checkout": "Оформить",
            "search-ph": "Поиск товаров...",
            "installment-title": "Рассрочка", "month": "мес."
        },
        uz: {
            iphone: "iPhone", mac: "Mac", ipad: "iPad", watch: "Watch", airpods: "AirPods",
            buy: "Sotib olish", more: "Batafsil",
            "cart-title": "Savatcha", "checkout": "Rasmiylashtirish",
            "search-ph": "Mahsulotlarni qidirish...",
            "installment-title": "Muddatli to'lov", "month": "oy"
        }
    };

    let currentLang = localStorage.getItem('lang') || 'ru';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.getElementById('lang-toggle').textContent = lang === 'ru' ? 'UZ' : 'RU'; // Показываем на какой переключить

        // Обновляем тексты
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Обновляем плейсхолдеры
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.placeholder = translations[lang]['search-ph'];
    }

    // --- 2. Темная тема ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.classList.replace('bx-moon', 'bx-sun');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.classList.replace('bx-sun', 'bx-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.classList.replace('bx-moon', 'bx-sun');
            }
        });
    }

    // --- 3. Переключатель языка ---
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.textContent = currentLang === 'ru' ? 'UZ' : 'RU';
        langBtn.addEventListener('click', () => {
            const newLang = currentLang === 'ru' ? 'uz' : 'ru';
            setLanguage(newLang);
            location.reload(); // Простая перезагрузка для обновления контента
        });
    }

    // Запуск перевода при загрузке
    document.addEventListener('DOMContentLoaded', () => {
        setLanguage(currentLang);
    });

    // --- Мобильное меню ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav__menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- Прилипающая шапка ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        });
    }

    // --- Корзина ---
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }

    // --- Поиск ---
    const searchIcon = document.getElementById('search-icon');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchClose = document.getElementById('search-close');
    const searchResults = document.getElementById('search-results');

    if (searchIcon && searchOverlay) {
        searchIcon.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            setTimeout(() => searchInput.focus(), 100);
        });

        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
        });

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
                searchInput.value = '';
                searchResults.innerHTML = '';
            }
        });

        // Закрытие по клику вне области
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
                searchInput.value = '';
                searchResults.innerHTML = '';
            }
        });

        // Живой поиск
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();

            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }

            searchTimeout = setTimeout(() => {
                const results = searchProducts(query);
                displaySearchResults(results);
            }, 300);
        });
    }

    function displaySearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-empty">Ничего не найдено</div>';
            return;
        }

        searchResults.innerHTML = results.slice(0, 6).map(product => `
            <a href="product.html?id=${product.id}" class="search-result-item">
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="search-result-info">
                    <h4>${product.name}</h4>
                    <p>${formatPrice(product.price)}</p>
                </div>
            </a>
        `).join('');
    }

    // --- Анимация при скролле ---
    initScrollAnimations();

    // --- Загрузка товаров на главной ---
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        const iphoneProducts = getProductsByCategory('iphone');
        productsGrid.innerHTML = iphoneProducts.map(product => `
            <a href="product.html?id=${product.id}" class="product-card animate-on-scroll">
                <div class="product-card__image-wrapper">
                    <img src="${product.images[0]}" 
                         alt="${product.name}" 
                         class="product-card__image"
                         data-category="${product.category}">
                </div>
                <h3 class="product-card__name">${product.name}</h3>
                ${product.colors.length > 0 ? `
                    <div class="product-card__colors">
                        ${product.colors.slice(0, 4).map(color => `
                            <span class="color-dot" style="background: ${color.value};"></span>
                        `).join('')}
                    </div>
                ` : ''}
                <p class="product-card__price">${formatPrice(product.price)}</p>
                <p class="product-card__credit">От ${formatPrice(product.creditPrice)}/мес</p>
            </a>
        `).join('');

        initScrollAnimations();
    }

    // --- Логика для страницы товара ---
    if (document.querySelector('.product-page')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (productId) {
            loadProductDetails(productId);
        } else {
            window.location.href = 'catalog.html';
        }
    }
});

// Инициализация анимаций скролла
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    scrollElements.forEach(el => observer.observe(el));
}

// Загрузка деталей товара
function loadProductDetails(productId) {
    const product = getProductById(productId);
    if (!product) {
        window.location.href = 'catalog.html';
        return;
    }

    // Обновить заголовок страницы
    document.title = `Купить ${product.name} — iComfort`;

    // Обновить изображение
    const mainImage = document.getElementById('main-product-image');
    if (mainImage) {
        mainImage.src = product.images[0];
        mainImage.setAttribute('data-category', product.category);
    }

    // Обновить название
    const titleEl = document.querySelector('.product-info__title');
    if (titleEl) titleEl.textContent = product.name;

    // Обновить описание
    const descEl = document.querySelector('.product-info__short-desc');
    if (descEl) descEl.textContent = product.description;

    // Обновить рейтинг
    const ratingEl = document.querySelector('.product-info__rating span');
    if (ratingEl) ratingEl.textContent = `(${product.rating}) ${product.reviewsCount} отзывов`;

    // Обновить цену
    const priceEl = document.querySelector('.price-main');
    if (priceEl) priceEl.textContent = formatPrice(product.price);

    const creditEl = document.querySelector('.price-credit');
    if (creditEl) creditEl.textContent = `или от ${formatPrice(product.creditPrice)}/мес`;

    // Цвета
    const colorSelector = document.querySelector('.color-selector');
    const colorLabel = document.querySelector('.option-label span');

    if (colorSelector && product.colors.length > 0) {
        if (colorLabel) colorLabel.textContent = product.colors[0].name;

        colorSelector.innerHTML = product.colors.map((color, index) => `
            <div class="color-option ${index === 0 ? 'active' : ''}" 
                 style="--color-value: ${color.value};"
                 data-img="${product.images[color.image] || product.images[0]}"
                 data-color-name="${color.name}"></div>
        `).join('');

        // Обработчики цветов
        const colorOptions = document.querySelectorAll('.color-option');
        const colorNameSpan = document.querySelector('.option-label span');

        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                document.querySelector('.color-option.active')?.classList.remove('active');
                option.classList.add('active');

                const newImageSrc = option.dataset.img;
                if (newImageSrc && mainImage) {
                    mainImage.style.opacity = '0';
                    setTimeout(() => {
                        mainImage.src = newImageSrc;
                        mainImage.style.opacity = '1';
                    }, 200);
                }

                if (colorNameSpan) {
                    colorNameSpan.textContent = option.dataset.colorName;
                }
            });
        });
    } else {
        // Скрыть блок выбора цвета если нет цветов
        const colorOptionsBlock = document.querySelector('.product-options');
        if (colorOptionsBlock) colorOptionsBlock.style.display = 'none';
    }

    // Память
    const textSelector = document.querySelector('.text-selector');
    if (textSelector && product.storage.length > 0) {
        textSelector.innerHTML = product.storage.map((storage, index) => `
            <div class="text-option ${index === 0 ? 'active' : ''}">${storage}</div>
        `).join('');

        const textOptions = document.querySelectorAll('.text-option');
        textOptions.forEach(option => {
            option.addEventListener('click', () => {
                document.querySelector('.text-option.active')?.classList.remove('active');
                option.classList.add('active');
            });
        });
    }

    // Кнопка "Добавить в корзину"
    const addToCartBtn = document.querySelector('.product-info__actions .btn--primary');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const selectedColor = document.querySelector('.color-option.active')?.dataset.colorName || null;
            const selectedStorage = document.querySelector('.text-option.active')?.textContent || null;

            cart.addItem(productId, selectedColor, selectedStorage);
        });
    }
}

// Форматирование цены
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price) + ' сум';
}