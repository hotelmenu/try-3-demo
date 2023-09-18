let shop = document.getElementById('shop')


let basket = JSON.parse(localStorage.getItem("data")) || []


let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let {id, name, price, desc, img} = x; 
        let search = basket.find((x) => x.id === id) || []; 
        return `
        <div id=product-id-${id} class="item">
            <img width="260" src="${img}" alt="">
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
    
    let search = basket.find((x) => x.id === selectedItem.id) 
    if (search === undefined){
        basket.push({
            id: selectedItem.id, 
            item: 1, 
        })
    }
    else {
        search.item += 1; 
    }
   update(selectedItem.id)
}


let decrement = (id) => {
    let selectedItem = id; 
    let search = basket.find((x) => x.id === selectedItem.id) 
    if (search === undefined){
        return 
    }else if (search.item === 0){
        return
    }
    else {
        search.item -= 1; 
    }
    update(selectedItem.id)
}
    


let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item; 
}

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount"); 
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x+y, 0);
    basket = basket.filter((x) => x.item !==0)
    localStorage.setItem("data", JSON.stringify(basket))
} 

calculation ()