// import './../css/design-tokens.css'
// import './../css/main.css'
const Hampik = (function () {
  const data = {
    inputDato: document.querySelectorAll('.input-dato'),
    btnLogin: document.querySelector('.container-form .container-button button'),
    btnSignUp: document.querySelector('.container-form .container-button button')
    // warningForm: document.getElementById('txt-warning')
  };

  const events = {
    onFocusInput: function (elem) {
      elem.addEventListener('focus', (e) => {
        e.target.parentNode.classList.add('focus');
      });
    },
    onBlurInput: function (elem) {
      elem.addEventListener('focusout', (e) => {
        const dato = e.target.value;
        if (dato.length == 0)
          e.target.parentNode.classList.remove('focus');

        // methods.validateActiveButton();
      });
    },
    onTypeInput: function (elem) {
      elem.addEventListener('keyup', () => {
        methods.validateInputsLogin();
        // methods.validateActiveButton();
      })
    },
    onClickSignUp: function () {
      data.btnSignUp.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('reg-correo').value
        const nombre = document.getElementById('reg-nom').value
        const apellido = document.getElementById('reg-ape').value
        const celu = document.getElementById('reg-celu').value
        const contra = document.getElementById('reg-contra').value
        const contra2 = document.getElementById('reg-conf-contra').value

        if (email && contra) {
          methods.insertCliente(nombre, apellido, email, celu, contra, contra2)
        }
      })
    },
    onClickLogin: function () {
      data.btnSignUp.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('reg-correo').value
        const password = document.getElementById('reg-contra').value

        if (methods.validateInputsLogin()) {
          methods.validateLogin(email, password)
        } else {
          data.inputDato.forEach((e) => {
            // events.onBlurInput(e);
            // events.onFocusInput(e);
            events.onTypeInput(e);
          })
        }
      })
    },
    onclickRecuperar: function () {
      data.btnSignUp.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('reg-correo').value

        // if (methods.validateInputsLogin()) {
        methods.validateRecuperarContra(email)
        // }
      })
    }
    ,
    onClickCloseWarningModal: function () {
      document.getElementById('close-warning-general').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('txt-warning').classList.remove('show')
      })
    }
  };

  const methods = {
    validateActiveButton: function () {
      // let count = 0
      // const cantInputs = data.inputDato.length
      // data.inputDato.forEach((e) => {
      //   e.value != '' ? count++ : true
      // })
      // count == cantInputs ? data.btnLogin.classList.add('active') : data.btnLogin.classList.remove('active')
    },
    validateLogin: function (_email, _password) {
      var url = 'http://mfyance-002-site6.dtempurl.com/api/Login/Validar';
      var data = {
        strToken: "",
        strUsuario: _email,
        strClave1: _password,
        strClave2: _password
      };

      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log('Respuesta Login:', response)
          document.getElementById('txt-warning').classList.remove('show')
          if (response.success) {
            methods.getAuth(response.data)
          } else {
            document.getElementById('txt-warning').classList.add('show')
            document.querySelector('#txt-warning > div i').innerText = response.message
          }
        });
    },
    getAuth: function (_token) {
      var url = 'http://mfyance-002-site6.dtempurl.com/api/Auth';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'access-control-allow-origin': '*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + _token
        }
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log('Respuesta Auth:', response)
          if (response.success) {
            document.querySelector('.ModalLogin').classList.add('show')
            setTimeout(() => { document.querySelector('.ModalLogin').classList.remove('show') }, 3000)
          }
        });
    },
    insertCliente: function (_nombre, _apellido, _email, _celu, _contra, _contra2) {
      var url = 'http://mfyance-002-site6.dtempurl.com/api/Persona/Insertar';
      var data = {
        strNombre: _nombre,
        strPrimerApellido: _apellido,
        strCelularPrincipal: _celu,
        strCorreoPrincipal: _email,
        strClave1: _contra,
        strClave2: _contra2,
        strUserId: "",
        idParamTipoRed: 0
      };

      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log('Respuesta crear cliente:', response)
          document.getElementById('txt-warning').classList.remove('show')
          if (response.success) {
            document.querySelector('.ModalLogin').classList.add('show')
            setTimeout(() => {
              document.querySelector('.ModalLogin').classList.remove('show')
              window.location = 'index.html'
            }, 3000)
          } else {
            document.getElementById('txt-warning').classList.add('show')
            document.querySelector('#txt-warning > div i').innerText = response.message
          }
        });
    },
    loadFb: function () {
      // window.fbAsyncInit = function () {
      //   FB.init({
      //     appId: '295137875027657',
      //     cookie: true,
      //     xfbml: true,
      //     version: 'v7.0'
      //   });

      //   FB.AppEvents.logPageView();

      // };

      // (function (d, s, id) {
      //   var js, fjs = d.getElementsByTagName(s)[0];
      //   if (d.getElementById(id)) { return; }
      //   js = d.createElement(s); js.id = id;
      //   js.src = "https://connect.facebook.net/en_US/sdk.js";
      //   fjs.parentNode.insertBefore(js, fjs);
      // }(document, 'script', 'facebook-jssdk'));

      // FB.getLoginStatus(function (response) {
      //   statusChangeCallback(response);
      // });

      // function checkLoginState() {
      //   FB.getLoginStatus(function (response) {
      //     statusChangeCallback(response);
      //   });
      // }
    },
    validateInputsLogin: function () {
      const nombre = document.getElementById('reg-nom')
      const email = document.getElementById('reg-correo')
      const password = document.getElementById('reg-contra')

      const patternEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      let validate = true

      if (nombre.value.length == 0) {
        nombre.parentElement.classList.add('show-warning')
        validate = false
      } else {
        nombre.parentElement.classList.remove('show-warning')
      }

      if (email.value.length == 0) {
        email.parentElement.classList.add('show-warning')
        email.parentElement.children[email.parentElement.children.length - 1].innerHTML = 'Ingresa tu correo'
        validate = false
      } else if (!patternEmail.test(email.value)) {
        email.parentElement.classList.add('show-warning')
        email.parentElement.children[email.parentElement.children.length - 1].innerHTML = 'Ingresa un correo válido'
        validate = false
      } else {
        email.parentElement.classList.remove('show-warning')
      }

      if (password.value.length == 0) {
        password.parentElement.classList.add('show-warning')
        validate = false
      } else {
        password.parentElement.classList.remove('show-warning')
      }

      return validate
    },
    validateRecuperarContra: function (_email) {
      var url = 'http://mfyance-002-site6.dtempurl.com/api/Login/RecuperarClave';
      var data = {
        strUsuario: _email,
      };

      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log('Mandar contraseña:', response)
          if (response.success) {
            // methods.getAuth(response.data)
            document.querySelector('.ModalLogin').classList.add('show')
            setTimeout(() => {
              document.querySelector('.ModalLogin').classList.remove('show')
              window.location = 'index.html'
            }, 3000)
          }
        });
    }
  };

  const initialize = function () {
    methods.loadFb()
    data.inputDato.forEach((e) => {
      events.onBlurInput(e);
      events.onFocusInput(e);
      // events.onTypeInput(e);
    })

    if (document.querySelector('body').classList.contains('sign-up')) {
      events.onClickSignUp()
    } else if (document.querySelector('body').classList.contains('registrar')) {
      events.onclickRecuperar()
    }
    else {
      events.onClickLogin()
    }
    events.onClickCloseWarningModal()
    // methods.validateRecuperarContra('seguilvilchezmichelle@gmail.com')
  };

  return {
    init: initialize
  };
})();


document.addEventListener(
  'DOMContentLoaded',
  function () {
    Hampik.init();
  },
  false
);