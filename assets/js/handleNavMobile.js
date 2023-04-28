//onmobile

const nav = document.querySelector('.header__menu__mobile__nav')
const navList = document.querySelector('.header__menu__mobile__nav__list')
nav.onclick = () => {
    navList.classList.toggle('slideLeft')
}