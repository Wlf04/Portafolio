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

//certificados//

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".wall img");

    images.forEach(image => {
        image.addEventListener("click", () => {
            image.classList.toggle("enlarged");
        });
    });
});

//boton descargar//
document.querySelector('.descargar').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'cv.pdf'; // Ruta del archivo PDF en tu proyecto
    link.download = 'Oscar_Boza_CV.pdf'; // Nombre del archivo al descargar
    link.click();
  });



//footer// Obtener el año actual
document.getElementById("year").innerHTML = new Date().getFullYear();


//boton compartir//
document.querySelector('.share-button').addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check this out!',
        text: 'Visit this amazing website:',
        url: window.location.href, // Comparte la URL actual
      })
        .then(() => console.log('Link shared successfully!'))
        .catch((error) => console.error('Error sharing the link:', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  });