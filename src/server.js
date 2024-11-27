const express = require('express');
const app = express();
const routes = require('./routes/index.routes');

app.use(express.json());

app.use('/api', routes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
