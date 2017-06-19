import express from 'express';
import logger from 'winston';
import morgan from 'morgan';

const app = express();
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Wellcome' });
});

app.listen(3000, (err) => {
  if (err) logger.error('Cant Start Server.');
  logger.info('Server Started on PORT:3000');
});

export default app;
