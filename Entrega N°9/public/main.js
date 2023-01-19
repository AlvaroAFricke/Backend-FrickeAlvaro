import { Server } from "socket.io";

const socket = Server;

socket.on('ver', (saludo) => {
    console.log(saludo);
})