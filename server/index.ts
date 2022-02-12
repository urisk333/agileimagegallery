import express, { Application } from 'express';
import cors from 'cors';
import router from './router';

const app: Application = express();
const SERVER_PORT = 3001;

app.use(express.json());
app.use(cors());
app.use(router);

(async function (): Promise<void> {
  try {
    app.listen(SERVER_PORT, (): void => {
      console.log(`Server is UP at http://localhost:${SERVER_PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
