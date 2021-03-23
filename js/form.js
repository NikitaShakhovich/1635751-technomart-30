const feedbackLink = document.querySelector(".feedback-button");
const mapLink = document.querySelector(".map-open");

const feedbackModal = document.querySelector(".modal-feedback");
const mapModal = document.querySelector(".modal-map");
const cartModal = document.querySelector(".modal-cart");

const feedbackModalClose = feedbackModal.querySelector(".modal-feedback .modal-close");
const mapModalClose = mapModal.querySelector(".modal-map .modal-close");
const cartModalClose = cartModal.querySelector(".modal-cart .modal-close");

const feedbackForm = feedbackModal.querySelector(".feedback-form");
const feedbackInputName = feedbackModal.querySelector(".feedback-name");
const feedbackInputEmail = feedbackModal.querySelector(".feedback-email");
const feedbackInputMessage = feedbackModal.querySelector(".feedback-message");
const ESC_KEY = 27;

let isStorageSupport = true;
let storageName = "";
let storageEmail = "";

try {
  storageName = localStorage.getItem("name") || "";
  storageEmail = localStorage.getItem("email") || "";
} catch (err) {
  isStorageSupport = false;
}

feedbackLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  feedbackModal.classList.add("opened");

  if (storageName || storageEmail) {
    feedbackInputName.value = storageName;
    feedbackInputEmail.value = storageEmail;
    feedbackInputMessage.focus();
  } else {
    feedbackInputName.focus();
  }
});
mapLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapModal.classList.add("opened");
});

feedbackModalClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  feedbackModal.classList.remove("opened");
  feedbackModal.classList.remove("modal-error");
});
mapModalClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapModal.classList.remove("opened");
});
cartModalClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  cartModal.classList.remove("opened");
});

feedbackForm.addEventListener("submit", function (evt) {
  if (!feedbackInputName.value || !feedbackInputEmail.value || !feedbackInputMessage.value) {
    evt.preventDefault();
    feedbackModal.classList.remove("modal-error");
    feedbackModal.offsetWidth = feedbackModal.offsetWidth;
    feedbackModal.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", feedbackInputName.value);
      localStorage.setItem("email", feedbackInputEmail.value);
    }
  }
});

window.addEventListener("click", function (evt) {
  if (evt.target.classList.contains(`emerging-buy`)) {
    evt.preventDefault();
    cartModal.classList.add("opened");
  }
  if (evt.target.classList.contains(`service-button`)) {
    toggleSlide(evt.target);
  }
  if (evt.target.classList.contains(`catalog-button`)) {
    toggleSlideCategories(evt.target);
  }
  if (evt.target.classList.contains(`gallery-button`) || evt.target.closest("button.gallery-button")) {
    const btn = evt.target.classList.contains(`gallery-button`) ? evt.target : evt.target.closest("button.gallery-button");
    toggleNextSliderButton(btn);
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === ESC_KEY) {
    if (feedbackModal.classList.contains("opened")) {
      evt.preventDefault();
      feedbackModal.classList.remove("opened");
      feedbackModal.classList.remove("modal-error");
    }
    if (mapModal.classList.contains("opened")) {
      evt.preventDefault();
      mapModal.classList.remove("opened");
    }
    if (cartModal.classList.contains("opened")) {
      evt.preventDefault();
      cartModal.classList.remove("opened");
    }
  }
});
const toggleSlide = (clickedButton) => {
  const activeSlide = document.querySelector(".description-slide.active");
  const activeButton = document.querySelector(".service-button.current");
  activeSlide.classList.remove("active");
  activeButton.classList.remove("current");
  clickedButton.classList.add("current");
  const indexSlide = clickedButton.dataset.slideIndex;
  const allSlide = document.querySelectorAll(".description-slide");
  const nextActiveSlide = allSlide[indexSlide];
  nextActiveSlide.classList.add("active");
}
const toggleSlideCategories = (clickedButtonCategories) => {
  const activeSlideCategories = document.querySelector(".slider-item.active");
  const activeButtonCategories = document.querySelector(".catalog-button.current");
  activeSlideCategories.classList.remove("active");
  activeButtonCategories.classList.remove("current");
  clickedButtonCategories.classList.add("current");
  const indexSlideCategories = clickedButtonCategories.dataset.slideCategories;
  const allSlideCategories = document.querySelectorAll(".slider-item");
  const nextActiveSlideCategories = allSlideCategories[indexSlideCategories];
  nextActiveSlideCategories.classList.add("active");
}

const toggleNextSliderButton = (element) => {
  const allSlide = document.querySelectorAll(".slider-item");
  const allSlideBtn = document.querySelectorAll(".catalog-button");
  let activeIndex = 0;
  allSlide.forEach((it, index) => {
    return activeIndex = it.classList.contains("active") ? index : activeIndex;
  })
  allSlide[activeIndex].classList.remove("active")
  allSlideBtn[activeIndex].classList.remove("current")

  if (element.classList.contains("gallery-button-back")) {
    const nextSlideIndex = activeIndex - 1 < 0 ? allSlide.length - 1 : activeIndex - 1;
    allSlide[nextSlideIndex].classList.add("active");
    allSlideBtn[nextSlideIndex].classList.add("current");
  } else {
    const nextSlideIndex = activeIndex + 1 > allSlide.length - 1 ? 0 : activeIndex + 1;
    allSlide[nextSlideIndex].classList.add("active");
    allSlideBtn[nextSlideIndex].classList.add("current");
  }
}
