const express = require('express');
const app = express();

const router = require('./routes/Api');
const { notFound, errorHandler } = require('./errorHandler');
const { PORT } = require('./config');

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is running',
  });
});

app.use('/vm', router);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
