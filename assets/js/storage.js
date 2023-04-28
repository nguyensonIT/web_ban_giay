var keyLocalStorageLisSP = 'DANHSACHSP'
var keyLocalStorageItemCart = 'DANHSACHITEMCART'

var saveLocalStorage = (key,value)=>{
    let dataString = JSON.stringify(value)
    return localStorage.setItem(key,dataString)
}
var getLocalStorage = (key)=>{
    let dataString = JSON.parse(localStorage.getItem(key))
    return dataString
}