const socket = io();

socket.on('saludo',()=>{
    console.log("Hola");
})