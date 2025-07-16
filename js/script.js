// === Elementlar ===
const cartBtn = document.querySelector('.navbar__cart-btn');
const cart = document.querySelector('.cart');
const cartItems = document.querySelector('.cart__items');
const mainImg = document.querySelector('.product__main-img');
const thumbs = document.querySelectorAll('.product__thumb img');
const decrBtn = document.querySelector('.product__quantity-decrement');
const incrBtn = document.querySelector('.product__quantity-increment');
const quantityVal = document.querySelector('.product__quantity-value');
const addToCartBtn = document.querySelector('.product__add-btn');
const currentPrice = document.querySelector('.product__price-discounted');

const mobilePrevBtn = document.querySelector('.mobile-slider__prev');
const mobileNextBtn = document.querySelector('.mobile-slider__next');

// Lightbox
const lightbox = document.querySelector('.lightbox');
const lightboxClose = document.querySelector('.lightbox__close');
const lightboxImg = document.querySelector('.lightbox__image');
const prevBtn = document.querySelector('.lightbox__prev');
const nextBtn = document.querySelector('.lightbox__next');
const lightboxThumbs = document.querySelectorAll('.lightbox__thumb');

// Navbar toggle (mobile)
document.querySelector(".navbar__toggle").addEventListener("click", () => {
  document.querySelector(".navbar__nav").classList.toggle("active");
});

// === Mahsulot rasmlar array ===
const images = [
  './images/image-product-1.jpg',
  './images/image-product-2.jpg',
  './images/image-product-3.jpg',
  './images/image-product-4.jpg'
];

let currentImageIndex = 0;

// === Savatcha bo‘shligini tekshirish ===
function updateCartEmptyState() {
  if (cartItems.children.length === 0) {
    cartItems.innerHTML = '<p class="cart__empty">Your cart is empty.</p>';
  } else {
    const emptyMsg = cartItems.querySelector('.cart__empty');
    if (emptyMsg) emptyMsg.remove();
  }
}

// === Savatchani ochish / yopish ===
cartBtn.addEventListener('click', () => {
  cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
});

// === Kichik rasmni bosib asosiy rasmni o‘zgartirish ===
thumbs.forEach((thumb, idx) => {
  thumb.dataset.id = idx + 1;
  thumb.addEventListener('click', () => {
    mainImg.src = images[idx];
    mainImg.dataset.id = idx + 1;
  });
});

// === Miqdorni oshirish / kamaytirish ===
decrBtn.addEventListener('click', () => {
  if (+quantityVal.textContent > 0) quantityVal.textContent--;
});
incrBtn.addEventListener('click', () => {
  quantityVal.textContent++;
});

// === Savatchaga qo‘shish ===
addToCartBtn.addEventListener('click', () => {
  const qty = +quantityVal.textContent;
  const price = parseFloat(currentPrice.textContent.replace('$', ''));
  const productId = mainImg.dataset.id;

  if (qty > 0) {
    const existingItem = cartItems.querySelector(`.cart__item[data-id="${productId}"]`);
    if (existingItem) {
      const oldQty = existingItem.querySelector('.cart__item-qty');
      const oldTotal = existingItem.querySelector('.cart__item-total');
      const newQty = +oldQty.textContent + qty;
      oldQty.textContent = newQty;
      oldTotal.textContent = `$${(price * newQty).toFixed(2)}`;
    } else {
      const itemHTML = `
        <li class="cart__item" data-id="${productId}">
          <div class="cart__item-image">
            <img src="./images/image-product-${productId}-thumbnail.jpg" alt="Product">
          </div>
          <div class="cart__item-details">
            <p class="cart__item-name">Fall Limited Edition Sneakers</p>
            <p class="cart__item-price">$${price.toFixed(2)} x <span class="cart__item-qty">${qty}</span> 
            <span class="cart__item-total">$${(price * qty).toFixed(2)}</span></p>
          </div>
          <button class="cart__item-remove">
            <img src="./images/icon-delete.svg" alt="Remove">
          </button>
        </li>`;
      cartItems.insertAdjacentHTML('beforeend', itemHTML);
    }
    updateCartEmptyState();
  }
});

// === Savatdan o‘chirish ===
cartItems.addEventListener('click', (e) => {
  if (e.target.closest('.cart__item-remove')) {
    e.target.closest('.cart__item').remove();
    updateCartEmptyState();
  }
});

// === Tashqariga bosilganda savatchani yopish ===
document.addEventListener('click', (e) => {
  if (!cart.contains(e.target) && !cartBtn.contains(e.target)) {
    cart.style.display = 'none';
  }
});

// === Lightbox ochish (faqat katta ekran) ===
mainImg.addEventListener('click', () => {
  if (window.innerWidth > 430) {
    lightbox.style.display = 'flex';
    currentImageIndex = parseInt(mainImg.dataset.id) - 1;
    updateLightboxImage();
  }
});

// === Lightbox yopish ===
lightboxClose.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// === Lightbox prev/next funksiyasi ===
prevBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateLightboxImage();
});
nextBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateLightboxImage();
});

// === Lightbox thumbnails ===
lightboxThumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    currentImageIndex = parseInt(thumb.dataset.index);
    updateLightboxImage();
  });
});

// === Lightboxdagi rasmni yangilash ===
function updateLightboxImage() {
  lightboxImg.src = images[currentImageIndex];
  lightboxThumbs.forEach(thumb => thumb.classList.remove('active'));
  lightboxThumbs[currentImageIndex].classList.add('active');
}

// === Mobil prev/next slayder (main rasm uchun) ===
function updateMainImageByIndex(index) {
  mainImg.src = images[index];
  mainImg.dataset.id = index + 1;
}

function mobilePrevHandler() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateMainImageByIndex(currentImageIndex);
}
function mobileNextHandler() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateMainImageByIndex(currentImageIndex);
}

function handleMobileSliderEvents() {
  if (window.innerWidth <= 430) {
    mobilePrevBtn.addEventListener('click', mobilePrevHandler);
    mobileNextBtn.addEventListener('click', mobileNextHandler);
  } else {
    mobilePrevBtn.removeEventListener('click', mobilePrevHandler);
    mobileNextBtn.removeEventListener('click', mobileNextHandler);
  }
}

window.addEventListener('resize', handleMobileSliderEvents);
handleMobileSliderEvents(); // Dastlabki holatda

// === Dastlabki holat ===
updateCartEmptyState();
