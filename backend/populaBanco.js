// backend/populaBanco.js

const mongoose = require('mongoose');
const Usuario = require('./models/Usuario');
const Sessao = require('./models/Sessao');
const Conteudo = require('./models/Conteudo');

async function popula() {
  try {
    await mongoose.connect('mongodb+srv://samghernandes:0pitanga@projeto.qaxf9kw.mongodb.net/plataforma-suporte?retryWrites=true&w=majority&appName=PROJETO');

    // Limpar coleções
    await Usuario.deleteMany({});
    await Sessao.deleteMany({});
    await Conteudo.deleteMany({});

    // Criar usuários
    const terapeuta1 = new Usuario({ nome: 'Dra. Lúcia', email: 'lucia@example.com', senha: '123456', tipo: 'terapeuta' });
    const terapeuta2 = new Usuario({ nome: 'Dr. João', email: 'joao.terapeuta@example.com', senha: '123456', tipo: 'terapeuta' });
    const paciente1 = new Usuario({ nome: 'Maria', email: 'maria@example.com', senha: '123456', tipo: 'usuário' });
    const paciente2 = new Usuario({ nome: 'Carlos', email: 'carlos@example.com', senha: '123456', tipo: 'usuário' });

    await terapeuta1.save();
    await terapeuta2.save();
    await paciente1.save();
    await paciente2.save();

    // Criar sessões
    const sessao1 = new Sessao({
      id_usuario: paciente1._id.toString(),
      id_terapeuta: terapeuta1._id.toString(),
      data: '2025-06-10',
      diagnostico: 'Ansiedade',
      terapia: 'Terapia Cognitivo-Comportamental'
    });

    const sessao2 = new Sessao({
      id_usuario: paciente2._id.toString(),
      id_terapeuta: terapeuta2._id.toString(),
      data: '2025-06-11',
      diagnostico: 'Depressão leve',
      terapia: 'Terapia Humanista'
    });

    await sessao1.save();
    await sessao2.save();

    // Criar conteúdos
    const conteudo1 = new Conteudo({
      titulo: 'Artigo sobre Ansiedade',
      arquivo: 'artigo-ansiedade.pdf',
      terapeutaId: terapeuta1._id.toString()
    });

    const conteudo2 = new Conteudo({
      titulo: 'Livro de Terapia Humanista',
      arquivo: 'livro-terapia.pdf',
      terapeutaId: terapeuta2._id.toString()
    });

    await conteudo1.save();
    await conteudo2.save();

    console.log('Banco populado com sucesso!');
    mongoose.disconnect();
  } catch (e) {
    console.error('Erro ao popular banco:', e);
  }
}

popula();
