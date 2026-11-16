import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import categoryRoutes from './routes/categoryRoutes.js';
import gearRoutes from './routes/gearRoutes.js';
import techniqueRoutes from './routes/techniqueRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'ShuttleLab API is running' });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/gears', gearRoutes);
app.use('/api/techniques', techniqueRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || 'Terjadi kesalahan pada server' });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server ShuttleLab API berjalan di port ${PORT}`);
  });
}

export default app;
