

var listCart = [];
var dataAddress = []
var districts = []
let listDataStoragePr = getLocalStorage(keyLocalStorageLisSP)

if (!getLocalStorage(keyLocalStorageItemCart)) {
    saveLocalStorage(keyLocalStorageItemCart, listCart);
}

let shopCart = getLocalStorage(keyLocalStorageItemCart)

let tongSp = countTotalQuantity();
$('.header__menu__cart__quantity').innerHTML = `${tongSp}`
$('.header__menu__mobile__cart__quantity').innerHTML = `${tongSp}`
//openCart
function openCart() {
    $('.product').classList.add('hide')
    $('.cart').classList.remove('hide')
    $('.cart__btn').classList.remove('hide')
    updateCart();


    if (shopCart.length === 0) {
        $('.cart__btn').classList.add('hide')
        $('.cart__img').classList.remove('hide')
        $('.cart').classList.remove('hide')
        $('table').classList.add('hide')
    }
    else {
        $('.cart__img').classList.add('hide')
        $('.cart__backBtn__temp').classList.add('hide')
        $('table').classList.remove('hide')
        $('.cart__buy').classList.remove('hide')
    }

}
// Nút back to home
function backToHome() {
    $('.product').classList.remove('hide')
    $('.cart').classList.add('hide')
}

//update
function updateCart() {
    resetPriceProduct();

    let totalBuy = countTotal();
    let totalCartQuantity = shopCart.length;

    $('.cart__buy__wrap__total span').innerHTML = `${totalBuy.toFixed(3)}`
    $('.header__menu__cart__quantity').innerHTML = `${totalCartQuantity}`
    $('.header__menu__mobile__cart__quantity').innerHTML = `${totalCartQuantity}`

    if (shopCart.length === 0) {
        $('.cart__btn').classList.add('hide')
        $('.cart__backBtn__temp').classList.remove('hide')
    }
    else {
        $('.cart__backBtn__temp').classList.add('hide')
        $('.cart__btn').classList.remove('hide')
    }

    renderCart();

    saveLocalStorage(keyLocalStorageItemCart, shopCart);
    shopCart = getLocalStorage(keyLocalStorageItemCart)
}

function resetPriceProduct() {
    for (let i = 0; i < shopCart.length; i++) {
        shopCart[i].total = shopCart[i].soLuong * shopCart[i].price;
    }
}

//sum total
function countTotal() {
    let sumTotal = 0;
    for (let i = 0; i < shopCart.length; i++) {
        sumTotal += shopCart[i].total;
    }
    return sumTotal;
}

//count item arrshopCart
function countTotalQuantity() {
    return shopCart.length;
}

//render cart
function renderCart() {
    $('table').innerHTML = "";
    if (shopCart.length === 0) {
        $('.cart').classList.remove('hide')
        $('.cart__img').classList.remove('hide')
        $('.cart__backBtn__temp').classList.remove('hide')
        $('table').classList.add('hide')
        $('.cart__buy').classList.add('hide')

    }
    $('table').innerHTML = `<tr class="header__row">
                                <th class="cart__product__name">Product name</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Total</th>
                                <th>Clear Cart</th>
                            </tr>`
    for (let i = 0; i < shopCart.length; i++) {
        $('table').innerHTML += `
        <tr class="product__row">
            <td>
                <img src="${shopCart[i].img}" alt="">
                <div class="product__row__info">
                    <p class="product__row__info__name">${shopCart[i].name}</p>
                    <p class="product__row__info__quantity">Quantity: <span>${shopCart[i].quantity}</span></p>
                </div>
            </td>
            <td>
                <span onclick="changeNumber('minus',${shopCart[i].idSp})" class='product__row__icon product__row__icon__left'><i class="fa-solid fa-caret-left"></i></span>
                <span class='quantityPr'>${shopCart[i].soLuong}</span>
                <span onclick="changeNumber('plus',${shopCart[i].idSp})" class='product__row__icon product__row__icon__right'><i class="fa-solid fa-caret-right"></i></span>
            </td>
            <td>$${shopCart[i].price}</td>
            <td>$${shopCart[i].total.toFixed(3)}</td>
            <td><span onclick="handleDeletePr(${shopCart[i].idSp})">&times;</span></td>
        </tr>
        `

    }

}

