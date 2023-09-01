const express = require('express');
const app = express();
const fs = require('./utils/fsUtils');
const PORT = '3001';
app.use(express.json());

app.get('/heroes', async (_req, res) => {
  const data = await fs.readHeroes();
  return res.status(200).json(data);
});

app.get('/heroes/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readHeroes();
  const hero = data.find((hero) => hero.id === Number(id))
  if (hero) {
    return res.status(200).json(hero)
  }

  return res.status(404).json({ message: "Hero not found!"})
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})