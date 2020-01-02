const app = require('express')();
const router = require('../routes/Api');
const { PORT } = require('./config');

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is running',
  });
});

app.use('/vm', router);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
