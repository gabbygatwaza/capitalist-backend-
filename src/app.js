import express from 'express';
import cors from 'cors';
import router from './routes';
const app = express();
// filename

app.use(
  cors({
    origin: '*',
  })
);
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'welcome to Capitalist api',
  });
});

app.use('/api', router);

export default app;
