console.log(products);


//Gå gjennom alle produkter, generere HTML for hvert produkt, skrive dette til index.html

//En variabel som kan holde på HTML-en for produktene
let productHTML = "";

products.map((product, index) => productHTML += 
            `<article class="product-card">
                <img src="website_images/PROD_${product.imagefile}" alt="PRODUKTTITTEL" />
                <a href="#KATEGORISIDE">${product.category}</a>
                <h3>${product.title}</h3>
                <p>Kr. ${product.price},-</p>
                <button onclick="addProductToCart(${product.prodid})">Legg i handlekurv</button>
            </article>`)

//Finn #productlist, og fyll den med verdier i variabelen productHTML
document.getElementById("productlist").innerHTML = productHTML;

//Lage toggle-funksjonalitet for handlekurven
document.getElementById("shoppingcart").addEventListener("click", function(){
    document.getElementById("cart").classList.toggle("visible");
})

//Funksjon for å legge til produkt i handlekurven
function addProductToCart(prodid){
    console.log("Du vill legge til produkti " + prodid)
    //bruk .some for å sjekke om produktet allerede er i handlevognen
    const idExists = cart.some(cartprod => cartprod.cartprodid === prodid)

    if(idExists){
        //Oppdaterer antall av produktet i handlevognen
        //Først: finne indexen til denne ID-en
        const index = cart.findIndex(p => p.cartprodid === prodid)
        //Så: oppdaterer til riktig antall
        cart[index].quantity++
    }else{
        cart.push({cartprodid: prodid, quantity: 1});       
    }
    
    printCart()
    console.log(cart)
}

//Lage funksjon som skriver ut oppdatert funksjon av handlevognen 
function printCart(){
    //starter med en tom variabel vi kan fylle med HTML
    let cartHTML = "";
    //Lag klar variabel for totalpris
    let cartTotal = 0;
    //Lag varaibel for antall produkter
    let cartNumber = 0;

    //Gå gjennom cart-arrayen og generere HTML for hvert produkt: 
    cart.map((cartprod, index) => {
        const currentProduct = products.findIndex(p => p.prodid === cartprod.cartprodid)
        const currentProductInfo = products[currentProduct]
        cartHTML += `<article class="cart-product">
                    <span class="title">${currentProductInfo.title}</span>
                    <span class="price">${currentProductInfo.price},-</span>
                    <span class="quantity">x<span class="quantity-number">${cartprod.quantity}</span></span>
                    <button class="delete">x</button>
                </article>`
        //Regn ut totalsum:
        cartTotal += currentProductInfo.price * cartprod.quantity
        //Regn ut antall produkter:
        cartNumber += cartprod.quantity
    })

    //Skrive ut generert HTML til index-fila:
    document.getElementById("cart-products").innerHTML = cartHTML
    //Skrive ut totalpris:
    document.getElementById("cart-total").innerHTML = cartTotal
    //Skrive ut antall produkter:
    document.getElementById("cartcount").innerHTML = cartNumber
}

printCart()

