// Cadastro
document.getElementById('cadastroForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const tipo = document.getElementById('tipo').value;
  const mensagem = document.getElementById('mensagemCadastro');

  if (!nome || !email || !senha || !tipo) {
    mensagem.textContent = '❌ Por favor, preencha todos os campos.';
    mensagem.style.color = 'red';
    return;
  }

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
      // Limpa campos
      document.getElementById('nome').value = '';
      document.getElementById('email').value = '';
      document.getElementById('senha').value = '';
      document.getElementById('tipo').value = '';
    } else {
      mensagem.textContent = '❌ Erro: ' + text;
      mensagem.style.color = 'red';
    }
  } catch (error) {
    mensagem.textContent = 'Erro de conexão: ' + error.message;
    mensagem.style.color = 'red';
  }
});

// Login
document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;
  const mensagem = document.getElementById('mensagemLogin');

  if (!email || !senha) {
    mensagem.textContent = '❌ Por favor, preencha email e senha.';
    mensagem.style.color = 'red';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    if (response.ok) {
      const json = await response.json();

      // Salva dados no localStorage para uso nas outras páginas
      localStorage.setItem('id', json.id);
      localStorage.setItem('nome', json.nome);
      localStorage.setItem('tipo', json.tipo);

      mensagem.textContent = '✅ Login bem-sucedido!';
      mensagem.style.color = 'green';

      // Redireciona para o dashboard conforme tipo
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

// Conteúdo - Upload (somente terapeutas)
if (localStorage.getItem('tipo') === 'terapeuta') {
  const btnEnviar = document.getElementById('btnEnviar');
  const arquivoInput = document.getElementById('arquivo');
  const tituloInput = document.getElementById('titulo');
  const msgUpload = document.getElementById('msgUpload');

  if (btnEnviar) {
    btnEnviar.addEventListener('click', async () => {
      const titulo = tituloInput.value.trim();
      const arquivo = arquivoInput.files[0];

      if (!titulo) {
        msgUpload.textContent = 'Informe o título do conteúdo.';
        msgUpload.style.color = 'orange';
        return;
      }
      if (!arquivo) {
        msgUpload.textContent = 'Selecione um arquivo para enviar.';
        msgUpload.style.color = 'orange';
        return;
      }

      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('terapeutaId', localStorage.getItem('id'));
      formData.append('arquivo', arquivo);

      try {
        const res = await fetch('http://localhost:3000/conteudos/upload', {
          method: 'POST',
          body: formData
        });

        if (res.ok) {
          msgUpload.textContent = 'Conteúdo enviado com sucesso!';
          msgUpload.style.color = 'green';
          tituloInput.value = '';
          arquivoInput.value = '';
          // Opcional: atualizar a lista de conteúdos aqui
        } else {
          msgUpload.textContent = 'Erro ao enviar conteúdo.';
          msgUpload.style.color = 'red';
        }
      } catch (e) {
        msgUpload.textContent = 'Erro na conexão: ' + e.message;
        msgUpload.style.color = 'red';
      }
    });
  }
}
