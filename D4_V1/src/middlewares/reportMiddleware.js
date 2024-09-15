const reportMiddleware = (req, res, next) => {
  console.log(`Ruta accedida: ${req.path} - ${new Date().toISOString()}`);
  next();
};

module.exports = reportMiddleware;

  