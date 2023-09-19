let shop = document.getElementById('shop')


let basket = JSON.parse(localStorage.getItem("data")) || []

const vibrate = (ms) => {
    navigator.vibrate(300)
}

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let {id, name, price, desc, img} = x; 
        let search = basket.find((x) => x.id === id) || []; 
        return `
        <div id=product-id-${id} class="item">
            <img width="260" height="260" src="${img}" alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p> 
                <div class="price-quantity">
                    <h2>Ksh. ${price}</h2>
                    <div class="buttons">
                        <i onclick= "decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${search.item === undefined ? 0: search.item}</div>
                        <i onclick= "increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
                <button class="btn" id="btn-${id}" onclick="calculation()">Add to Order</button>
            </div>
        </div>`
        
    }).join(""))
}

generateShop()

let increment = (id) => {
    let selectedItem = id;

    // Find the product in shopItemsData by its id
    let product = shopItemsData.find((x) => x.id === selectedItem.id);

    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
            product: product, // Store the entire product object
        });
    } else {
        search.item += 1;
    }
    update(selectedItem.id);
    vibrate()
}

let decrement = (id) => {
    let selectedItem = id;

    // Find the product in shopItemsData by its id
    let product = shopItemsData.find((x) => x.id === selectedItem.id);

    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) {
        return;
    } else if (search.item === 0) {
        return;
    } else {
        search.item -= 1;
    }
    update(selectedItem.id);
    vibrate()
}

    


let update = (id) => {
    let search = basket.find((x) => x.id === id);
    let quantityElement = document.getElementById(id);

    if (search) {
        let product = search.product;
        let quantity = search.item;

        // Update the quantity displayed in the cart
        quantityElement.innerHTML = quantity;

        // You can also access other product details here if needed
        let productName = product.name;
        let productPrice = product.price;
    }
    vibrate()
}


let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
    localStorage.setItem("data", JSON.stringify(basket)); // Store the entire basket
}


calculation ()