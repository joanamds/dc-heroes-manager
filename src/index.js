const express = require('express');
const app = express();
const fs = require('./utils/fsUtils');
const PORT = '3001';
app.use(express.json());

app.get('/heroes', async (_req, res) => {
  const data = await fs.readHeroes();
  return res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})