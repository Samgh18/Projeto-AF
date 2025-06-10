// Exemplo de middleware de autenticação (para futuro uso com JWT, se você quiser)
const authMiddleware = (req, res, next) => {
    console.log('🛡️ Middleware de autenticação chamado');
    // Você pode validar token aqui
    next();
  };
  
  module.exports = authMiddleware;
  