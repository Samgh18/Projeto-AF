// CADASTRO
document.getElementById('cadastroForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const tipo = document.getElementById('tipo').value;
  const mensagem = document.getElementById('mensagemCadastro');

  try {
    const response = await fetch('http://localhost:3000/usuarios/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha, tipo })
    });

    const text = await response.text();
    if (response.ok) {
      mensagem.textContent = '✅ Cadastro realizado com sucesso!';
      mensagem.style.color = 'green';
    } else {
      mensagem.textContent = '❌ Erro: ' + text;
      mensagem.style.color = 'red';
    }
  } catch (error) {
    mensagem.textContent = 'Erro de conexão: ' + error.message;
    mensagem.style.color = 'red';
  }
});

// LOGIN
document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const senha = document.getElementById('loginSenha').value;
  const mensagem = document.getElementById('mensagemLogin');

  try {
    const response = await fetch('http://localhost:3000/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    if (response.ok) {
      const json = await response.json();
      mensagem.textContent = '✅ Login bem-sucedido!';
      mensagem.style.color = 'green';

      localStorage.setItem('tipo', json.tipo);
      localStorage.setItem('id', json.id);
      localStorage.setItem('nome', json.nome);

      if (json.tipo === 'terapeuta') {
        window.location.href = 'dashboard-terapeuta.html';
      } else {
        window.location.href = 'dashboard-paciente.html';
      }
    } else {
      const text = await response.text();
      mensagem.textContent = '❌ Erro no login: ' + text;
      mensagem.style.color = 'red';
    }
  } catch (error) {
    mensagem.textContent = 'Erro de conexão: ' + error.message;
    mensagem.style.color = 'red';
  }
});
