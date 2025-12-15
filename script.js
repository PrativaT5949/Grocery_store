let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');   
    navbar.classList.remove('active');
    // This line is added to ensure that the search form is positioned correctly
};

let shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick = () => {
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active'); 
};
// Select necessary elements
const cartItemsContainer = document.querySelector('.cart-items-container');
const totalPriceElement = document.querySelector('.shopping-cart .total');

let cart = []; // Array to hold cart items

// Function to format price nicely
function formatPrice(price) {
    return `RS ${price}`;
}

// Function to update the cart UI and total price
function updateCartUI() {
    cartItemsContainer.innerHTML = ''; // Clear current cart items

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        // Create cart item box
        const cartBox = document.createElement('div');
        cartBox.classList.add('box');

        cartBox.innerHTML = `
            <i class="fas fa-trash" data-index="${index}"></i>
            <img src="${item.image}" alt="${item.name}">
            <div class="content">
                <h3>${item.name}</h3>
                <span class="price">${formatPrice(item.price)}</span>
                <span class="quantity">Quantity: ${item.quantity}</span>
            </div>
        `;

        cartItemsContainer.appendChild(cartBox);
    });

    totalPriceElement.textContent = `Total: ${formatPrice(total)}`;

    // Add event listeners to trash icons for removal
    document.querySelectorAll('.shopping-cart .fa-trash').forEach(trashIcon => {
        trashIcon.onclick = () => {
            const index = trashIcon.getAttribute('data-index');
            cart.splice(index, 1); // Remove item from cart
            updateCartUI();
        };
    });
}

// Function to add product to cart
function addToCart(product) {
    // Check if product already in cart
    const existingIndex = cart.findIndex(item => item.name === product.name);
    if (existingIndex !== -1) {
        // Increase quantity
        cart[existingIndex].quantity++;
    } else {
        // Add new product to cart
        cart.push({...product, quantity: 1});
    }
    updateCartUI();
}

// Attach event listeners to all "Add to Cart" buttons
document.querySelectorAll('.products .btn').forEach((btn, index) => {
    btn.onclick = (e) => {
        e.preventDefault();

        // Find the product box related to this button
        const productBox = btn.closest('.box');

        // Extract product info
        const product = {
            name: productBox.querySelector('h3').textContent.trim(),
            price: parseInt(productBox.querySelector('.price').textContent.replace('RS ', '')),
            image: productBox.querySelector('img').src
        };

        addToCart(product);

        // Optionally, open the shopping cart automatically when item added
        shoppingCart.classList.add('active');
        searchForm.classList.remove('active');
        loginForm.classList.remove('active');
        navbar.classList.remove('active');
    };
});


const searchInput = document.querySelector('#search-box');
const productBoxes = document.querySelectorAll('.products .box');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    productBoxes.forEach(box => {
        const productName = box.querySelector('h3').textContent.toLowerCase();

        if (productName.includes(query)) {
            box.style.display = 'block';  // Show matching product
        } else {
            box.style.display = 'none';   // Hide non-matching product
        }
    });
});



let loginForm = document.querySelector(' .login-form');
document.querySelector('#login-btn').onclick = () => {
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');    
    navbar.classList.remove('active');
};
let navbar = document.querySelector(' .navbar');
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
};
window.onscroll = () => {
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
};
// Open header modal
document.querySelectorAll('.view-header-modal').forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();
    const headerId = button.getAttribute('data-header-id');
    const modal = document.getElementById(`${headerId}-modal`);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});
// Close modal and scroll to products on clicking "Browse Products"
document.getElementById('browse-products-btn').addEventListener('click', function(e) {
  e.preventDefault();

  // Close the modal
  const modal = document.getElementById('shop-now-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Scroll smoothly to the products section
  const productsSection = document.getElementById('products');
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth' });
  }
});



// Feature Modal functionality
document.querySelectorAll('.view-feature-modal').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const featureId = button.getAttribute('data-feature-id');
        const modal = document.getElementById(`${featureId}-modal`);
        if (modal) {
            modal.classList.add('active'); // Show the modal
            document.body.style.overflow = 'hidden'; // Prevent scrolling background
        }
    });
});


// Category Modal functionality
document.querySelectorAll('.view-category-modal').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryId = button.getAttribute('data-category-id');
        const modal = document.getElementById(`${categoryId}-modal`);
        if (modal) {
            modal.classList.add('active'); // Show the modal
            document.body.style.overflow = 'hidden'; // Prevent scrolling background
        }
    });
});
// A more robust way to handle the close buttons and click-outside for ALL modals:
document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.blog-modal') || button.closest('.category-modal') || button.closest(`.feature-modal`)||button.closest(`.header-modal`); // Find closest modal parent
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close modal on clicking outside modal content
window.addEventListener('click', e => {
  document.querySelectorAll('.header-modal.active, .feature-modal.active, .category-modal.active, .blog-modal.active').forEach(modal => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

window.addEventListener('click', (event) => {
    // Check if the clicked target is an active blog modal or category modal
    document.querySelectorAll('.blog-modal.active, .category-modal.active').forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Blog Modal functionality
document.querySelectorAll('.read-more-modal').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const blogId = button.getAttribute('data-blog-id');
        const modal = document.getElementById(`${blogId}-modal`);
        if (modal) {
            modal.classList.add('active'); // Show the modal
            document.body.style.overflow = 'hidden'; // Prevent scrolling background
        }
    });
});

document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.blog-modal');
        if (modal) {
            modal.classList.remove('active'); // Hide the modal
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
});







var swiper = new Swiper(".product-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay:{
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    // pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    // },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1020: {
            slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".review-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay:{
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    // pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    // },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1020: {
            slidesPerView: 3,
        },
    },
});
