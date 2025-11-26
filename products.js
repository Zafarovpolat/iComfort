// products.js - База данных товаров
const productsDatabase = {
    "iphone-15-pro": {
        id: "iphone-15-pro",
        name: "iPhone 15 Pro",
        category: "iphone",
        shortDesc: "Титановый. Прочный. Лёгкий. Про.",
        description: "Новая эра производительности и дизайна.",
        price: 14999000,
        oldPrice: null,
        creditPrice: 1249916,
        rating: 5.0,
        reviewsCount: 234,
        images: [
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845699233",
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845697693",
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-whitetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845698048",
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845696124"
        ],
        colors: [
            { name: "Natural Titanium", value: "#8A857B", image: 0 },
            { name: "Blue Titanium", value: "#444F5A", image: 1 },
            { name: "White Titanium", value: "#F1F2ED", image: 2 },
            { name: "Black Titanium", value: "#464646", image: 3 }
        ],
        storage: ["128GB", "256GB", "512GB", "1TB"],
        inStock: true,
        isNew: true,
        isFeatured: true
    },
    "iphone-15": {
        id: "iphone-15",
        name: "iPhone 15",
        category: "iphone",
        shortDesc: "Новый взгляд на iPhone",
        description: "Dynamic Island. Камера 48 МП. USB-C.",
        price: 11499000,
        oldPrice: null,
        creditPrice: 958250,
        rating: 4.8,
        reviewsCount: 189,
        images: [
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777972",
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777988",
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-yellow?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923778559",
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-green?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777911"
        ],
        colors: [
            { name: "Blue", value: "#A6C2DE", image: 0 },
            { name: "Pink", value: "#F8D4D6", image: 1 },
            { name: "Yellow", value: "#F5E488", image: 2 },
            { name: "Green", value: "#D3E5C4", image: 3 }
        ],
        storage: ["128GB", "256GB", "512GB"],
        inStock: true,
        isNew: true,
        isFeatured: true
    },
    "iphone-14": {
        id: "iphone-14",
        name: "iPhone 14",
        category: "iphone",
        shortDesc: "Большой и красивый",
        description: "Дисплей 6.1 дюйма. Продвинутая камера.",
        price: 9999000,
        oldPrice: null,
        creditPrice: 833250,
        rating: 4.7,
        reviewsCount: 456,
        images: [
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661027786876"
        ],
        colors: [
            { name: "Midnight", value: "#2E3642", image: 0 },
            { name: "Starlight", value: "#F0E5D3", image: 0 },
            { name: "Blue", value: "#C2D5ED", image: 0 },
            { name: "Purple", value: "#E5DDEA", image: 0 }
        ],
        storage: ["128GB", "256GB", "512GB"],
        inStock: true,
        isNew: false,
        isFeatured: false
    },
    "iphone-se": {
        id: "iphone-se",
        name: "iPhone SE",
        category: "iphone",
        shortDesc: "Много возможностей. Доступная цена.",
        description: "Чип A15 Bionic. 5G.",
        price: 6499000,
        oldPrice: null,
        creditPrice: 541583,
        rating: 4.5,
        reviewsCount: 678,
        images: [
            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-finish-select-202207-starlight?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1655312332921"
        ],
        colors: [
            { name: "Midnight", value: "#2E3642", image: 0 },
            { name: "Starlight", value: "#F0E5D3", image: 0 },
            { name: "Red", value: "#E3343A", image: 0 }
        ],
        storage: ["64GB", "128GB", "256GB"],
        inStock: true,
        isNew: false,
        isFeatured: false
    },
    "macbook-air-m2": {
        id: "macbook-air-m2",
        name: "MacBook Air M2",
        category: "mac",
        shortDesc: "Невероятно тонкий. Невероятно мощный.",
        description: "Чип M2. Дисплей Liquid Retina 13.6 дюйма.",
        price: 16999000,
        oldPrice: null,
        creditPrice: 1416583,
        rating: 4.9,
        reviewsCount: 234,
        images: [
            "https://zafarovpolat.github.io/iComfort-TG/78dee88a5e4c15a0b747ff147d682f4e2025011219155911879ENm8ajLjV7.jpg%20(1).png"
        ],
        colors: [
            { name: "Midnight", value: "#2E3642", image: 0 },
            { name: "Starlight", value: "#F0E5D3", image: 0 },
            { name: "Silver", value: "#E3E4E6", image: 0 },
            { name: "Space Gray", value: "#4B4B4B", image: 0 }
        ],
        storage: ["256GB", "512GB", "1TB", "2TB"],
        inStock: true,
        isNew: true,
        isFeatured: true
    },
    "ipad-pro": {
        id: "ipad-pro",
        name: "iPad Pro",
        category: "ipad",
        shortDesc: "Максимальные возможности iPad.",
        description: "Чип M2. Дисплей 12.9 дюйма.",
        price: 13999000,
        oldPrice: null,
        creditPrice: 1166583,
        rating: 4.8,
        reviewsCount: 156,
        images: [
            "https://zafarovpolat.github.io/iComfort-TG/ipad-pro-13-select-wifi-spaceblack-202405-Photoroom.png"
        ],
        colors: [
            { name: "Space Gray", value: "#4B4B4B", image: 0 },
            { name: "Silver", value: "#E3E4E6", image: 0 }
        ],
        storage: ["128GB", "256GB", "512GB", "1TB", "2TB"],
        inStock: true,
        isNew: true,
        isFeatured: true
    },
    "apple-watch-series-9": {
        id: "apple-watch-series-9",
        name: "Apple Watch Series 9",
        category: "watch",
        shortDesc: "Умнее. Ярче. Мощнее.",
        description: "Новый чип S9. Яркий дисплей.",
        price: 5999000,
        oldPrice: null,
        creditPrice: 499916,
        rating: 4.7,
        reviewsCount: 345,
        images: [
            "./smart-chasy-apple-watch-series-10-gps-46mm-jet-black-aluminium-case-with-black-sport-band-sm-Photoroom.png"
        ],
        colors: [
            { name: "Midnight", value: "#2E3642", image: 0 },
            { name: "Starlight", value: "#F0E5D3", image: 0 },
            { name: "Silver", value: "#E3E4E6", image: 0 }
        ],
        storage: ["GPS", "GPS + Cellular"],
        inStock: true,
        isNew: true,
        isFeatured: true
    },
    "airpods-pro-2": {
        id: "airpods-pro-2",
        name: "AirPods Pro (2nd generation)",
        category: "airpods",
        shortDesc: "Активное шумоподавление. Адаптивный звук.",
        description: "До 6 часов автономной работы.",
        price: 3499000,
        oldPrice: null,
        creditPrice: 291583,
        rating: 4.9,
        reviewsCount: 892,
        images: [
            "https://zafarovpolat.github.io/iComfort-TG/MME73.png"
        ],
        colors: [
            { name: "White", value: "#F0E5D3", image: 0 }
        ],
        storage: [],
        inStock: true,
        isNew: true,
        isFeatured: true
    }
};

// Функция получения всех товаров
function getAllProducts() {
    return Object.values(productsDatabase);
}

// Функция получения товара по ID
function getProductById(id) {
    return productsDatabase[id] || null;
}

// Функция фильтрации товаров по категории
function getProductsByCategory(category) {
    return getAllProducts().filter(product => product.category === category);
}

// Функция поиска товаров
function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return getAllProducts().filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.shortDesc.toLowerCase().includes(lowerQuery)
    );
}

// Калькулятор рассрочки
function calcInstallment(months) {
    // Обновляем кнопки
    document.querySelectorAll('.month-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Получаем цену (очищаем от пробелов и "сум")
    const priceText = document.querySelector('.price-main').textContent;
    const price = parseInt(priceText.replace(/\D/g, ''));

    // Считаем
    const monthly = Math.ceil(price / months);

    // Выводим
    document.getElementById('monthly-pay').textContent = new Intl.NumberFormat('ru-RU').format(monthly);
}

// Инициализация калькулятора при загрузке товара
// (Добавить вызов calcInstallment(3) внутри loadProductDetails)