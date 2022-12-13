'use strict';

var modal = document.getElementById('Btn');

document.onload = async () => {
  const sneakers = await getAllSneakers();
  const getUser = await getUser("jarmo");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var modal = document.getElementById('Btn1');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const loginForm = document.querySelector('#login-form');

const getUser = async (id) => {
  const response = await fetch(url + '/user/' + id);
  const user = await response.json();
  return user;
};

const getAllSneakers = async (id) => {
  const response = await fetch(url + '/sneaker');
  const sneakers = await response.json();
  console.log(sneakers);
  return sneakers;
};




