// server/src/app.js
import express from 'express';
import cors from 'cors';
import bugRoutes from './routes/bugRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/bugs', bugRoutes);

app.get('/', (req, res) => {
  res.send('Bug Tracker API running...');
});

export default app;
