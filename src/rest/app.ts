import express, { Express } from 'express';
import router from './routes';
import swaggerUi from 'swagger-ui-express';


const app: Express = express();

app.use(express.static('./src/rest/public'));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(undefined, {
  swaggerOptions: {
    title: 'Hello world',
    url: "/swagger.json"
  },
}));

app.use(router);

export default app;