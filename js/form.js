const feedbackLink = document.querySelector(".feedback-button");
const mapLink = document.querySelector(".map-open");

const feedbackModal = document.querySelector(".modal-feedback");
const mapModal = document.querySelector(".modal-map");

const feedbackModalClose = feedbackModal.querySelector(".modal-feedback .modal-close");
const mapModalClose = mapModal.querySelector(".modal-map .modal-close");

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
  }
});
