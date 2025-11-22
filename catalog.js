// catalog.js - Обновленная версия
document.addEventListener('DOMContentLoaded', function () {
    const productsGrid = document.getElementById('catalog-products-grid');
    const productsCount = document.getElementById('products-count');
    const catalogTitle = document.getElementById('catalog-title');
    const currentCategorySpan = document.getElementById('current-category');
    const sortSelect = document.getElementById('sort-select');
    const categoryRadios = document.querySelectorAll('input[name="category"]');

    // Получить параметры из URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    let currentCategory = categoryParam || 'all';
    let currentSort = 'default';

    // Названия категорий
    const categoryNames = {
        'all': 'Все товары',
        'iphone': 'iPhone',
        'mac': 'Mac',
        'ipad': 'iPad',
        'watch': 'Apple Watch',
        'airpods': 'AirPods',
        'accessories': 'Аксессуары'
    };

    // Инициализация
    function init() {
        // Установить активную категорию
        if (categoryParam) {
            const radio = document.querySelector(`input[name="category"][value="${categoryParam}"]`);
            if (radio) radio.checked = true;
        }

        updateCatalog();
    }

    // Обработчики событий
    categoryRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentCategory = e.target.value;
            updateURL();
            updateCatalog();
        });
    });

    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        updateCatalog();
    });

    // Обновить URL
    function updateURL() {
        if (currentCategory === 'all') {
            window.history.pushState({}, '', 'catalog.html');
        } else {
            window.history.pushState({}, '', `catalog.html?category=${currentCategory}`);
        }
    }

    // Обновить каталог
    function updateCatalog() {
        let products = currentCategory === 'all'
            ? getAllProducts()
            : getProductsByCategory(currentCategory);

        // Сортировка
        products = sortProducts(products, currentSort);

        // Обновить заголовок
        catalogTitle.textContent = categoryNames[currentCategory] || 'Каталог';
        currentCategorySpan.textContent = categoryNames[currentCategory] || 'Каталог';

        // Обновить счетчик
        productsCount.textContent = `Найдено товаров: ${products.length}`;

        // Отобразить товары
        renderProducts(products);
    }

    // Сортировка товаров
    function sortProducts(products, sortType) {
        const sorted = [...products];

        switch (sortType) {
            case 'price-asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'name':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            default:
                return sorted;
        }
    }

    // Отобразить товары
    function renderProducts(products) {
        if (products.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <i class='bx bx-package'></i>
                    <p>Товары не найдены</p>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = products.map(product => `
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

        // Переинициализация анимаций
        initScrollAnimations();
    }

    // Форматирование цены
    function formatPrice(price) {
        return new Intl.NumberFormat('ru-RU').format(price) + ' сум';
    }

    // Инициализация анимаций
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

    // Запуск
    init();
});