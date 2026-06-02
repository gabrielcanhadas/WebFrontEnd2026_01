/*
//Ao carregar a página
//--------------------
window.onload = function () {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.length > 0) {
    const emails = users.map((u) => u.email).join(", ");
    alert("olá, você já possui o seguinte e-mail já cadastrado: " + emails);
  }
};
*/

/*========================================
  VALIDAÇÃO DE EMAIL
  ========================================
  Valida se o email está no formato correto
  e retorna true ou false
*/
function validarEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.length === 0) {
    alert("Informe um email");
    return false;
  }

  if (!regexEmail.test(email)) {
    alert("Email inválido. Use o formato: usuario@dominio.com");
    return false;
  }

  return true;
}

/*========================================
  VALIDAÇÃO DE SENHA
  ========================================
  Valida se a senha atende aos requisitos:
  - Até 8 caracteres
  - Pelo menos 1 número
  - Pelo menos 1 letra maiúscula
  - Pelo menos 1 letra minúscula
*/
function validarSenha(senha) {
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;

  if (senha.length === 0) {
    alert("Informe uma senha");
    return false;
  }

  if (senha.length > 8) {
    alert("Máximo de 8 caracteres");
    return false;
  }

  if (!senha.match(numbers)) {
    alert("Deve conter 1 número");
    return false;
  }

  if (!senha.match(upperCaseLetters)) {
    alert("Deve conter uma letra maiúscula");
    return false;
  }

  if (!senha.match(lowerCaseLetters)) {
    alert("Deve conter uma letra minúscula");
    return false;
  }

  return true;
}

function store() {
  const name = document.getElementById("name");
  const pw = document.getElementById("pw");

  // Validar email
  if (!validarEmail(name.value)) {
    return;
  }

  // Validar senha
  if (!validarSenha(pw.value)) {
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const existe = users.find((u) => u.email === name.value);

  // Regra do gmail: remover usuário gmail anterior
  if (name.value.includes("@gmail.com") && existe) {
    users = users.filter((u) => u.email !== name.value);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Usuário gmail removido do armazenamento.");
    return;
  }

  if (!existe) {
    users.push({
      email: name.value,
      senha: pw.value,
    });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sua conta foi criada");
  } else {
    alert("Este e-mail já está cadastrado");
  }
}

function check() {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userName = document.getElementById("userName");
  const userPw = document.getElementById("userPw");

  // Validar email
  if (!validarEmail(userName.value)) {
    return;
  }

  // Validar senha não vazia
  if (userPw.value.length === 0) {
    alert("Informe uma senha");
    return;
  }

  // Procurar usuário com email e senha corretos
  const user = users.find((u) => u.email === userName.value && u.senha === userPw.value);

  if (user) {
    alert("Login realizado com sucesso!");
  } else {
    alert("Email ou senha incorretos");
  }
}

function exportarDados() {
  // localStorage.getItem() retorna uma STRING JSON
  // Não precisa de conversão, apenas recuperar e exportar
  const users = localStorage.getItem("users");

  if (!users) {
    alert("Nenhum dado para exportar.");
    return;
  }

  const nomeArquivo = prompt("Digite o nome do arquivo:", "backup-users.json");
  if (!nomeArquivo) return;

  // Criar arquivo com a string JSON
  const blob = new Blob([users], { type: "application/json" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = nomeArquivo.endsWith(".json") ? nomeArquivo : nomeArquivo + ".json";

  link.click();
  URL.revokeObjectURL(link.href);
}

function importarDados(file) {
  const reader = new FileReader();

  reader.onload = function (event) {
    try {
      // Ler arquivo como string JSON
      const jsonString = event.target.result;

      // Validar se é JSON válido fazendo parse
      JSON.parse(jsonString);

      // Se for válido, salvar direto no localStorage (sem stringify redundante)
      localStorage.setItem("users", jsonString);

      alert("Dados restaurados com sucesso!");
    } catch (erro) {
      alert("Erro ao importar arquivo. JSON inválido.");
    }
  };

  reader.readAsText(file);
}

function listarUsuarios() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const tbody = document.querySelector("#tabelaUsuarios tbody");

  // Se não há usuários, mostrar mensagem
  if (users.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3">Nenhum usuário cadastrado</td></tr>`;
    return;
  }

  // OTIMIZAÇÃO: Acumular HTML em string e fazer um único assignment
  // Isso é muito mais eficiente do que tbody.innerHTML += em cada iteração
  let html = "";

  users.forEach((u, index) => {
    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${u.email}</td>
        <td>****</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function apagarTudo() {
  const confirmar = confirm(
    "Tem certeza que deseja apagar TODOS os usuários? Esta ação não pode ser desfeita.",
  );
  if (!confirmar) return;

  localStorage.removeItem("users");

  // Limpar tabela visual
  const tbody = document.querySelector("#tabelaUsuarios tbody");
  tbody.innerHTML = `<tr><td colspan="3">Nenhum usuário cadastrado</td></tr>`;

  alert("Todos os dados foram apagados permanentemente.");
}
