// we have a pure html/css shopping page and we will add JavaScript for functionality;

// Listen for the page to be fully loaded so that your JavaScript wouldn't run before your HTML loaded
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
};


// if page ready, get a handle on your remove button and remove cartItem if clicked
function ready() {

    // access the remove button and loop over and add event listener to each button 
    let removeItem = document.getElementsByClassName('btn-danger');
    console.log(removeItem);
    for (let i =0; i < removeItem.length; i++){
        let btn = removeItem[i];
        btn.addEventListener('click', removeCartItem);
    };

    // access the quantity input field and loop over and add event listener to each input 
    let quantityInput = document.getElementsByClassName('cart-quantity-input');
    for (let i =0; i < quantityInput.length; i++){
        let input = quantityInput[i];
        input.addEventListener('click', quantityChanged);
    };

    const addToCartBtn = document.getElementsByClassName('shop-item-button');
    for (let i = 0; i < addToCartBtn.length; i++){
        let btn = addToCartBtn[i];
        btn.addEventListener('click', addToCartClicked);
    };

    // Here we get a handle on the purchase button and fire purchaseClicked() function on the event the button clicked 
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
};

// This function gives you an alert of your purchase and wipes the cart clean
function purchaseClicked(){
    alert('Thank you for your purchase');
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    };
};


// function that removes Item and calls updates total by calling updateCartTotal() function
const removeCartItem = (event) => {
    console.log('clicked');
    let btnClicked = event.target;
    btnClicked.parentElement.parentElement.remove();
    updateCartTotal();
};

//if quantity changed update total
function quantityChanged(event){
    let input = event.target;
    if (isNaN(input.value ) || input.value <= 0){
        input.value = 1; 
    };
    updateCartTotal();
};

function addToCartClicked(event) {
    let btn = event.target;
    let shopItem = btn.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    console.log(title);
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    console.log(price);
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    console.log(imageSrc);
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
};

// Function that adds item to cart
function addItemToCart(title, price, imageSrc){
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItem = document.getElementsByClassName('cart-items')[0];
    let cartItemNames = cartItem.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText ==title){
            alert(`Item already added to cart, go to cart and add quantity if you want more of this item`);
            return
        };
    };
    const cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
    `;
    cartRow.innerHTML = cartRowContents;
    cartItem.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}


// updating total 
function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];

        console.log(priceElement, quantityElement);
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        console.log(price);
        let quantity = quantityElement.value;
        total += (price * quantity);
    };
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = `$${total}`;
};