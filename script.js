// define product class
function product(name, size, description, price){         
    this.name = name; 
    this.size = size;
    this.description = description;
    this.price = price;
}

let sneakers = [
    {
        id: 1,
        name: 'Lebron Witness 1',
        description: 'Perfect for any sports and the best thing about it is, it can be wear as a casual shoe.',
        size: 'UK 10',
        image: 'shoe1.jpg',
        price: 800 
    },
    {
        id: 2,
        name: 'Nike Air Jordan',
        description: 'Perfect for any sports and the best thing about it is, it can be wear as a casual shoe.',
        size: 'UK 10',
        image: 'shoe2.jpg',
        price: 1200 
    },
    {
        id: 3,
        name: 'Lebron Witness 3',
        description: 'Perfect for any sports and the best thing about it is, it can be wear as a casual shoe.',
        size: 'UK 10',
        image: 'shoe3.jpg',
        price: 1450 
    },
    {
        id: 4,
        name: 'Nike Air Max',
        description: 'Perfect for any sports and the best thing about it is, it can be wear as a casual shoe.',
        size: 'UK 10',
        image: 'shoe4.jpg',
        price: 2099 
    },
    {
        id: 5,
        name: 'Fake Nike',
        description: 'This is a nice fake Nike. Looks just like the original.',
        size: 'UK 10',
        image: 'shoe5.jpg',
        price: 1000 
    }
]


let products = [];
let cart = [];
let shipping = 0;
let discount = 0;
let total   = 0;

// get cart items
function getCart(){
    let items = localStorage.getItem("cart")
    return JSON.parse(items);
}

// update number of items in cart
function updateNumberOfItems(){
    let items = getCart()
    let numberOfItems   = 0;
    
    if (items == null || items == undefined)
        $('.cart-btn').html('0')
    else 
    {
        numberOfItems = items.length
        $('.cart-btn').html(numberOfItems)
    }
}


// add products to page
$.each(sneakers, function(key, value){
    $("#products").append(`
        <div class="col-lg-4 mb-4">
            <div class="card shadow-sm">        
                <img src="images/${value.image}" class="bd-placeholder-img cardimg-top img-thumbnail" width="100%" height="170"
                    preserveAspectRatio="xMidYMid slice" focusable="false"></img>
                <div class="card-body">
                    <a href="/product.html"><h3>${value.name}</h3></a>
                    <p class="card-text">${value.description} </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <button type="button" id="addtocart-btn" data-id="${value.id}" class="btn btn-success">Quick Add to Cart</button>
                        <small>${value.price}</small>
                    </div>
                </div>
            </div>
        </div>
    `)  
})
   
     

// populate cart
$.each(JSON.parse(localStorage.getItem('cart')), function(key, value){
    $("#cart").append(`
    <li class="list-group-item d-flex justify-content-between lh-sm">
        <h6 class="my-0">${value.name}</h6>
        <span class="text-muted">${value.price}</span>
    </li>  
    `)  
})

//calc total price 
function calculateTotal(){    
    total = 0
    let VAT     = 0
    let items   = getCart();

    items.forEach((item) => total += item.price);

    total = total + shipping - discount

    // calculate VAT
    VAT = Math.floor(total * 0.14)

    $("#vat").html(VAT);
    $("#total").html(total)
}


// shipping
$("input[name='shipping']").click(function(){
    if(this.id === 'deliver'){
        $('.deliveryOptions').slideDown()
        // default fee for standard delivery
        shipping = 50     
     
    } else if (this.id === 'collect') {
        $('.deliveryOptions').slideUp()   
        shipping = 0
    }

    $("#shippingFee").html(shipping)
    calculateTotal();
});

// delivery method fee
$("input[name='deliveryMethod']").click(function(){
    this.id === 'standard' ? shipping = 50 : shipping = 100;

    $("#shippingFee").html(shipping);
    calculateTotal();
});

// add to cart
$("#products").on('click', '#addtocart-btn', function(){
    let id = $(this).data("id")
    
    cart.push(sneakers[id-1])      
    localStorage.setItem("cart", JSON.stringify(cart))
    updateNumberOfItems();
    calculateTotal();
    
    alert('Total: ' + total)
});

//redeem voucher
$("#voucherForm").submit(function(e){
    e.preventDefault();   
    let coupon = $('input[name="couponCode"]').val();

    if(coupon !== '' || null) {
        discount = 200
    }

    $('#coupon').html(discount)
    $('#couponCode').html(coupon)
    calculateTotal();
})

//confirm order
$("#confirmOrder").click(function(){
    let orderNumber = Math.round(Math.random()*100000)

    $("#orderSuccess").show()
    $("#refNumber").html(orderNumber)
})

$(document).ready(function() {  
    $('#orderSuccess').hide(); 
    updateNumberOfItems();
    calculateTotal();
});