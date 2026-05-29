function store() {
  const name = document.getElementById("name");
  const pw = document.getElementById("pw");
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;
  if (name.value.length == 0) {
    alert("Informe um email");
  } else if (pw.value.length == 0) {
    alert("Informe uma senha");
  } else if (name.value.length == 0 && pw.value.length == 0) {
    alert("Informe um e-mail e uma senha");
  } else if (pw.value.length > 8) {
    alert("Máximo de 8 caracteres");
  } else if (!pw.value.match(numbers)) {
    alert("Deve conter 1 numero");
  } else if (!pw.value.match(upperCaseLetters)) {
    alert("Deve conter uma letra maíuscula");
  } else if (!pw.value.match(lowerCaseLetters)) {
    alert("Deve conter uma letra minúscula");
  } else {
    localStorage.setItem("name", name.value);
    localStorage.setItem("pw", pw.value);
    alert("Sua conta foi criada");
  }
}
function check() {
  const storedName = localStorage.getItem("name");
  const storedPw = localStorage.getItem("pw");
  const userName = document.getElementById("userName");
  const userPw = document.getElementById("userPw");
  if (userName.value == storedName && userPw.value == storedPw) {
    alert("Login realizado.");
  } else {
    alert("Erro ao fazer login");
  }
}
