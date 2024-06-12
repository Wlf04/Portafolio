const menuToggle=document.querySelector('.menuToggle');
const navigation = document.querySelector('.navigation');
menuToggle.onclick=function(){
navigation.classList.toggle('open')
}

menuToggle.onclick=function(){
    navigation.classList.toggle('open');
}

const list = document.querySelectorAll('.list')
function activarlink(){
    list.forEach((item)=>
    item.classList.remove('active'))
    this.classList.add('active')
}

list.forEach((item)=>
item.addEventListener('click', activarlink)
)

document.getElementById("year").innerHTML = new Date().getFullYear();