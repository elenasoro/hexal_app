const sendFormStatus = true;

if(localStorage.getItem('sendFormStatus')) {
  hideForm()
}

function hideForm() {
  const submittedFormPlaceholder = document.createElement('p')
  submittedFormPlaceholder.className = 'contact__form_placeholder'
  submittedFormPlaceholder.innerHTML = 'Вы уже заполнили форму обратной связи. Проверьте вашу почту!'
  const contactContainer = document.querySelector('.contact__container')
  contactContainer.removeChild(document.querySelector('.contact__form'))
  contactContainer.insertBefore(submittedFormPlaceholder, document.querySelector('.contact__info'))
}


function validateForm() {
  const name = document.querySelector('.contact__input_name');
  const email = document.querySelector('.contact__input_email');

  let emailRegx = /.+@.+\..+/i;

  function showError(elem, errorMessage) {  
    var msgElem = document.createElement('span');
    msgElem.className = "error_message";
    msgElem.innerHTML = errorMessage;
    elem.after(msgElem);
  }

  function resetError(field) {
    field.style.border = '';
    if (field.nextElementSibling.className == "error_message") {
      field.parentNode.removeChild(document.querySelector('.error_message'));
    }
  }

  resetError(name);
  if (!name.value) {
    name.style.border = '2px solid red';
    showError(name, 'Enter your name');
    return false;
  }

  resetError(email);
  if (!email.value) {
    email.style.border = '2px solid red';
    showError(email, 'Enter your email');
    return false;
  } else if(email.value.match(emailRegx) == null){
    email.style.border = '2px solid red';
    showError(email, 'Invalid format. Shoud contain @ and .');
    return false;
  }

  return true;
}


function submitForm() {
  const name = document.querySelector('.contact__input_name').value;
  const email = document.querySelector('.contact__input_email').value;
  const subject = document.querySelector('.contact__input_subject').value;
  const message = document.querySelector('.contact__input_message').value;
  const submitButton = document.querySelector('.contact__form_submit');

  function request(url) {
    return new Promise(
      function(resolve, reject){
        const xhr = new XMLHttpRequest();

        const body = 'name=' + encodeURIComponent(name) +
          '&email=' + encodeURIComponent(email) + 
          '&subject=' + encodeURIComponent(subject) +
          '&message=' + encodeURIComponent(message);

        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function() {
          if (xhr.status === 200) {
            resolve(xhr.response)
          } else {
            reject(xhr.status)
          }
        }
        xhr.send(body);
      }
    )
  }

  if(validateForm()){
    submitButton.addEventListener('click', request('/submit')
    .then(localStorage.setItem('sendFormStatus', sendFormStatus))
    .then(window.location.href = "success.html")
    .catch(error => console.error(error)));
  }
}

