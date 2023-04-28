var listBillApi = 'http://localhost:3000/list';

fetch(listBillApi)
    .then(function(response){
        return response.json();
    })
    .then(function(listBill){
        if(listBill.length === 0){
            document.querySelector('.table__bill').classList.add('hide')
            document.querySelector('.img__empty').classList.remove('hide')
        }else{
            document.querySelector('.img__empty').classList.add('hide')
            document.querySelector('.table__bill').classList.remove('hide')
        }
        renderBill(listBill);
    })
    .catch(function(err){
            console.log(err);
    })

function renderBill(data) {
    for(let i=0;i<data.length;i++)
    {
        let dataItem = [];
        dataItem = data[i].gioHang;

        let totalPrice =0;
        let totalQuantity =0;

        for(let j=0;j<dataItem.length;j++){
            totalPrice += dataItem[j].total;
            totalQuantity += dataItem[j].soLuong;
        }

        document.querySelector('.table__bill').innerHTML += 
        `<tr class="table__bill__product">
                    <td>
                        <div class="table__bill__product__box">
                            <span class="table__bill__product__box__code">${data[i].id}</span>
                            <span class="table__bill__product__box__detail" onclick="openDetail('${data[i].id}')">Detail<i class="fa-solid fa-caret-down"></i></span>
                        </div>
                    </td>
                    <td>
                        <p class="table__bill__product__name">${data[i].ten}</p>
                    </td>
                    <td>
                        <p class="table__bill__product__date">${data[i].date}</p>
                    </td>
                    <td>
                        <span class="table__bill__product__numItem">${data[i].gioHang.length}</span>
                    </td>
                    <td>
                        <span class="table__bill__product__totalQntItem">${totalQuantity}</span>
                    </td>
                    <td>
                        <div class="table__bill__product__numItem"><span>$ ${totalPrice.toFixed(3)}</span></div>
                    </td>
                    <td>
                        <span class="table__bill__product__close" onclick="handleDeleteBill('${data[i].id}')">&times;</span>
                    </td>
            </tr>
        `
    }
    
}
//temp
function handleDeleteBill(id){
    document.querySelector('.wrap').innerHTML += `
    <div class = 'wrap__overlay'>
        <div class = 'wrap__overlay__box'>
            <h1 class = 'wrap__overlay__box__title'>Bạn có muốn trả lại sản phẩm này không?</h1>
            <div class ='wrap__overlay__box__btn'>
                <span onclick = 'removeOverlay()' class = 'wrap__overlay__box__btn__exit'>Hủy</span>
                <span onclick='confirmDelForm(${id})' class = 'wrap__overlay__box__btn__accept'>Trả lại</span>
            </div>
        </div>
    </div>`
}

function removeOverlay(){
    document.querySelector('.wrap__overlay').remove()
}

//temp

function confirmDelForm(id) {
    fetch(listBillApi + '/' + id)
        .then(function(response){
            return response.json();
        })
        .then(function(listBillItem){
            let keyLocalStorageListSP = 'DANHSACHSP';
            let data = listBillItem.gioHang;
            let products = JSON.parse(localStorage.getItem(keyLocalStorageListSP));

            products.map(item => {
                data.map(cart => {
                    if(item.id === cart.idSp)
                        item.quantity += cart.soLuong;
                })
        
            })

            localStorage.setItem(keyLocalStorageListSP, JSON.stringify(products));
            deleteBill(id)
            
        })
        .catch(function(err){
            console.log(err);
        })
    
}

function deleteBill(id) {
    removeOverlay()
    let options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
          },
    };

    fetch(listBillApi + '/' + id, options)
        .then(function(response){
            return response.json();
        })
        .then(function(list){
            renderBill(list);
        })
}

function openDetail(id){
    fetch(listBillApi + '/' + id)
        .then(function(response){
            return response.json();
        })
        .then(function(listBillItem){
            document.querySelector('.product__detail__bill').classList.remove('hide')

            let data = listBillItem.gioHang;

            for(let i=0;i<data.length;i++){
            document.querySelector('.product__detail__bill__table').innerHTML += 
            `<tr class="product__detail__bill__table__content">
            <td>
                <div class="product__detail__bill__table__content__img">
                    <img src="${data[i].img}" alt="" >
                </div>
            </td>
            <td>
                <p class="product__detail__bill__table__content__name">
                ${data[i].name}
                </p>
            </td>
            <td>
                <p class="product__detail__bill__table__content__quantity">
                ${data[i].soLuong}
                </p>
            </td>
            <td>
                <p class="product__detail__bill__table__content__price">
                $${data[i].price}
                </p>
            </td>
            
            </tr>`

            
        }
        })
        .catch(function(err){
            console.log(err);
        })
}

function closeDetail(){
    const elements = document.querySelectorAll('.product__detail__bill__table__content');
    elements.forEach(element => element.remove());
    document.querySelector('.product__detail__bill').classList.add('hide')
}