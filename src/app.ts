import express, { Application } from 'express';
import cors from 'cors';
import notFound from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import router from './app/routes';
const app :Application= express();
const port = 3000;


app.use(express.json())

app.use(cors())
app.use('/api',router)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler)
app.use(notFound)

export default app;