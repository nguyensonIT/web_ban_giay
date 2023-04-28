
(function renderProducts(){
    let listDataStoragePr = getLocalStorage(keyLocalStorageLisSP)
    if(listDataStoragePr === null) {
        saveLocalStorage(keyLocalStorageLisSP,listData)
    }
        let listProducts = getLocalStorage(keyLocalStorageLisSP)
        listProducts.forEach(element => {
            let itemPr = document.createElement('div')
            itemPr.setAttribute('class','product__item')
            itemPr.innerHTML =  `
                    
                        <div class="product__item__img">
                            <img src="${element.img}" alt="sue">
                        </div>
                        <div class="product__item__info">
                            <p class="product__item__info__name">${element.name}</p>
                            <div class="product__item__info__wrap">
                               <span class="product__item__info__price">$${element.price}</span>
                               <span class="product__item__info__quantity">Quantity: <p>${element.quantity}</p></span>
                            </div>
                        </div>
                        <div onclick = 'addCart(${element.id})' class="product__item__addcart " >
                            <i class="fa-solid fa-cart-plus"></i>
                        </div>
                    
            
                                        `
            $('.product').appendChild(itemPr)
        });
    
})()