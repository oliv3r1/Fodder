const getAllSneakers = async (id) => {
  const response = await fetch("../sneakers");
  const sneakers = await response.json();
  return sneakers;
};

var modal = document.getElementById("Btn");
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var inputField1 = document.getElementById("inputField1");

var selectMenu1 = document.getElementById("selectMenu1");

selectMenu1.onchange = function () {
  inputField1.value = selectMenu1.value;
};

var inputField2 = document.getElementById("inputField2");

var selectMenu2 = document.getElementById("selectMenu2");

selectMenu2.onchange = function () {
  inputField2.value = selectMenu2.value;
};

const createSneakerHtml = (sneakerData) => {
  return `
  <section class="product-card">
      <div class="product-img">
          <img src="../kuvat/${sneakerData.kuva}" class="img-size" alt="kuva">
      </div>
      <div class="product-info">
          <h2>${sneakerData.nimi}</h2>
          <p>Koko: ${sneakerData.koko}</p>
          <p>${sneakerData.Email}<p>
          <div class="price">${sneakerData.hinta} €</div>
      </div>
  </section>`;
};

const init = async () => {
  const sneakers = await getAllSneakers();
  const tuotteet = document.getElementById("tuotteet");
  console.log(sneakers);
  for (const shoe of sneakers) {
    const html = createSneakerHtml(shoe);
    const node = document.createElement("div");
    node.innerHTML = html;
    tuotteet.appendChild(node);
  }
};

init();
