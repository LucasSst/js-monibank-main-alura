const cameraStartBtn = document.querySelector("[data-video-botao]");
const cameraField = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const takePhotoBtn = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const message = document.querySelector("[data-mensagem]");
const sendPhotoBtn = document.querySelector("[data-enviar]");


let imageURL = "";

cameraStartBtn.addEventListener("click", async function () {
    const startVideo = await navigator.mediaDevices
    .getUserMedia({video:true, audio:false});

    cameraStartBtn.style.display = "none";
    cameraField.style.display = "block";
    
    video.srcObject = startVideo;
})

takePhotoBtn.addEventListener('click', function() {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)

    imageURL = canvas.toDataURL("image/jpeg");

    cameraField.style.display="none";
    message.style.display= "block";
})

sendPhotoBtn.addEventListener('click', () => {
    const receiveExistingData = localStorage.getItem("register");
    const convertReturn = JSON.parse(receiveExistingData);

    convertReturn.imagem = imageURL;

    localStorage.setItem('register', JSON.stringify(convertReturn))

    window.location.href= "../pages/abrir-conta-form-3.html"
})