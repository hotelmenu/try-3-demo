let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')
let basket = JSON.parse(localStorage.getItem("data")) || []


let calculation = () => {
    let cartIcon = document.getElementById("cartAmount"); 
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x+y, 0);
    basket = basket.filter((x) => x.item !==0)
    localStorage.setItem("data", JSON.stringify(basket))
} 

calculation ()

let generateCartItems = () => {
    if(basket.length !==0){
        return (
        shoppingCart.innerHTML = basket.map((x) => { 
        let {id, item} = x; 
        let search = shopItemsData.find((y) =>y.id === id) || []
        let {img, name, price} = search
        return `
        <div  class="cart-item" >
            <img width="100" src="${img}" alt="" />
            <div class="details">
            <div class="title-price-x">
                <h4 class="title-tag">
                <p>${name}</p>
                <p class="cart-item-price">Ksh. ${price}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
            <div class="buttons">
                        <i onclick= "decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick= "increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
            <h3>Ksh. ${item * search.price}</h3>
            </div>
        </div>
        `

        }).join(""))
     
    }else {
       
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>your order list is empty</h2>
        <a href="food.html">
        <button class="HomeBtn">Back to Home</button>
        `
    }
}

generateCartItems()


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
    generateCartItems()
   update(selectedItem.id)
   calculation ()
   totalAmount()
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
    basket = basket.filter((x) => x.item !==0)
    generateCartItems()
    calculation ()
    totalAmount()
}



let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item; 
}

let removeItem = (id) => {
    let selectedItem = id
    basket = basket.filter((x)=>x.id !== selectedItem.id)
    localStorage.setItem("data", JSON.stringify(basket))
    generateCartItems()
    calculation ()
    totalAmount()
}

let totalAmount = () =>{
    if (basket.length !==0){
        let amount = basket.map((x) => {
            let {item, id} = x; 
            let search = shopItemsData.find((y) =>y.id === id) || []
            return item *search.price;
        }).reduce((x,y) => x+y, 0)
        label.innerHTML = `<h2>Total Bill: Ksh. ${amount}</h2>
        <button onclick = "sendWhatsApp()" class="checkout">Send Order by WhatsApp (Delivery Only)</button>

        <button onclick="clearCart()" class="removeAll"> Clear Cart </button>`
    }else return
}

totalAmount()

let clearCart = () => {
    basket = []
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket))
    calculation ()
}

sendWhatsApp = () =>{
    
    // Define the data
const data = [
    { id: 'food01', item: 4 },
    { id: 'food02', item: 4 },
    { id: 'food03', item: 3 },
    { id: 'food04', item: 4 }
  ];
  
  // Format the data as a text message
  const message = data.map(item => `${item.id}: ${item.item}`).join('\n');
  
  // Function to send an SMS message (you would need to replace this with an actual SMS sending solution)
  function sendSMS(phoneNumber, message) {
    // In a real implementation, you would use an SMS gateway or service to send the message
    // This is a simplified example:
    console.log(`Sending SMS to ${phoneNumber}: ${message}`);
  }
  
  // Specify the recipient's phone number
  const recipientPhoneNumber = '+254770653517'; // Replace with the recipient's actual phone number
  
  // Send the SMS message
  sendSMS(recipientPhoneNumber, message);
  
}