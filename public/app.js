console.log('hello world')
const socket = io() //this is how we allow sockets to work on the front-end

let btn
let login
let username

document.addEventListener('DOMContentLoaded', () => {
    btn = document.getElementById('btn').addEventListener('click', submitLogin)
    login = document.getElementById('login')
    username = document.getElementById('username')
})

const submitLogin = () => {
    console.log('Wassup')
}

socket.on('get players', data => { //this is receiving what was emitted on the backend
    console.log(data)
})