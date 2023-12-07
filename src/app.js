import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import dbConnection from './config/config.js';
import dotenv from "dotenv"
dotenv.config()
const app = express();
// filename
const port = process.env.PORT || 3000
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
dbConnection()

app.listen(port, () =>
  console.log(`App listening on ${port}!....`)
);