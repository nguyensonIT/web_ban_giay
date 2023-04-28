function validate(){
    let surname = $('.surnameInp').value;
    let name = $('.nameInp').value;
    let email = $('.emailInp').value;
    let phoneNumber = $('.telInp').value;
    let selectProvince = $('#province').value;
    let selectDistrict = $('#district').value;
    let selectWard = $('#ward').value;
    let errSurname = $('.errSurname');
    let errName = $('.errName');
    let errEmail = $('.errEmail');
    let errTel = $('.errTel');
    let errProvince = $('.errProvince');
    let errDistrict = $('.errDistrict');
    let errWard = $('.errWard');

    errSurname.innerText = '';
    errName.innerText = '';
    errEmail.innerText = '';
    errTel.innerText = '';
    errProvince.innerText = '';
    errDistrict.innerText = '';
    errWard.innerText = '';

    if(surname.trim() === '' || surname === 'null'){
        errSurname.innerText = 'Hãy nhập họ';
    }else if (!/[a-zA-Z]/.test(surname)){
        errSurname.innerText = 'Họ chỉ được nhập chữ cái in hoa và in thường';
    }
        
    if(name.trim() === '' || name === 'null'){
        errName.innerText = 'Hãy nhập tên';
    }else if (!/[a-zA-Z]/.test(name)){
        errName.innerText = 'Tên chỉ được nhập chữ cái in hoa và in thường';
    }

    let validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;  

    if(email.trim() === '' || email === 'null'){
        errEmail.innerText = 'Hãy nhập email';
    }else if(!email.match(validRegexEmail)){
        errEmail.innerText = 'Email sai định dạng';
    }
    
    let validRegexPhone = /^(0\d{9,10})$/; 
    const prefix = phoneNumber.trim().substring(0, 3);
    const networkList = ['086', '096', '097', '098', '032', '033', '034', '035', '036', '037', '038', '039', '089', '090', '093', '070', '079', '077', '076', '078', '088', '091', '094', '083', '084', '085', '081', '082'];
    if(phoneNumber.trim() === '' || phoneNumber === 'null' ){
        errTel.innerText = 'Hãy nhập số điện thoại';
    }
    else if(!validRegexPhone.test(phoneNumber.trim())){
        errTel.innerText = 'Số điện thoại không đúng (10 số, bắt đầu bằng 0)';
    }
    else if(!networkList.includes(prefix)){
        errTel.innerText = 'Số điện thoại không đúng với định dạng các nhà mạng';
    }

    if(selectProvince == 0 ){
        errProvince.innerHTML = 'Hãy chọn tỉnh/thành phố';
    }
        
    if(selectDistrict == 0){
        errDistrict.innerHTML = 'Hãy chọn huyện/quận';
    }
        
    if(selectWard == 0){
        errWard.innerHTML = 'Hãy chọn phường/xã';
    }
        
    if(errSurname.innerHTML == '' && errName.innerHTML == '' && errEmail.innerHTML == '' && errTel.innerHTML == ''&&
                 errProvince.innerHTML == '' && errDistrict.innerHTML == '' &&errWard.innerHTML == '')
    return true;    
    else return false
}