const express = require('express');
const app = express();
const fs = require('./utils/fsUtils');
const PORT = '3001';
app.use(express.json());
const { validateHero } = require('./middlewares/validateHero');

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
});

app.post('/heroes', validateHero, async (req, res) => {
  const data = await fs.readHeroes();
  const lastId = data.length;
  const newHero = {id: lastId + 1, ...req.body}
  data.push(newHero);
  await fs.writeHeroes(data);
  return res.status(201).json(newHero);
})

app.put('/heroes/:id', validateHero, async (req, res) => {
  const { id } = req.params;
  const data = await fs.readHeroes();
  const heroIndex = data.findIndex((hero) => hero.id === Number(id));
  if (heroIndex === -1) {
    return res.status(404).json({ message: "Hero not found!"})
  }
  const updatedHero = {id: Number(id), ...req.body}
  data[heroIndex] = updatedHero;
  await fs.writeHeroes(data);
  return res.status(200).json(updatedHero);
});

app.delete('/heroes/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readHeroes();
  const heroIndex = data.findIndex((hero) => hero.id === Number(id));
  if (heroIndex === -1) {
    return res.status(404).json({ message: "Hero not found!"})
  }
  data.splice(heroIndex, 1);
  await fs.writeHeroes(data);
  return res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});