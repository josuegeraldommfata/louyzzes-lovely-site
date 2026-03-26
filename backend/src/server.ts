import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import configRoutes from './routes/config.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8080', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api', configRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

const server = app.listen(PORT, () => {
console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
  console.log('🗄️ PostgreSQL conectado via pg + .env');
});

export default server;

