const getAllSneakers = async (id) => {
  const response = await fetch('/sneakers');
  const sneakers = await response.json();
  return sneakers;
};

var modal = document.getElementById('Btn');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


const createSneakerHtml = (sneakerData) => {
return `
  <section class="product-card">
      <div class="product-img">
          <img src="../kuvat/${sneakerData.kuva}" class="img-size" alt="kuva">
      </div>
      <div class="product-info">
          <h2>${sneakerData.nimi}</h2>
          <p>${sneakerData.malli}</p>
          <div class="price">${sneakerData.hinta}€</div>
      </div>
  </section>`
}

const init = async () => {
  const sneakers = await getAllSneakers();
  console.log(sneakers);
  const tuotteet = document.getElementById("tuotteet");
  console.log("Running");

  for(const shoe of sneakers) {
    const html = createSneakerHtml(shoe);
    const node = document.createElement("div");
    node.innerHTML = html;
    tuotteet.appendChild(node);
  }
}

init();