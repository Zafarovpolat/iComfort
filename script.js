document.addEventListener('DOMContentLoaded', function () {

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

    // --- Анимация при скролле ---
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

    // --- Логика для страницы товара ---
    if (document.querySelector('.product-page')) {
        const colorOptions = document.querySelectorAll('.color-option');
        const mainProductImage = document.getElementById('main-product-image');
        const colorNameSpan = document.querySelector('.option-label span');

        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Смена активного класса
                document.querySelector('.color-option.active').classList.remove('active');
                option.classList.add('active');

                // Смена изображения
                const newImageSrc = option.dataset.img;
                if (newImageSrc && mainProductImage) {
                    mainProductImage.style.opacity = '0';
                    setTimeout(() => {
                        mainProductImage.src = newImageSrc;
                        mainProductImage.style.opacity = '1';
                    }, 200);
                }

                // Смена названия цвета
                const newColorName = option.dataset.colorName;
                if (newColorName && colorNameSpan) {
                    colorNameSpan.textContent = newColorName;
                }
            });
        });

        const textOptions = document.querySelectorAll('.text-option');
        textOptions.forEach(option => {
            option.addEventListener('click', () => {
                document.querySelector('.text-option.active').classList.remove('active');
                option.classList.add('active');
            });
        });
    }
});