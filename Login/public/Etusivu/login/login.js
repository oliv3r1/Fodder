"use strict";

var modal = document.getElementById("Btn");
const info = document.getElementById("login-data");

document.onload = async () => {
  // const sneakers = await getAllSneakers();
  const getUserInfo = await getUser("jarmo");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var modal = document.getElementById("Btn1");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const url = "../"; // change url when uploading to server

const getUser = async (id) => {
  const response = await fetch(url + "/user/" + id);
  const user = await response.json();
  return user;
};

const userInfo = async () => {
  const response = await fetch(url + "/user/me");
  const user = await response.json();
  console.log(user);
  info.innerText = user.User;
};

const logout = async () => {
  const response = await fetch(url + "/user/logout");
  const user = await response.text();
  location.reload();
  alert("You have successfully logged out!");
};

console.log(info);
userInfo();
