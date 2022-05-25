import express from 'express';
import cors from 'cors';
import router from './routes/routes.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen( 3000, () => console.log("Api Running."));

//https://tediousjs.github.io/tedious/getting-started.html
//https://www.tabnine.com/code/javascript/modules/tedious