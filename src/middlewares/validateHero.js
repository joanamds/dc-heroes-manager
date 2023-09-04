const validateHero = async (req, res, next) => {
  const { name, secret_identity, first_appearance } = req.body;

  if (name.length < 2 || secret_identity.length < 2) {
    return res.status(400).json({ message: 'Os campos "name" e "secret_identity" devem ter pelo menos 2 caracteres'})
  }

  if (typeof name !== 'string' || typeof secret_identity !== 'string') {
    return res.status(400).json({ message: 'Os campos "name" e "secret_identity" devem ser uma string'})
  }

  if(!first_appearance.year) {
    return res.status(400).json({ message: 'O campo "year" em first_appearance é obrigatório'})
  }

  if(!first_appearance.comic) {
    return res.status(400).json({ message: 'O campo "comic" em first_appearance é obrigatório'})
  }

  next()
}

module.exports = {
  validateHero
}