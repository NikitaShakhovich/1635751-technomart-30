const cartModal = document.querySelector(".modal-cart");
const cartModalClose = cartModal.querySelector(".modal-cart .modal-close");

cartModalClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  cartModal.classList.remove("opened");
});

window.addEventListener("click", function (evt) {
  if (evt.target.classList.contains(`emerging-buy`)) {
    evt.preventDefault();
    cartModal.classList.add("opened");
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === ESC_KEY) {
    if (cartModal.classList.contains("opened")) {
      evt.preventDefault();
      cartModal.classList.remove("opened");
    }
  }
});
