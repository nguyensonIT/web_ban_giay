
const urlListBillApi = 'http://localhost:3000/list'
let dataStorage = JSON.parse(localStorage.getItem('DANHSACHSP'))

function handleCreateBill() {
    let d = new Date();
    let ngay = d.getDate();
    let thang = d.getMonth() + 1;
    let nam = d.getFullYear()
    let time = '';
    time = ngay + '/' + thang + '/' + nam;

    if (validate()) {
        let formData = {
            id: randomIdProduct(),
            ho: $('.surnameInp').value,
            ten: $('.nameInp').value,
            email: $('.emailInp').value,
            sdt: $('.telInp').value,
            idTinh: $('#province').value,
            idHuyen: $('#district').value,
            idXa: $('#ward').value,
            soNha: $('.homeNumInp').value,
            mess: $('#message').value,
            date: time,
            gioHang: shopCart
        }

        updateStock();
        createBill(formData);
        $('.form__wrap').style.display = 'none';
        saveLocalStorage(keyLocalStorageItemCart, []);
        // window.location.href= '/bill.html'
    }

    function createBill(data) {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(urlListBillApi, options)
            .then(function (response) {
                return response.json();
            })
            .then((data) => console.log(data))
    }

    function updateStock() {
        const newList = dataStorage.map(item => {
            for(let i =0; i < shopCart.length; i++) {
                if(item.id === shopCart[i].idSp) {
                    let qnt = item.quantity - shopCart[i].soLuong;
                    return {...item, quantity: qnt}
                }
            }
            return item
        })
        saveLocalStorage(keyLocalStorageLisSP,newList);
    }
}