// add cart
function addCart(id) {
    let listDataStoragePr = getLocalStorage(keyLocalStorageLisSP)
    let itemPr = listDataStoragePr.filter((item) => item.id == id)

    if (itemPr[0].quantity > 0) {
        var check = shopCart.some(cart => cart.idSp === id)
        if (check) {
            changeNumber('plus', id)
        }
        else {
            let item = listDataStoragePr.find(product => product.id === id)

            shopCart.push({
                idSp: id,
                soLuong: 1,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                img: item.img,
                total: item.price
            })
        }
        updateCart();
    }
}

function changeNumber(action, id) {
    shopCart = shopCart.map(function (cart) {
        let numberQuantity = cart.soLuong; 
        if (cart.idSp === id) {
            if (action === 'minus' ) {
                numberQuantity < 2 ? handleDeletePr(id) : numberQuantity--
            };
            if (action === 'plus' && numberQuantity < cart.quantity) { numberQuantity++ };
        }
        return { ...cart, soLuong: numberQuantity }
    })

    updateCart();
}

function handleDeletePr(idPro) {
    $('.wrap').innerHTML += `
    <div class = 'wrap__overlay'>
        <div class = 'wrap__overlay__box'>
            <h1 class = 'wrap__overlay__box__title'>Bạn có muốn xóa sản phẩm này không?</h1>
            <div class ='wrap__overlay__box__btn'>
                <span onclick = 'removeOverlay()' class = 'wrap__overlay__box__btn__exit'>Hủy</span>
                <span onclick='deletePr(${idPro})' class = 'wrap__overlay__box__btn__accept'>Xóa</span>
            </div>
        </div>
    </div>`
}

function deletePr(idPro) {
    removeOverlay()
    shopCart = shopCart.filter((item) => item.idSp !== idPro)
    updateCart();
}

function removeOverlay() {
    document.querySelector('.wrap__overlay').remove()
}

function exitForm() {
    $('.form__wrap').classList.add('hide')
}

function getDataAddress() {
    fetch('https://provinces.open-api.vn/api/?depth=3')
        .then(res => res.json())
        .then(data => dataAddress = data)
        .then(dataAddress => {
            for (let i = 0; i < dataAddress.length; i++) {
                $('#province').innerHTML +=
                    `<option value="${dataAddress[i].name}">${dataAddress[i].name}</option>`
            }
        })
        .catch(err => console.log(err))

}


function handleBuy() {
    $('.form__wrap').classList.remove('hide')
    getDataAddress()

    $('#province').onchange = (e) => {
        $('#ward').innerHTML = `<option selected value="">--Chọn Phường/Xã--</option>`
        for (let addr of dataAddress) {
            if (e.target.value === addr.name) {
                getDataDistricts(addr)
            }
        }
    
    }
    
    $('#district').onchange = (e) => {
        for (let district of districts) {
            if (e.target.value === district.name) {
                getDataWards(district)
            }
        }
    
    }
    
    function getDataDistricts(addr) {
        districts = addr.districts
        $('#district').innerHTML = `<option selected value="">--Chọn Huyện/Quận--</option>`
        for (let i = 0; i < districts.length; i++) {
            $('#district').innerHTML +=
                `<option value="${districts[i].name}">${districts[i].name}</option>`
        }
    }
    
    function getDataWards(district) {
        var wards = district.wards
        $('#ward').innerHTML = `<option selected value="">--Chọn Phường/Xã--</option>`
        for (let i = 0; i < wards.length; i++) {
            $('#ward').innerHTML +=
                `<option value="${wards[i].name}">${wards[i].name}</option>`
        }
    }
}
