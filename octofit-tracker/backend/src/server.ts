import dotenv from 'dotenv';
import { connectDatabase, MONGODB_URI } from './config/database';
import { app } from './index';

dotenv.config();

const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const API_BASE_URL = process.env.API_URL || (codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`);

connectDatabase()
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API base URL is ${API_BASE_URL}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
