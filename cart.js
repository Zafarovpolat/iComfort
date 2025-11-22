// cart.js - Функционал корзины
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    // Загрузить корзину из LocalStorage
    loadCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    // Сохранить корзину в LocalStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    // Добавить товар
    addItem(productId, color = null, storage = null) {
        const product = getProductById(productId);
        if (!product) return;

        const existingItem = this.items.find(item =>
            item.id === productId &&
            item.color === color &&
            item.storage === storage
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.images[0],
                color: color,
                storage: storage,
                quantity: 1
            });
        }

        this.saveCart();
        this.showNotification(`${product.name} добавлен в корзину`);
    }

    // Удалить товар
    removeItem(productId, color, storage) {
        this.items = this.items.filter(item =>
            !(item.id === productId && item.color === color && item.storage === storage)
        );
        this.saveCart();
    }

    // Обновить количество
    updateQuantity(productId, color, storage, quantity) {
        const item = this.items.find(item =>
            item.id === productId &&
            item.color === color &&
            item.storage === storage
        );

        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId, color, storage);
            } else {
                this.saveCart();
            }
        }
    }

    // Очистить корзину
    clearCart() {
        this.items = [];
        this.saveCart();
    }

    // Получить количество товаров
    getItemCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Получить общую сумму
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Обновить счетчик в шапке
    updateCartCount() {
        const countElements = document.querySelectorAll('#cart-count');
        const count = this.getItemCount();
        countElements.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    // Показать уведомление
    showNotification(message) {
        // Простое уведомление (можно улучшить)
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class='bx bx-check-circle'></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Инициализация корзины
const cart = new ShoppingCart();