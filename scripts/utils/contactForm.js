// Selectors
const modal = document.getElementById("contact_modal");
const modalBox = document.querySelector(".modal");
const formContactBtn = document.querySelector("#main .contact_button");
const photographerName = document.querySelector(".photographer-name");
const sendForm = document.querySelector("#contact_modal .contact_button");
const confirmMessage = document.getElementById("confirm-message");

/**
 * Making the contact modal visible on the screen
 * @return {void}
 */
function displayModal() {
  modal.style.display = "block";
}

formContactBtn.addEventListener("click", (event) => {
  event.preventDefault();
  displayModal();
});

/**
 * Making the contact modal hidden from the screen
 * @return {void}
 */
function closeModal() {
  modal.style.display = "none";
  confirmMessage.style.display = "none";
}

function displayModalInfos(photographer) {
  photographerName.textContent = photographer.name;
}

// Variables
const LIMIT_FIRSTNAME = 2;
const LIMIT_LASTNAME = 2;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMIT_MSG = 20;

// Conditions
const isFirstNameCorrect = (firstName) => {
  return firstName.length >= LIMIT_FIRSTNAME && firstName != "";
};

const isLastNameCorrect = (lastName) => {
  return lastName.length >= LIMIT_LASTNAME && lastName != "";
};

const isEmailCorrect = (email) => {
  return REGEX_EMAIL?.test(email);
};

const isMessageCorrect = (message) => {
  return message.length >= LIMIT_MSG && message != "";
};

sendForm.addEventListener("click", (event) => {
  event.preventDefault();
  const firstName = document.querySelector("#first").value;
  const lastName = document.querySelector("#last").value;
  const email = document.querySelector("#email").value;
  const msgInput = document.querySelector("#message-input").value;

  const isFormValid = () => {
    let isFormValid = true;

    const validations = [
      {
        value: firstName,
        isValid: isFirstNameCorrect,
        errorSelector: "#firstError",
        inputSelector: "#first",
        errorMessage: `Veuillez entrer ${LIMIT_FIRSTNAME} caractères ou plus.`,
      },

      {
        value: lastName,
        isValid: isLastNameCorrect,
        errorSelector: "#lastError",
        inputSelector: "#last",
        errorMessage: `Veuillez entrer ${LIMIT_LASTNAME} caractères ou plus.`,
      },

      {
        value: email,
        isValid: isEmailCorrect,
        errorSelector: "#emailError",
        inputSelector: "#email",
        errorMessage: "Veuillez entrer une adresse email valide.",
      },

      {
        value: msgInput,
        isValid: isMessageCorrect,
        errorSelector: "#msgError",
        inputSelector: "#message-input",
        errorMessage: `Veuillez entrer ${LIMIT_MSG} caractères ou plus.`,
      },
    ];

    validations.forEach((validation) => {
      const { value, isValid, errorSelector, inputSelector, errorMessage } =
        validation;

      const errorElement = document.querySelector(errorSelector);
      const errorInput = document.querySelector(inputSelector);

      if (!isValid(value)) {
        errorElement.innerHTML = errorMessage;
        errorInput.style.border = "2px solid #901c1c";
        isFormValid = false;
      } else {
        errorElement.innerHTML = "";
        errorInput.style.border = "none";
      }
    });

    return isFormValid;
  };

  if (isFormValid()) {
    modalBox.style.display = "none";
    confirmMessage.style.display = "flex";
  }
});
